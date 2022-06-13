<template>
  <template v-if="!footer_data.downloaded">
    <button type="button" class="docdog-button--add-list" v-if="footer_data.isInToast" disabled>
      追加済み
    </button>
    <button type="button" class="docdog-button--add-list" v-else @click="addToast">
      ダウンロードリストに追加
    </button>
  </template>

  <template v-if="footer_data.downloaded">
    <button type="button" class="docdog-button docdog-button--white docdog-button--wide" @click.prevent="redirect({ target: 'List' })">
      資料一覧に戻る
    </button>
  </template>

</template>

<script>
import AbstractFooter from './AbstractFooter.vue';

export default {
  extends: AbstractFooter,
};
</script>
