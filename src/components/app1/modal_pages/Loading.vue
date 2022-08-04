<template>
  <div class="kuroco-loader">
    <div class="kuroco-loader__message">
      {{ loadingMessage }}
    </div>
    <div class="kuroco-loader__icon"></div>
  </div>
</template>

<script>
import AbstractPage from '@/components/common/AbstractPage.vue';

export default {
  extends: AbstractPage,
  props: {
    loadingMessage: {
      type: String,
      default: 'Loading...',
    },
  },
};
</script>
