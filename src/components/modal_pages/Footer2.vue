<template>
  <button type="button" class="docdog-button docdog-button--primary" @click="$emit('downloadAll')">
    まとめてダウンロードする
  </button>
</template>

<script>
import AbstractFooter from './AbstractFooter.vue';

export default {
  extends: AbstractFooter,
};
</script>
