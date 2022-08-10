<template>
  <header class="kuroco-modal__head">
    <div class="kuroco-modal__head__logo" v-if="site_logo">
      <img :src="site_logo" alt="site-title" />
    </div>
    <nav class="kuroco-modal__head__nav" v-if="showReturnButton">
      <button type="button" class="kuroco-modal__head__nav__button" @click.prevent="closeModal">
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.5323 7.82468C10.6848 7.9772 10.7645 8.16785 10.7715 8.39663C10.7784 8.62541 10.7056 8.81606 10.5531 8.96859L7.80771 11.6932H17.6661C17.9018 11.6932 18.0994 11.7729 18.2589 11.9323C18.4183 12.0918 18.498 12.2894 18.498 12.5251C18.498 12.7608 18.4183 12.9584 18.2589 13.1178C18.0994 13.2773 17.9018 13.357 17.6661 13.357H7.80771L10.5739 16.1024C10.7264 16.2688 10.7992 16.4629 10.7923 16.6848C10.7853 16.9066 10.7056 17.0938 10.5531 17.2463C10.3867 17.3988 10.1891 17.4751 9.96034 17.4751C9.73155 17.4751 9.5409 17.3988 9.38838 17.2463L5.24952 13.1075C5.16632 13.0243 5.10393 12.9341 5.06233 12.8371C5.02073 12.74 4.99994 12.636 4.99994 12.5251C4.99994 12.4142 5.02073 12.3102 5.06233 12.2131C5.10393 12.1161 5.16632 12.0259 5.24952 11.9427L9.36758 7.82468C9.53397 7.65829 9.72809 7.5751 9.94994 7.5751C10.1718 7.5751 10.3659 7.65829 10.5323 7.82468Z"
          ></path>
        </svg>
        ダウンロードを中断する
      </button>
    </nav>
  </header>
</template>

<script>
//import { site_logo } from '@/components/app2/svg_images';

export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
    htmlParts: {
      type: Object,
      default: () => {},
    },
    showReturnButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['close', 'redirect', 'logout'],
  data() {
    return {
      kuroco_menu_display: false,
      kuroco_spmenu_display: false,
    };
  },
  computed: {
    site_logo() {
      return (this.htmlParts && this.htmlParts.ext_5 && this.htmlParts.ext_5.url) || null;
    },
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
