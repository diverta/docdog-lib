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
              class="kuroco-button--primary kuroco-u-hidden-sp"
              @click="registerMember"
              :disabled="!all_valid"
            >
              <span class="kuroco-u-mx-md">まとめてダウンロードする</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.2003 13.3246C10.09 13.3246 9.98654 13.3039 9.88999 13.2626C9.79343 13.2212 9.70377 13.1591 9.62101 13.0763L6.37258 9.82791C6.20705 9.66239 6.12774 9.46583 6.13463 9.23823C6.14153 9.01063 6.22774 8.82097 6.39327 8.66924C6.55879 8.50371 6.7519 8.42095 6.9726 8.42095C7.19331 8.42095 7.38642 8.50371 7.55194 8.66924L9.37272 10.5107V3.82763C9.37272 3.59313 9.45203 3.39657 9.61066 3.23794C9.76929 3.07931 9.96585 3 10.2003 3C10.4348 3 10.6314 3.07931 10.79 3.23794C10.9487 3.39657 11.028 3.59313 11.028 3.82763V10.5107L12.8694 8.66924C13.035 8.50371 13.2281 8.42095 13.4488 8.42095C13.6695 8.42095 13.8626 8.50371 14.0281 8.66924C14.1936 8.82097 14.2764 9.01063 14.2764 9.23823C14.2764 9.46583 14.1936 9.66239 14.0281 9.82791L10.7797 13.0763C10.6969 13.1591 10.6038 13.2212 10.5004 13.2626C10.3969 13.3039 10.2969 13.3246 10.2003 13.3246ZM4.65525 17.6283C4.20006 17.6283 3.81038 17.4662 3.48623 17.1421C3.16208 16.8179 3 16.4282 3 15.973V13.3246C3 13.0901 3.07931 12.8936 3.23794 12.735C3.39657 12.5763 3.59313 12.497 3.82763 12.497C4.06212 12.497 4.25868 12.5763 4.41731 12.735C4.57594 12.8936 4.65525 13.0832 4.65525 13.3039V15.973H15.7454V13.3039C15.7454 13.0832 15.8248 12.8936 15.9834 12.735C16.142 12.5763 16.3386 12.497 16.5731 12.497C16.7938 12.497 16.9834 12.5763 17.1421 12.735C17.3007 12.8936 17.38 13.0832 17.38 13.3039V15.973C17.38 16.4282 17.2179 16.8179 16.8938 17.1421C16.5696 17.4662 16.1868 17.6283 15.7454 17.6283H4.65525Z"
                  fill="#fff"
                />
              </svg>
            </button>
            <button
              type="button"
              class="kuroco-button--primary kuroco-u-hidden-pc"
              @click="registerMember"
              :disabled="!all_valid"
            >
              <span class="kuroco-u-mx-md">まとめてURLを送る</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.02083 16.9583C2.57639 16.9583 2.19097 16.7951 1.86458 16.4687C1.53819 16.1423 1.375 15.7569 1.375 15.3124V4.68742C1.375 4.22909 1.53819 3.83672 1.86458 3.51034C2.19097 3.18395 2.57639 3.02075 3.02083 3.02075H16.9792C17.4375 3.02075 17.8299 3.18395 18.1562 3.51034C18.4826 3.83672 18.6458 4.22909 18.6458 4.68742V15.3124C18.6458 15.7569 18.4826 16.1423 18.1562 16.4687C17.8299 16.7951 17.4375 16.9583 16.9792 16.9583H3.02083ZM16.9792 6.10409L10.4583 10.4374C10.375 10.4791 10.2986 10.5138 10.2292 10.5416C10.1597 10.5694 10.0833 10.5833 10 10.5833C9.91667 10.5833 9.84028 10.5694 9.77083 10.5416C9.70139 10.5138 9.625 10.4791 9.54167 10.4374L3.02083 6.10409V15.3124H16.9792V6.10409ZM10 9.22909L16.8958 4.68742H3.125L10 9.22909ZM3.02083 6.10409V6.29159C3.02083 6.24992 3.02083 6.18395 3.02083 6.09367C3.02083 6.00339 3.02083 5.90964 3.02083 5.81242C3.02083 5.5902 3.02083 5.41311 3.02083 5.28117C3.02083 5.14922 3.02083 5.15964 3.02083 5.31242V4.68742V5.29159C3.02083 5.16659 3.02083 5.15964 3.02083 5.27075C3.02083 5.38186 3.02083 5.55547 3.02083 5.79159C3.02083 5.9027 3.02083 5.99992 3.02083 6.08325C3.02083 6.16659 3.02083 6.23603 3.02083 6.29159V6.10409V15.3124V6.10409Z"
                  fill="white"
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
