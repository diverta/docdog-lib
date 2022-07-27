<template>
  <select v-model="value" @change="updateValue" @blur.native="validate">
    <option v-for="opt in optionsArr" :value="opt.value">
      {{ opt.name }}
    </option>
  </select>
</template>

<script>
import AbstractFormElement from './AbstractFormElement.vue';

export default {
  extends: AbstractFormElement,
  data() {
    return {
      optionsEmptyChoice: true,
    };
  },
  methods: {
    getDefaultValue() {
      return '';
    },
    setValue(val) {
      if (val) {
        if (typeof val === 'string' || val instanceof String) {
          this.value = val;
        } else if (val.key) {
          this.value = val.key;
        }
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
