<template>
  <li class="c-card">
    <div class="c-card__thumb" :style="thumbnailStyle">
      <span v-if="data.type.key == 'pdf'" class="c-badge c-badge--pdf">PDF</span>
      <span v-if="data.type.key == 'excel'" class="c-badge c-badge--excel">Excel</span>
    </div>
    <div class="c-card__body">
      <h2 class="c-card__title">{{ data.subject }}</h2>
    </div>
    <div class="c-card__foot">
      <button type="button" class="c-button c-button--dark" @click="onDownload()">ダウンロードする</button>
      <button type="button" class="c-button c-button--light" v-if="isInToast">ダウンロードリストに入ってある</button>
      <button type="button" class="c-button c-button--light" v-else @click="onAdd()">
        追加済み
      </button>
    </div>
  </li>
</template>

<script>
import AbstractCard from './AbstractCard.vue';

export default {
  extends: AbstractCard,
};
</script>
