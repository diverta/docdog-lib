<template>
  <div class="docdog-modal__body__section docdog-modal__body__text" v-html="content" />
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
