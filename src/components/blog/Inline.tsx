import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g

/**
 * Renders the blog's inline markup (**bold**, [label](/internal) and [label](https://external))
 * as React elements. Everything else is plain text, so content can never inject HTML.
 */
export default function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN)
  return (
    <>
      {parts.map((part, i): ReactNode => {
        if (!part) return null
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
        const m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part)
        if (m) {
          const [, label, href] = m
          if (href.startsWith('/')) return <Link key={i} to={href}>{label}</Link>
          return (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer">
              {label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
