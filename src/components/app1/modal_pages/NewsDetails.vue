<template>
  <!-- Modal Content -->
  <div class="docdog-container--middle">
    <article class="docdog-modal__body__section">
      <div class="docdog-modal__body__pagetitle docdog-modal__body__section">
        <h1>{{ data.subject }}</h1>
      </div>
      <div class="docdog-modal__body__section">
        <div class="docdog-article" v-html="data.wysiwyg"></div>
      </div>
    </article>
    <nav class="docdog-modal__body__section">
      <button
        type="button"
        class="docdog-button docdog-button--white docdog-button--wide"
        @click.prevent="redirect({ target: 'Mypage' })"
      >
        マイページに戻る
      </button>
    </nav>
  </div>
</template>

<script>
import AbstractPage from '@/components/common/AbstractPage.vue';

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
