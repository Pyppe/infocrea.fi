UUSI BLOGIKIRJOITUS
===================

- Avaa terminaali ("Pääte")
- `cd infocrea.fi`
- `./create-post.sh "Title of my new post"`
- Kaikki kirjoitukset ovat _posts -hakemiston alla.
- Jekyll generoi sivuston _site -hakemiston alle. **ÄLÄ MUOKKAA NÄITÄ**

## Kirjoituksen "ingressi"
- Joko määritä "otsikkoalueeseen" `excerpt`, esim:
```
---
layout: post
...
excerpt: |
  <p>Tämä on listauksessa näkyvä osa.</p>
---
```
- Tai käytä koodia `<!--more-->` katkaisemaan kirjoitus halutusta kohdasta.


KÄYNNISTÄ JEKYLL LOKAALISTI
===========================
Tällöin voit "esiakatsella" sivustoa ja tehdä muutoksia yms.
- Avaa terminaali
- `cd infocrea.fi`
- `jekll serve -w`

MUUTOSTEN TALLENNUS GITHUBIIN
=============================
- Käytä Githubin Mac-ohjelmaa

GITHUB SYNCIN JÄLKEEN: DEPLOYMENT
=================================
- `cd infocrea.fi`
- `./generate-and-deploy.sh`

SUBLIME TEXT -ASIOITA
=====================
`Cmd+p`: etsi tiedostoa nimeltä
