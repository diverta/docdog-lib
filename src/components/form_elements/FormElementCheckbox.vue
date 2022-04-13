<template>
  <template v-for="(opt, idx) in optionsArr">
    <div class="docdog-form__toggle">
      <input
        type="checkbox"
        :value="opt.val"
        :id="el.key_name + idx"
        :name="el.key_name"
        v-model="value"
        @change="updateValue"
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
      return [];
    },
    setValue(val) {
      if (Array.isArray(val)) {
        this.value = val.map((v) => (typeof v === 'object' ? v.key : v));
      }
    },
    updateValue() {
      this.updateValueParent(this.value.sort());
    },
  },
};
</script>
