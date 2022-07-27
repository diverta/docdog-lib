<template>
  <input type="number" :value="value" @input="updateValue" @focusout="validate" />
</template>

<script>
import AbstractFormElement from './AbstractFormElement.vue';

export default {
  extends: AbstractFormElement,
  methods: {
    getDefaultValue() {
      return 0;
    },
    updateValue($event) {
      let val = parseInt($event.target.value);
      if (isNaN(val)) {
        val = null;
      }
      this.value = val;
      this.updateValueParent(this.value);
    },
  },
};
</script>
