import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/data/site'
import Button from './Button'
import Picture from './Picture'

/**
 * Journey line: India -> Makkah / Madinah. Deliberately NOT a traced outline of India:
 * map borders are legally sensitive in India, so use an official map SVG if one is wanted later.
 */
export default function AllIndia() {
  return (
    <section className="section pattern-dark on-dark overflow-hidden text-white">
      <div className="container grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div data-reveal>
          <p className="eyebrow mb-3">Based in Pune. Trusted by pilgrims across India.</p>
          <h2 className="text-display-md">From across India, together towards the House of Allah.</h2>
          <p className="mt-5 text-lg text-white/80">Rooted in Pune, Meezan Tours & Travels welcomes pilgrims from every part of India. Wherever your journey begins, our commitment remains the same: thoughtful arrangements, personal attention and support throughout your sacred pilgrimage.</p>
          <p className="mt-4 text-white/70">One journey. One group. One commitment to every Haji.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappLink('Assalamu Alaikum, I am enquiring from outside Pune about Hajj / Umrah packages.')} variant="gold"><MessageCircle className="h-5 w-5" aria-hidden="true" />Enquire from your city</Button>
            <Button to="/contact" variant="ghost-light">Contact our Pune office</Button>
          </div>
        </div>
        <div data-reveal className="grid gap-4">
          <svg viewBox="0 0 800 330" role="img" aria-label="A journey line from India, through Mumbai, to Makkah and Madinah" className="w-full">
            <defs><pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="#d9b96a" fillOpacity=".22" /></pattern></defs>
            <rect x="0" y="0" width="330" height="330" rx="24" fill="url(#dots)" />
            <rect x="490" y="40" width="310" height="250" rx="24" fill="url(#dots)" />
            <path d="M175 190 C 320 20, 520 20, 650 110" fill="none" stroke="#d9b96a" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
            <path d="M175 190 C 330 300, 520 300, 660 215" fill="none" stroke="#d9b96a" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
            {[[70, 120, 'Your city'], [110, 255, 'Your city']].map(([x, y, l]) => (
              <g key={String(x)}><circle cx={x as number} cy={y as number} r="6" fill="none" stroke="#fbf8f0" strokeOpacity=".6" /><text x={(x as number) + 14} y={(y as number) + 5} fill="#fbf8f0" fillOpacity=".7" fontSize="15">{l}</text></g>
            ))}
            <g><circle cx="175" cy="190" r="9" fill="#d9b96a" /><circle cx="175" cy="190" r="18" fill="none" stroke="#d9b96a" strokeOpacity=".5" /><text x="120" y="228" fill="#fbf8f0" fontSize="17" fontWeight="600">Mumbai</text><text x="120" y="248" fill="#d9b96a" fontSize="13">Airport departure</text></g>
            <g><circle cx="650" cy="110" r="9" fill="#d9b96a" /><text x="560" y="90" fill="#fbf8f0" fontSize="17" fontWeight="600">Madinah</text></g>
            <g><circle cx="660" cy="215" r="9" fill="#d9b96a" /><text x="570" y="250" fill="#fbf8f0" fontSize="17" fontWeight="600">Makkah</text></g>
          </svg>
          <Picture slug="group-plateau" alt="A large group of Meezan pilgrims posing together near a rocky mountain" ratio="16/9" sizes="(min-width:1024px) 50vw, 100vw" className="rounded-xl2 border border-gold-500/40" />
        </div>
      </div>
    </section>
  )
}
