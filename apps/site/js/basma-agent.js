// basma-agent.js — Basma Voice Agent for HNH
// Built from @elevenlabs/ui blueprint (voice-chat-01, voice-chat-02 patterns)
// Uses HNH portal Worker for AI chat + ElevenLabs TTS via worker proxy
// Web Speech API for Arabic speech recognition

;(function() {
'use strict';

const HNH = window.HNH || {};
const BASMA_API = 'https://hnh-portal.brainsait-fadil.workers.dev';

/**
 * Basma Voice Agent — Complete state machine + voice interaction
 * 
 * States: disconnected → connecting → connected → listening → thinking → talking → disconnected
 * Full bilingual AR/EN support, Web Speech API, ElevenLabs TTS via worker proxy
 */
class BasmaAgent {
  constructor(options = {}) {
    this.lang = options.lang || document.documentElement.lang || 'ar';
    this.sessionId = 'b_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
    this.stream = null;
    this.audioContext = null;
    this.analyser = null;
    this.audioData = null;
    this.animFrameId = null;
    this.speechRec = null;
    this.isListening = false;
    this.audioQueue = [];
    this.currentAudio = null;
    this.audioCtxCreated = false;
    this.stateCallbacks = [];
    this.transcriptCallbacks = [];
    this.replyCallbacks = [];
    this.volumeCallbacks = [];
    this.autoReconnect = false;
    this.audioElement = null;
    this.audioBlobUrl = null;
    this.requestId = 0;
    
    // === State Machine ===
    this._state = 'disconnected';
    this._prevState = null;
    
    // ElevenLabs pattern: getInputVolume, getOutputVolume callbacks
    this.getInputVolume = () => {
      if ((this._state === "listening" || this._state === "connected") && this.analyser) {
        const data = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b) / data.length;
        return Math.min(1.0, Math.pow(avg / 255, 0.5) * 2.5);
      }
      return 0;
    };
    
    this.getOutputVolume = () => {
      if ((this._state === 'talking' || this._state === 'thinking') && this.analyser) {
        // Simulate output volume from audio element if playing
        if (this.audioElement && !this.audioElement.paused) {
          const gain = this.audioElement.volume || 0.5;
          return Math.min(1.0, 0.3 + gain * 0.5 + Math.sin(performance.now() * 0.003) * 0.15);
        }
        return 0.3 + Math.sin(performance.now() * 0.002) * 0.1;
      }
      return 0;
    };
    
    // Set state with callbacks
    this._setState('disconnected');
  }
  
  get state() { return this._state; }
  
  _setState(newState) {
    if (this._state === newState) return;
    this._prevState = this._state;
    this._state = newState;
    // Start/stop volume loop based on state
    if (newState === 'disconnected' || newState === 'error') {
      this._stopVolumeLoop();
    }
    this.stateCallbacks.forEach(cb => {
      try { cb(newState, this._prevState); } catch(e) {}
    });
  }
  
  onStateChange(cb) {
    if (typeof cb === 'function') this.stateCallbacks.push(cb);
    return () => {
      this.stateCallbacks = this.stateCallbacks.filter(c => c !== cb);
    };
  }
  
  onTranscript(cb) {
    if (typeof cb === 'function') this.transcriptCallbacks.push(cb);
    return () => {
      this.transcriptCallbacks = this.transcriptCallbacks.filter(c => c !== cb);
    };
  }
  
  onReply(cb) {
    if (typeof cb === 'function') this.replyCallbacks.push(cb);
    return () => {
      this.replyCallbacks = this.replyCallbacks.filter(c => c !== cb);
    };
  }
  
  onVolume(cb) {
    if (typeof cb === 'function') this.volumeCallbacks.push(cb);
    return () => {
      this.volumeCallbacks = this.volumeCallbacks.filter(c => c !== cb);
    };
  }
  
  isConnected() {
    return this._state !== 'disconnected' && this._state !== 'error';
  }
  
  // === Connect to AI Agent ===
  async connect() {
    if (this._state === 'connecting' || this._state === 'connected') return;
    
    this._setState('connecting');
    
    // Send greeting
    const greeting = this.lang === 'ar' 
      ? 'السلام عليكم ورحمة الله وبركاته'
      : 'As-salamu alaykum. Welcome to Hayat National Hospitals.';
    
    this.replyCallbacks.forEach(cb => {
      try { cb(greeting, 'system'); } catch(e) {}
    });
    
    this._setState('connected');
    this._startVolumeLoop();
    return true;
  }
  
  disconnect() {
    this.stopListening();
    this.stopAudio();
    this._setState('disconnected');
    return true;
  }
  
  // === Send Text Message ===
  async sendText(text) {
    if (!text || !text.trim()) return;
    
    this._setState('thinking');
    
    this.transcriptCallbacks.forEach(cb => {
      try { cb(text, 'user'); } catch(e) {}
    });
    
    try {
      const res = await fetch(`${BASMA_API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          session_id: this.sessionId,
          language: this.lang,
        }),
      });
      
      const data = await res.json();
      const reply = data.response || '';
      
      if (reply) {
        this.replyCallbacks.forEach(cb => {
          try { cb(reply, 'assistant'); } catch(e) {}
        });
        
        // Auto TTS after text reply
        if (this._state === 'thinking' || this._state === 'connected') {
          this._setState('talking');
          await this.speak(reply);
          this._setState('connected');
    this._startVolumeLoop();
        }
      }
    } catch (e) {
      console.error('Basma: Chat error:', e);
      const fallback = this.lang === 'ar'
        ? 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.'
        : 'Sorry, connection error. Please try again.';
      this.replyCallbacks.forEach(cb => {
        try { cb(fallback, 'assistant'); } catch(e) {}
      });
    }
    
    if (this._state === 'thinking') {
      this._setState('connected');
    this._startVolumeLoop();
    }
  }
  
  // === Voice Input (Web Speech API) ===
  async startListening() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Basma: Speech recognition not supported');
      return false;
    }
    
    try {
      await this._ensureMicStream();
    } catch (e) {
      console.error('Basma: Mic access denied:', e);
      return false;
    }
    
    if (this.isListening) return true;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.speechRec = new SpeechRecognition();
    this.speechRec.lang = this.lang === 'ar' ? 'ar-SA' : 'en-US';
    this.speechRec.continuous = true;
    this.speechRec.interimResults = true;
    this.speechRec.maxAlternatives = 1;
    
    let finalTranscript = '';
    
    this.speechRec.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript.trim()) {
        const text = finalTranscript.trim();
        finalTranscript = '';
        this._setState('thinking');
        this.sendText(text);
      }
    };
    
    this.speechRec.onerror = (event) => {
      console.error('Basma: Speech error:', event.error);
      if (event.error === 'no-speech') return;
      this.isListening = false;
      this._setState('connected');
    this._startVolumeLoop();
    };
    
    this.speechRec.onend = () => {
      this.isListening = false;
      if (this._state === 'listening') {
        this._setState('connected');
    this._startVolumeLoop();
      }
      // Auto-restart if still in listening mode
      if (this._state === 'connected' && this._autoRestartListening) {
        setTimeout(() => this.startListening(), 100);
      }
    };
    
    try {
      this.speechRec.start();
      this.isListening = true;
      this._autoRestartListening = true;
      this._setState('listening');
      return true;
    } catch (e) {
      console.error('Basma: Speech start error:', e);
      return false;
    }
  }
  
  stopListening() {
    this._autoRestartListening = false;
    if (this.speechRec) {
      try { this.speechRec.stop(); } catch(e) {}
      this.speechRec = null;
    }
    this.isListening = false;
    if (this._state === 'listening') {
      this._setState('connected');
    this._startVolumeLoop();
    }
  }
  
  // === TTS Voice Output via Worker Proxy ===
  async speak(text) {
    if (!text) return;
    
    this._setState('talking');
    
    try {
      const res = await fetch(`${BASMA_API}/api/voice/speak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          lang: this.lang,
        }),
      });
      
      if (!res.ok) throw new Error('TTS failed: ' + res.status);
      
      const blob = await res.blob();
      if (this.audioBlobUrl) URL.revokeObjectURL(this.audioBlobUrl);
      this.audioBlobUrl = URL.createObjectURL(blob);
      
      await new Promise((resolve, reject) => {
        const audio = new Audio(this.audioBlobUrl);
        this.audioElement = audio;
        audio.volume = 0.85;
        
        audio.onended = () => {
          this.audioElement = null;
          resolve();
        };
        audio.onerror = () => {
          this.audioElement = null;
          reject(new Error('Audio playback error'));
        };
        audio.play().catch(reject);
      });
    } catch (e) {
      console.error('Basma: TTS error:', e);
    }
    
    if (this._state === 'talking') {
      this._setState('connected');
    this._startVolumeLoop();
    }
  }
  
  stopAudio() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }
  }
  
  // === Microphone Stream ===
  _startVolumeLoop() {
    if (this._volLoopId) return;
    const loop = () => {
      this._fireVolume();
      this._volLoopId = setTimeout(loop, 100);
    };
    loop();
  }

  _stopVolumeLoop() {
    if (this._volLoopId) {
      clearTimeout(this._volLoopId);
      this._volLoopId = null;
    }
  }

  async _ensureMicStream() {
    if (this.stream) return this.stream;
    
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    // Set up analyser for volume visualization
    if (!this.audioCtxCreated) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;
      
      const source = this.audioContext.createMediaStreamSource(this.stream);
      source.connect(this.analyser);
      this.audioCtxCreated = true;
    }
    
    return this.stream;
  }
  
  // === Cleanup ===
  destroy() {
    this.disconnect();
    this.stateCallbacks = [];
    this.transcriptCallbacks = [];
    this.replyCallbacks = [];
    this.volumeCallbacks = [];
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    if (this.audioBlobUrl) URL.revokeObjectURL(this.audioBlobUrl);
  }
}

// Expose globally
HNH.BasmaAgent = BasmaAgent;
HNH.createAgent = function(options) {
  return new BasmaAgent(options);
};

})();
