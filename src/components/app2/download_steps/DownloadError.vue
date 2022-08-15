<template>
  <AlertError :err="err" />
  <a @click.prevent="redirect({'target': 'List'})">トップに戻る</a>
</template>

<script>
import AlertError from '@/components/app2/AlertError.vue';

export default {
  emits: ['redirect', 'closeModal'],
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
      err: 'ダウンロードできませんでした。',
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    redirect(params) {
      this.$emit('redirect', params);
    },
  },
};
</script>
