# Climate Educational Portal – layout & build plan

## Context
Greenfield project (empty folder `C:\Users\rokuk\Documents\Code\podnebne-spremembe`). We are building the
**Climate Educational Portal** (working title *Podnebni izobraževalni portal*; real name and branding are TBD):
a content portal for formal education with climate-change and adaptation knowledge for teachers, pupils, students,
sector experts and government staff, plus lesson plans, downloadable teaching materials and multimedia.
It will be maintained by UL and linked both ways with the Climate Service Centre (data) and the Climate Portal / best practices.

**Decided with the user:** Hugo · Slovenian only (`sl-SI`) · one top-level section per level
(Osnovna šola / Srednja šola / Strokovnjaki in odločevalci).
**Requested content:** audiences = experts, government, primary and high-school teachers; levels × fields
(basics, agriculture, water, forestry …); teacher section; downloadable materials per topic; multimedia section for slides;
project page; news page. Articles come from Markdown; every article has **Povzetek · Slovarček · Viri**.
First build: scaffold + layouts + a few finished "basics of climate change" articles; everything else as skeleton articles.

Research findings used below (Hugo 0.170.0 is current stable; Hugo docs, Pagefind docs, reference portals and the
Slovenian school structure were checked; items marked *unverified* must be confirmed with UL/ZRSS before publishing).

---

## 1. Site map (URLs are ASCII Slovenian)

```
/                                 Domov
/osnovna-sola/                    Osnovna šola  (level hub; filter 1.–3. / 4.–6. / 7.–9. razred)
  /osnovna-sola/<tema>/           Topic hub = ordered "learning path" of articles
    /osnovna-sola/<tema>/<clanek>/
/srednja-sola/                    Srednja šola  (gimnazija, strokovne, poklicne šole)  – same structure
/strokovnjaki/                    Strokovnjaki in odločevalci (sector fields)          – same structure
/ucitelji/                        Za učitelje   (hub, how-to, quick filters)
  /ucitelji/priprave/             Učne priprave (lesson plans, filterable)  → /<slug>/
  /ucitelji/gradiva/              Gradiva za prenos (worksheets, quizzes, posters, slides) → /<slug>/
/multimedija/                     Multimedia library (video, animation, graphics, photos, audio) → /<slug>/
/teme/<tema>/                     Cross-level topic page (taxonomy): same topic at all three levels
/glosar/                          Glossary A–Ž  → /glosar/<pojem>/
/novice/                          News (paginated, RSS) → /novice/<slug>/
/o-projektu/                      About: aims & audiences, partners/team, linked services, funding, contact, how to cite
/iskanje/                         Search (Pagefind)
/dostopnost/  /pravno-obvestilo/  Accessibility statement, legal/privacy notice
```
Main menu (7 items, disclosure-style dropdowns, no hover-only menus):
**Osnovna šola · Srednja šola · Strokovnjaki in odločevalci · Za učitelje · Multimedija · Novice · O projektu**,
plus search field, link to glossary in the footer and utility bar.

Topics (shared taxonomy `teme`, one id used across levels): `osnove` (Osnove podnebnih sprememb – the only fully written one now),
`kmetijstvo`, `vode`, `gozdarstvo`, `energija`, `promet`, `prostor-in-mesta`, `industrija-in-krozno`, `zdravje`,
`biotska-raznovrstnost`, `naravne-nesrece`. Not every topic exists at every level (primary gets the simple subset).

## 2. Page layouts (wireframes)

Global frame: skip link → header (logo + name, main nav, search) → breadcrumb → `<main>` → footer.
Footer: partner/funder logos, "Povezani servisi" strip (Podnebni servisni center, Podnebni portal – public names to be confirmed), contact, licence, a11y statement, privacy.

**Home**
```
[ header ]
[ HERO: H1 + 1-line promise + search box ]
[ 3 audience cards: Osnovna šola | Srednja šola | Strokovnjaki in odločevalci ]   [ button: Za učitelje → ]
[ Za učitelje: 3 newest lesson plans + quick filter chips (razred, predmet) ]
[ Začnite z osnovami: 3 cards (one "osnove" article per level) ]
[ Teme grid: icon cards, "v pripravi" badge where skeleton ]
[ Multimedija: 4 newest items (static grid, no auto-carousel) ]
[ Podatki in dobre prakse: panel linking Climate Service Centre / Climate Portal / ARSO ]
[ Novice: 3 latest ]        [ O projektu teaser + logos ]
[ footer ]
```

**Level hub** (`/osnovna-sola/`): intro text for that audience, grade-band chips (OŠ: 1.–3., 4.–6., 7.–9.; SŠ: gimnazija / strokovne / poklicne; experts: sector chips),
topic cards (count, status), box "Za učitelje na tej stopnji" (pre-filtered lesson plans), featured multimedia,
level switcher ("Ista tema na drugi stopnji").
Accent colour per level via CSS variable `--level-accent` (colour never the only cue – always label + icon).

**Topic hub** (`/osnovna-sola/osnove/`): description, numbered learning path (title, reading time, status), right column:
Gradiva za učitelje, Multimedija, "Ta tema na drugih stopnjah" (links to the siblings with the same `teme` term).

**Article** (the core template)
```
Breadcrumb: Domov › Osnovna šola › Osnove podnebnih sprememb › Naslov
H1  [level badge] [razred chips] [predmet chips] [status badge]
meta: avtorji · strokovni pregled · zadnja posodobitev · čas branja      [Natisni] [Kopiraj povezavo]
┌───────────── main (≈68ch) ───────────────────────────┬──── aside (sticky, ≥ 960px) ──────┐
│ POVZETEK (boxed, anchor #povzetek) + ključne točke   │ Kazalo (TOC incl. Povzetek,       │
│ body: headings, figures w/ caption+credit, callouts, │   Slovarček, Viri)                │
│   inline glossary links                              │ Gradiva za učitelje (downloads)   │
│ SLOVARČEK (anchor #slovarcek, per-article terms,     │ Podatki in orodja (CSC/Portal)    │
│   links to /glosar/)                                 │ Ta tema na drugih stopnjah        │
│ VIRI (anchor #viri, numbered list, DOI/URL)          │                                   │
│ Citirajte kot · Sorodni članki · prejšnji/naslednji  │                                   │
└──────────────────────────────────────────────────────┴───────────────────────────────────┘
```
≤ 960px: single column, TOC collapses into a `<details>` after the abstract. Skeleton articles render title, badges,
"Poglavje je v pripravi" notice and the planned outline, are `noindex` and hidden from search.

**Za učitelje hub**: how to use the portal in class, big filter bar (stopnja, razred, predmet, tema, vrsta, trajanje),
editors' picks, latest plans, FAQ.
**Lesson plan page**: meta strip (stopnja, razred, predmet, trajanje, licenca) → učni cilji → potrebščine → potek ure (table with minutes) →
vrednotenje → **Priloge za prenos** (cards: format, size, "Prenesi vse (ZIP)") → povezani članki → povezana multimedija → citiranje.
**Listing pages (priprave, gradiva, multimedija)**: left facet column (5–6 facets, result count, removable chips; becomes a modal on mobile),
card grid with thumbnail, title, grade band, subject, duration, format icons + size, licence badge. Works without JS via term pages; JS filter is an enhancement.
**Multimedia item page**: player/image, caption, **transcript + captions (WebVTT)**, credit & licence, downloads (PNG/SVG/MP4, sizes),
"Kopiraj navedbo vira", embed code for video, "uporabi v predstavitvi" hint; packs per topic (ZIP of graphics) later.
**Glossary**: sticky A–Č–Ž letter strip (only letters present), filter-as-you-type, term cards; optional level-specific definition (`definition_osnovna`, …).
**News**: card list (date, image, summary), 10 per page, category chips, RSS. **About**: sub-pages as in the site map; explicit "Povezave z drugimi deli projekta" page.

## 3. Visual & UX system
- Tokens in CSS custom properties; light theme first, dark via `prefers-color-scheme` later; 12-col grid, max width 1200 px, reading measure 68ch; breakpoints 600 / 960.
- Palette: calm neutral base + one accent per level (e.g. warm amber = OŠ, teal = SŠ, deep blue = strokovnjaki, green = učitelji); all text ≥ 4.5:1, UI ≥ 3:1.
- Fonts self-hosted (no Google Fonts, no third-party cookies); video embeds privacy-enhanced or click-to-load; analytics none or self-hosted.
- Accessibility target WCAG 2.2 AA (public-sector duty probably applies via the EU web accessibility directive – *confirm with UL*): skip link, labelled landmarks, visible focus, 24×24 targets, reduced motion, alt text enforced at build time, captions/transcripts, link text including format and size.
- Print stylesheet for articles and lesson plans (hide chrome, expand URLs, keep abstract/glossary/sources).

## 4. Content model (front matter is the contract; keys in English, taxonomy keys Slovenian for clean URLs)
```yaml
title: "Vreme in podnebje"
status: published            # published | outline   (never use draft for skeletons – drafts vanish from lists)
teme: [osnove]               # taxonomy; level comes from section via cascade (params.level)
razredi: ["7-9"]             # grade band(s); SŠ: letniki / programme type
predmeti: [geografija, naravoslovje]
abstract: |                  # Markdown, rendered in the boxed Povzetek
key_points: [ ... ]
glossary: [toplogredni-plini, vreme, podnebje]     # slugs of /glosar/ pages (build fails if missing)
sources:                     # numbered Viri; cited in text with {{< cite "ipcc-ar6" >}}
  - {id: ipcc-ar6, citation: "IPCC (2021) …", url: "…", doi: "…"}
authors: [...]  reviewers: [...]  date: …  lastmod: …
materials: [priprava-vreme-podnebje]   # explicit links to lesson plans/gradiva
services: [{title: "…", url: "…", provider: "ARSO"}]  # data/best-practice links (CSC, Portal)
```
Taxonomies: `teme`, `predmeti`, `razredi`, `vrste` (resource type). Term metadata lives in `content/teme/<id>/_index.md`.
Content types / layouts: `clanek`, `priprava`, `gradivo`, `multimedija`, `novica`, `glosar`, plain pages. Downloads and images are **page-bundle resources**
(`index.md` + files); file size is stored in `resources:` params (or read via `os.Stat`) because Hugo has no size method.
Large media (video) live outside git (Git LFS or storage/CDN) and are referenced by URL.

Shortcodes (`layouts/_shortcodes/`): `figure` wrapper with **mandatory alt**, `video` (self-hosted `<video>` + VTT, or privacy-enhanced YouTube), `download`, `callout`
(Ali ste vedeli? / Razmisli / Poskus), `g` (inline glossary link, errors on unknown term), `cite`.

## 5. Technical approach (Hugo 0.170.0, verified)
- Single standard binary (no "extended" any more); build with `hugo build --gc --minify && npx -y pagefind --site public`. Pin versions in CI.
- Config in `hugo.toml`: `defaultContentLanguage = 'sl'`, `locale = 'sl-SI'` (`languageCode` is deprecated), menus via `[[menus.main]]`, `[taxonomies]`, `[pagination] pagerSize = 10`, related-content config.
- Hand-written theme in the project (no external theme): `layouts/baseof.html`, `section.html`, `page.html`, per-type folders, `_partials/`, `_shortcodes/`, `_markup/render-image.html`;
  `cascade` in each level's `_index.md` sets `level`/label so one set of templates serves all three levels.
- Plain modern CSS in `assets/css` (custom properties, nesting, `@media print`) minified + fingerprinted; vanilla JS only for menu disclosure, filters, glossary filter, search UI. No Sass needed.
- Glossary = content section (one file per term); sorted with `ByTitle`, which uses Slovenian collation (č, š, ž) – to be proven with a test fixture; A–Ž grouping done in the template.
- Search: Pagefind (static). **Limit:** no Slovenian stemming or UI translation → custom Slovenian UI strings via the JS API, `data-pagefind-filter` for level/topic, keywords in front matter to compensate.
- Skeleton handling: `status: outline` pages are listed with a "V pripravi" badge, `noindex`, optional site param `showOutlines`; `errorf` validation (abstract, glossary, sources, alt) runs only for `status: published`.
- Related content: curated cross-links (same `teme` term, `materials`, `services`) first; Hugo `.Related` only as filler.
- Integrations: `services` front matter + a "Podatki in dobre prakse" partial + footer strip; the other portals link back to `/teme/<id>/` and article URLs (stable slugs, no dates in URLs).
- Deploy: static files to any server (UL host via rsync, or GitHub Pages workflow); `baseURL` per environment.

## 6. Repository layout
```
hugo.toml  archetypes/{article,outline,lesson,resource,media,news,term}/  data/   i18n/sl.toml (all UI strings)
content/ _index.md  osnovna-sola/ srednja-sola/ strokovnjaki/  ucitelji/{priprave,gradiva}  multimedija/  glosar/  novice/  o-projektu/  teme/
layouts/ baseof.html section.html page.html  clanek/ priprava/ gradivo/ multimedija/ novica/ glosar/ teme/  _partials/ _shortcodes/ _markup/
assets/{css,js}  static/{fonts,favicons}  scripts/ (content checks, ZIP bundles)  README.md (dev + authoring guide)  .github/workflows/
```

## 7. Initial content (Slovenian)
Slovenian UI labels from research go straight into `i18n/sl.toml` (Povzetek, Slovarček, Viri, Za učitelje, Učne priprave, Učni listi, Gradiva za prenos, Multimedija, Novice, O projektu, Iskanje, V pripravi, Kazalo, Preskoči na vsebino, Zadnja posodobitev, Strokovni pregled …).

Fully written topic **Osnove podnebnih sprememb** (proposed 3 + 3 + 2 = 8 articles; adjustable):
- Osnovna šola (7.–9. r.): Vreme in podnebje · Učinek tople grede · Vzroki in posledice, kaj lahko storimo
- Srednja šola: Podnebni sistem in energijska bilanca · Toplogredni plini in dokazi o spremembah · Podnebne spremembe v Sloveniji ter blaženje in prilagajanje
- Strokovnjaki in odločevalci: Znanstvena osnova (IPCC AR6) in negotovosti · Prilagajanje, blaženje in okvir politik (Pariški sporazum, EU, nacionalni dokumenti)

Every number is tied to a cited source (IPCC AR6, ARSO); policy/curriculum details flagged *unverified* in research (Podnebni zakon dates, strategija prilagajanja, učni načrti
for subjects other than geography) are checked before they appear.
Skeleton articles (full front matter, planned outline as headings, `status: outline`): per level the topic lists from research, e.g. SŠ/strokovnjaki: kmetijstvo, vode, gozdarstvo,
energija, promet, prostor in mesta, industrija, zdravje, biotska raznovrstnost, naravne nesreče; OŠ: kmetijstvo in hrana, vode, gozdovi, energija, promet, odpadki, biotska raznovrstnost, naravne nesreče.
Demo teacher items: 1 lesson plan + 1 worksheet + 2 multimedia entries (placeholder files, clearly labelled), 2 sample news items, About pages with placeholder text.

## 8. Build phases
1. Scaffold: `hugo.toml`, i18n, tokens/base CSS, header/footer, archetypes, skip link, print CSS.
2. Article template (Povzetek/Slovarček/Viri, TOC, shortcodes, validation) + level hub, topic hub, `teme` term pages, home.
3. Glossary + Pagefind search (Slovenian UI) + Slovenian collation fixture.
4. Teacher section: lesson plan, resource card, listings with filters, downloads.
5. Multimedia library + item page (transcripts, downloads, embed).
6. News, About, legal/accessibility pages.
7. Content: 8 basics articles, skeleton articles, demo items.
8. QA and README/authoring guide.

## 9. Verification
- `hugo build --gc --minify` succeeds with zero warnings; a deliberately broken fixture (missing alt / unknown glossary term) fails as intended.
- Pagefind index builds; search for a Slovenian word with diacritics works; level/topic filters work.
- Glossary order test: Čas, Cena, Žito, Zrak sorts as Cena, Čas, Zrak, Žito.
- View in the built-in browser at mobile (375), tablet (768) and desktop: home, level hub, topic hub, article (incl. skeleton), lesson plan, multimedia, glossary, news.
- Accessibility pass (axe/Lighthouse), keyboard-only navigation, 320 px reflow, print preview of an article, link check of internal URLs.

## 10. Open items to confirm later (not blocking)
Portal name/logo/colours, funder acknowledgement text, content licence (suggest CC BY-SA 4.0), hosting target, analytics yes/no, public naming of the linked services (CSC/Climate Portal),
whether SŠ vocational programmes get their own filter now, and the number of fully written articles.
