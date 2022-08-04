<template>
  <div class="kuroco-form__toggle">
    <input name="email_send_ng_flg" :id="el.key_name" type="checkbox" @change="updateValue" v-model.bool="value" />
    <label v-if="el.label" :for="el.key_name">{{ el.label }}</label>
  </div>
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
