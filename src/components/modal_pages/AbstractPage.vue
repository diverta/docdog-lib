<script>
// This is an abstract parent component of other page components. It is used define shared properties, such as props or data
export default {
  props: {
    err: {
      type: String,
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
    process: {
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
  },
  emits: ['close', 'err', 'redirect', 'addToast', 'removeToast'],
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
    addToast(item) {
      this.$emit('addToast', item);
    },
    removeToast(idx) {
      this.$emit('removeToast', idx);
    },
    redirect(pageData) {
      // pageData = {target, msg}
      this.clearFooterData();
      this.$emit('redirect', pageData);
    },
    clearFooterData() {
      Object.keys(this.footer_data).forEach((key) => delete this.footer_data[key]); // Cleanup custom data set by the page for the footer
    },
  },
};
</script>
