<template>
  <header class="kuroco-modal__head">
    <div class="kuroco-modal__head__nav">
      <button type="button" aria-label="Back to top" class="kuroco-modal__head__nav__logo" @click.prevent="closeModal">
        <!-- site logo -->
        <img :src="site_logo" alt="site-title" />
      </button>
    </div>
  </header>
</template>

<script>
import { site_logo } from '@/components/app2/svg_images';

export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'redirect', 'logout'],
  data() {
    return {
      kuroco_menu_display: false,
      kuroco_spmenu_display: false,
      site_logo,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    redirect(target, params = {}) {
      this.kuroco_menu_display = false;
      this.$emit('redirect', { target, params });
    },
    logout() {
      this.kuroco_menu_display = false;
      this.kuroco_spmenu_display = false;
      this.$emit('logout');
    },
  },
};
</script>
