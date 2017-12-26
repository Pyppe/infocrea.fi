# Infocrea Oy
Website of Infocrea Oy

# Ohjeita

### Tee uusi blogikirjoitus

- Avaa terminaali ("Pääte")
- `cd infocrea.fi`
- `./create-post.js "Title of my new post"`
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
* Kun lisäät/muokkaat kuvaa content-hakemistossa, aja `./process-content.sh`.
```html
<!-- Lisää kuva absoluuttisella polulla -->
{% include postImage.html path="/files/my-picture.jpg" title="Valinnainen otsikko" css="rightSideContent" %}

<!-- Lisää kuva content-hakemistosta blogikirjoitusta vastaavasta polusta
     HUOM: content-hakemiston kuvista luodaan automaattisesti (= process-content.sh) thumbnail, välikoko ja täysikoko -->
{% include postImage.html name="my-picture.jpg" title="Valinnainen otsikko" css="rightSideContent" %}

<!-- Lisää thumbnail-joukko, joita voi klikata suuremmaksi
     HUOM: nämä kuvat tulee aina olla content hakemistossa -->
<ul class="imageCollage small-block-grid-3"> <!-- Lue grid-määrityksistä täältä: http://foundation.zurb.com/docs/components/block_grid.html -->
  {% include gridImage.html name="kuva1.jpg" title="Ensimmäinen" %}
  {% include gridImage.html name="kuva2.jpg" title="Toinen" %}
</ul>

<!-- Lisää Youtube-video -->
{% youtube $VIDEO_ID %}

<!-- Lisää Vimeo-video -->
{% vimeo $VIDEO_ID %}

<!-- Lisää SoundCloud-äänite -->
{% sound_cloud $ID %}

<!-- Lisää flickr -album -->
{% flickr_embed https://www.flickr.com/photos/jarmolahti/albums/72157657532199362  %}

<!-- Lisää livestream -->
{% livestream http://new.livestream.com/accounts/190565/events/1042748/videos/2636865/player %}

<!-- Lisää vapaavalintainen flex + iframe (esim. QuickPrese) -->
<div class="flex-video">
  {% iframe http://www.quickprese.com/embed/x9Vkrp/nx300-sgs3-pikakoe-3-8-2014 %}
</div>

```
