import { getConfig } from '../_lib/config.js'
import { adminRoute, json } from '../_lib/http.js'
import { getStore } from '../_lib/store.js'

/** Where changes are saved, and whether the latest change has finished deploying. */
export const GET = adminRoute(async () => {
  const cfg = getConfig()
  const store = getStore(cfg)
  return json({ mode: store.mode, repo: cfg.github?.repo, branch: cfg.github?.branch, latest: await store.status() })
})
