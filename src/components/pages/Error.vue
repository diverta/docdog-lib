<script setup>
import AbstractPage from './AbstractPage.vue';
</script>

<template>
  <h2>Error</h2>
  <p>{{ this.err }}</p>
</template>

<script>
export default {
  extends: AbstractPage,
};
</script>

<style scoped>
.h3 {
  color: red;
}
</style>
