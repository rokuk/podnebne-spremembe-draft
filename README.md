# Podnebni izobraževalni portal (Climate Educational Portal)

Slovenian-language climate education portal built with [Hugo](https://gohugo.io). Content is Markdown; the layouts,
styles and scripts live in this repository (no external theme).

* Layout plan: [docs/layout-plan.md](docs/layout-plan.md).
* Expert review of the first articles: [REVIEW-NOTES.md](REVIEW-NOTES.md).

## Run

```bash
hugo server                      # live development (search is not available here)
npm install && npm run build:full   # production build + Pagefind search index into public/
npm run check-links              # internal link and anchor check (run after a build)
```

Requires Hugo **0.156 or newer** (extended edition recommended; tested with 0.170). On Windows: `winget install Hugo.Hugo.Extended`.
Templates read data files via `hugo.Data` (added in 0.156, replaces the deprecated `site.Data`). The code uses the classic
layout names (`layouts/_default`, `layouts/partials`, `layouts/shortcodes`), which current Hugo versions still support.
When upgrading Hugo, check the build log for deprecation notices.

## Structure

| Path | Purpose |
|---|---|
| `content/osnovna-sola`, `srednja-sola`, `strokovnjaki` | One section per level → `<tema>/` topic hub → `<clanek>/index.md` articles |
| `content/ucitelji/<slug>/`, `content/ucitelji/gradiva` | Lesson plans (listed on the Za učitelje page) and downloadable materials (page bundles; files next to `index.md`) |
| `content/ucitelji/gradiva` | Also holds image items (`type: slika` in front matter; `main.*` image, optional `video:`, transcript) |
| `content/glosar` | One file per glossary term |
| `content/novice`, `o-projektu.md` | News and project page |
| `content/teme`, `predmeti`, `razredi`, `vrste` | Taxonomy term pages (display names) |
| `layouts/` | Templates; `layouts/shortcodes` = `g`, `cite`, `callout`, `figure`, `video` |
| `i18n/sl.toml` | All UI strings |
| `data/levels.yaml` | The three levels (name, audience) |
| `archetypes/` | `hugo new content --kind clanek osnovna-sola/osnove/moj-clanek` etc. |

## Writing an article

Create a bundle with an archetype, e.g. `hugo new content --kind clanek srednja-sola/osnove/moj-clanek`. Front matter is the contract:

```yaml
question: "…?"           # the one question the article answers; shown under the title on the chapter page
status: published        # published | outline  (outline = skeleton with a "not written yet" notice, noindex)
teme: [osnove]           # topic id; same id across levels links the three versions together
razredi: [gimnazija]     # OŠ: "1-3" "4-6" "7-9"; SŠ: gimnazija, strokovne, poklicne
predmeti: [geografija]
abstract: |              # rendered as the boxed Povzetek
key_points: [...]
glossary: [toplogredni-plini]   # slugs from content/glosar – the build fails if one is unknown
sources:                 # rendered as numbered Viri; cite in text with {{< cite "id" >}}
  - {id: ipcc, citation: "…", url: "…", accessed: "2026-11-16"}
```

Body: no H1; use `##`/`###`. Do not write Povzetek/Slovarček/Viri sections – the template builds them from front matter.
Published articles are validated at build time (abstract, sources, glossary, alt text, known glossary terms and source ids).
`{{< g "slug" "inflected form" >}}` links a glossary term, `{{% callout type="vedeli" %}}…{{% /callout %}}` adds a box
(`vedeli`, `razmisli`, `poskus`, `pomembno`), `{{< figure src="x.svg" alt="…" caption="…" credit="…" >}}` needs alt text.


## Warming stripes (podnebne črte)

The teacher material *Toplotne črte Slovenije* uses `data/stripes_slovenija.json`, generated from ARSO
environmental indicator PP04-1 (annual mean air temperature at six stations, CSV export from
https://kazalci.arso.gov.si/sl/content/temperatura-1, stored in `data-src/`):

```bash
node scripts/stripes.mjs
```

For each station the anomaly from its 1961–1990 mean is computed; the yearly value is the mean of the six station anomalies.
The script writes the JSON and `content/ucitelji/gradiva/toplotne-crte-slovenija/main.svg`. To update, download a newer
CSV export from the ARSO indicator page into `data-src/` and re-run the script (pass the file path as an argument).

## Global temperature (hero background)

The faint curve behind the home page hero is the annual global mean surface temperature anomaly (1850–present,
relative to 1951–1980) from [Berkeley Earth](https://berkeleyearth.org/data/), Land + Ocean, air temperature above sea ice.
The source file is stored in `data-src/berkeley-earth/`; to update, download a newer
[Land_and_Ocean_summary.txt](https://berkeley-earth-temperature.s3.us-west-1.amazonaws.com/Global/Land_and_Ocean_summary.txt)
there and run:

```bash
node scripts/global-temp.mjs
```

This writes `data/global_temperature.json`, which `layouts/partials/hero-temp.html` draws.
