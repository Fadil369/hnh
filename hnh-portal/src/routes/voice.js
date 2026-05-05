/**
 * Voice Routes — ElevenLabs TTS proxy for Basma Voice Agent
 * POST /api/voice/speak — Text-to-Speech via ElevenLabs → returns audio blob
 * GET /api/voice/voices — list available Arabic/English voices
 * POST /api/voice/chat — Combined AI chat + TTS (voice-first)
 *
 * Designed to work with the ElevenLabs UI pattern
 */

const CONFIG = {
  ELEVENLABS_BASE_URL: 'https://api.elevenlabs.io/v1',
  ELEVENLABS_MODEL: 'eleven_multilingual_v2',
  ELEVENLABS_TURBO_MODEL: 'eleven_turbo_v2_5',
  VOICE_STABILITY: 0.40,
  VOICE_SIMILARITY: 0.80,
  VOICE_STYLE: 0.25,
  VOICE_SPEAKER_BOOST: true,
  // Arabic voices — Gulf Arabic
  ARABIC_VOICES: [
    { id: 'KxMRrXEjbJ6kZ93yT3fq', name: 'Salma', style: 'Young, calm Gulf Arabic', lang: 'ar' },
    { id: 'cdxrkuYK4nZwDSkjw5sa', name: 'Amira', style: 'Poised, graceful Gulf Arabic', lang: 'ar' },
    { id: '3GgICclK01zog9nyLmX1', name: 'Hanan', style: 'Polished, commanding', lang: 'ar' },
    { id: 'LEqoCOGNjyExRiRUZhkv', name: 'Latifa', style: 'Bright, welcoming', lang: 'ar' },
    { id: 'isQLuoVuANx6FjDxyasX', name: 'Noura', style: 'Soft, polished', lang: 'ar' },
    { id: 'R6nda3uM038xEEKi7GFl', name: 'Anas', style: 'Gentle male voice', lang: 'ar' },
  ],
  ENGLISH_VOICES: [
    { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', style: 'Mature professional American', lang: 'en' },
    { id: 'cjVigY5qzO86Huf0OWal', name: 'Eric', style: 'Smooth trustworthy', lang: 'en' },
  ],
  DEFAULT_ARABIC: 'KxMRrXEjbJ6kZ93yT3fq',  // Salma
  DEFAULT_ENGLISH: 'EXAVITQu4vr4xnSDxMaL',  // Sarah
};

function getVoiceForLang(lang) {
  const isAr = lang === 'ar' || /[\u0600-\u06FF]/.test(lang);
  if (isAr) return CONFIG.DEFAULT_ARABIC;
  return CONFIG.DEFAULT_ENGLISH;
}

function getModelForLang(lang) {
  const isAr = lang === 'ar' || /[\u0600-\u06FF]/.test(lang);
  return isAr ? CONFIG.ELEVENLABS_MODEL : CONFIG.ELEVENLABS_TURBO_MODEL;
}

/**
 * POST /api/voice/speak — TTS via ElevenLabs
 * Returns audio/mpeg stream
 */
export async function handleVoiceSpeak(request, env) {
  try {
    const apiKey = env.ELEVENLABS_API_KEY || '';
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Voice API not configured' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://hnh.brainsait.org' },
      });
    }

    const body = await request.json();
    const text = body.message || body.text || '';
    const lang = body.lang || (/[\u0600-\u06FF]/.test(text) ? 'ar' : 'en');
    const voiceId = body.voice_id || getVoiceForLang(lang);

    if (!text) {
      return new Response(JSON.stringify({ error: 'Text is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://hnh.brainsait.org' },
      });
    }

    const modelId = getModelForLang(lang);

    // Truncate for TTS — keep first 400 chars (about 50 seconds of speech)
    const ttsText = text.length > 400 ? text.substring(0, text.lastIndexOf(' ', 400)) : text;

    const ttsRes = await fetch(
      `${CONFIG.ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}/stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: ttsText,
          model_id: modelId,
          voice_settings: {
            stability: CONFIG.VOICE_STABILITY,
            similarity_boost: CONFIG.VOICE_SIMILARITY,
            style: CONFIG.VOICE_STYLE,
            use_speaker_boost: CONFIG.VOICE_SPEAKER_BOOST,
          },
        }),
      }
    );

    if (!ttsRes.ok) {
      const errText = await ttsRes.text().catch(() => 'Unknown');
      return new Response(JSON.stringify({ error: `TTS failed: ${ttsRes.status}`, detail: errText }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://hnh.brainsait.org' },
      });
    }

    // Stream audio back
    const audioBlob = await ttsRes.blob();
    return new Response(audioBlob, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=600',
        'Access-Control-Allow-Origin': 'https://hnh.brainsait.org',
        'Access-Control-Expose-Headers': 'X-Audio-Length, X-Voice',
        'X-Audio-Length': audioBlob.size.toString(),
        'X-Voice': voiceId,
        'X-Lang': lang,
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://hnh.brainsait.org' },
    });
  }
}

/**
 * POST /api/voice/chat — Combined AI chat + TTS (voice-first pattern)
 * Like voice-chat-01 in ElevenLabs UI: returns text + audio in one call
 */
export async function handleVoiceChat(request, env) {
  try {
    const body = await request.json();
    const text = body.message || body.text || '';
    const lang = body.lang || (/[\u0600-\u06FF]/.test(text) ? 'ar' : 'en');
    const sessionId = body.sessionId || 'voice_' + Date.now().toString(36);

    if (!text) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://hnh.brainsait.org' },
      });
    }

    // === Get AI Response ===
    let reply = '';
    try {
      // Import AI chat handler
      const { handleChat } = await import('../ai/chat.js');
      const chatRes = await handleChat(new Request('http://internal/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: text, session_id: sessionId, language: lang }),
      }), env);
      const chatData = await chatRes.json();
      reply = chatData.response || '';
    } catch (e) {
      console.error('Voice chat AI error:', e);
      reply = lang === 'ar'
        ? 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.'
        : 'Sorry, there was an error processing your request. Please try again.';
    }

    // === Generate audio ===
    const apiKey = env.ELEVENLABS_API_KEY || '';
    let audioBase64 = null;
    let voiceId = null;

    if (apiKey && reply) {
      voiceId = getVoiceForLang(lang);
      const modelId = getModelForLang(lang);
      const ttsText = reply.length > 400 ? reply.substring(0, reply.lastIndexOf(' ', 400)) : reply;

      try {
        const ttsRes = await fetch(
          `${CONFIG.ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}/stream`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'xi-api-key': apiKey },
            body: JSON.stringify({
              text: ttsText,
              model_id: modelId,
              voice_settings: {
                stability: CONFIG.VOICE_STABILITY,
                similarity_boost: CONFIG.VOICE_SIMILARITY,
                style: CONFIG.VOICE_STYLE,
                use_speaker_boost: CONFIG.VOICE_SPEAKER_BOOST,
              },
            }),
          }
        );

        if (ttsRes.ok) {
          const audioBuf = await ttsRes.arrayBuffer();
          const uint8 = new Uint8Array(audioBuf);
          let binary = '';
          for (let i = 0; i < uint8.length; i++) {
            binary += String.fromCharCode(uint8[i]);
          }
          audioBase64 = btoa(binary);
        }
      } catch (ttsErr) {
        console.error('TTS failed:', ttsErr?.message?.slice(0, 100));
      }
    }

    // Save to DB (async, don't block response)
    try {
      if (env.DB) {
        env.DB.prepare(
          'INSERT INTO chat_history (session_id, role, content) VALUES (?, ?, ?), (?, ?, ?)'
        ).bind(sessionId, 'user', text, sessionId, 'assistant', reply).run().catch(() => {});
      }
    } catch (e) {}

    return new Response(JSON.stringify({
      success: true,
      response: reply,
      session_id: sessionId,
      audio: audioBase64,
      voice_id: voiceId,
      lang: lang,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://hnh.brainsait.org',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://hnh.brainsait.org' },
    });
  }
}

/**
 * GET /api/voice/voices — list available voices
 */
export async function handleVoiceVoices() {
  const response = JSON.stringify({
    arabic: CONFIG.ARABIC_VOICES,
    english: CONFIG.ENGLISH_VOICES,
    default_arabic: CONFIG.DEFAULT_ARABIC,
    default_english: CONFIG.DEFAULT_ENGLISH,
  });

  return new Response(response, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': 'https://hnh.brainsait.org',
    },
  });
}

/**
 * OPTIONS handler for CORS
 */
export function handleVoiceOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': 'https://hnh.brainsait.org',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, xi-api-key',
      'Access-Control-Max-Age': '86400',
    },
  });
}
