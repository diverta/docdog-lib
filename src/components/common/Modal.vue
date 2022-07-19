<template>
  <div class="docdog" v-show="show">
    <div class="docdog-modal__bg" @click.self="closeModal">
      <section class="docdog-modal">
        <slot name="header" v-bind="$attrs"></slot>
        <div class="docdog-modal__body" ref="modalBody">
          <slot></slot>
        </div>
        <footer v-if="this.$slots.footer" class="docdog-modal__foot">
          <slot name="footer" v-bind="$attrs"></slot>
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  emits: ['scroll'],
  mounted() {
    this.$refs.modalBody.addEventListener(
      'scroll',
      _.throttle(() => {
        this.$emit('scroll');
      }, 500)
    );
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    resetView() {
      this.$refs['modalBody'].scrollTop = 0;
    },
  },
  watch: {
    show: function (shown) {
      if (shown) {
        document.querySelector('body').classList.add('docdog-modal-open');
      } else {
        document.querySelector('body').classList.remove('docdog-modal-open');
      }
    },
  },
};
</script>
