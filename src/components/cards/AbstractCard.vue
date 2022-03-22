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
      if (this.data && this.data.thumbnail && this.data.thumbnail.url) {
        return 'background-image: url(' + this.data.thumbnail.url + ')';
      } else if (this.data && this.data.type && this.data.type.key == 'image' && this.data.file) {
        return 'background-image: url(' + this.data.file.url + ')';
      } else {
        return 'background-image: url(/src/assets/image/noimage.svg)';
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
