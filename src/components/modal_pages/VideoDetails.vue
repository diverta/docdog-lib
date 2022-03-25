<template>
  <article class="docdog-modal__body__section">
    <div class="docdog-modal__body__section">
      <h1 class="docdog-modal__body__pagetitle">{{ data.subject }}</h1>
    </div>
    <div class="docdog-modal__body__section">
      <div class="docdog-card">
        <div class="docdog-card__video">
          <iframe :src="data.video.url" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </article>
  <nav class="docdog-modal__body__section">
    <button
      type="button"
      class="docdog-button docdog-button--white docdog-button--wide"
      @click.prevent="redirect({ target: 'Videos' })"
    >
      動画一覧に戻る
    </button>
  </nav>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import CardVideos from '@/components/cards/CardVideos.vue';
import docsApi from '@/api/docs';
import loginApi from '@/api/login';

export default {
  extends: AbstractPage,
  components: {
    CardVideos,
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
  },
};
</script>

