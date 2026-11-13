import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { api, ApiError, type SessionInfo } from './api'
import { toast } from './ui'

export const AdminContext = createContext<{ session: SessionInfo; refreshStatus: () => void }>({
  session: { configured: true, mode: 'files', problems: [], loggedIn: true, expires: null },
  refreshStatus: () => undefined,
})
export const useAdmin = () => useContext(AdminContext)

export const savedMessage = (mode: SessionInfo['mode']) =>
  mode === 'github' ? 'Saved. The live site will update in about a minute.' : 'Saved to the project files.'

/** Load one content document, edit it locally, and save it back through the API. */
export function useDoc<T>(doc: string) {
  const { session, refreshStatus } = useAdmin()
  const [data, setData] = useState<T | null>(null)
  const [original, setOriginal] = useState('')
  const [loadError, setLoadError] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoadError('')
    try {
      const r = await api<{ data: T }>(`content?doc=${doc}`)
      setData(r.data)
      setOriginal(JSON.stringify(r.data))
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : 'Could not load')
    }
  }, [doc])
  useEffect(() => { void load() }, [load])

  const dirty = data !== null && JSON.stringify(data) !== original

  const save = async () => {
    if (!data) return
    setSaving(true)
    setErrors([])
    try {
      await api(`content?doc=${doc}`, { method: 'PUT', body: { data } })
      setOriginal(JSON.stringify(data))
      toast(savedMessage(session.mode))
      refreshStatus()
    } catch (e) {
      if (e instanceof ApiError) setErrors(e.details.length ? e.details : [e.message])
      toast('Not saved. See the messages on the page.', 'error')
    } finally {
      setSaving(false)
    }
  }
  const discard = () => { setData(JSON.parse(original)); setErrors([]) }
  return { data, setData, dirty, save, saving, errors, setErrors, loadError, reload: load, discard }
}
