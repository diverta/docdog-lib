<template>
  <input type="checkbox" @input="updateValue" v-model.bool="value" />
</template>

<script>
import AbstractFormElement from './AbstractFormElement.vue';

export default {
  extends: AbstractFormElement,
  methods: {
    getDefaultValue() {
      return false;
    },
    setValue(val) {
      this.value = val != 0; // to boolean
    },
    updateValue($event) {
      this.updateValueParent(this.value);
    },
  },
};
</script>
