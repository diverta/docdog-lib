<template>
  <div class="kuroco-article">
    <div class="kuroco-article__title">
      <h2>{{ data.subject }}</h2>
      <AddToastButton @click.stop="onToggle()" :isInToast="isInToast" class="kuroco-u-hidden-sp" />
    </div>
    <figure v-if="data.thumbnail && data.thumbnail.url" class="kuroco-u-my-lg">
      <img :src="data.thumbnail.url" />
    </figure>
    <div v-if="data.wysiwyg" v-html="data.wysiwyg" class="kuroco-u-my-lg"></div>
    <div class="kuroco-button--fixed--sp">
      <AddToastButton @click.stop="onToggle()" :isInToast="isInToast" />
    </div>
  </div>
</template>

<script>
import AbstractCard from './AbstractCard.vue';
import AddToastButton from '../buttons/AddToastButton.vue';

export default {
  extends: AbstractCard,
  components: {
    AddToastButton,
  },
};
</script>
