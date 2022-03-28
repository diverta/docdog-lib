<template>
  <div class="docdog-card docdog-card--link">
    <div class="docdog-card__thumb docdog-card--link" :style="thumbnailStyle" @click="onDownload()">
      <span class="docdog-card__thumb__badge">{{ data.type ? data.type.label : '' }}</span>
    </div>
    <div class="docdog-card__body" @click.self="onDownload()">
      <p class="docdog-card__body__title docdog-card--link" @click="onDownload()">{{ data.subject }}</p>
      <template v-if="showDownloadBtn">
        <button type="button" class="docdog-button docdog-button--secondary" @click="download">
          ダウンロードする
        </button>
        <button type="button" class="docdog-button docdog-button--white" v-if="isInToast" disabled>追加済み</button>
        <button type="button" class="docdog-button docdog-button--white" v-else @click="onAdd()">
          ダウンロードリストに追加する
        </button>
      </template>
    </div>
    <div class="docdog-card__foot" v-if="deleteFooter">
      <DeleteButton @click="removeToast" />
    </div>
  </div>
</template>

<script>
import AbstractCard from './AbstractCard.vue';
import DeleteButton from '@/components/DeleteButton.vue';

export default {
  extends: AbstractCard,
  components: {
    DeleteButton,
  },
};
</script>
