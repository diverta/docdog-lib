<template>
  <template v-if="footer_data.toastList && footer_data.toastList.length > 0">
    <button type="button" class="kuroco-button--download" @click="downloadToast">
      まとめてダウンロードする
    </button>
  </template>
  <template v-else>
    <button
      type="button"
      class="kuroco-button--white"
      @click.prevent="redirect({ target: 'List' })"
    >
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
