import { Link } from 'react-router-dom'
import Ornament from '@/components/Ornament'
import { readingPath } from '@/data/blog/readingPath'
import { getPost, postPath, prefetchArticle } from '@/services/blog'

/**
 * A first-time pilgrim's reading order, drawn as a route: gold dashed line, star waypoints.
 * Horizontal on large screens, vertical on phones. Numbering is real: the stages are a sequence.
 */
export default function ReadingPath() {
  return (
    <section aria-labelledby="path-title" className="section pattern-light">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="path-title" className="text-display-md">Preparing for your first Umrah? Read in this order.</h2>
          <Ornament className="mt-4" />
          <p className="mt-4 text-lg text-ink-500">Five stops from the first decision to the day you arrive, the same order our team follows with every new pilgrim.</p>
        </div>

        <ol className="route mt-12 lg:mt-16">
          {readingPath.map((s, i) => (
            <li key={s.stage} className="route-stop">
              <span className="route-node" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="route-star">
                  <g fill="#c9a24a" stroke="#c9a24a" strokeWidth="1.4" strokeLinejoin="round"><rect x="4.5" y="4.5" width="15" height="15" /><rect x="4.5" y="4.5" width="15" height="15" transform="rotate(45 12 12)" /></g>
                  <g fill="#134234"><rect x="4.5" y="4.5" width="15" height="15" /><rect x="4.5" y="4.5" width="15" height="15" transform="rotate(45 12 12)" /></g>
                </svg>
                <span className="route-num">{i + 1}</span>
              </span>
              <div className="route-body">
                <h3 className="font-display text-xl font-semibold text-ink-900">{s.stage}</h3>
                <p className="mt-1 text-sm text-ink-500">{s.text}</p>
                <ul className="mt-3 space-y-2">
                  {s.slugs.map((slug) => {
                    const p = getPost(slug)
                    if (!p) return null
                    return (
                      <li key={slug}>
                        <Link to={postPath(slug)} onMouseEnter={() => prefetchArticle(slug)} onFocus={() => prefetchArticle(slug)} className="route-link">
                          {p.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
