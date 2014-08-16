### Tee uusi blogikirjoitus

- Avaa terminaali ("Pääte")
- `cd infocrea.fi`
- `./create-post.sh "Title of my new post"`
- Kaikki kirjoitukset ovat _posts -hakemiston alla.
- Jekyll generoi sivuston _site -hakemiston alle. **ÄLÄ MUOKKAA NÄITÄ**

### Kirjoituksen "ingressi"
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


### Käynnistä Jekyll lokaalisti
Tällöin voit "esiakatsella" sivustoa ja tehdä muutoksia yms.
- Avaa terminaali
- `cd infocrea.fi`
- `jekyll serve -w`

### Muutosten tallennus Githubiin
- Käytä Githubin Mac-ohjelmaa

### Github-syncin jälkeen: Deployment
- `cd infocrea.fi`
- `./generate-and-deploy.sh`

### Sublime Text -asioita
`Cmd+p`: etsi tiedostoa nimeltä

## Kuvat / media / yms.
```html
<!-- Lisää kuva absoluuttisella polulla -->
{% include postImage.html path="/files/my-picture.jpg" title="Valinnainen otsikko" css="rightSideContent" %}

<!-- Lisää kuva content-hakemistosta blogikirjoitusta vastaavasta polusta
     HUOM: content-hakemiston kuvista luodaan automaattisesti thumbnail, välikoko ja täysikoko -->
{% include postImage.html name="my-picture.jpg" title="Valinnainen otsikko" css="rightSideContent" %}

<!-- Lisää thumbnail-joukko, joita voi klikata suuremmaksi
     HUOM: nämä kuvat tulee aina olla content hakemistossa -->
<ul class="imageCollage small-block-grid-3"> <!-- Lue grid-määrityksistä täältä: http://foundation.zurb.com/docs/components/block_grid.html -->
  {% include gridImage.html name="kuva1.jpg" title="Ensimmäinen" %}
  {% include gridImage.html name="kuva2.jpg" title="Toinen" %}
</ul>

<!-- Lisää youtube-video -->
{% youtube $VIDEO_ID %}

<!-- Lisää flickr set -->
{% flickr_set $SET_ID [$USER_ID] %}

<!-- Lisää vapaavalintainen flex + iframe (esim. QuickPrese) -->
<div class="flex-video narrow">
  {% iframe http://www.quickprese.com/embed/x9Vkrp/nx300-sgs3-pikakoe-3-8-2014 %}
</div>

```
