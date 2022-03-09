<template>

  <!-- TODO: Show only list count > 0 -->
  <div class="docdog-button__list">
    <button type="button" class="docdog-button docdog-button--white" @click.prevent="redirect({ target: 'List' })">
      資料一覧に戻る
    </button>
    <button type="button" class="docdog-button docdog-button--primary" @click="downloadToast">
      まとめてダウンロードする
    </button>
  </div>

  <!-- TODO: Show only list count == 0 -->
  <div class="docdog-button__list">
    <button type="button" class="docdog-button docdog-button--white docdog-button--wide" @click.prevent="redirect({ target: 'List' })">
      資料一覧に戻る
    </button>
  </div>

</template>

<script>
import AbstractFooter from './AbstractFooter.vue';

export default {
  extends: AbstractFooter,
};
</script>
