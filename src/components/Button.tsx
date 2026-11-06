import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'accent' | 'outline' | 'light' | 'ghost-light' | 'whatsapp' | 'gold'

interface Props {
  children: ReactNode
  variant?: Variant
  /** Internal route */
  to?: string
  /** External / tel: / mailto: link */
  href?: string
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export default function Button({ children, variant = 'primary', to, href, className = '', onClick, type = 'button' }: Props) {
  const cls = `btn btn-${variant} ${className}`
  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href) {
    const external = href.startsWith('http')
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    )
  }
  return <button type={type} onClick={onClick} className={cls}>{children}</button>
}
