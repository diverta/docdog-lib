<template>
  <a href="" class="docdog-card">
    <div class="docdog-card__video">
      <iframe src="https://player.vimeo.com/video/531387863?autopause=0" frameborder="0" allow="fullscreen" allowfullscreen></iframe>
    </div>
    <div class="docdog-card__body">
      <p class="docdog-card__body__title">{{ data.subject }}</p>
    </div>
  </a>
</template>

<script>
import AbstractCard from './AbstractCard.vue';

export default {
  extends: AbstractCard,
};
</script>
