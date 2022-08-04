<template>
  <div class="kuroco-card kuroco-card--link" @click.prevent="redirect({ target: 'VideoDetails', params: { data } })">
    <div class="kuroco-card__thumb" :style="thumbnailStyle">
      <span class="kuroco-card__thumb__badge">{{ data.type ? data.type.label : '' }}</span>
    </div>
    <div class="kuroco-card__body">
      <p class="kuroco-card__body__title">{{ data.subject }}</p>
    </div>
  </div>
</template>

<script>
import AbstractCard from './AbstractCard.vue';

export default {
  extends: AbstractCard,
};
</script>
