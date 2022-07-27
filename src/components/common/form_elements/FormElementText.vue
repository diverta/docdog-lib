<template>
  <input :type="isNumber ? 'number' : 'text'" :value="value" @input="updateValue" @focusout="validate" />
</template>

<script>
import AbstractFormElement from './AbstractFormElement.vue';

export default {
  extends: AbstractFormElement,
  computed: {
    isNumber() {
      return this.el.limit_item && this.el.limit_item.type == 'number';
    },
  },
  methods: {
    getDefaultValue() {
      if (this.el.limit_item && this.el.limit_item.type == 'number') {
        return 0;
      } else {
        return '';
      }
    },
    updateValue($event) {
      let val = $event.target.value;
      if (this.isNumber) {
        if (val !== '') {
          val = parseInt(val);
          if (isNaN(val)) {
            val = '';
          }
        }
      }
      this.value = val;
      this.updateValueParent(this.value);
    },
  },
};
</script>
