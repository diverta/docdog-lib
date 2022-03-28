<template>
  <div class="docdog-card docdog-card--link" @click.prevent="redirect({ target: 'VideoDetails', params: { data } })">
    <div class="docdog-card__thumb" :style="thumbnailStyle">
      <span class="docdog-card__thumb__badge">{{ data.type ? data.type.label : '' }}</span>
    </div>
    <div class="docdog-card__body">
      <p class="docdog-card__body__title">{{ data.subject }}</p>
    </div>
  </div>
</template>

<script>
import AbstractCard from './AbstractCard.vue';

export default {
  extends: AbstractCard,
};
</script>
