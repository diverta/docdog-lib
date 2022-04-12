<template>
  <div>
    <label :for="el.key_name" class="docdog-form__item__title">{{ el.name }}</label>
    <span v-if="isRequired" class="docdog-form__item__required" >(必須)</span>
    <component
      :is="elInstance"
      :el="el"
      :initValue="processedModelValue"
      @update="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script>
import FormElementText from './FormElementText.vue';
import FormElementSelect from './FormElementSelect.vue';
import FormElementTextarea from './FormElementTextarea.vue';
import FormElementRelation from './FormElementRelation.vue';
import FormElementRadio from './FormElementRadio.vue';
import FormElementNumber from './FormElementNumber.vue';
import FormElementBoolean from './FormElementBoolean.vue';
import FormElementCheckbox from './FormElementCheckbox.vue';
import FormElementDate from './FormElementDate.vue';
import FormElementUrl from './FormElementUrl.vue';

const availableFormElements = {
  FormElementText,
  FormElementSelect,
  FormElementTextarea,
  FormElementRelation,
  FormElementRadio,
  FormElementNumber,
  FormElementBoolean,
  FormElementCheckbox,
  FormElementDate,
  FormElementUrl,
};

export default {
  emits: ['update:modelValue'],
  components: availableFormElements,
  props: {
    el: {
      type: Object,
      default: () => {},
      required: true,
    },
    modelValue: {
      type: [String, Number, Object, Array, null],
      default: () => null,
      required: true,
    },
  },
  computed: {
    isRequired() {
      return this.el.limit_item && this.el.limit_item.required; 
    }, 
    elInstance() {
      switch (this.el.type) {
        case 'text':
          return FormElementText;
        case 'textarea':
          return FormElementTextarea;
        case 'option':
          return FormElementSelect;
        case 'relation':
          return FormElementRelation;
        case 'radio':
          return FormElementRadio;
        case 'number':
          return FormElementNumber;
        case 'boolean':
          return FormElementBoolean;
        case 'checkbox':
          return FormElementCheckbox;
        case 'date':
          return FormElementDate;
        case 'url':
          return FormElementUrl;
        default:
          console.error('[Docdog] Undefined form element for type "' + this.el.type + '" (' + this.el.key_name + ')');
      }
    },
    processedModelValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
};
</script>
