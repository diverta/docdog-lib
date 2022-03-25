<template>
  <a class="docdog-card" @click.prevent="redirect({ target: 'TopicDetails', params: { data } })">
    <div class="docdog-card__thumb" :style="thumbnailStyle">
      <span class="docdog-card__thumb__badge">{{ data.type ? data.type.label : '' }}</span>
    </div>
    <div class="docdog-card__body">
      <time :datetime="data.ymd">{{ data.ymd }}</time>
      <p class="docdog-card__body__title">{{ data.subject }}</p>
    </div>
  </a>
</template>

<script>
import AbstractCard from './AbstractCard.vue';

export default {
  extends: AbstractCard,
};
</script>
