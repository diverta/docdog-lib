<template>
  <div class="docdog-card docdog-card--link">
    <div
      class="docdog-card__thumb docdog-card--link"
      :style="thumbnailStyle"
      @click.prevent="redirect({ target: 'Download', params: { doc_data: data } })"
    >
      <span class="docdog-card__thumb__badge">{{ data.type ? data.type.label : '' }}</span>
    </div>
    <div class="docdog-card__body" @click.prevent.self="redirect({ target: 'Download', params: { doc_data: data } })">
      <p class="docdog-card__body__title">{{ data.subject }}</p>
      <template v-if="showDownloadBtn">
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
import DeleteButton from '@/components/app1/DeleteButton.vue';

export default {
  extends: AbstractCard,
  components: {
    DeleteButton,
  },
};
</script>
