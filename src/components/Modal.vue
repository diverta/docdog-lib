<style>
/* body {
  overflow-y: hidden;
} */
</style>
<style lang="scss">
$color-link: #1371ff;
$color-primary: #1371ff;
$color-border: #ccc;
$color-gray: #666;
$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 12px;
$spacing-x-sm: 4px;
$spacing-sm: 8px;
$spacing-md: 12px;
$spacing-lg: 24px;
$spacing-x-lg: 36px;
$transition: 0.2s;
.docdog {
  color: #222;
  font-size: 14px;
  font-family: sans-serif;
  line-height: 1.5;
  word-wrap: break-word;
  a {
    color: $color-link;
  }
}
.docdog-modal {
  width: 90%;
  max-height: 90%;
  border-radius: $border-radius-lg;
  background-color: #fff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  z-index: 11100;
  @media screen and (min-width: 768px) {
    width: 800px;
    min-height: 600px;
  }
  &__bg {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    transition: 2s;
    z-index: 10000;
  }
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-sm $spacing-md $spacing-sm $spacing-x-lg;
    border-bottom: 1px solid $color-border;
    &__heading {
      margin: 0;
      font-size: 18px;
      font-weight: bold;
    }
    &__close {
      width: 50px;
      height: 50px;
      background-color: transparent;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  &__body {
    padding: $spacing-x-lg;
    &__heading {
      margin: 0 0 $spacing-lg;
      font-size: 16px;
      font-weight: bold;
    }
    &__text {
      margin: 0;
      color: $color-gray;
      font-size: 13px;
      &:not(:last-child) {
        margin-bottom: $spacing-md;
      }
      &:not(:first-child) {
        margin-top: $spacing-md;
      }
      a {
        display: inline-block;
        padding: 0 $spacing-x-sm;
      }
    }
    &__section {
      & + & {
        margin-top: $spacing-lg;
      }
    }
  }
  &__foot {
    padding: $spacing-x-lg;
    .docdog-modal__body + & {
      padding-top: 0;
    }
  }
  @media screen and (max-width: 767px) {
    .docdog-modal__head {
      padding: $spacing-sm $spacing-sm $spacing-sm $spacing-lg;
    }
    .docdog-modal__body,
    .docdog-modal__foot {
      padding: $spacing-lg;
    }
  }
}
</style>

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
        <!-- <footer class="docdog-modal__foot">
          <slot name="footer">
            <button type="button" v-on:click="closeModal">close</button>
          </slot>
        </footer> -->
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
