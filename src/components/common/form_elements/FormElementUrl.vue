<template>
  タイトル: <input type="text" v-if="value" v-model="value.title" @input="updateValue($event, 'title')" /> リンク:
  <input type="text" v-if="value" v-model="value.url" @input="updateValue($event, 'url')" @focusout="validate" />
</template>

<script>
import AbstractFormElement from './AbstractFormElement.vue';

export default {
  extends: AbstractFormElement,
  methods: {
    getDefaultValue() {
      return {
        url: '',
        title: '',
      };
    },
    setValue(val) {
      this.value = {
        url: val.url || '',
        title: val.title || '',
      };
    },
    updateValue($event, type) {
      this.value[type] = $event.target.value;
      this.updateValueParent(this.value);
    },
  },
};
</script>
