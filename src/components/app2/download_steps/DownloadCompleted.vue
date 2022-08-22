<template>
  <section class="kuroco-modal__body__complete kuroco-modal__body__section">
    <h2>
      <span class="kuroco-u-hidden-sp">ダウンロードしました</span
      ><span class="kuroco-u-hidden-pc">ダウンロードリンクを送信しました</span>
    </h2>
    <div v-if="htmlParts.ext_2" v-html="htmlParts.ext_2" ref="customContents"></div>
    <div class="kuroco-modal__body__complete__button">
      <a
        v-for="(item, idx) in htmlParts.ext_6"
        :href="item.ext_6.url"
        :class="anchorTitleClass(item)"
        :target="ext8options(item).includes('blank') ? '_blank' : null"
        :rel="ext8options(item).includes('blank') ? 'noopener' : null"
      >
        {{ item.ext_6.title }}
      </a>
    </div>
  </section>
</template>

<script>
export default {
  emits: ['redirect', 'closeModal'],
  props: {
    htmlParts: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    anchorTitleClass(item) {
      return [
        { 'kuroco-button--primary': item.ext_7.key == 'primary' },
        { 'kuroco-button--white': item.ext_7.key == 'white' },
      ];
    },
    ext8options(item) {
      return item.ext_8.map((i) => i.key);
    },
    closeModal() {
      this.$emit('closeModal');
    },
    redirect(params) {
      this.$emit('redirect', params);
    },
  },
};
</script>
