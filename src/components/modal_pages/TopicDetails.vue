<template>
  <!-- Modal Content -->
  <div class="docdog-modal__body__section">
    <h1 class="docdog-modal__body__pagetitle">{{ data.subject }}</h1>
    <a @click.prevent="redirect({ target: 'Topics' })">一覧へ戻る</a>
  </div>
</template>

<script>
import AbstractPage from './AbstractPage.vue';

export default {
  extends: AbstractPage,
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
