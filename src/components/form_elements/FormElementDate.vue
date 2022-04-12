<template>
  <Datepicker
    :modelValue="valueDate"
    @update:modelValue="updateValue"
    :format="formatCalDate"
    :enableTimePicker="false"
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
    };
  },
  created() {
    if (this.value) {
      this.valueDate = moment(this.value, this.dateFormat);
    }
  },
  computed: {
    yearRange() {
      if (this.el.options_date) {
        const possibleDates = Object.values(this.el.options_date)
          .filter((d) => d != '')
          .sort();
        const min = possibleDates[0];
        const max = possibleDates[possibleDates.length - 1];
        return [min, max];
      } else {
        return [1900, 2100];
      }
    },
  },
  extends: AbstractFormElement,
  methods: {
    formatCalDate(date) {
      return moment(date).format(this.dateFormat);
    },
    getDefaultValue() {
      return '';
    },
    setValue(val) {
      this.value = val;
      this.valueDate = moment(this.value, this.dateFormat);
    },
    updateValue(val) {
      this.valueDate = val;
      this.updateValueParent(moment(val).format(this.dateFormat));
    },
  },
};
</script>
