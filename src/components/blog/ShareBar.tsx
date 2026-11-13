import { Check, Link2, Mail, Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FacebookIcon, WhatsAppIcon, XIcon } from '@/components/BrandIcons'
import { SITE } from '@/data/site'

/**
 * Plain share links (no third-party scripts or trackers). WhatsApp comes first because that is
 * how most pilgrims' families share. The device share sheet and "copy link" appear once the
 * page is interactive, so the server HTML and the first browser render stay identical.
 */
export default function ShareBar({ path, title, layout = 'row' }: { path: string; title: string; layout?: 'row' | 'rail' }) {
  const url = SITE.url + path
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const [ready, setReady] = useState(false)
  const [canShare, setCanShare] = useState(false)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    setReady(true)
    setCanShare(typeof navigator.share === 'function')
  }, [])

  const links = [
    { label: 'Share on WhatsApp', href: `https://wa.me/?text=${t}%20${u}`, Icon: WhatsAppIcon },
    { label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
    { label: 'Share on X', href: `https://x.com/intent/post?text=${t}&url=${u}`, Icon: XIcon },
    { label: 'Share by email', href: `mailto:?subject=${t}&body=${t}%0A${u}`, Icon: Mail },
  ]
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.prompt('Copy this link', url)
    }
  }
  const btn = 'share-btn'
  return (
    <div className={`share ${layout === 'rail' ? 'share-rail' : ''} no-print`}>
      <p className="share-label">Share this guide</p>
      <ul>
        {links.map(({ label, href, Icon }) => (
          <li key={label}>
            <a className={btn} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={label} title={label}>
              <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
            </a>
          </li>
        ))}
        {ready && (
          <li>
            <button type="button" className={btn} onClick={copy} aria-label={copied ? 'Link copied' : 'Copy link'} title="Copy link">
              {copied ? <Check className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" /> : <Link2 className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />}
            </button>
          </li>
        )}
        {canShare && (
          <li>
            <button type="button" className={btn} onClick={() => navigator.share({ title, url }).catch(() => undefined)} aria-label="More sharing options" title="More options">
              <Share2 className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
            </button>
          </li>
        )}
      </ul>
      <p className="sr-only" aria-live="polite">{copied ? 'Link copied to clipboard' : ''}</p>
    </div>
  )
}
