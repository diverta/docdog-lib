<template>
  <div class="docdog-article">
    <div class="docdog-article__title">
      <h2>{{ data.subject }}</h2>
      <AddToastButton @click.stop="onAdd()" :isInToast="isInToast" />
    </div>
    <figure v-if="data.thumbnail && data.thumbnail.url" class="docdog-u-my-lg">
      <img :src="data.thumbnail.url" />
    </figure>
    <div v-if="data.wysiwyg" v-html="data.wysiwyg" class="docdog-u-my-lg"></div>
    <AddToastButton @click.stop="onAdd()" :isInToast="isInToast" />
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
