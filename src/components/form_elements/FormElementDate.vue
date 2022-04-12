<template>
  <Datepicker
    :modelValue="valueDate"
    @update:modelValue="updateValue"
    :format="formatCalDate"
    :enableTimePicker="enableTime"
    :yearRange="yearRange"
    locale="ja"
    selectText="選択"
    cancelText="取消"
    :autoApply="true"
  />
</template>

<script>
import AbstractFormElement from './AbstractFormElement.vue';
import moment from 'moment';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      valueDate: null,
      dateFormat: 'YYYY-MM-DD',
      timeFormat: 'hh:mm',
      defaultMinYear: 1900,
      defaultMaxYear: 2100,
    };
  },
  created() {
    if (this.value) {
      this.valueDate = moment(this.value, this.format);
    }
  },
  computed: {
    format() {
      return this.dateFormat + (this.enableTime ? ' ' + this.timeFormat : '');
    },
    enableTime() {
      return !!(this.el.options && this.el.options.add_time);
    },
    yearRange() {
      let min = this.defaultMinYear;
      let max = this.defaultMaxYear;
      if (this.el.options_date) {
        // Member settings
        const possibleDates = Object.values(this.el.options_date)
          .filter((d) => d != '')
          .sort();
        min = possibleDates[0];
        max = possibleDates[possibleDates.length - 1];
        return [min, max];
      } else if (this.el.options && (this.el.options.minYear || this.el.options.maxYear)) {
        // Inquiry settings
        if (this.el.options.minYear) {
          min = this.el.options.minYear;
        }
        if (this.el.options.maxYear) {
          max = this.el.options.maxYear;
        }
      }
      return [min, max];
    },
  },
  extends: AbstractFormElement,
  methods: {
    formatCalDate(date) {
      return moment(date).format(this.format);
    },
    getDefaultValue() {
      return '';
    },
    setValue(val) {
      this.value = val;
      this.valueDate = moment(this.value, this.format);
    },
    updateValue(val) {
      this.valueDate = val;
      this.updateValueParent(moment(val).format(this.format));
    },
  },
};
</script>
