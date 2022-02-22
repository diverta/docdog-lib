<template>
  <!-- Modal Content -->
  <div class="docdog-modal__body__section">
    <p class="docdog-modal__body__heading">選択中のファイル</p>
    <ul class="docdog-card__list">
      <li v-for="(item, idx) in list">
        <CardModal :data="item" :toastIds="toastIds" :deleteFooter="true" @removeToast="onRemoveToast(idx)" />
      </li>
    </ul>
  </div>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import CardModal from '@/components/cards/CardModal.vue';

export default {
  extends: AbstractPage,
  components: {
    CardModal,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    onRemoveToast(idx) {
      this.removeToast(idx);
      if (this.list.length == 0) {
        this.close();
      }
    },
  },
};
</script>
