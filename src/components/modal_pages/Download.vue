<template>
  <h2>Please wait ...</h2>
  <p class="err" v-if="err.length > 0" v-html="err"/>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import docsApi from '@/api/docs';

export default {
  extends: AbstractPage,
  props: {
    doc_id: {
      type: String,
      default: '',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    docsApi
      .getDocumentData(this.doc_id, this.isPublic)
      .then((resp) => {
        this.download(resp.details.file.url, 'a');
        this.$emit('close');
      })
      .catch((err) => {
        this.$emit('err', err);
      });
  },
  methods: {
    download(url, name) {
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
