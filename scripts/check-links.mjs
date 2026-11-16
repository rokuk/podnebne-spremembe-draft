// Checks that every internal href/src in the built site (public/) points to an existing file or anchor.
// Usage: hugo build && node scripts/check-links.mjs
import fs from 'node:fs'
import path from 'node:path'

const PUBLIC = path.resolve(process.argv[2] || 'public')
const files = []
;(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    e.isDirectory() ? walk(p) : files.push(p)
  }
})(PUBLIC)

const htmlFiles = files.filter((f) => f.endsWith('.html'))
const ids = new Map()
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8')
  ids.set(f, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])))
}

function resolve(from, url) {
  let u = url.split('?')[0]
  const hash = url.includes('#') ? url.split('#')[1] : ''
  u = u.split('#')[0]
  let target = u === '' ? from : u.startsWith('/') ? path.join(PUBLIC, u) : path.resolve(path.dirname(from), u)
  if (target !== from) {
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html')
  }
  return { target: decodeURIComponent(target), hash }
}

let bad = 0
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8')
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1]
    if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(url)) continue
    if (url.startsWith('/pagefind/')) continue // created by the Pagefind post-build step
    const { target, hash } = resolve(f, url)
    if (!fs.existsSync(target)) {
      console.log(`BROKEN  ${path.relative(PUBLIC, f)} -> ${url}`)
      bad++
    } else if (hash && target.endsWith('.html') && !(ids.get(target) || new Set()).has(hash)) {
      console.log(`NOANCHOR ${path.relative(PUBLIC, f)} -> ${url}`)
      bad++
    }
  }
}
console.log(bad ? `${bad} problem(s)` : `OK – ${htmlFiles.length} pages checked`)
process.exit(bad ? 1 : 0)
