<script>
// This is an abstract parent component of other page components. It is used define shared properties, such as props or data
export default {
  props: {
    err: {
      type: String,
      default: '',
    },
  },
  emits: ['close', 'err', 'redirect'],
};
</script>
