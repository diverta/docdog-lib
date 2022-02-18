<template>
  <!-- Modal Content -->
  <div class="docdog-modal__body__section" v-if="msg || err">
    <AlertSuccess v-if="msg" :msg="msg" />
    <AlertError v-if="err" :err="err" />
  </div>
  <div class="docdog-modal__body__section">
    <div class="docdog-card__single">
      <CardModal :data="doc_data" />
    </div>
  </div>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import AlertSuccess from '@/components/AlertSuccess.vue';
import AlertError from '@/components/AlertError.vue';
import CardModal from '@/components/cards/CardModal.vue';
import docsApi from '@/api/docs';

export default {
  extends: AbstractPage,
  components: {
    AlertSuccess,
    AlertError,
    CardModal,
  },
  props: {
    doc_id: {
      type: String,
      default: '',
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
  mounted() {
    if (!this.doc_id && !this.doc_data) {
      this.$emit('err', 'Document id is undefined and data not provided');
    }
  },
  methods: {
    onDownload() {
      if (this.doc_data) {
        // Data has already been fetched (arriving from list, for example)
        this.download(this.doc_data.file.url);
      } else if (this.doc_id) {
        // Fetch using doc_id
        docsApi
          .getDocumentData(this.doc_id, this.isPublic)
          .then((resp) => {
            this.download(resp.details.file.url);
            this.$emit('close');
          })
          .catch((err) => {
            this.$emit('err', err);
          });
      }
    },
    download(url, name = '') {
      const link = document.createElement('a');
      link.download = name;
      link.href = url;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style scoped>
.err {
  color: red;
}
</style>
