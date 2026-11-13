import data from '@/content/packages.json'
import type { TravelPackage } from './types'

/** Packages are edited in /admin > Packages (stored in src/content/packages.json). */
export const packages = data as TravelPackage[]

export const formatInr = (n: number) => '\u20B9' + n.toLocaleString('en-IN')
