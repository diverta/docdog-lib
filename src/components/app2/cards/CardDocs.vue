<template>
  <div
    class="kuroco-card--media kuroco-card--link"
    @click.prevent="
      redirect({ target: 'Download', params: { doc_data: data, page_params: { docdog_id: data.topics_id } } })
    "
  >
    <div class="kuroco-card--media__thumb">
      <img v-if="data.thumbnail && data.thumbnail.url" :src="data.thumbnail.url" :alt="data.subject" />
      <img v-else :src="noimage_vertical" :alt="data.subject" />
    </div>
    <div class="kuroco-card--media__body">
      <p class="kuroco-card--media__body__title">{{ data.subject }}</p>
      <p class="kuroco-u-my-sm">
        <span class="kuroco-badge">{{ data.contents_type_nm }}</span>
      </p>
      <p v-if="data.desc">{{ data.desc }}</p>
    </div>
    <div class="kuroco-card--media__foot">
      <AddToastButton @click.stop="onToggle()" :isInToast="isInToast" />
    </div>
  </div>
</template>

<script>
import AbstractCard from './AbstractCard.vue';
import AddToastButton from '@/components/app2/buttons/AddToastButton.vue';
import { noimage_vertical } from '@/components/app2/svg_images';

export default {
  extends: AbstractCard,
  components: {
    AddToastButton,
  },
  data() {
    return {
      noimage_vertical,
    };
  },
};
</script>
