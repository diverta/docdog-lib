<script setup>
import AbstractPage from './AbstractPage.vue';
</script>

<template>
  <h1>Downloading...</h1>
  <p v-if="err.length > 0" class="err">{{ err }}</p>
</template>

<script>
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
