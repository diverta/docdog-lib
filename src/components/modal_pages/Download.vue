<template>
  <AlertSuccess v-if="msg" :msg="msg" />
  <AlertError v-if="err" :err="err" />

  <div class="docdog-modal__body__section">
    <h1 class="docdog-modal__body__pagetitle">ダウンロード</h1>
  </div>
  <div class="docdog-modal__body__section">
    <div class="docdog-card__single">
      <CardModal :data="data" :toastIds="toastIds" />
    </div>
  </div>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import AlertSuccess from '@/components/AlertSuccess.vue';
import AlertError from '@/components/AlertError.vue';
import CardModal from '@/components/cards/CardModal.vue';
import docsApi from '@/api/docs';
import loginApi from '@/api/login';

export default {
  extends: AbstractPage,
  components: {
    AlertSuccess,
    AlertError,
    CardModal,
  },
  props: {
    doc_id: {
      type: Number,
      default: 0,
    },
    doc_data: {
      type: Object,
      default: () => null,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    if (!this.doc_id && !this.doc_data) {
      this.error('Document id is undefined and data not provided');
    }
    if (this.doc_data) {
      this.data = { ...this.doc_data };
      this.footer_data.doc_data = this.data;
      this.footer_data.isInToast = this.toastIds[this.data.topics_id] || false;
      this.footer_data.downloaded = false;
    } else {
      // Fetch data using doc id
      loginApi
        .isLogin({
          autoLogin: true,
          anonLogin: false,
        })
        .then((isLogin) => {
          if (isLogin || this.isPublic) {
            docsApi
              .getDocumentData(this.doc_id, !isLogin) // If not logged in, do anonLogin
              .then((resp) => {
                this.data = resp.details;
                this.footer_data.doc_data = this.data;
                this.footer_data.isInToast = this.toastIds[this.data.topics_id] || false;
                this.footer_data.downloaded = false;
              })
              .catch((err) => {
                this.error(err);
              });
          } else {
            this.redirect({
              target: 'SignIn',
              params: { return: { target: 'Download', params: { doc_id: this.doc_id, doc_data: this.doc_data } } },
            });
          }
        });
    }
  },
  methods: {
    onDownload() {
      if (this.data) {
        // Data has been fetched
        this.download(this.data);
        this.footer_data.downloaded = true;
      }
    },
    addToastCurrent() {
      this.addToast(this.data);
      this.footer_data.isInToast = true;
      this.close();
    },
    getPageHistParams() {
      console.log('getPageHistParams: CUSTOM');
      return this.data;
    },
  },
};
</script>

<style scoped>
.err {
  color: red;
}
</style>
