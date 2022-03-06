<template>
  <div class="docdog-button__list">
    <button type="button" class="docdog-button docdog-button--white" v-if="footer_data.isInToast">
      追加済み
    </button>
    <button type="button" class="docdog-button docdog-button--white" v-else @click="addToast">
      ダウンロードリストに追加する
    </button>
    <button type="button" class="docdog-button docdog-button--primary" @click="download">
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
