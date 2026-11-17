---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
status: published
type: slika            # obvezno: element se prikaže v zbirki Gradiva za prenos kot slika
teme: []
vrste: [shema]           # shema | infografika | fotografija | video | animacija
alt: ""                  # obvezno opisno besedilo slike
summary: ""
credit: ""
license: "CC BY 4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/deed.sl"
# video:                 # za video: samostojna datoteka ali zunanji URL + podnapisi
#   src: "video.mp4"
#   captions: "video.sl.vtt"
# transcript: |
#   Prepis videa.
date: {{ now.Format "2006-01-02" }}
---
