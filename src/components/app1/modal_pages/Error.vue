<template>
  <h2>Error</h2>
  <p>{{ err }}</p>
</template>

<script>
import AbstractPage from './AbstractPage.vue';

export default {
  extends: AbstractPage,
};
</script>

<style scoped>
.h3 {
  color: red;
}
</style>
