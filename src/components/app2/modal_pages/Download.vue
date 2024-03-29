<template>
  <div class="kuroco-container--middle">
    <AlertSuccess v-if="msg" :msg="msg" />
    <AlertError v-if="err" :err="err" />

    <div class="kuroco-modal__body__section">
      <button
        type="button"
        class="kuroco-button--text kuroco-u-mx-0 kuroco-u-d-flex kuroco-u-d-flex-align-center"
        @click.prevent="redirect({ target: 'List' })"
      >
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.5323 7.82468C10.6848 7.9772 10.7645 8.16785 10.7715 8.39663C10.7784 8.62541 10.7056 8.81606 10.5531 8.96859L7.80771 11.6932H17.6661C17.9018 11.6932 18.0994 11.7729 18.2589 11.9323C18.4183 12.0918 18.498 12.2894 18.498 12.5251C18.498 12.7608 18.4183 12.9584 18.2589 13.1178C18.0994 13.2773 17.9018 13.357 17.6661 13.357H7.80771L10.5739 16.1024C10.7264 16.2688 10.7992 16.4629 10.7923 16.6848C10.7853 16.9066 10.7056 17.0938 10.5531 17.2463C10.3867 17.3988 10.1891 17.4751 9.96034 17.4751C9.73155 17.4751 9.5409 17.3988 9.38838 17.2463L5.24952 13.1075C5.16632 13.0243 5.10393 12.9341 5.06233 12.8371C5.02073 12.74 4.99994 12.636 4.99994 12.5251C4.99994 12.4142 5.02073 12.3102 5.06233 12.2131C5.10393 12.1161 5.16632 12.0259 5.24952 11.9427L9.36758 7.82468C9.53397 7.65829 9.72809 7.5751 9.94994 7.5751C10.1718 7.5751 10.3659 7.65829 10.5323 7.82468Z"
          />
        </svg>
        <span>一覧に戻る</span>
      </button>
    </div>
    <div class="kuroco-modal__body__section">
      <div class="kuroco-container--middle">
        <CardDocsDetail
          :data="data"
          :toastIds="toastIds"
          @addToast="addToast"
          @removeToast="removeToastById(data.topics_id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AbstractPage from '@/components/common/AbstractPage.vue';
import AlertSuccess from '@/components/app2/AlertSuccess.vue';
import AlertError from '@/components/app2/AlertError.vue';
import CardDocsDetail from '@/components/app2/cards/CardDocsDetail.vue';
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
    if (this.doc_data) {
      this.data = { ...this.doc_data };
      this.footer_data.doc_data = this.data;
      this.footer_data.isInToast = this.toastIds[this.data.topics_id] || false;
      this.footer_data.downloaded = false;
    } else {
      let isPublic = this.isPublic;
      let doc_id = this.doc_id;
      if (!doc_id && this.urlParams.docdog_id) {
        // Case when the doc is accessed by docdog_id in url
        doc_id = this.urlParams.docdog_id;
        isPublic = true;
      }
      if (!doc_id) {
        this.error('Document id is undefined and data not provided');
      } else {
        // Fetch data using doc id
        loginApi
          .isLogin({
            autoLogin: true,
            anonLogin: false,
          })
          .then((isLogin) => {
            if (isLogin || isPublic) {
              docsApi
                .getDocumentData(doc_id, !isLogin) // If not logged in, do anonLogin
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
              /*
            this.redirect({
              target: 'SignIn',
              params: { return: { target: 'Download', params: { doc_id, doc_data: this.doc_data } } },
            });
            */
            }
          });
      }
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
