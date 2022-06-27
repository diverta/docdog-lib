<template>
  <li class="docdog-cart__item">
    <div class="docdog-cart__item__thumb">
      <img v-if="data.thumbnail.url" :src="data.thumbnail.url" :alt="data.subject" />
      <img v-else :src="noimage_vertical" :alt="data.subject" />
    </div>
    <p class="docdog-cart__item__title">{{ data.subject }}</p>
    <DeleteButton v-if="can_remove" @click="removeToast" />
  </li>
</template>

<script>
import AbstractCard from './AbstractCard.vue';
import DeleteButton from '@/components/app2/buttons/DeleteButton.vue';
import { noimage_vertical } from '@/components/app2/svg_images';

export default {
  extends: AbstractCard,
  components: {
    DeleteButton,
  },
  props: {
    can_remove: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      noimage_vertical,
    };
  },
};
</script>
