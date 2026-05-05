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
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border text-2xl text-white shadow-2xl transition hover:scale-[1.03]"
        style={{
          background: 'linear-gradient(135deg, #1d4ed8, #0f172a)',
          borderColor: 'rgba(255,255,255,0.14)',
        }}
        title="بسمة المساعد الذكي | Basma AI Assistant"
        aria-label="Open Basma AI Assistant"
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div
          className="fixed bottom-24 left-6 z-50 flex h-[34rem] w-[calc(100vw-2rem)] max-w-[26rem] flex-col overflow-hidden rounded-[1.4rem] border shadow-2xl"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: '0 30px 80px rgba(15, 23, 42, 0.24)',
          }}
          dir="rtl"
          role="dialog"
          aria-label="Basma AI Assistant"
        >
          <div className="relative overflow-hidden border-b p-4 text-white" style={{ background: 'linear-gradient(135deg, #0f172a, #1d4ed8)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="subtle-grid opacity-30" />
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div>
                <div className="font-bold text-sm">بسمة | Basma AI</div>
                <div className="text-[11px] text-blue-100/80">مستشفيات الحياة الوطنية · BrainSAIT</div>
                <div className="mt-2 text-[11px] text-white/70">Appointments · Screening · Claims · Clinical support</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVoiceMode(v => !v)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    voiceMode
                      ? 'bg-white text-blue-900 border-white'
                      : 'border-blue-200/50 text-white hover:border-white hover:bg-white/10'
                  }`}
                  title={voiceMode ? 'تعطيل الصوت | Disable voice' : 'تفعيل الصوت | Enable voice'}
                >
                  {voiceMode ? '🔊 صوت' : '🔇 صامت'}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/20 px-2.5 py-1 text-xs text-white/80 hover:bg-white/10"
                  aria-label="Close Basma assistant"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <div className="border-b px-4 py-3" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-muted)' }}>
            <div className="mb-2 text-[11px] font-semibold text-muted">اقتراحات سريعة · Quick actions</div>
            <div className="flex flex-wrap gap-1.5">
            {[
              { label: 'حجز موعد', en: 'book appointment P001 cardiology' },
              { label: 'فحص صحي', en: 'health screening P001' },
              { label: 'مطالبة', en: 'adjudicate claim CLM-001' },
            ].map(chip => (
              <button
                key={chip.en}
                onClick={() => setInput(chip.en)}
                className="rounded-full border px-2.5 py-1 text-[11px] font-medium hover:-translate-y-[1px]"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--primary)' }}
              >
                {chip.label}
              </button>
            ))}
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4" style={{ backgroundColor: 'var(--surface)' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`group relative max-w-[88%] whitespace-pre-wrap rounded-2xl p-3 text-sm leading-7 ${
                    msg.role === 'user'
                      ? 'border text-[var(--text)]'
                      : 'border text-[var(--text)]'
                  }`}
                  style={msg.role === 'user'
                    ? { backgroundColor: 'var(--surface-muted)', borderColor: 'var(--border)' }
                    : { backgroundColor: 'color-mix(in srgb, var(--primary) 8%, var(--surface))', borderColor: 'var(--border)' }}
                >
                  {msg.content}

                  {msg.workflowResult && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-[11px] font-semibold" style={{ color: 'var(--primary)' }}>
                        🔧 Workflow result
                      </summary>
                      <pre className="mt-2 max-h-28 overflow-x-auto rounded-xl p-2 text-[10px]" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-secondary)' }}>
                        {JSON.stringify(msg.workflowResult, null, 2).slice(0, 600)}
                      </pre>
                    </details>
                  )}

                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => handleSpeak(msg.content)}
                      disabled={speaking}
                      className="absolute -bottom-2 -left-2 h-7 w-7 rounded-full text-[11px] opacity-0 transition group-hover:opacity-100 disabled:opacity-30"
                      style={{ backgroundColor: 'var(--surface)', color: 'var(--primary)', border: '1px solid var(--border)' }}
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
                <div className="flex items-center gap-1 rounded-2xl border p-3 text-sm" style={{ backgroundColor: 'var(--surface-muted)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            {speaking && (
              <div className="text-center text-[11px] animate-pulse" style={{ color: 'var(--primary)' }}>🔊 بسمة تتحدث...</div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t p-3" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-muted)' }}>
            <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="اسأل بسمة... | Ask Basma..."
              className="input-field flex-1 text-sm"
              dir="auto"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-40"
              style={{ backgroundColor: 'var(--primary)' }}
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
