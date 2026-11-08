import type { ReactNode } from 'react'
import Ornament from './Ornament'
interface Props {
  eyebrow?: string
  title: string
  intro?: ReactNode
  center?: boolean
  as?: 'h1' | 'h2'
  /** Strong, bold section label (the small heading above the title). Used only for "Why Meezan", "Gallery" and "What we arrange for you". The big title below it keeps its normal weight. */
  bold?: boolean
}
export default function SectionHeading({ eyebrow, title, intro, center, as: Tag = 'h2', bold }: Props) {
  return (
    <div data-reveal className={`mb-10 max-w-2xl sm:mb-14 ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`eyebrow ${bold ? 'eyebrow-strong' : ''} mb-3 ${center ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <Tag className="text-display-md">{title}</Tag>
      {center && <Ornament className="mt-4" />}
      {intro && <p className="mt-4 text-lg text-ink-500">{intro}</p>}
    </div>
  )
}
