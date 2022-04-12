<template>
  <textarea :value="value" @input="updateValue($event.target.value)" />
</template>

<script>
import AbstractFormElement from './AbstractFormElement.vue';

export default {
  extends: AbstractFormElement,
  methods: {
    getDefaultValue() {
      return '';
    },
  },
};
</script>
