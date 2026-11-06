import { Send } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getPackages } from '@/services/content'
import { whatsappLink } from '@/data/site'

const interests = ['Hajj packages', 'Umrah packages', 'Both Hajj & Umrah', 'Custom package', 'General consultation']

/**
 * No backend yet: submitting opens WhatsApp with the enquiry pre-filled.
 * Replace onSubmit with a POST to your API (e.g. a Cloudflare Worker + Supabase) later.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [params] = useSearchParams()
  const [message, setMessage] = useState('')
  const [interest, setInterest] = useState('')
  const pkgId = params.get('package')
  useEffect(() => {
    const pkg = pkgId ? getPackages().find((p) => p.id === pkgId) : undefined
    if (!pkg) return
    setMessage(`I would like to book the "${pkg.name}" package${pkg.dates ? ` (${pkg.dates})` : ''}.`)
    setInterest(pkg.kind === 'hajj' ? 'Hajj packages' : 'Umrah packages')
  }, [pkgId])
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const text = `Assalamu Alaikum, I am ${f.get('name')}.\nPhone: ${f.get('phone')}\nInterested in: ${f.get('interest')}\n${f.get('message') || ''}`.trim()
    window.open(whatsappLink(text), '_blank', 'noopener')
    setSent(true)
  }
  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink-900">Full name *</label>
        <input id="name" name="name" required autoComplete="name" className="input" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-ink-900">Phone *</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className="input" />
        </div>
        <div>
          <label htmlFor="interest" className="mb-1.5 block text-sm font-semibold text-ink-900">I am interested in *</label>
          <select id="interest" name="interest" required value={interest} onChange={(e) => setInterest(e.target.value)} className="input">
            <option value="" disabled>Select</option>
            {interests.map((i) => <option key={i}>{i}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink-900">Your requirements</label>
        <textarea id="message" name="message" rows={4} maxLength={1000} value={message} onChange={(e) => setMessage(e.target.value)} className="input" placeholder="Preferred dates, number of travellers, hotel preference..." />
      </div>
      <button type="submit" className="btn btn-primary w-full sm:w-auto"><Send className="h-4 w-4" aria-hidden="true" />Send enquiry via WhatsApp</button>
      <p role="status" className="text-sm text-ink-500">{sent ? 'WhatsApp should have opened with your enquiry. If not, please call us.' : 'Your enquiry opens in WhatsApp so our team can reply quickly.'}</p>
    </form>
  )
}
