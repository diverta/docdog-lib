<template>
  <div class="kuroco-container--white">
    <div class="kuroco-modal__body__section">
      <div class="kuroco-modal__body__section">
        <form>
          <div class="kuroco-form__item kuroco-u-mb-x-lg">
            <label for="email" class="kuroco-form__item__title">
              メールアドレス
              <span class="kuroco-form__item__required">（必須）</span>
            </label>
            <div class="kuroco-form__item--success">
              <input
                name="email"
                type="email"
                id="email"
                placeholder="you@example.co.jp"
                required
                :value="email"
                disabled
              />
            </div>
          </div>
          <div class="kuroco-form__item kuroco-form__item--col-2">
            <div class="kuroco-form__item">
              <label for="name1" class="kuroco-form__item__title">
                姓
                <span class="kuroco-form__item__required">（必須）</span>
              </label>
              <div
                :class="[
                  { 'kuroco-form__item--error': validated.name1 === false },
                  { 'kuroco-form__item--success': validated.name1 === true },
                ]"
              >
                <input
                  name="name1"
                  type="text"
                  id="name1"
                  autocomplete="family-name"
                  placeholder=""
                  :value="name1"
                  @input="updateField('name1', $event)"
                  v-on:focusout="updateField('name1', $event)"
                  required
                />
              </div>
              <p class="kuroco-form__item--error__msg">
                <span v-if="validated.name1 === false">{{ err || '必須項目です' }}</span>
              </p>
            </div>
            <div class="kuroco-form__item">
              <label for="name2" class="kuroco-form__item__title">
                名
                <span class="kuroco-form__item__required">（必須）</span>
              </label>
              <div
                :class="[
                  { 'kuroco-form__item--error': validated.name2 === false },
                  { 'kuroco-form__item--success': validated.name2 === true },
                ]"
              >
                <input
                  name="name2"
                  type="text"
                  id="name2"
                  autocomplete="given-name"
                  placeholder=""
                  :value="name2"
                  @input="updateField('name2', $event)"
                  v-on:focusout="updateField('name2', $event)"
                  required
                />
              </div>
              <p class="kuroco-form__item--error__msg">
                <span v-if="validated.name2 === false">{{ err || '必須項目です' }}</span>
              </p>
            </div>
          </div>
          <FormElement
            v-for="el in formDef"
            :el="el"
            :class="['kuroco-form__item', err_fields[el.key_name] ? 'kuroco-form__item--error' : '']"
            :validErrMsg="errByField[el.key_name]"
            v-model="customFields[el.key_name]"
            @update:modelValue="onCustomFieldUpdate(el.key_name, $event)"
          />
          <div class="kuroco-form__button">
            <button
              type="button"
              class="kuroco-button kuroco-button--primary"
              @click="registerMember"
              :disabled="!all_valid"
            >
              <span class="kuroco-u-d-flex-grow-1">送信してダウンロードする</span>
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.8046 14.4507C10.6775 14.3236 10.6111 14.1647 10.6053 13.9741C10.5995 13.7834 10.6602 13.6246 10.7873 13.4975L13.0751 11.227H4.85978C4.66335 11.227 4.4987 11.1605 4.36582 11.0277C4.23294 10.8948 4.1665 10.7301 4.1665 10.5337C4.1665 10.3373 4.23294 10.1726 4.36582 10.0397C4.4987 9.90685 4.66335 9.84041 4.85978 9.84041H13.0751L10.77 7.5526C10.6429 7.41394 10.5822 7.25218 10.588 7.0673C10.5938 6.88243 10.6602 6.72644 10.7873 6.59934C10.926 6.47224 11.0906 6.40869 11.2813 6.40869C11.4719 6.40869 11.6308 6.47224 11.7579 6.59934L15.2069 10.0484C15.2763 10.1177 15.3283 10.1928 15.3629 10.2737C15.3976 10.3546 15.4149 10.4413 15.4149 10.5337C15.4149 10.6261 15.3976 10.7128 15.3629 10.7937C15.3283 10.8746 15.2763 10.9497 15.2069 11.019L11.7752 14.4507C11.6366 14.5894 11.4748 14.6587 11.2899 14.6587C11.1051 14.6587 10.9433 14.5894 10.8046 14.4507Z"
                />
              </svg>
            </button>
          </div>
        </form>
        <div class="kuroco-form__link">
          <button
            type="button"
            class="kuroco-button--text kuroco-u-mx-0 kuroco-u-d-flex kuroco-u-d-flex-align-center"
            @click="prev"
          >
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5323 7.82468C10.6848 7.9772 10.7645 8.16785 10.7715 8.39663C10.7784 8.62541 10.7056 8.81606 10.5531 8.96859L7.80771 11.6932H17.6661C17.9018 11.6932 18.0994 11.7729 18.2589 11.9323C18.4183 12.0918 18.498 12.2894 18.498 12.5251C18.498 12.7608 18.4183 12.9584 18.2589 13.1178C18.0994 13.2773 17.9018 13.357 17.6661 13.357H7.80771L10.5739 16.1024C10.7264 16.2688 10.7992 16.4629 10.7923 16.6848C10.7853 16.9066 10.7056 17.0938 10.5531 17.2463C10.3867 17.3988 10.1891 17.4751 9.96034 17.4751C9.73155 17.4751 9.5409 17.3988 9.38838 17.2463L5.24952 13.1075C5.16632 13.0243 5.10393 12.9341 5.06233 12.8371C5.02073 12.74 4.99994 12.636 4.99994 12.5251C4.99994 12.4142 5.02073 12.3102 5.06233 12.2131C5.10393 12.1161 5.16632 12.0259 5.24952 11.9427L9.36758 7.82468C9.53397 7.65829 9.72809 7.5751 9.94994 7.5751C10.1718 7.5751 10.3659 7.65829 10.5323 7.82468Z"
                fill="#1371FF"
              />
            </svg>
            <span>メールアドレスを変更する</span>
          </button>
        </div>
      </div>
      <FormPolicy :content="htmlParts.ext_4" />
    </div>
  </div>
</template>

<script>
import FormPolicy from '@/components/app2/FormPolicy.vue';
import memberApi from '@/api/member';
import loginApi from '@/api/login';
import FormElement from '@/components/common/form_elements/FormElement.vue';

export default {
  emits: ['update:name1', 'update:name2', 'error', 'prev', 'next', 'onLogin', 'updateField', 'resetView'],
  components: {
    FormPolicy,
    FormElement,
  },
  props: {
    email: {
      type: String,
      default: () => '',
    },
    name1: {
      type: String,
      default: () => '',
    },
    name2: {
      type: String,
      default: () => '',
    },
    err: {
      type: [String, Array],
      default: () => [],
    },
    htmlParts: {
      type: Object,
      default: () => ({}),
    },
    formDef: {
      type: Object,
      default: () => ({}),
    },
    initFields: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    // Init if with data (navigation)
    if (this.name1) {
      this.validated.name1 = true;
    }
    if (this.name2) {
      this.validated.name2 = true;
    }
    for (const key in this.initFields) {
      this.customFields[key] = this.initFields[key];
    }
  },
  data() {
    return {
      updating: false, // To avoid double clicks
      customFields: {},
      validated: {
        name1: null,
        name2: null,
      },
      errByField: {},
    };
  },
  computed: {
    all_valid() {
      return !!(
        this.validated.name1 &&
        this.validated.name2 &&
        this.formDef.reduce((carry, item) => {
          return (
            carry &&
            (!((item.limit_item && item.limit_item.required) || item.required === 2) || // Either the item is not required
              (this.customFields[item.key_name] != null && this.customFields[item.key_name] != '')) // Or it is required AND has a value
          );
        }, true)
      );
    },
    err_fields() {
      if (this.err) {
        return this.err.reduce((carry, item) => {
          let field = item.field;
          if (item.message.indexOf('Name is required') >= 0) {
            field = 'name1';
          }
          if (item.message.indexOf(this.email) === 0) {
            field = 'email';
          }
          return { ...carry, [item.field]: true };
        }, {});
      }
      return {};
    },
    err_msg() {
      return this.err
        ? this.err.map((err) => {
            if (err) {
              const { field, code } = err;
              let translatedField = 'データ';
              let tranlatedProblem = '不正';
              const fieldNames = this.formDef.reduce((carry, item) => {
                return {
                  ...carry,
                  [item.key_name]: item.name,
                };
              }, {});
              if (fieldNames[field]) {
                translatedField = fieldNames[field];
              } else {
                switch (field) {
                  case 'email':
                    translatedField = 'メールアドレス';
                    break;
                }
              }
              switch (code) {
                case 'invalid':
                  tranlatedProblem = '不正';
                  break;
                case 'required':
                  tranlatedProblem = '必須';
                  break;
              }
              if (translatedField && tranlatedProblem) {
                return translatedField + 'が' + tranlatedProblem + 'です';
              } else {
                return 'エラーが発生しました。';
              }
            }
          })
        : '';
    },
  },
  methods: {
    updateField(key, $event) {
      if ($event.target.value == '') {
        this.validated[key] = false;
      } else {
        this.validated[key] = true;
      }
      this.$emit('update:' + key, event.target.value);
    },
    prev() {
      this.$emit('prev');
    },
    next() {
      this.$emit('next');
    },
    registerMember() {
      if (!this.updating) {
        this.errByField = {};
        this.updating = true;
        memberApi
          .doSignUp({
            email: this.email,
            name1: this.name1,
            name2: this.name2,
            login_pwd: 'qwerty123', // TODO change
            ...this.customFields,
          })
          .then((resp) => {
            loginApi
              .doLogin({
                email: this.email,
                password: 'qwerty123', // TODO change
              })
              .then(() => {
                this.$emit('onLogin');
                this.updating = false;
              })
              .catch((err) => {
                this.processErr(err);
                this.updating = false;
              });
          })
          .catch((err) => {
            this.processErr(err);
            this.updating = false;
          });
      }
    },
    processErr(errors) {
      if (!Array.isArray(errors)) {
        errors = [errors];
      }
      let anyErrors = false;
      errors.forEach((err) => {
        let errField = err.field ? err.field : null;
        const idxOfArrow = err.field.indexOf('->');
        if (err.field && idxOfArrow !== -1) {
          // Invalid link's field is like this : 'url->properties:url'
          errField = err.field.substring(0, idxOfArrow);
        }
        if (errField) {
          if (!anyErrors) anyErrors = true;
          if (errField == 'email') {
            // We emit error only for email now (all others can be handled within this component)
            this.$emit('error', err.message);
          } else {
            this.errByField[errField] = err.message;
            this.validated[errField] = false;
          }
        }
      });
      if (anyErrors) {
        this.$emit('resetView');
      }
    },
    onCustomFieldUpdate(key, value) {
      delete this.errByField[key]; // Reset error after input:w
      this.$emit('updateField', { key, value });
    },
  },
};
</script>
