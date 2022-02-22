<script>
export default {
  emits: ['download', 'addToast', 'downloadAll'],
  props: {
    footer_data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
