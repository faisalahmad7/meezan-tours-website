import { useEffect, useState } from 'react'

/** True once an ISO date (YYYY-MM-DD) has passed. Evaluated after mount so prerendered HTML never goes stale or mismatches. */
export function useIsPast(date?: string) {
  const [past, setPast] = useState(false)
  useEffect(() => {
    if (date) setPast(new Date(`${date}T23:59:59`).getTime() < Date.now())
  }, [date])
  return past
}
