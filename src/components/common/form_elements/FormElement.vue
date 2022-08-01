<template>
  <div :class="[{ 'docdog-form__item--error': !isValidFinal }]">
    <label :for="el.key_name" class="docdog-form__item__title">
      {{ el.name }}
      <span v-if="isRequired" class="docdog-form__item__required">（必須）</span>
    </label>
    <component
      :is="elInstance"
      :el="el"
      :initValue="processedModelValue"
      @update="processedModelValue = $event"
      @validate="validateValue()"
    />
    <p v-if="!isValidFinal" class="docdog-form__item--error__msg">
      <span> {{ validErrMsgFinal }}</span>
    </p>
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
    validErrMsg: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      isValid: null,
    };
  },
  computed: {
    isValidFinal() {
      return this.isValid !== false && !this.validErrMsg;
    },
    validErrMsgFinal() {
      return this.validErrMsg ? '項目が不正です' : '必須項目です';
    },
    isRequired() {
      return (this.el.limit_item && this.el.limit_item.required) || this.el.required === 2 || false;
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
        case 4: // Inquiry type : Single option
          return FormElementSelect;
        case 'relation':
          return FormElementRelation;
        case 'radio':
        case 3: // Inquiry type : Radio
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
        this.$nextTick(function () {
          // Next tick delay is required because validation happens before the value is actually updated
          this.validateValue();
        });
      },
    },
  },
  methods: {
    validateValue() {
      if (this.isRequired) {
        if (this.processedModelValue == null || this.processedModelValue == '') {
          this.isValid = false;
        } else {
          this.isValid = true;
        }
      } else {
        // If not required then always valid (for now)
        this.isValid = true;
      }
    },
  },
};
</script>
