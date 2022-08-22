<script>
export default {
  inheritAttrs: false, // disable automatic event propagation
  props: {
    err: {
      type: [String, Array],
      default: '',
    },
    msg: {
      type: String,
      default: '',
    },
    msg2: {
      type: String,
      default: '',
    },
    toastIds: {
      type: Object,
      default: () => {},
    },
    return: {
      type: Object, // Used after SignUp or SignIn process to redirect to other page
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
    custom_data: {
      type: Object,
      default: () => ({}),
    },
    pageParams: {
      type: Object,
      default: () => ({}),
    },
    deviceType: {
      type: String,
      default: 'pc',
    },
  },
  emits: [
    'close',
    'err',
    'redirect',
    'addToast',
    'removeToast',
    'removeToastById',
    'hideToast',
    'onLogin',
    'logout',
    'update:msg',
    'update:isLogin',
    'update:pageParams',
    'resetView',
    'update:current_page',
    'downloadToast',
  ],
  unmount() {
    this.clearFooterData();
    this.$emit('err', '');
  },
  methods: {
    close() {
      this.clearFooterData();
      this.$emit('close');
    },
    error(err) {
      this.$emit('err', err);
    },
    download(data) {
      //this.redirect({ target: 'Download', params: { doc_data: data } });
      if (data.file && data.file.url) {
        const url = data.file.url;
        const link = document.createElement('a');
        link.download = name;
        link.href = url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('[DocDog] Download unavailable');
      }
    },
    addToast(item) {
      this.$emit('addToast', item);
    },
    removeToast(idx) {
      this.$emit('removeToast', idx);
    },
    removeToastById(id) {
      this.$emit('removeToastById', id);
    },
    redirect(pageData) {
      // pageData = {target, msg}
      this.clearFooterData();
      this.$emit('redirect', pageData);
    },
    clearFooterData() {
      Object.keys(this.footer_data).forEach((key) => delete this.footer_data[key]); // Cleanup custom data set by the page for the footer
    },
    logout() {
      this.$emit('logout'); // Logout must be done by App itself, as it needs to do onLogout actions
    },
    onLogin() {
      this.$emit('onLogin');
    },
    setMsg(msg) {
      this.$emit('update:msg', msg);
    },
    resetView() {
      this.$emit('resetView');
    },
    downloadToast() {
      this.$emit('downloadToast');
    },
    onToastDownload() {
      // Each page may override this method to add handling when the download has started
      // Dont add code here, as any overrided method will run instead
    },
    updatePageParam(param, value) {
      this.$emit('update:pageParams', { ...this.pageParams, [param]: value });
    },
  },
};
</script>
