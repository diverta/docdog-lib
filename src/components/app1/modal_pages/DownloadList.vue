<template>
  <div class="docdog-container--middle">
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />

    <div class="docdog-modal__body__section">
      <h1 class="docdog-modal__body__pagetitle">ダウンロードリスト</h1>
    </div>

    <div class="docdog-modal__body__section" v-if="list.length">
      <p>選択中のファイル</p>
      <ul class="docdog-card__list">
        <li v-for="(item, idx) in list">
          <CardDocs :data="item" :toastIds="toastIds" :deleteFooter="true" @removeToast="onRemoveToast(idx)" />
        </li>
      </ul>
    </div>

    <div class="docdog-modal__body__section" v-if="!list.length">
      <p>選択中のファイルはありません。</p>
    </div>
  </div>
  <Loading v-if="toastStatus == 'downloading'" :loadingMessage="'圧縮ファイル作成中'" />
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import AlertSuccess from '@/components/app1/AlertSuccess.vue';
import CardDocs from '@/components/app1/cards/CardDocs.vue';
import Loading from '@/components/app1/modal_pages/Loading.vue';

export default {
  extends: AbstractPage,
  components: {
    AlertSuccess,
    CardDocs,
    Loading,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.footer_data.toastList = this.list;
  },
  methods: {
    onRemoveToast(idx) {
      this.removeToast(idx);
      if (this.list.length == 0) {
        this.close();
      }
    },
  },
};
</script>
