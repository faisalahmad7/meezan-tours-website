import type { FaqSection } from '@/data/faqs'
import type { Faq } from '@/data/types'
import { Area, Errors, ListEditor, PageHeader, Panel, SaveBar, Select, Spinner, Text, slugifyText, useUnsavedWarning } from '../ui'
import { useDoc } from '../useDoc'

const ICONS: FaqSection['icon'][] = ['hajj', 'umrah', 'ziyarat', 'documents', 'luggage', 'zamzam', 'kit', 'stay', 'health', 'about']

function QA({ items, onChange }: { items: Faq[]; onChange: (f: Faq[]) => void }) {
  return (
    <ListEditor<Faq> items={items} onChange={onChange} max={40} addLabel="Add question" create={() => ({ q: '', a: '' })} itemTitle={(f) => f.q || 'New question'} render={(f, up) => (
      <>
        <Text label="Question" value={f.q} onChange={(v) => up({ q: v })} max={300} />
        <Area label="Answer" value={f.a} onChange={(v) => up({ a: v })} rows={4} max={3000} />
      </>
    )} />
  )
}

export default function Faqs() {
  const d = useDoc<{ general: Faq[]; sections: FaqSection[] }>('faqs')
  useUnsavedWarning(d.dirty)
  if (d.loadError) return <Errors title="Could not load" errors={[d.loadError]} />
  if (!d.data) return <Spinner />
  const data = d.data
  return (
    <>
      <PageHeader title="FAQs" intro="Questions on the /faq page, grouped by topic. Keep answers general where details depend on the package." />
      <div className="mb-6"><Errors errors={d.errors} onClose={() => d.setErrors([])} /></div>
      <div className="space-y-6">
        <Panel title="General questions" intro="Shown in the 'About Meezan' topic on /faq, and also on the home page.">
          <QA items={data.general} onChange={(general) => d.setData({ ...data, general })} />
        </Panel>
        <Panel title="Topics" intro="Each topic is a section of the FAQ page. The 'about' topic always shows the general questions above.">
          <ListEditor<FaqSection> items={data.sections} onChange={(sections) => d.setData({ ...data, sections })} max={20} addLabel="Add topic"
            create={() => ({ id: `topic-${Date.now().toString(36)}`, title: '', blurb: '', icon: 'umrah', items: [] })}
            itemTitle={(s) => <>{s.title || 'New topic'} <span className="font-normal text-ink-500">· {s.id === 'about' ? 'general questions' : `${s.items.length} questions`}</span></>}
            render={(s, up) => (
              <>
                <div className="grid gap-4 sm:grid-cols-[1fr_12rem]">
                  <Text label="Topic name" value={s.title} onChange={(v) => up({ title: v })} max={60} />
                  <Select<FaqSection['icon']> label="Icon" value={s.icon} onChange={(v) => up({ icon: v })} options={ICONS.map((i) => ({ value: i, label: i }))} />
                </div>
                <Text label="Short description" value={s.blurb} onChange={(v) => up({ blurb: v })} max={160} />
                <Text label="Anchor (used in the page link, /faq#…)" value={s.id} onChange={(v) => up({ id: slugifyText(v) })} />
                {s.id === 'about' ? <p className="text-sm text-ink-500">This topic shows the general questions.</p> : <QA items={s.items} onChange={(items) => up({ items })} />}
              </>
            )} />
        </Panel>
      </div>
      <SaveBar dirty={d.dirty} saving={d.saving} onSave={d.save} onDiscard={d.discard} />
    </>
  )
}
