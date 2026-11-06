import { useEffect } from 'react'
import { applyHead, setServerHead, type HeadData } from '@/lib/head'

/** Declares the page's <head> data: captured at build time, applied live on navigation. */
export default function Seo(props: HeadData) {
  if (typeof window === 'undefined') setServerHead(props)
  useEffect(() => {
    applyHead(props)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.path])
  return null
}
