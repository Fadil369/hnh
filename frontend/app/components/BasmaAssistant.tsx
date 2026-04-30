'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function BasmaAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'مرحباً! أنا بسمة، المساعد الذكي لمستشفى حيات. كيف يمكنني مساعدتك؟\n\nHello! I\'m Basma, the AI assistant for Hayat Hospital. How can I help you?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      // Search RAG first
      const ragRes = await fetch(`${process.env.BSMA_API}/basma/rag/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMsg, limit: 3 }),
      })
      const ragData = await ragRes.json()
      const context = ragData?.results?.map((r: any) =>
        `[${r.category}] ${r.title}\n${r.content?.slice(0, 500)}`
      ).join('\n\n') || ''

      const chatRes = await fetch(`${process.env.BSMA_API}/basma/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          rag_context: context,
          session_id: 'hnh-portal',
          lang: /[\u0600-\u06FF]/.test(userMsg) ? 'ar' : 'en',
        }),
      })
      const chatData = await chatRes.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: chatData.reply || chatData.response || 'لم أتمكن من معالجة طلبك | Unable to process your request'
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.\n\nSorry, a connection error occurred. Please try again.'
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition z-50 flex items-center justify-center text-2xl"
        title="بسمة المساعد الذكي | Basma AI Assistant"
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="fixed bottom-24 left-6 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col" dir="rtl">
          <div className="bg-blue-900 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-bold">بسمة | Basma AI</span>
            <span className="text-xs text-blue-200">مستشفى حيات الوطني</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-end">
                <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-500">
                  بسمة تكتب... | Basma is typing...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اسأل بسمة... | Ask Basma..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
              dir="auto"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
            >
              إرسال
            </button>
          </div>
        </div>
      )}
    </>
  )
}
