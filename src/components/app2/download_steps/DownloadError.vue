<template>
  <AlertError :err="err" />
</template>

<script>
import AlertError from '@/components/app2/AlertError.vue';

export default {
  components: {
    AlertError,
  },
  props: {
    htmlParts: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      err: 'ダウンロードできませんでした。再度お試しください。',
    };
  },
};
</script>
