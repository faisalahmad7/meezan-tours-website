import data from '@/content/faqs.json'
import type { Faq } from './types'

/** FAQs are edited in /admin > FAQs (stored in src/content/faqs.json). */
export const generalFaqs = data.general as Faq[]

/** Grouped questions for the /faq page. Answers are deliberately general: package-specific details are confirmed by the team. */
export interface FaqSection {
  id: string
  title: string
  blurb: string
  /** Icon key resolved in the FAQ page. */
  icon: 'hajj' | 'umrah' | 'ziyarat' | 'documents' | 'luggage' | 'zamzam' | 'kit' | 'stay' | 'health' | 'about'
  items: Faq[]
}

/** The "about" section always shows the general questions. */
export const faqSections: FaqSection[] = (data.sections as FaqSection[]).map((s) => (s.id === 'about' ? { ...s, items: generalFaqs } : s))

export const allFaqs: Faq[] = faqSections.flatMap((s) => s.items)
