<script>
export default {
  emits: ['update', 'validate'],
  props: {
    el: {
      type: Object,
      default: () => {},
      required: true,
    },
    initValue: {
      type: [String, Number, Object, Array, Boolean, null],
      required: true,
      default: () => null,
    },
  },
  data() {
    return {
      value: null,
      optionsEmptyChoice: false, // May be overriden in child /components/app1 if necessary
    };
  },
  created() {
    this.value = this.initValue != null ? this.initValue : this.getDefaultValue();
  },
  computed: {
    isRequired() {
      return this.el.limit_item && this.el.limit_item.required;
    },
    optionsArr() {
      if (this.el.options) {
        const arr = Object.entries(this.el.options).map(([idx, { key, value }]) => {
          return { value: key, name: value };
        });
        if (this.optionsEmptyChoice) {
          arr.unshift({ value: '', name: '選択してください' });
        }
        return arr;
      }
      return null;
    },
  },
  methods: {
    setValue(val) {
      // Top to bottom : normally happens only during initial load
      // This method may be overriden by each FormElement
      this.value = val;
    },
    updateValue(val) {
      // Bottom to top : happens when user action triggers a live update
      // This method may be overriden by each FormElement
      this.value = val;
      this.updateValueParent(val);
    },
    updateValueParent(val) {
      // Shared handling of update
      this.$emit('update', val);
    },
    validate() {
      this.$emit('validate');
    },
  },
  watch: {
    initValue: function (val) {
      this.setValue(val);
    },
  },
};
</script>
