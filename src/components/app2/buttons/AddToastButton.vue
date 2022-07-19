<template>
  <button type="button" class="docdog-button--add-list" :class="isInToast ? 'docdog-button--add-list--disabled' : ''">
    <span v-if="isInToast">追加済み</span>
    <span v-else>ダウンロードリストに追加</span>
  </button>
</template>

<script>
export default {
  props: {
    isInToast: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
};
</script>
