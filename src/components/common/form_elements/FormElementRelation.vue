<template>モジュールID : <input type="number" v-if="value" v-model.int="value.module_id" @input="updateValue" /></template>

<script>
import AbstractFormElement from './AbstractFormElement.vue';

export default {
  extends: AbstractFormElement,
  methods: {
    getDefaultValue() {
      return {
        module_type: this.el.options.module,
        module_id: 0,
      };
    },
    setValue(val) {
      this.value = {
        module_type: this.el.options.module,
        module_id: parseInt(val.module_id) || 0,
      };
    },
    updateValue($event) {
      let val = $event.target.value;
      if (val !== '') {
        val = parseInt(val);
        if (isNaN(val)) {
          val = null;
        }
      }
      this.value = {
        module_type: this.el.options.module,
        module_id: val || 0,
      };
      this.updateValueParent(this.value);
    },
  },
};
</script>
