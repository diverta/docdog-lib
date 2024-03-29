<template>
  <div class="kuroco-container--form">
    <AlertError v-if="err" :err="err_msg" />
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />
    <div class="kuroco-container--white">
      <div class="kuroco-modal__body__pagetitle kuroco-modal__body__section">
        <h1>お問い合わせ</h1>
      </div>
      <div class="kuroco-modal__body__section">
        <div class="kuroco-form__signup">
          <form>
            <template v-if="!isLogin">
              <div class="kuroco-form__item">
                <label for="name" class="kuroco-form__item__title">
                  名前
                  <span class="kuroco-form__item__required">（必須）</span></label
                >
                <div :class="[{ 'kuroco-form__item--error': err_fields['name'] != null }]">
                  <input
                    name="name"
                    type="text"
                    id="name"
                    autocomplete="name"
                    v-model="nameInput"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div class="kuroco-form__item">
                <label for="email" class="kuroco-form__item__title"
                  >メールアドレス<span class="kuroco-form__item__required">（必須）</span></label
                >
                <div :class="{ 'kuroco-form__item--error': err_fields['email'] != null }">
                  <input
                    name="email"
                    type="text"
                    id="email"
                    autocomplete="email"
                    inputmode="url"
                    placeholder=""
                    v-model="email"
                    required
                  />
                </div>
              </div>
            </template>
            <FormElement v-for="el in formDef" :el="el" class="kuroco-form__item" v-model="customFields[el.key_name]" />
            <div class="kuroco-form__button">
              <button type="submit" class="kuroco-button--primary" @click.prevent="send">送信する</button>
            </div>
          </form>
        </div>
      </div>
      <FormPolicy />
    </div>
  </div>
</template>

<script>
import AbstractPage from '@/components/common/AbstractPage.vue';
import loginApi from '@/api/login';
import inquiryApi from '@/api/inquiry';
import AlertSuccess from '@/components/app1/AlertSuccess.vue';
import AlertError from '@/components/app1/AlertError.vue';
import FormPolicy from '@/components/app1/FormPolicy.vue';
import FormElement from '@/components/common/form_elements/FormElement.vue';

export default {
  extends: AbstractPage,
  components: {
    AlertSuccess,
    AlertError,
    FormPolicy,
    FormElement,
  },
  data() {
    return {
      inquiry_id: 1,
      email: '',
      name1: '',
      name2: '',
      nameInput: '',
      category: '',
      message: '',
      formDef: [],
      unsupportedTypes: [8, 10, 11],
      customFields: {},
      errClass: 'kuroco-form__item--error',
    };
  },
  computed: {
    name() {
      if (this.isLogin) {
        return this.name1 + ' ' + this.name2;
      } else {
        return this.nameInput;
      }
    },
    err_fields() {
      if (this.err) {
        return this.err.reduce((carry, item) => {
          return { ...carry, [item.field]: true };
        }, {});
      }
      return {};
    },
    err_msg() {
      return this.err.map((err) => {
        if (err) {
          const { field, code } = err;
          let translatedField = 'データ';
          let tranlatedProblem = '不正';
          const fieldNames = this.formDef.reduce((carry, item) => {
            return {
              ...carry,
              [item.key_name]: item.title,
            };
          }, {});
          if (fieldNames[field]) {
            translatedField = fieldNames[field];
          } else {
            switch (field) {
              case 'email':
                translatedField = 'メールアドレス';
                break;
              case 'name':
                translatedField = '名前';
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
      });
    },
  },
  mounted() {
    inquiryApi.getInquiryForm(this.inquiry_id).then((resp) => {
      this.formDef = Object.entries(resp.details.cols)
        .filter(([k, v]) => {
          return (
            k != 'from_mail' &&
            k != 'email' &&
            k != 'name' &&
            !this.unsupportedTypes.includes(v.type) &&
            v.required !== 0 // Unused
          );
        })
        .sort(([k1, v1], [k2, v2]) => {
          if (v1.order_no > v2.order_no) return -1;
          else if (v1.order_no < v2.order_no) {
            return 1;
          } else {
            return 0;
          }
        })
        .map(([k, v]) => {
          v.key_name = k;
          if (v.key_name == 'body') {
            v.title = 'お問い合わせ内容';
          }
          v.name = v.title;
          return v;
        });
      loginApi.getProfile().then((profile) => {
        if (profile.member_id) {
          this.email = profile.email;
          this.name1 = profile.name1;
          this.name2 = profile.name2;
        }
      });
    });
  },
  methods: {
    send() {
      inquiryApi
        .doSend({
          ...this.customFields,
          name: this.name,
          email: this.email,
        })
        .then((resp) => {
          if (resp.id) {
            this.setMsg('送信しました。');
            this.resetView();
          }
        })
        .catch((err) => {
          this.error(err);
          this.resetView();
        });
    },
  },
};
</script>
