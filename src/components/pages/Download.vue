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
        console.log('Download URL:', resp.details.file.dl_link);
        location.href = resp.details.file.dl_link;
        this.$emit('close');
      })
      .catch((err) => {
        this.$emit('err', err);
      });
  },
};
</script>

<style scoped>
.err {
  color: red;
}
</style>
