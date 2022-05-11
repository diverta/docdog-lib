<template>
  <div class="docdog-article">
    <h2 class="docdog-card__body__title">
      {{ data.subject }}
      <span class="docdog-badge docdog-u-mx-md docdog-u-vertical-align-middle">{{ data.type ? data.type.label : '' }}</span>
    </h2>
    <figure v-if="data.thumbnail && data.thumbnail.url" class="docdog-u-my-lg">
      <img :src="data.thumbnail.url">
    </figure>
    <div v-if="data.wysiwyg" v-html="data.wysiwyg" class="docdog-u-my-lg"></div>
  </div>
</template>

<script>
import AbstractCard from './AbstractCard.vue';

export default {
  extends: AbstractCard,
};
</script>