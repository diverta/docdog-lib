<template>
  <div class="docdog-card">
    <div class="docdog-card__thumb" :style="thumbnailStyle">
      <span class="docdog-card__thumb__badge">{{ data.type.label }}</span>
    </div>
    <div class="docdog-card__body">
      <p class="docdog-card__body__title">{{ data.subject }}</p>
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
