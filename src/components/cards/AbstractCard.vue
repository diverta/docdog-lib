<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['download', 'add'],
  computed: {
    thumbnailStyle() {
      if (this.data && this.data.type && this.data.type.key == 'image' && this.data.file) {
        return 'background-image: url(' + this.data.file.url + ')';
      } else {
        // TODO preview image ?
        return '';
      }
    },
  },
  methods: {
    onDownload() {
      this.$emit('download', this.data);
    },
    onAdd() {
      this.$emit('add', this.data);
    },
  },
};
</script>
