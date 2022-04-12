<template>
  <select v-model="value" @change="updateValue">
    <option v-for="opt in optionsArr" :value="opt.val">
      {{ opt.name }}
    </option>
  </select>
</template>

<script>
import AbstractFormElement from './AbstractFormElement.vue';

export default {
  extends: AbstractFormElement,
  methods: {
    getDefaultValue() {
      return '';
    },
    setValue(val) {
      if (val && val.key) {
        this.value = val.key;
      }
    },
    updateValue($event) {
      let val = $event.target.value;
      this.value = val;
      this.updateValueParent(this.value);
    },
  },
};
</script>
