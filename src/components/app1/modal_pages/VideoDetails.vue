<template>
  <article class="docdog-modal__body__section">
    <div class="docdog-modal__body__section">
      <h1 class="docdog-modal__body__pagetitle">{{ data ? data.subject : '' }}</h1>
    </div>
    <div class="docdog-modal__body__section">
      <div class="docdog-card">
        <div class="docdog-card__video">
          <iframe :src="data && data.video ? data.video.url : ''" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </article>
  <nav class="docdog-modal__body__section">
    <button
      type="button"
      class="docdog-button docdog-button--white docdog-button--wide"
      @click.prevent="redirect({ target: 'Videos' })"
    >
      動画一覧に戻る
    </button>
  </nav>
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
