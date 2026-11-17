---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
question: ""              # eno vprašanje, na katero članek odgovori (prikazano na strani poglavja)
status: published        # published | outline
weight: 1
teme: []                 # npr. [osnove]
razredi: []              # OŠ: ["7-9"]; SŠ: [gimnazija]
predmeti: []             # npr. [geografija]
abstract: |
  Povzetek članka (45–90 besed).
key_points:
  - ""
glossary: []             # slugi iz content/glosar
sources:
  - id: vir-1
    citation: "Avtor (leto). Naslov. Založnik."
    url: ""
    accessed: "{{ now.Format "2006-01-02" }}"
authors: []
reviewers: []
date: {{ now.Format "2006-01-02" }}
lastmod: {{ now.Format "2006-01-02" }}
---
## Uvod
