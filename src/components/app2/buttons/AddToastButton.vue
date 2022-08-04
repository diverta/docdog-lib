<template>
  <button type="button" :class="isInToast ? 'kuroco-button--add-list--remove' : 'kuroco-button--add-list'">
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
