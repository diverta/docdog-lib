<template>
  <div class="docdog-card docdog-card--link" @click.prevent="redirect({ target: 'Download', params: { doc_data: data } })">
    <div
      class="docdog-card__thumb"
      :style="thumbnailStyle"
    >
      <span class="docdog-card__thumb__badge">{{ data.type ? data.type.label : '' }}</span>
    </div>
    <div class="docdog-card__body">
      <p class="docdog-card__body__title">{{ data.subject }}</p>
    </div>
    <template v-if="showDownloadBtn">
      <div class="docdog-card__foot docdog-u-d-flex-justify-center">
        <!-- TODO: Componentize add list button -->
        <button type="button" class="docdog-button--add-list" @click.stop="onAdd()" :disabled="isInToast">
          <span v-if="isInToast">追加済み</span>
          <span v-else>ダウンロードリストに追加</span>
        </button>
      </div>
    </template>
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
