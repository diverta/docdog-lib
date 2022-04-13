<template>
  <div>
    <label :for="el.key_name" class="docdog-form__item__title"
      >{{ el.name }}<span v-if="isRequired" class="docdog-form__item__title__badge">必須</span></label
    >
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
      type: [String, Number, Object, Array, Boolean, null],
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
        case 1: // Inquiry type : Short Text
          return FormElementText;
        case 'textarea':
        case 2: // Inquiry type : Body & Long Text
          return FormElementTextarea;
        case 'option':
        case 3: // Inquiry type : Category
        case 4: // Inquiry type : Single option
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
        case 5: // Inquiry type : Multichoice
          return FormElementCheckbox;
        case 'date':
        case 6: // Inquiry type : Date
          return FormElementDate;
        case 'url':
          return FormElementUrl;
        case 11: // Inquiry type: File
          console.error('[Docdog] File form element is not supported yet');
          return null;
        case 8: // Inquiry type: JSON
          console.error('[Docdog] JSON form element is not supported yet');
          return null;
        case 10: // Inquiry type: Matrix
          console.error('[Docdog] Matrix form element is not supported yet');
          return null;
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
