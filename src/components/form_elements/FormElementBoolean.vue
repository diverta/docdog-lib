<template>
  <input type="checkbox" @input="updateValue" v-model="value" />
</template>

<script>
import AbstractFormElement from './AbstractFormElement.vue';

export default {
  extends: AbstractFormElement,
  methods: {
    getDefaultValue() {
      return false;
    },
    updateValue($event) {
      this.updateValueParent(this.value);
    },
  },
};
</script>
