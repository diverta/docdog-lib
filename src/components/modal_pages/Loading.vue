<template>
  <div class="docdog-loader">
    <div class="docdog-loader__message">
      <!-- TODO: DownloadList message -->
      圧縮ファイル作成中
      <!-- TODO: Else -->
      Loading...
    </div>
    <div class="docdog-loader__icon"></div>
  </div>
</template>

<script>
import AbstractPage from './AbstractPage.vue';

export default {
  extends: AbstractPage,
};
</script>