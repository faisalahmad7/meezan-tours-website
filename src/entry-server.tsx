import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { getServerHead, headToHtml, resetServerHead } from './lib/head'

export { prerenderRoutes } from './routes'

export function render(url: string) {
  resetServerHead()
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  const head = getServerHead()
  return { html, headHtml: head ? headToHtml(head) : '' }
}
