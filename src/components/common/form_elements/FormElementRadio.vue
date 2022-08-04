<template>
  <template v-for="(opt, idx) in optionsArr">
    <div class="kuroco-form__toggle">
      <input
        type="radio"
        v-model="value"
        :value="opt.value"
        @input="updateValue($event.target.value)"
        :id="el.key_name + idx"
        :name="el.key_name"
      />
      <label :for="el.key_name + idx">{{ opt.name }}</label>
    </div>
  </template>
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
      if (val) {
        if (typeof val === 'string' || val instanceof String) {
          this.value = val;
        } else if (val.key) {
          this.value = val.key;
        }
      }
    },
  },
};
</script>
