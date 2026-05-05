'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  workflowResult?: Record<string, unknown>
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://hnh.brainsait.org'
const BSMA_BASE = process.env.NEXT_PUBLIC_BSMA_API || process.env.BSMA_API || 'https://bsma.elfadil.com'

// ─── Intent → Workflow mapping ────────────────────────────────────────────────
interface WorkflowIntent {
  endpoint: string
  buildPayload: (msg: string) => Record<string, unknown>
  summaryKey: string
}

const INTENT_MAP: { patterns: RegExp[]; intent: WorkflowIntent }[] = [
  {
    // Book appointment / موعد / حجز
    patterns: [
      /\b(موعد|حجز|appointment|book|schedule|visit)\b/i,
    ],
    intent: {
      endpoint: '/api/workflows/patient/book-visit',
      buildPayload: (msg) => {
        const patientMatch = msg.match(/\b(P\d+|patient[- _]?(\w+))\b/i)
        const specMatch = msg.match(/\b(cardio|neuro|ortho|general|pediatric|طب|قلب|جراح|نساء|أطفال)\w*/i)
        return {
          patient_id: patientMatch?.[0] || 'P001',
          specialty: specMatch?.[0] || 'general',
          preferred_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        }
      },
      summaryKey: 'confirmation',
    },
  },
  {
    // Health screening / فحص / screening
    patterns: [/\b(فحص|screening|health check|تقييم صحي|risk)\b/i],
    intent: {
      endpoint: '/api/workflows/patient/health-screening',
      buildPayload: (msg) => {
        const patientMatch = msg.match(/\b(P\d+)\b/i)
        return { patient_id: patientMatch?.[0] || 'P001' }
      },
      summaryKey: 'risk_summary',
    },
  },
  {
    // Post-visit / discharge / ملخص / خروج
    patterns: [/\b(ملخص|خروج|discharge|post.?visit|summary)\b/i],
    intent: {
      endpoint: '/api/workflows/patient/post-visit',
      buildPayload: (msg) => {
        const pMatch = msg.match(/\b(P\d+)\b/i)
        const aMatch = msg.match(/\b(APT[-_ ]?\w+)\b/i)
        return { patient_id: pMatch?.[0] || 'P001', appointment_id: aMatch?.[0] || 'APT-001' }
      },
      summaryKey: 'discharge_summary',
    },
  },
  {
    // Claim / مطالبة / billing / adjudication
    patterns: [/\b(مطالبة|claim|billing|فاتورة|تسوية|adjudic)\b/i],
    intent: {
      endpoint: '/api/workflows/payer/adjudicate',
      buildPayload: (msg) => {
        const match = msg.match(/\b(CLM[-_ ]?\w+)\b/i)
        return { claim_id: match?.[0] || 'CLM-001' }
      },
      summaryKey: 'decision',
    },
  },
  {
    // Prior auth / موافقة / authorization
    patterns: [/\b(موافقة مسبقة|prior.?auth|authorization|اعتماد)\b/i],
    intent: {
      endpoint: '/api/workflows/payer/prior-auth',
      buildPayload: (msg) => {
        const pMatch = msg.match(/\b(P\d+)\b/i)
        return { patient_id: pMatch?.[0] || 'P001', service_code: '27447', diagnosis_code: 'M17.11', urgency: 'routine' }
      },
      summaryKey: 'status',
    },
  },
  {
    // Disease surveillance / وباء / مراقبة
    patterns: [/\b(وباء|مراقبة|surveillance|epidemic|outbreak)\b/i],
    intent: {
      endpoint: '/api/workflows/government/surveillance',
      buildPayload: (msg) => {
        const condMatch = msg.match(/\b(influenza|covid|diabetes|malaria|dengue|سكري|أنفلونزا|كورونا)\b/i)
        const regionMatch = msg.match(/\b(Riyadh|Jeddah|Dammam|Makkah|Medina|الرياض|جدة|مكة|المدينة)\b/i)
        return {
          condition: condMatch?.[0] || 'influenza',
          region: regionMatch?.[0] || 'Riyadh',
        }
      },
      summaryKey: 'alert',
    },
  },
  {
    // Prescription / وصفة / medication
    patterns: [/\b(وصفة|دواء|prescription|medication|drug)\b/i],
    intent: {
      endpoint: '/api/workflows/provider/prescription',
      buildPayload: (msg) => {
        const pMatch = msg.match(/\b(P\d+)\b/i)
        const drMatch = msg.match(/\b(DR\w+)\b/i)
        return { patient_id: pMatch?.[0] || 'P001', provider_id: drMatch?.[0] || 'DR001', diagnosis: 'J06.9' }
      },
      summaryKey: 'prescription_summary',
    },
  },
  {
    // Lab results / مختبر / نتائج
    patterns: [/\b(نتائج|مختبر|lab|results?|تحليل)\b/i],
    intent: {
      endpoint: '/api/workflows/patient/lab-results',
      buildPayload: (msg) => {
        const pMatch = msg.match(/\b(P\d+)\b/i)
        return { patient_id: pMatch?.[0] || 'P001' }
      },
      summaryKey: 'explanation',
    },
  },
]

function detectIntent(msg: string): WorkflowIntent | null {
  for (const { patterns, intent } of INTENT_MAP) {
    if (patterns.some(p => p.test(msg))) return intent
  }
  return null
}

/** Speak text — tries /api/voice/speak (ElevenLabs) first, falls back to Web Speech API */
async function speakText(text: string, lang: 'ar' | 'en') {
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
    // fall through
  }
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
        'مرحباً! أنا بسمة، المساعد الذكي لمستشفيات الحياة الوطنية.\n' +
        'يمكنني مساعدتك في: حجز موعد، فحص صحي، نتائج مختبر، وصفة طبية، تسوية مطالبات.\n\n' +
        "Hello! I'm Basma, HNH BrainSAIT AI assistant.\n" +
        'I can help with: appointments, health screening, lab results, prescriptions, claim adjudication.',
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

  /** Format workflow result into a readable reply */
  function formatWorkflowResult(data: Record<string, unknown>, intent: WorkflowIntent): string {
    const key = intent.summaryKey
    if (data[key]) return String(data[key])
    // Fallback: look for any summary/message/description fields
    for (const field of ['message', 'summary', 'description', 'result', 'explanation', 'decision', 'status']) {
      if (data[field]) return String(data[field])
    }
    // Try nested result
    if (data.result && typeof data.result === 'object') {
      const nested = data.result as Record<string, unknown>
      for (const field of ['message', 'summary', 'description', 'status', 'decision']) {
        if (nested[field]) return String(nested[field])
      }
    }
    return `تمت المعالجة بنجاح | Processed successfully.\n\n${JSON.stringify(data, null, 2).slice(0, 400)}`
  }

  const handleSend = useCallback(async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      // 1. Detect if this maps to a workflow
      const intent = detectIntent(userMsg)

      if (intent) {
        // Run workflow endpoint
        const payload = intent.buildPayload(userMsg)
        const wfRes = await fetch(`${API_BASE}${intent.endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const wfData = await wfRes.json()
        const reply = formatWorkflowResult(wfData, intent)
        const newMsg: Message = { role: 'assistant', content: reply, workflowResult: wfData }
        setMessages(prev => [...prev, newMsg])
        if (voiceMode) {
          setSpeaking(true)
          await speakText(reply, detectLang(reply))
          setSpeaking(false)
        }
        return
      }

      // 2. RAG context lookup
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
            ?.map((r: Record<string, unknown>) => `[${r.category}] ${r.title}\n${String(r.content || '').slice(0, 500)}`)
            .join('\n\n') || ''
      } catch {}

      // 3. Chat via worker
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

  const handleSpeak = async (text: string) => {
    setSpeaking(true)
    await speakText(text, detectLang(text))
    setSpeaking(false)
  }

  return (
    <>
      {/* Floating trigger */}
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
          className="fixed bottom-24 left-6 w-80 sm:w-96 h-[30rem] bg-white rounded-xl shadow-2xl border border-blue-100 z-50 flex flex-col"
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

          {/* Quick action chips */}
          <div className="px-3 pt-2 pb-0 flex gap-1.5 flex-wrap">
            {[
              { label: 'حجز موعد', en: 'book appointment P001 cardiology' },
              { label: 'فحص صحي', en: 'health screening P001' },
              { label: 'مطالبة', en: 'adjudicate claim CLM-001' },
            ].map(chip => (
              <button
                key={chip.en}
                onClick={() => setInput(chip.en)}
                className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2.5 py-0.5 hover:bg-blue-100 transition"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`group relative max-w-[85%] p-2.5 rounded-xl text-sm whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-50 text-blue-900 border border-blue-100'
                      : 'bg-gray-50 text-gray-800 border border-gray-100'
                  }`}
                >
                  {msg.content}

                  {/* Workflow badge */}
                  {msg.workflowResult && (
                    <details className="mt-2">
                      <summary className="text-[10px] text-blue-400 cursor-pointer hover:text-blue-600">
                        🔧 Workflow result
                      </summary>
                      <pre className="mt-1 text-[9px] text-gray-400 bg-gray-50 p-1.5 rounded overflow-x-auto max-h-24">
                        {JSON.stringify(msg.workflowResult, null, 2).slice(0, 600)}
                      </pre>
                    </details>
                  )}

                  {/* Speak button */}
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
              <div className="text-center text-[10px] text-blue-400 animate-pulse">🔊 بسمة تتحدث...</div>
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
