<template>
  <div class="docdog-card">
    <div class="docdog-card__thumb" :style="thumbnailStyle">
      <span class="docdog-card__thumb__badge">{{ data.type ? data.type.label : '' }}</span>
    </div>
    <div class="docdog-card__body">
      <p class="docdog-card__body__title">{{ data.subject }}</p>
      <template v-if="showDownloadBtn">
        <button type="button" class="docdog-button docdog-button--secondary" @click="onDownload()">
          ダウンロードする
        </button>
        <button type="button" class="docdog-button docdog-button--white" v-if="isInToast">追加済み</button>
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
