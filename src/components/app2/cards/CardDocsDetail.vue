<template>
  <div class="docdog-article">
    <div class="docdog-article__title">
      <h2>{{ data.subject }}</h2>
    <!-- TODO: Componentize add list button -->
      <button type="button" class="docdog-button--add-list" @click.stop="onAdd()" :disabled="isInToast">
        <span v-if="isInToast">追加済み</span>
        <span v-else>ダウンロードリストに追加</span>
      </button>
    </div>
    <figure v-if="data.thumbnail && data.thumbnail.url" class="docdog-u-my-lg">
      <img :src="data.thumbnail.url">
    </figure>
    <div v-if="data.wysiwyg" v-html="data.wysiwyg" class="docdog-u-my-lg"></div>
    <!-- TODO: Display file type / total page / file size -->
    <p>PDF / 21ページ / 5.3MB</p>
    <!-- TODO: Componentize add list button -->
    <button type="button" class="docdog-button--add-list" @click.stop="onAdd()" :disabled="isInToast">
      <span v-if="isInToast">追加済み</span>
      <span v-else>ダウンロードリストに追加</span>
    </button>
  </div>
</template>

<script>
import AbstractCard from './AbstractCard.vue';

export default {
  extends: AbstractCard,
};
</script>