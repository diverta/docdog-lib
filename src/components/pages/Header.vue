<template>
  <n-button class="close-button" @click="$emit('close')">X</n-button>
  <h1 class="title">{{ title }}</h1>
</template>

<script>
import { NButton } from 'naive-ui';

export default {
  props: {
    title: {
      type: String,
      default: 'Default header',
    },
  },
  components: {
    NButton,
  },
  emits: ['close'],
};
</script>

<style scoped>
.title {
  float: left;
}
.close-button {
  float: right;
}
</style>
