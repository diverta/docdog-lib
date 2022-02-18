<template>
  <div class="docdog" v-if="show">
    <div class="docdog-modal__bg">
      <section class="docdog-modal">
        <header class="docdog-modal__head">
          <slot name="header">
            <p class="docdog-modal__head__heading">{{ title }}</p>
            <button type="button" aria-label="Close" class="docdog-modal__head__close" @click.prevent="closeModal">
              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.8334 1.84163L10.6584 0.666626L6.00008 5.32496L1.34175 0.666626L0.166748 1.84163L4.82508 6.49996L0.166748 11.1583L1.34175 12.3333L6.00008 7.67496L10.6584 12.3333L11.8334 11.1583L7.17508 6.49996L11.8334 1.84163Z"
                  fill="#AAAAAA"
                />
              </svg>
            </button>
          </slot>
        </header>
        <div class="docdog-modal__body">
          <slot></slot>
        </div>
        <footer class="docdog-modal__foot">
          <slot name="footer" v-bind="$attrs"></slot>
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
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
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>
