<template>
  <button class="close-button" @click="$emit('close')">X</button>
  <h1>Header</h1>
  <hr />
</template>

<script>
export default {
  emits: ['close'],
};
</script>

<style scoped>
.close-button {
  float: right;
}
</style>
