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
      {/* FAB trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white shadow-2xl transition-all hover:scale-105 hover:shadow-[0_8px_32px_rgba(37,99,235,0.4)] active:scale-95 md:bottom-6"
        style={{
          background: 'linear-gradient(140deg, #1d4ed8 0%, #0ea5e9 100%)',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 8px 28px rgba(37,99,235,0.35)',
        }}
        title="بسمة المساعد الذكي | Basma AI Assistant"
        aria-label="Open Basma AI Assistant"
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div
          className="fixed bottom-36 left-4 z-50 flex flex-col overflow-hidden rounded-3xl border shadow-2xl animate-slide-up md:bottom-8 md:left-6"
          style={{
            width: 'min(calc(100vw - 2rem), 26rem)',
            height: 'min(calc(100dvh - 9rem), 34rem)',
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: '0 32px 80px rgba(11, 17, 32, 0.28), 0 8px 20px rgba(11, 17, 32, 0.14)',
          }}
          dir="rtl"
          role="dialog"
          aria-label="Basma AI Assistant"
        >
          {/* Header */}
          <div
            className="relative overflow-hidden flex-shrink-0 px-4 py-3.5 text-white"
            style={{ background: 'linear-gradient(140deg, #050d1f 0%, #1d4ed8 60%, #0ea5e9 100%)' }}
          >
            <div className="subtle-grid opacity-20" />
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-xl shadow-inner flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.18)' }}
                >
                  🤖
                </div>
                <div>
                  <div className="font-bold text-sm leading-tight">بسمة · Basma AI</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="live-dot" style={{ width: 6, height: 6 }} />
                    <span className="text-[11px] text-white/70">Hayat National Hospitals · BrainSAIT</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setVoiceMode(v => !v)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-sm transition-all hover:bg-white/10"
                  style={voiceMode
                    ? { background: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.28)' }
                    : { border: '1px solid rgba(255,255,255,0.14)' }}
                  title={voiceMode ? 'تعطيل الصوت' : 'تفعيل الصوت'}
                >
                  {voiceMode ? '🔊' : '🔇'}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                  style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div
            className="flex-shrink-0 px-4 py-2.5 border-b"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-muted)' }}
          >
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: '📅 حجز موعد',  en: 'book appointment P001 cardiology' },
                { label: '🔬 فحص صحي',   en: 'health screening P001' },
                { label: '💳 مطالبة',     en: 'adjudicate claim CLM-001' },
                { label: '💊 وصفة',       en: 'prescription P001' },
              ].map(chip => (
                <button
                  key={chip.en}
                  onClick={() => setInput(chip.en)}
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all hover:-translate-y-px"
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--primary)' }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ backgroundColor: 'var(--surface)' }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex animate-fade-in ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
                style={{ animationDelay: `${i * 20}ms` }}
              >
                <div
                  className="group relative max-w-[88%] text-sm leading-relaxed"
                  style={{
                    padding: '0.65rem 0.875rem',
                    borderRadius: msg.role === 'user' ? '1.25rem 1.25rem 0.35rem 1.25rem' : '1.25rem 1.25rem 1.25rem 0.35rem',
                    ...(msg.role === 'user'
                      ? { backgroundColor: 'var(--surface-strong)', color: 'var(--text)', border: '1px solid var(--border)' }
                      : { background: 'linear-gradient(135deg, color-mix(in srgb, var(--primary) 10%, var(--surface)), var(--surface-muted))', color: 'var(--text)', border: '1px solid color-mix(in srgb, var(--primary) 15%, var(--border))' }
                    ),
                  }}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {msg.workflowResult && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-[11px] font-semibold" style={{ color: 'var(--primary)' }}>
                        ⚙️ Workflow result
                      </summary>
                      <pre className="mt-2 max-h-28 overflow-x-auto rounded-xl p-2 text-[10px]" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-tertiary)' }}>
                        {JSON.stringify(msg.workflowResult, null, 2).slice(0, 600)}
                      </pre>
                    </details>
                  )}

                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => handleSpeak(msg.content)}
                      disabled={speaking}
                      className="absolute -bottom-2.5 -left-2 flex h-7 w-7 items-center justify-center rounded-full text-[11px] opacity-0 transition-all group-hover:opacity-100 disabled:opacity-30 hover:scale-105"
                      style={{ backgroundColor: 'var(--surface)', color: 'var(--primary)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}
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
                <div
                  className="flex items-center gap-1.5 px-4 py-3 text-sm"
                  style={{ borderRadius: '1.25rem 1.25rem 1.25rem 0.35rem', backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}
                >
                  {[0, 150, 300].map(d => (
                    <span
                      key={d}
                      className="inline-block h-2 w-2 rounded-full animate-bounce"
                      style={{ backgroundColor: 'var(--primary)', animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {speaking && (
              <p className="text-center text-[11px] font-semibold animate-pulse" style={{ color: 'var(--primary)' }}>
                🔊 بسمة تتحدث…
              </p>
            )}
            <div ref={endRef} />
          </div>

          {/* Input bar */}
          <div
            className="flex-shrink-0 p-3 border-t"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-muted)' }}
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && void handleSend()}
                placeholder="اسأل بسمة… | Ask Basma…"
                className="input-field flex-1 text-sm"
                dir="auto"
                disabled={loading}
              />
              <button
                onClick={() => void handleSend()}
                disabled={loading || !input.trim()}
                className="btn-primary flex-shrink-0 px-4 py-2 text-sm disabled:opacity-40"
                style={{ minHeight: '40px', borderRadius: '0.875rem', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}
                aria-label="Send"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
