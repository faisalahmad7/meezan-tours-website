import { SITE } from '@/data/site'
import { SOCIAL_BRAND } from './BrandIcons'
/** "Follow Meezan": big app-icon tiles, each opening the real profile (or the installed app on phones). Two by two on phones. */
export default function SocialLinks() {
  const items = SITE.social.filter((s) => SOCIAL_BRAND[s.label])
  if (!items.length) return null
  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-xl2 border border-gold-500/40 bg-white px-4 py-7 text-center shadow-soft sm:px-10">
      <p className="eyebrow !flex justify-center">Our socials</p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-ink-900 sm:text-3xl">Follow Meezan, see every journey</h3>
      <ul className="mx-auto mt-6 grid max-w-xs grid-cols-2 justify-items-center gap-x-4 gap-y-7 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-5">
        {items.map((s) => {
          const { Icon, bg } = SOCIAL_BRAND[s.label]
          return (
            <li key={s.url} className="w-full sm:w-auto">
              <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Meezan on ${s.label}`} className="group flex flex-col items-center gap-2.5">
                <span className="relative flex h-24 w-24 items-center justify-center rounded-[1.6rem] text-white shadow-lift ring-2 ring-gold-400/70 ring-offset-2 ring-offset-white transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-focus-visible:-translate-y-1 sm:h-20 sm:w-20 sm:rounded-[1.35rem]" style={{ background: bg }}>
                  <Icon className="h-12 w-12 sm:h-10 sm:w-10" />
                  <span aria-hidden="true" className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/25 to-transparent" />
                </span>
                <span className="text-sm font-semibold text-ink-700 group-hover:text-brand-700">{s.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
