<template>
  <div class="docdog-container--white">
    <div class="docdog-modal__body__pagetitle docdog-modal__body__section" v-html="htmlParts.ext_3" />
    <div class="docdog-modal__body__section">
      <div class="docdog-modal__body__section">
        <form @submit.prevent>
          <div
            class="docdog-form__item"
            :class="[
              { 'docdog-form__item--error': email_valid === false },
              { 'docdog-form__item--success': email_valid === true },
            ]"
          >
            <label for="email" class="docdog-form__item__title">
              メールアドレス
              <span class="docdog-form__item__required">（必須）</span>
            </label>
            <input
              name="email"
              type="text"
              id="email"
              placeholder=""
              v-model="email_internal"
              v-on:focusout="validateEmail"
              v-on:focusin="email_valid = null"
              @input="onEmailInput"
              required
            />
            <p class="docdog-form__item--error__msg">
              <span v-if="email_valid === false">{{ err || 'メールアドレスの形式ではありません' }}</span>
            </p>
          </div>
          <div class="docdog-form__button">
            <button
              type="button"
              class="docdog-button docdog-button--primary"
              :disabled="!email_valid"
              @click.stop="nextStep"
            >
              <span class="docdog-u-d-flex-grow-1">次へ</span>
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.8046 14.4507C10.6775 14.3236 10.6111 14.1647 10.6053 13.9741C10.5995 13.7834 10.6602 13.6246 10.7873 13.4975L13.0751 11.227H4.85978C4.66335 11.227 4.4987 11.1605 4.36582 11.0277C4.23294 10.8948 4.1665 10.7301 4.1665 10.5337C4.1665 10.3373 4.23294 10.1726 4.36582 10.0397C4.4987 9.90685 4.66335 9.84041 4.85978 9.84041H13.0751L10.77 7.5526C10.6429 7.41394 10.5822 7.25218 10.588 7.0673C10.5938 6.88243 10.6602 6.72644 10.7873 6.59934C10.926 6.47224 11.0906 6.40869 11.2813 6.40869C11.4719 6.40869 11.6308 6.47224 11.7579 6.59934L15.2069 10.0484C15.2763 10.1177 15.3283 10.1928 15.3629 10.2737C15.3976 10.3546 15.4149 10.4413 15.4149 10.5337C15.4149 10.6261 15.3976 10.7128 15.3629 10.7937C15.3283 10.8746 15.2763 10.9497 15.2069 11.019L11.7752 14.4507C11.6366 14.5894 11.4748 14.6587 11.2899 14.6587C11.1051 14.6587 10.9433 14.5894 10.8046 14.4507Z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <FormPolicy :content="htmlParts.ext_4" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import FormPolicy from '@/components/app2/FormPolicy.vue';

import validator from 'email-validator';

export default {
  emits: ['update:email', 'next'],
  props: {
    email: {
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
  },
  components: {
    FormPolicy,
  },
  data() {
    return {
      email_internal: this.email, // init
      email_valid: null, // null means unknown
    };
  },
  mounted() {
    if (this.email) {
      if (this.err.length == 0) {
        // Usecase: use 'prev' from next step
        this.email_valid = true;
      } else {
        // Usecase: email invalidated by api call, came back from next step with errors
        this.email_valid = false;
      }
    }
  },
  methods: {
    validateEmail() {
      if (validator.validate(this.email_internal)) {
        this.email_valid = true;
        this.$emit('update:email', this.email_internal);
      } else {
        this.email_valid = false;
      }
    },
    onEmailInput() {
      this.email_valid = null;
      this.validateEmailDelayed();
    },
    validateEmailDelayed: _.debounce(function () {
      return this.validateEmail();
    }, 1000),
    nextStep() {
      this.$emit('next');
    },
  },
};
</script>
