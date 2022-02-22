<template>
  <div class="docdog-button__list">
    <button type="button" class="docdog-button docdog-button--white" v-if="footer_data.isInToast">
      ダウンロードリストに入ってある
    </button>
    <button type="button" class="docdog-button docdog-button--white" v-else @click="$emit('addToast')">
      ダウンロードリストに追加する
    </button>
    <button type="button" class="docdog-button docdog-button--primary" @click="$emit('download')">
      ダウンロードする
    </button>
  </div>
</template>

<script>
import AbstractFooter from './AbstractFooter.vue';

export default {
  extends: AbstractFooter,
};
</script>
