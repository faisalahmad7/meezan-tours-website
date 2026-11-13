/**
 * Browser-side image processing for the admin: photos are resized to WebP at the site's standard
 * widths before upload (no server image library needed), and blog social cards are drawn on a canvas
 * in the same design as scripts/blog-og.py.
 */
import type { ImageMeta } from './api'

const WIDTHS = [480, 960, 1600]

const toBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result).split(',')[1])
    r.onerror = () => reject(r.error)
    r.readAsDataURL(blob)
  })

const canvasBlob = (c: HTMLCanvasElement, type: string, q: number) =>
  new Promise<Blob>((resolve, reject) => c.toBlob((b) => (b ? resolve(b) : reject(new Error('This browser could not encode the image.'))), type, q))

export interface PreparedPhoto { w: number; h: number; color: string; files: { width: number; data: string }[]; preview: string }

/** Resize one photo into WebP files at 480/960/1600 px (never upscaled) and measure its average colour. */
export async function preparePhoto(file: File): Promise<PreparedPhoto> {
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file (JPG, PNG or WebP).')
  const bmp = await createImageBitmap(file)
  if (bmp.width < 480 || bmp.height < 300) throw new Error('This photo is too small. Use one at least 480 px wide.')
  const widths = WIDTHS.filter((w) => w <= bmp.width)
  if (!widths.includes(Math.min(bmp.width, 1600))) widths.push(Math.min(bmp.width, 1600))
  const files: PreparedPhoto['files'] = []
  let preview = ''
  for (const width of [...new Set(widths)].sort((a, b) => a - b)) {
    const c = document.createElement('canvas')
    c.width = width
    c.height = Math.round((bmp.height / bmp.width) * width)
    const ctx = c.getContext('2d')!
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(bmp, 0, 0, c.width, c.height)
    const blob = await canvasBlob(c, 'image/webp', 0.8)
    if (blob.type !== 'image/webp') throw new Error('This browser cannot create WebP images. Please use Chrome, Edge or Firefox.')
    files.push({ width, data: await toBase64(blob) })
    if (!preview) preview = URL.createObjectURL(blob)
  }
  // average colour = the placeholder shown while the photo loads
  const tiny = document.createElement('canvas')
  tiny.width = tiny.height = 1
  const t = tiny.getContext('2d')!
  t.drawImage(bmp, 0, 0, 1, 1)
  const [r, g, b] = t.getImageData(0, 0, 1, 1).data
  const color = '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
  // full-size dimensions as stored in the manifest: the largest file we produced keeps the aspect ratio
  const top = Math.max(...files.map((f) => f.width))
  return { w: top, h: Math.round((bmp.height / bmp.width) * top), color, files, preview }
}

export const photoUrl = (slug: string, meta: ImageMeta | undefined, want = 480) => {
  if (!meta) return ''
  const w = meta.widths.find((x) => x >= want) ?? meta.widths[meta.widths.length - 1]
  return `/images/gallery/${slug}-${w}.webp`
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Could not load ${src}`))
    img.src = src
  })

function wrap(ctx: CanvasRenderingContext2D, text: string, width: number) {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width <= width || !line) line = test
    else { lines.push(line); line = word }
  }
  lines.push(line)
  return lines
}

/** Draws the 1200x630 social card for a blog post and returns it as base64 JPEG. */
export async function makeSocialCard(title: string, photoSlug: string, meta: ImageMeta | undefined, focus = '50% 50%'): Promise<string> {
  if (!meta) throw new Error('Choose a photo first.')
  const W = 1200, H = 630
  const [photo, badge] = await Promise.all([loadImage(photoUrl(photoSlug, meta, 1600)), loadImage('/images/brand/meezan-badge-280.png')])
  await document.fonts.load('600 60px "Playfair Display Variable"')
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const ctx = c.getContext('2d')!
  // cover-crop around the focus point
  const [fx, fy] = (focus.match(/[\d.]+/g) ?? ['50', '50']).map((n) => Number(n) / 100)
  const scale = Math.max(W / photo.width, H / photo.height)
  const dw = photo.width * scale, dh = photo.height * scale
  ctx.drawImage(photo, -(dw - W) * fx, -(dh - H) * fy, dw, dh)
  // emerald wash, strong on the left where the text sits
  const g = ctx.createLinearGradient(0, 0, W * 0.8, 0)
  g.addColorStop(0, 'rgba(8,42,33,0.94)')
  g.addColorStop(0.55, 'rgba(8,42,33,0.62)')
  g.addColorStop(1, 'rgba(8,42,33,0.28)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
  const gb = ctx.createLinearGradient(0, H * 0.5, 0, H)
  gb.addColorStop(0, 'rgba(8,42,33,0)')
  gb.addColorStop(1, 'rgba(8,42,33,0.5)')
  ctx.fillStyle = gb
  ctx.fillRect(0, 0, W, H)
  // fine gold frame
  ctx.strokeStyle = 'rgb(201,162,74)'
  ctx.lineWidth = 2
  ctx.strokeRect(23, 23, W - 46, H - 46)
  const x0 = 70
  ctx.fillStyle = 'rgb(232,199,103)'
  ctx.font = '500 28px "Playfair Display Variable", Georgia, serif'
  ctx.textBaseline = 'top'
  ctx.fillText('Meezan Journal', x0, 66)
  ctx.fillRect(x0, 111, 56, 2)
  // title, shrinking until it fits in four lines
  let size = 60
  let lines: string[] = []
  for (; size >= 42; size -= 4) {
    ctx.font = `600 ${size}px "Playfair Display Variable", Georgia, serif`
    lines = wrap(ctx, title, 640)
    if (lines.length <= 4) break
  }
  ctx.fillStyle = '#fff'
  lines.forEach((l, i) => ctx.fillText(l, x0, 142 + i * Math.round(size * 1.18)))
  // badge and name
  const by = H - 70 - 72
  ctx.fillStyle = 'rgb(201,162,74)'
  ctx.beginPath()
  ctx.arc(x0 + 36, by + 36, 39, 0, Math.PI * 2)
  ctx.fill()
  ctx.save()
  ctx.beginPath()
  ctx.arc(x0 + 36, by + 36, 36, 0, Math.PI * 2)
  ctx.clip()
  ctx.drawImage(badge, x0, by, 72, 72)
  ctx.restore()
  ctx.fillStyle = '#fff'
  ctx.font = '600 28px "Playfair Display Variable", Georgia, serif'
  ctx.fillText('Meezan Tours & Travels', x0 + 92, by + 10)
  ctx.fillStyle = 'rgb(230,222,200)'
  ctx.font = '400 22px "Playfair Display Variable", Georgia, serif'
  ctx.fillText('Hajj and Umrah, Pune', x0 + 92, by + 44)
  return toBase64(await canvasBlob(c, 'image/jpeg', 0.84))
}
