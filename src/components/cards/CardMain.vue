// Delete component
<template>
  <li>
    <div class="docdog-card">
      <div class="c-card__thumb" :style="thumbnailStyle">
        <span class="docdog-card__thumb__badge">{{ data.type.label }}</span>
      </div>
      <div class="docdog-card__body">
        <p class="docdog-card__body__title">{{ data.subject }}</p>
      </div>
      <div class="c-card__foot">
        <button type="button" class="c-button c-button--dark" @click="onDownload()">ダウンロードする</button>
        <button type="button" class="c-button c-button--light" v-if="isInToast">追加済み</button>
        <button type="button" class="c-button c-button--light" v-else @click="onAdd()">
          ダウンロードリストに追加する
        </button>
      </div>
    </div>
  </li>
</template>

<script>
import AbstractCard from './AbstractCard.vue';

export default {
  extends: AbstractCard,
};
</script>
