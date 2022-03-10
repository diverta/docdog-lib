<template>
  <div class="docdog-button__list" v-if="!footer_data.downloaded">
    <button type="button" aria-label="Back to docs" class="docdog-button docdog-button--sm docdog-button--white-outline" @click.prevent="redirect({ target: 'List' })">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
      </svg>
    </button>
    <button type="button" class="docdog-button docdog-button--white" v-if="footer_data.isInToast" @click="$emit('downloadToast')">
      追加済み<br>
      ダウンロードリストを見る
    </button>
    <button type="button" class="docdog-button docdog-button--white" v-else @click="addToast">
      ダウンロードリストに追加する
    </button>
    <button type="button" class="docdog-button docdog-button--primary" @click="download">
      ダウンロードする
    </button>
  </div>

  <div class="docdog-button__list" v-if="footer_data.downloaded">
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
