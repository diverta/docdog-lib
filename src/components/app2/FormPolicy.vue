<template>
  <div class="kuroco-modal__body__section kuroco-modal__body__text" v-html="content" />
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: () => '',
    },
  },
  methods: {},
};
</script>
