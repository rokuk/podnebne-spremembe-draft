---
title: "Vreme in podnebje: izhodišča za strokovno rabo"
question: "Katere podatke in referenčna obdobja izbrati in kaj lahko sklepamo iz posameznega dogodka?"
status: published
weight: 0
teme: [osnove]
razredi: []
predmeti: []
other_levels:
  - /osnovna-sola/osnove/vreme-in-podnebje
  - /srednja-sola/osnove/vreme-in-podnebje
abstract: |
  Razlika med vremenom in podnebjem ima za strokovno delo praktične posledice: določa, katere podatke uporabimo, kako izberemo referenčno obdobje in kaj lahko iz posameznega dogodka ali serije sklepamo. Članek povzema operativne opredelitve (podnebne normale WMO, referenčna obdobja, anomalije), pojasnjuje razliko med vremensko napovedjo, sezonsko napovedjo in podnebnimi projekcijami ter opozarja na omejitve predpostavke o stalnem podnebju pri načrtovanju.
key_points:
  - "WMO podnebne normale računa iz 30-letnih obdobij in jih posodablja vsako desetletje; standardno obdobje je 1991–2020, za oceno dolgoročnih sprememb pa se ohranja obdobje 1961–1990."
  - "Izbira referenčnega obdobja vpliva na velikost anomalije in je del pravilne interpretacije vsake primerjave »z običajnim«."
  - "Vremenska napoved, sezonska napoved in podnebna projekcija odgovarjajo na različna vprašanja in imajo različno uporabnost."
  - "V spreminjajočem se podnebju zgodovinska normala ni nujno več najboljše merilo za pričakovane razmere."
glossary: [vreme, podnebje, podnebni-sistem, temperaturna-anomalija, podnebni-model, podnebni-scenarij, negotovost, ekstremni-vremenski-pojavi, ipcc, tveganje, prilagajanje]
sources:
  - id: wmo-1203
    citation: "Svetovna meteorološka organizacija (WMO) (2017). WMO Guidelines on the Calculation of Climate Normals (WMO-No. 1203). Ženeva: WMO."
    url: "https://www.ncei.noaa.gov/pub/data/normals/WMO/Guidelines%20for%20the%20Calculation%20of%20Climate%20Normals.WMO%20No1203_en.pdf"
    accessed: "2026-11-17"
  - id: wmo-povprecje
    citation: "Svetovna meteorološka organizacija (WMO) (b. l.). It's warmer than average. But what is average? WMO news."
    url: "https://wmo.int/media/news/its-warmer-average-what-average"
    accessed: "2026-11-17"
  - id: nccs-klima
    citation: "NCCS – Nacionalni center za podnebne storitve, Švica (b. l.). Glossary: Climate (povzema definicijo IPCC in WMO)."
    url: "https://www.nccs.admin.ch/nccs/en/home/glossary/klima.html"
    accessed: "2026-11-17"
  - id: ipcc-ar6-spm
    citation: "IPCC (2021). Climate Change 2021: The Physical Science Basis. Summary for Policymakers. Cambridge University Press."
    url: "https://www.ipcc.ch/report/ar6/wg1/chapter/summary-for-policymakers/"
    accessed: "2026-11-17"
  - id: arso-podnebje
    citation: "Agencija Republike Slovenije za okolje (ARSO) (b. l.). Podnebje. Državna meteorološka služba."
    url: "https://meteo.arso.gov.si/met/sl/climate/"
    accessed: "2026-11-17"
authors: ["Uredniška skupina portala (osnutek)"]
reviewers: []
date: 2026-11-17
lastmod: 2026-11-17
---

## Operativne opredelitve

V strokovni rabi se je treba izogniti ohlapni rabi pojmov. **Vreme** je stanje ozračja v določenem trenutku in na določenem kraju. **Podnebje** je v ožjem pomenu statistični opis povprečja in spremenljivosti ustreznih količin v obdobju od mesecev do več milijonov let; klasično obdobje povprečenja, ki ga je določila WMO, je 30 let.{{< cite "nccs-klima" >}} V širšem pomenu podnebje zajema stanje {{< g "podnebni-sistem" "podnebnega sistema" >}} kot celote.{{< cite "nccs-klima" >}}

Zanesljive odločitve zahtevajo, da je vedno jasno, ali govorimo o dogodku (vreme), o statistiki (podnebje) ali o spremembi te statistike (podnebne spremembe).

## Normale in referenčna obdobja

WMO podnebne normale za posamezne postaje računa iz 30-letnih obdobij; smernice so zbrane v publikaciji WMO-No. 1203.{{< cite "wmo-1203" >}} Za prakso so pomembna tri dejstva:

1. **Standardne normale** se posodabljajo vsako desetletje; trenutno veljavno obdobje je 1991–2020, ki je nadomestilo obdobje 1981–2010.{{< cite "wmo-povprecje" >}}
2. **Referenčno obdobje za dolgoročne ocene sprememb** je 1961–1990; WMO ga ohranja zaradi stabilnosti primerjav.{{< cite "wmo-povprecje" >}}
3. **Anomalija** ({{< g "temperaturna-anomalija" "temperaturna anomalija" >}}) je odstopanje od izbranega referenčnega obdobja, zato je vsaka primerjava pravilna le z navedbo tega obdobja.

Pri poročanju je zato nujno navesti (a) količino, (b) referenčno obdobje, (c) vir podatkov in (d) prostorsko enoto (postaja, regija, država, globalno). Primerjave med viri, ki uporabljajo različna referenčna obdobja, brez preračuna niso smiselne.

Za Slovenijo so uradni podatki, normale in analize na voljo pri ARSO.{{< cite "arso-podnebje" >}}

## Vremenska napoved, sezonska napoved, podnebna projekcija

Tri vrste napovedi odgovarjajo na različna vprašanja in jih ni mogoče zamenjevati:

| | Vremenska napoved | Sezonska napoved | Podnebna projekcija |
|---|---|---|---|
| Vprašanje | Kakšno bo vreme na določenem kraju in času? | Ali bo sezona verjetno toplejša ali vlažnejša od običajne? | Kako se bo spreminjalo podnebje ob različnih {{< g "podnebni-scenarij" "scenarijih" >}}? |
| Narava | odvisna od natančnega izhodiščnega stanja ozračja | verjetnostna | odvisna od vzrokov (npr. emisij), ne od vremena danes |
| Rezultat | konkretna vrednost | odstopanje v verjetnostni obliki | statistične lastnosti za desetletja, z razponom negotovosti |
| Uporaba | operativno odločanje (dnevi) | sezonsko načrtovanje | strateško načrtovanje in prilagajanje |

Projekcije ne napovedujejo vremena za določen dan. {{< g "podnebni-model" "Podnebni modeli" >}} dajejo uporabne ocene statističnih lastnosti kljub nepredvidljivosti posameznega vremena, a z {{< g "negotovost" "negotovostjo" >}}, ki jo je treba kazati in upoštevati.

## Spremembe povprečij in posamezni dogodki

{{< g "ipcc" "IPCC" >}} ugotavlja, da je bila povprečna globalna temperatura površja v obdobju 2011–2020 za približno 1,09 °C višja kot v obdobju 1850–1900.{{< cite "ipcc-ar6-spm" >}} To je sprememba povprečja, ne napoved za posamezni dan. Za strokovno komuniciranje iz tega izhaja:

- posamezen hladen dogodek ali hladna zima ne ovrže trenda, posamezen vroč dogodek pa ga sam po sebi ne dokazuje;
- trend ocenjujemo na dovolj dolgih vrstah in dovolj velikem območju, z ustreznimi statističnimi metodami;
- {{< g "ekstremni-vremenski-pojavi" "ekstremne pojave" >}} lahko obravnavamo statistično (pogostost, jakost, povratna doba) in jih ocenjujemo glede na izbrano referenčno podnebje.

## Posledice za načrtovanje

Veliko praks (npr. projektne vrednosti padavin, poplavne ali sušne ocene, izbira sort in rokov v pridelavi, načrtovanje gozdnih sestojev) temelji na predpostavki, da so statistične lastnosti preteklosti dobro merilo za prihodnost. V spreminjajočem se podnebju ta predpostavka ni nujno več izpolnjena: povprečje zadnjih 30 let ne opisuje v celoti razmer, ki jih lahko pričakujemo v naslednjih desetletjih. Priporočljivo je zato:

1. pri odločitvah z dolgim življenjskim obdobjem poleg normal uporabiti tudi podnebne projekcije in obravnavati več scenarijev;
2. izrecno oceniti {{< g "tveganje" "tveganje" >}} in občutljivost odločitve na spremembo podnebja;
3. načrtovati prilagodljivo ({{< g "prilagajanje" >}}) in redno posodabljati ocene, ko so na voljo nove normale ali projekcije.

Predstavljene usmeritve so splošne; zahteve za posamezno področje določajo področni predpisi in stroka, zato jih je treba preveriti v ustreznem pravnem in strokovnem okviru.
