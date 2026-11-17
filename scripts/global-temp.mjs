// Builds data/global_temperature.json from the Berkeley Earth global land + ocean annual summary
// (https://berkeley-earth-temperature.s3.us-west-1.amazonaws.com/Global/Land_and_Ocean_summary.txt).
// Usage: node scripts/global-temp.mjs [data-src/berkeley-earth/Land_and_Ocean_summary.txt]
// Uses the "air temperature above sea ice" annual anomaly (column 2), relative to 1951–1980.
import fs from 'node:fs'

const SRC = process.argv[2] || 'data-src/berkeley-earth/Land_and_Ocean_summary.txt'
const OUT = 'data/global_temperature.json'

const years = fs
  .readFileSync(SRC, 'latin1')
  .split(/\r?\n/)
  .filter((l) => l.trim() && !l.trimStart().startsWith('%'))
  .map((l) => l.trim().split(/\s+/))
  .map((c) => ({ y: Number(c[0]), a: Number(c[1]) }))
  .filter((r) => Number.isInteger(r.y) && Number.isFinite(r.a))
  .sort((p, q) => p.y - q.y)

if (years.length < 100) throw new Error(`Only ${years.length} years parsed from ${SRC}`)
for (let i = 1; i < years.length; i++) {
  if (years[i].y !== years[i - 1].y + 1) throw new Error(`Gap or duplicate year near ${years[i].y}`)
}

const out = {
  source: 'Berkeley Earth, Land + Ocean (air temperature above sea ice), annual global mean surface temperature anomaly',
  sourceUrl: 'https://berkeleyearth.org/data/',
  citation: 'Rohde, R. A. and Hausfather, Z.: The Berkeley Earth Land/Ocean Temperature Record, Earth Syst. Sci. Data, 12, 3469–3479, 2020.',
  reference: '1951–1980',
  first: years[0].y,
  last: years[years.length - 1].y,
  years,
}
fs.mkdirSync('data', { recursive: true })
fs.writeFileSync(OUT, JSON.stringify(out, null, 1))
console.log(`${years.length} years ${out.first}–${out.last}; last ${years.at(-1).a} °C vs ${out.reference}`)
