<script>
export default {
  emits: ['redirect', 'download', 'addToast', 'downloadToast'],
  props: {
    footer_data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    download() {
      this.$emit('download', this.footer_data.doc_data);
    },
    addToast() {
      this.$emit('addToast', this.footer_data.doc_data);
    },
    downloadToast() {
      this.$emit('downloadToast');
    },
    redirect(pageData) {
      this.$emit('redirect', pageData);
    },
  },
};
</script>
