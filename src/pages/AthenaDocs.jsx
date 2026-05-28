import { useState } from 'react'
import { FileText, Lock } from 'lucide-react'

const PASS = 'athena2026'

const docs = [
  { name: 'Athena One Pager', href: '/dp3v8n1/athena-one-pager.pdf' },
]

export default function AthenaDocs() {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === PASS) {
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col items-center gap-6"
        >
          <div className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
            <Lock size={18} className="text-white/40" />
          </div>
          <p className="text-white/50 text-sm tracking-wide">Enter access key</p>
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false) }}
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.10] rounded text-white text-sm focus:outline-none focus:border-white/25 transition-colors"
            placeholder="Access key"
            autoFocus
          />
          {error && (
            <p className="text-red-400/80 text-xs -mt-3">Incorrect key</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-white/[0.07] border border-white/[0.12] rounded text-white/80 text-sm font-medium hover:bg-white/[0.11] hover:border-white/20 transition-all"
          >
            Continue
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-6">
      <div className="w-full max-w-md flex flex-col gap-4">
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase text-center mb-4">
          Documents
        </p>
        {docs.map((doc) => (
          <a
            key={doc.href}
            href={doc.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded hover:bg-white/[0.06] hover:border-white/[0.15] transition-all group"
          >
            <FileText size={18} className="text-white/30 group-hover:text-white/50 transition-colors" />
            <span className="text-white/70 text-sm font-medium group-hover:text-white/90 transition-colors">
              {doc.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
