<template>
  <div class="kuroco-container--middle">
    <AlertSuccess v-if="msg" :msg="msg" />
    <AlertError v-if="err" :err="err" />

    <div class="kuroco-modal__body__pagetitle kuroco-modal__body__section">
      <h1>ダウンロード</h1>
    </div>
    <div class="kuroco-modal__body__section">
      <div class="kuroco-container--middle">
        <CardDocsDetail :data="data" :toastIds="toastIds" />
      </div>
    </div>
  </div>
</template>

<script>
import AbstractPage from '@/components/common/AbstractPage.vue';
import AlertSuccess from '@/components/app1/AlertSuccess.vue';
import AlertError from '@/components/app1/AlertError.vue';
import CardDocsDetail from '@/components/app1/cards/CardDocsDetail.vue';
import docsApi from '@/api/docs';
import loginApi from '@/api/login';

export default {
  extends: AbstractPage,
  components: {
    AlertSuccess,
    AlertError,
    CardDocsDetail,
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
      return this.data;
    },
  },
};
</script>