// Builds data/stripes_slovenija.json (warming stripes) from ARSO environmental indicator PP04-1:
// annual mean air temperature at six Slovenian stations (Kredarica, Rateče, Murska Sobota, Novo mesto, Ljubljana, Portorož).
// Usage: node scripts/stripes.mjs [data-src/arso-pp04-1-letna-temperatura-1950-2024.csv]
// Method: for each station the anomaly from its own 1961–1990 mean is computed; the yearly value is the mean of the
// station anomalies (only years where all stations have data). This gives a composite for Slovenia's main climate types.
import fs from 'node:fs'

const SRC = process.argv[2] || 'data-src/arso-pp04-1-letna-temperatura-1950-2024.csv'
const OUT = 'data/stripes_slovenija.json'
const REF = [1961, 1990]
const NL = new RegExp('\\r?\\n')

const lines = fs.readFileSync(SRC, 'utf8').trim().split(NL)
const header = lines[0].split(',').slice(1).map((x) => x.replace(/"/g, '').replace('[°C]', '').trim())
const rows = lines.slice(1).map((l) => l.split(',').map((x) => x.replace(/"/g, '')))
const nSt = header.length
const table = rows
  .map((r) => ({ y: Number(r[0]), v: r.slice(1).map(Number) }))
  .filter((r) => Number.isFinite(r.y) && r.v.length === nSt && r.v.every(Number.isFinite))
  .sort((p, q) => p.y - q.y)
const refRows = table.filter((r) => r.y >= REF[0] && r.y <= REF[1])
if (refRows.length !== REF[1] - REF[0] + 1) throw new Error('Reference period incomplete')
const stMean = header.map((_, i) => refRows.reduce((s, r) => s + r.v[i], 0) / refRows.length)
const data = table.map((r) => ({ y: r.y, a: +(r.v.reduce((s, x, i) => s + (x - stMean[i]), 0) / nSt).toFixed(3) }))

// ColorBrewer RdBu (11 classes), blue (cold) -> red (warm), symmetric around 0.
// Anomaly 0 is always white. Cold years are scaled to the coldest year and warm years to the warmest year, so that a
// short local record with strong warming does not saturate (a single symmetric scale would turn all recent years the same red).
const PAL = ['#053061', '#2166ac', '#4393c3', '#92c5de', '#d1e5f0', '#f7f7f7', '#fddbc7', '#f4a582', '#d6604d', '#b2182b', '#67001f']
const minA = Math.min(...data.map((d) => d.a))
const maxA = Math.max(...data.map((d) => d.a))
const lim = Math.max(Math.abs(minA), maxA)
for (const d of data) {
  const t = d.a < 0 ? 0.5 - 0.5 * (d.a / minA) : 0.5 + 0.5 * (d.a / maxA)
  d.c = PAL[Math.min(PAL.length - 1, Math.max(0, Math.round(t * (PAL.length - 1))))]
}
const last = data[data.length - 1]
const recent = data.filter((d) => d.y > last.y - 10)
const out = {
  source: 'ARSO, kazalec okolja PP04-1: letna povprečna temperatura zraka na izbranih postajah v Sloveniji (2025)',
  sourceUrl: 'https://kazalci.arso.gov.si/sl/content/temperatura-1',
  stations: header,
  reference: `${REF[0]}–${REF[1]}`,
  first: data[0].y,
  last: last.y,
  maxAbs: +lim.toFixed(2),
  lastDecadeMean: +(recent.reduce((s, d) => s + d.a, 0) / recent.length).toFixed(2),
  years: data,
}
fs.mkdirSync('data', { recursive: true })
fs.writeFileSync(OUT, JSON.stringify(out, null, 1))
console.log(`${data.length} years ${out.first}–${out.last}; stations ${header.join(', ')}; last-decade mean ${out.lastDecadeMean} °C vs ${out.reference}; |max| ${out.maxAbs}`)

// Stand-alone SVG for download/slides (lives in the teacher materials bundle).
const W = 1200, H = 400, w = W / data.length
const rects = data.map((d, i) => `<rect x="${(i * w).toFixed(2)}" y="0" width="${(w + 0.6).toFixed(2)}" height="${H}" fill="${d.c}"/>`).join('')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
<title id="t">Toplotne črte Slovenije ${out.first}–${out.last}</title>
<desc id="d">Vsaka navpična črta je eno leto, barva pa odstopanje povprečne letne temperature od povprečja ${out.reference}: modre so hladnejša, rdeče toplejša leta. Vir podatkov: ARSO.</desc>
${rects}
</svg>
`
const BUNDLE = 'content/ucitelji/gradiva/toplotne-crte-slovenija'
fs.mkdirSync(BUNDLE, { recursive: true })
fs.writeFileSync(`${BUNDLE}/main.svg`, svg)
console.log(`wrote ${BUNDLE}/main.svg`)
