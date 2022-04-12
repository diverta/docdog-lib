<template>
  <div class="docdog-container--form">
    <AlertError v-if="err" :err="err_msg" />
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />
    <div class="docdog-container--white">
      <div class="docdog-modal__body__section">
        <h1 class="docdog-modal__body__pagetitle">アカウントの作成</h1>
      </div>
      <div class="docdog-modal__body__section" v-if="!isLogin">
        <div class="docdog-modal__body__section">
          <form>
            <div class="docdog-form__item--col-2">
              <div class="docdog-form__item" :class="err_field == 'name1' ? 'docdog-form__item--error' : ''">
                <label for="name1" class="docdog-form__item__title">姓</label>
                <input name="name1" type="text" id="name1" placeholder="" v-model="name1" required />
              </div>
              <div class="docdog-form__item" :class="err_field == 'name2' ? 'docdog-form__item--error' : ''">
                <label for="name2" class="docdog-form__item__title">名</label>
                <input name="name2" type="text" id="name2" placeholder="" v-model="name2" required />
              </div>
            </div>
            <div class="docdog-form__item" :class="err_field == 'email' ? errClass : ''">
              <label for="email" class="docdog-form__item__title">メールアドレス</label>
              <input name="email" type="text" id="email" placeholder="" v-model="email" required />
            </div>
            <div class="docdog-form__item" :class="err_field == 'password' ? 'docdog-form__item--error' : ''">
              <label for="password" class="docdog-form__item__title">パスワード</label>
              <input name="password" type="password" id="password" placeholder="" v-model="login_pwd" required />
            </div>
            <FormElement
              v-for="el in formDef"
              :el="el"
              :class="['docdog-form__item', err_field == el.key_name ? 'docdog-form__item--error' : '']"
              v-model="customFields[el.key_name]"
            />
            <div class="docdog-form__button">
              <button type="submit" class="docdog-button docdog-button--primary" @click.prevent="signup">
                アカウント作成
              </button>
            </div>
          </form>
          <div class="docdog-form__link">
            <button type="button" class="docdog-button--text" @click.prevent="redirect({ target: 'SignIn' })">
              ログイン
            </button>
          </div>
        </div>
        <FormPolicy />
      </div>
      <div class="docdog-modal__body__section" v-if="isLogin">
        <button
          type="button"
          class="docdog-button docdog-button--white"
          @click.prevent="redirect({ target: 'Mypage' })"
        >
          マイページへ戻る
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import memberApi from '@/api/member';
import loginApi from '@/api/login';
import AlertSuccess from '@/components/AlertSuccess.vue';
import AlertError from '@/components/AlertError.vue';
import FormPolicy from '@/components/FormPolicy.vue';
import FormElement from '@/components/form_elements/FormElement.vue';

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
      email: '',
      name1: '',
      name2: '',
      login_pwd: '',
      formDef: [],
      customFields: {},
      errClass: 'docdog-form__item--error',
    };
  },
  mounted() {
    memberApi.getMemberForm().then((resp) => {
      Object.values(resp.details).forEach((val) => {
        const manualElements = {
          // Exclude processing of these
          name1: true,
          name2: true,
          email: true,
          login_pwd: true,
        };

        if (!manualElements[val.key_name]) {
          this.formDef.push(val);
        }
      });
    });
  },
  computed: {
    err_field() {
      if (this.err) {
        if (this.err.indexOf('Name is required') >= 0) {
          return 'name1';
        }
        if (this.err.indexOf(this.email) === 0) {
            return 'email';
        }
        const colpos = this.err.indexOf(':');
        if (colpos !== -1) {
          return this.err.substring(0, colpos);
        }
      }
      return '';
    },
    err_msg() {
      if (this.err.length > 0) {
        const [err_field, err_type] = this.err.split(':');
        let translatedField = 'データ';
        let tranlatedProblem = '不正';
        switch (err_field) {
          case 'email':
            translatedField = 'メールアドレス';
            break;
        }
        switch (err_type) {
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
      } else {
        return '';
      }
    },
  },
  methods: {
    signup(event) {
      this.error('');
      memberApi
        .doSignUp({
          email: this.email,
          name1: this.name1,
          name2: this.name2,
          login_pwd: this.login_pwd,
          ...this.customFields,
        })
        .then((resp) => {
          loginApi
            .doLogin({
              email: this.email,
              password: this.login_pwd,
            })
            .then(() => {
              this.onLogin();
              if (this.return && this.return.target) {
                this.redirect(this.return);
              } else {
                this.setMsg('アカウントの作成は完了しました。');
              }
            })
            .catch((err) => {
              this.error(err);
            });
        })
        .catch((err) => {
          this.resetView();
          this.error(err);
        });
    },
  },
};
</script>

<style scoped>
.err {
  color: red;
}
</style>
