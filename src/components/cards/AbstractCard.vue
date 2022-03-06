<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    deleteFooter: {
      type: Boolean,
      default: false,
    },
    toastIds: {
      type: Object,
      default: () => {},
    },
    showDownloadBtn: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['download', 'addToast', 'removeToast'],
  computed: {
    thumbnailStyle() {
      if (this.data && this.data.type && this.data.type.key == 'image' && this.data.file) {
        return 'background-image: url(' + this.data.file.url + ')';
      } else {
        // TODO preview image ?
        return '';
      }
    },
    isInToast() {
      return this.toastIds ? this.toastIds[this.data.topics_id] || false : false;
    },
  },
  methods: {
    onDownload() {
      this.$emit('download');
    },
    onAdd() {
      this.$emit('addToast', this.data);
    },
    removeToast() {
      this.$emit('removeToast');
    },
  },
};
</script>
