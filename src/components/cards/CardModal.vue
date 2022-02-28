<template>
  <div class="docdog-card">
    <div class="docdog-card__thumb" :style="thumbnailStyle">
      <span class="docdog-card__thumb__badge">{{ data.type.label }}</span>
    </div>
    <div class="docdog-card__body">
      <p class="docdog-card__body__title">{{ data.subject }}</p>
      <!-- TODO: Show only in list modal -->
      <DownloadButton />
    </div>
    <div class="docdog-card__foot" v-if="deleteFooter">
      <!-- TODO: Show only in dlownload list modal -->
      <DeleteButton @click="removeToast" />
    </div>
  </div>
</template>

<script>
import AbstractCard from './AbstractCard.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import DeleteButton from '@/components/DeleteButton.vue';

export default {
  extends: AbstractCard,
  components: {
    DownloadButton,
    DeleteButton,
  },
};
</script>
