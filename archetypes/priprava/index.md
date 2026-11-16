---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
status: published
level: osnovna-sola      # osnovna-sola | srednja-sola | strokovnjaki
teme: []
razredi: []
predmeti: []
vrste: [ucna-priprava]
duration: 45
summary: ""
objectives: []
materials_needed: []
steps:
  - {minutes: 5, title: "Uvod", description: ""}
assessment: ""
authors: []
related_articles: []     # npr. "/osnovna-sola/osnove/vreme-in-podnebje"
related_media: []        # slugi iz content/multimedija
date: {{ now.Format "2006-01-02" }}
lastmod: {{ now.Format "2006-01-02" }}
resources:               # datoteke v istem imeniku
  - src: "priloga.pdf"
    title: "Naslov priloge"
    params: {language: "SL"}
---
