<template>
  <component
    v-if="showModal"
    :is="current_page_comp"
    v-bind="comp_props"
    v-model:footer_data="footer_data"
    v-model:msg="msg"
    v-model:isLogin="isLogin"
    v-model:pageParams="pageParams"
    :toastStatus="toastStatus"
    :custom_data="custom_data"
    :urlParams="urlParams"
    @err="err = $event"
    @redirect="onRedirect"
    @hideToast="onHideToast"
    @update:isLogin="onUpdateIsLogin"
    @update:pageParams="$emit('update:pageParams', $event)"
    ref="page"
  />
</template>

<script>
// Common
import loginApi from '@/api/login';

export default {
  emits: ['hideToast', 'writePageHistory', 'onAfterRedirect', 'update:current_page', 'update:isLogin', 'update:pageParams'],
  props: {
    node_params: {
      type: Object,
      default: () => ({}),
    },
    current_page: {
      type: String,
      default: '',
    },
    toastIds: {
      type: Object,
      default: () => {},
    },
    footer_data: {
      type: Object,
      default: () => {},
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
    toastStatus: {
      type: String,
      default: '',
    },
    urlParams: {
      type: Object,
      default: () => ({}),
    },
    showModal: {
      type: Boolean,
      default: () => false,
    },
    pageParams: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      msg: '',
      msg2: '',
      p_err_msg: '', // Do not manually modify, assign to 'err' computed prop instead
      redirect_params: {},
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    pages() {
      return {}; // To override
    },
    err: {
      get() {
        if (!this.current_page in this.pages) {
          return 'Page component <' + this.current_page + '> does not exist';
        }
        return this.p_err_msg;
      },
      set(msg) {
        this.p_err_msg = msg;
      },
    },
    current_page_comp() {
      return null; // To override
    },
    comp_props() {
      const page_params = {};
      if (this.current_page == 'Download' && this.node_params) {
        if (this.node_params.id) {
          page_params.doc_id = this.node_params.id;
        }
        if (this.node_params.public) {
          page_params.isPublic = true;
        }
      }
      return {
        ...page_params,
        err: this.err,
        msg: this.msg,
        msg2: this.msg2,
        toastIds: this.toastIds,
        ...this.redirect_params,
      };
    },
    custom_data() {
      // Custom for each app : to override
      return {};
    },
  },
  methods: {
    init() {
      this.setCurrentPage('');
      this.redirect_params = {};
      loginApi.isLogin({
        // Make sure we login anonymously if specified so. Should this be moved to App ?
        autoLogin: true,
        anonLogin: (this.node_params && this.node_params.public) || false,
      });
    },
    pageExec(method) {
      // Executes the given method of the current component
      this.$refs['page'][method]();
    },
    setCurrentPage(newPage) {
      this.$emit('update:current_page', newPage);
    },
    onRedirect({ target, msg, msg2, err, params }, writeHist = true) {
      // Reset eventual alerts after redirect
      this.msg = msg || '';
      this.msg2 = msg2 || '';
      this.err = err || '';
      this.redirect_params = params;
      this.setCurrentPage(target);
      const page_params = params ? params.page_params || {} : {};
      if (writeHist) {
        this.$emit('writePageHistory', { page: target, params: page_params });
      }
      this.$emit('hideToast', false);
      this.$nextTick(() => {
        // Some actions need to be done after the redirect is completed (to avoid being overridden)
        this.$emit('onAfterRedirect', { target, params });
      });
    },
    onHideToast(val) {
      this.$emit('hideToast', val);
    },
    onToastDownload() {
      // Notify the page about download started event
      this.$refs['page'].onToastDownload();
    },
    onUpdateIsLogin(isLogin) {
      this.$emit('update:isLogin', isLogin);
    },
  },
};
</script>

<style scoped></style>
