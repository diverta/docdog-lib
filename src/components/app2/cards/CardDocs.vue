<template>
  <div
    class="docdog-card--media docdog-card--link"
    @click.prevent="redirect({ target: 'Download', params: { doc_data: data } })"
  >
    <div class="docdog-card--media__thumb">
      <img v-if="data.thumbnail.url" :src="data.thumbnail.url" :alt="data.subject" />
      <img v-else :src="noimage_vertical" :alt="data.subject" />
    </div>
    <div class="docdog-card--media__body__inner">
      <div class="docdog-card--media__body">
        <p class="docdog-card--media__body__title">{{ data.subject }}</p>
        <p class="docdog-u-my-sm">
          <span class="docdog-badge">{{ data.contents_type_nm }}</span>
        </p>
        <p v-if="data.file && data.file.desc">{{ data.file.desc }}</p>
      </div>
      <div class="docdog-card--media__foot">
        <AddToastButton @click.stop="onAdd()" :isInToast="isInToast" />
      </div>
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
