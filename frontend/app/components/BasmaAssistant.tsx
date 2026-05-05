'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://hnh.brainsait.org'
const BSMA_BASE = process.env.NEXT_PUBLIC_BSMA_API || process.env.BSMA_API || 'https://bsma.elfadil.com'

/** Speak text — tries /api/voice/speak (ElevenLabs) first, falls back to Web Speech API */
async function speakText(text: string, lang: 'ar' | 'en') {
  // 1. ElevenLabs via worker
  try {
    const res = await fetch(`${API_BASE}/api/voice/speak`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang }),
    })
    if (res.ok) {
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audio.onended = () => URL.revokeObjectURL(url)
      await audio.play()
      return
    }
  } catch {
    // fall through to Web Speech
  }

  // 2. Web Speech API fallback
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = lang === 'ar' ? 'ar-SA' : 'en-US'
    utter.rate = 0.92
    utter.pitch = 1
    const voices = speechSynthesis.getVoices()
    const match = voices.find(v => v.lang.startsWith(lang === 'ar' ? 'ar' : 'en'))
    if (match) utter.voice = match
    speechSynthesis.cancel()
    speechSynthesis.speak(utter)
  }
}

export default function BasmaAssistant() {
  const [open, setOpen] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'مرحباً! أنا بسمة، المساعد الذكي لمستشفيات الحياة الوطنية. كيف يمكنني مساعدتك؟\n\nHello! I\'m Basma, AI assistant for Hayat National Hospital. How can I help you?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const detectLang = (text: string): 'ar' | 'en' =>
    /[\u0600-\u06FF]/.test(text) ? 'ar' : 'en'

  const handleSend = useCallback(async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      // RAG context lookup
      let context = ''
      try {
        const ragRes = await fetch(`${BSMA_BASE}/basma/rag/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: userMsg, limit: 3 }),
        })
        const ragData = await ragRes.json()
        context =
          ragData?.results
            ?.map((r: any) => `[${r.category}] ${r.title}\n${r.content?.slice(0, 500)}`)
            .join('\n\n') || ''
      } catch {}

      // Chat
      const chatRes = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          rag_context: context,
          session_id: 'hnh-portal',
          language: detectLang(userMsg),
        }),
      })
      const chatData = await chatRes.json()
      const reply =
        chatData.reply ||
        chatData.response ||
        chatData.answer ||
        'لم أتمكن من معالجة طلبك | Unable to process your request'

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])

      // Auto-speak in voice mode
      if (voiceMode) {
        setSpeaking(true)
        await speakText(reply, detectLang(reply))
        setSpeaking(false)
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.\n\nSorry, a connection error occurred. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading, voiceMode])

  /** Speak a specific message manually */
  const handleSpeak = async (text: string) => {
    setSpeaking(true)
    await speakText(text, detectLang(text))
    setSpeaking(false)
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-blue-700 text-white rounded-full shadow-xl hover:bg-blue-800 transition z-50 flex items-center justify-center text-2xl"
        title="بسمة المساعد الذكي | Basma AI Assistant"
        aria-label="Open Basma AI Assistant"
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div
          className="fixed bottom-24 left-6 w-80 sm:w-96 h-[28rem] bg-white rounded-xl shadow-2xl border border-blue-100 z-50 flex flex-col"
          dir="rtl"
          role="dialog"
          aria-label="Basma AI Assistant"
        >
          {/* Header */}
          <div className="bg-gradient-to-l from-blue-900 to-blue-700 text-white p-3 rounded-t-xl flex justify-between items-center gap-2">
            <div>
              <div className="font-bold text-sm">بسمة | Basma AI</div>
              <div className="text-[10px] text-blue-200">مستشفيات الحياة الوطنية · BrainSAIT</div>
            </div>
            {/* Voice mode toggle */}
            <button
              onClick={() => setVoiceMode(v => !v)}
              className={`text-xs px-2 py-1 rounded-full border transition ${
                voiceMode
                  ? 'bg-white text-blue-900 border-white'
                  : 'border-blue-300 text-blue-200 hover:border-white hover:text-white'
              }`}
              title={voiceMode ? 'تعطيل الصوت | Disable voice' : 'تفعيل الصوت | Enable voice'}
            >
              {voiceMode ? '🔊 صوت' : '🔇 صامت'}
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`group relative max-w-[82%] p-2.5 rounded-xl text-sm whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-50 text-blue-900 border border-blue-100'
                      : 'bg-gray-50 text-gray-800 border border-gray-100'
                  }`}
                >
                  {msg.content}
                  {/* Speak button on assistant messages */}
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => handleSpeak(msg.content)}
                      disabled={speaking}
                      className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-[10px] opacity-0 group-hover:opacity-100 transition hover:bg-blue-200 disabled:opacity-30"
                      title="استمع | Listen"
                    >
                      🔊
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-end">
                <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl text-sm text-gray-400 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            {speaking && (
              <div className="text-center text-[10px] text-blue-400 animate-pulse">
                🔊 بسمة تتحدث...
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-2.5 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="اسأل بسمة... | Ask Basma..."
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              dir="auto"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-blue-700 text-white px-3 py-2 rounded-lg hover:bg-blue-800 disabled:opacity-40 text-sm transition"
              aria-label="Send"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  )
}
