<template>
  <div class="docdog-card--media docdog-card--link" @click.prevent="redirect({ target: 'Download', params: { doc_data: data } })"
>
    <div
      class="docdog-card--media__thumb"
    >
      <img v-if="data.thumbnail.url" :src="data.thumbnail.url" :alt="data.subject">
      <img v-else src="/src/assets/image/noimage-vertical.svg" :alt="data.subject">
    </div>
    <div class="docdog-card--media__body__inner">
      <div class="docdog-card--media__body">
        <p class="docdog-card--media__body__title">{{ data.subject }}</p>
        <p><span class="docdog-badge">サービス説明</span></p>
        <p>Summary text</p>
      </div>
      <div class="docdog-card--media__foot">
        <!-- TODO: Componentize add list button -->
        <button type="button" class="docdog-button--add-list" @click.stop="onAdd()" :disabled="isInToast">
          <span v-if="isInToast">追加済み</span>
          <span v-else>ダウンロードリストに追加</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AbstractCard from './AbstractCard.vue';

export default {
  extends: AbstractCard,
};
</script>
