<template>
  <div class="kuroco-container--middle">
    <article class="kuroco-modal__body__section">
      <div class="kuroco-modal__body__pagetitle kuroco-modal__body__section">
        <h1>{{ data ? data.subject : '' }}</h1>
      </div>
      <div class="kuroco-modal__body__section">
        <div class="kuroco-card">
          <div class="kuroco-card__video">
            <iframe :src="data && data.video ? data.video.url : ''" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </article>
    <nav class="kuroco-modal__body__section">
      <button
        type="button"
        class="kuroco-button--white kuroco-button--wide"
        @click.prevent="redirect({ target: 'Videos' })"
      >
        動画一覧に戻る
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
