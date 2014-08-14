---
layout: post
title: "Esimerkki"
date: 2014-06-05T20:39:00+03:00
categories: general
excerpt: <p>Esimerkkejä upotuksista</p>
---

## Esimerkki Facebook-upotuksesta:

{% facebook https://www.facebook.com/jarmo.lahti/posts/10151482570032963 %}

## Esimerkki Twitter-upotuksesta:

{% tweet https://twitter.com/jarmolahti/status/474844811485532161 %}

## Esimerkkejä kuvista:

{% include postImage.html name="tv.jpg" title="Katso. Se on TV! (Upotettuna oikealle)" css="rightSideContent" %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar, enim ut faucibus commodo, ante lorem eleifend sem, sit amet facilisis nibh lacus sit amet sapien. Duis enim erat, sodales a imperdiet id, suscipit et ante. In ligula dolor, ullamcorper quis vestibulum a, lacinia vitae enim. Curabitur ullamcorper eros nec lacus fringilla, vel placerat lectus porta. Aliquam mauris mi, aliquam vel congue sit amet, accumsan non erat. Aliquam rhoncus nunc ac odio mattis scelerisque. Nam lectus mi, volutpat eu libero sit amet, congue semper sapien.

Proin nec tincidunt metus. Proin imperdiet in lectus vestibulum ultricies. Nunc sed mauris lorem. Donec fermentum libero eu condimentum porttitor. 

### Kasa thumbnaileja:

<ul class="imageCollage small-block-grid-3">
  {% include gridImage.html name="tv.jpg" title="Ensimmäinen" %}
  {% include gridImage.html name="tv.jpg" title="Toinen" %}
  {% include gridImage.html name="tv.jpg" title="Kolmas" %}
</ul>
