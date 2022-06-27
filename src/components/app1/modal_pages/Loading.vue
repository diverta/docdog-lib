<template>
  <div class="docdog-loader">
    <div class="docdog-loader__message">
      {{ loadingMessage }}
    </div>
    <div class="docdog-loader__icon"></div>
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
