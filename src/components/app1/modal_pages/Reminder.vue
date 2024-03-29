<template>
  <div class="kuroco-container--form">
    <AlertError v-if="err" :err="err" />
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />
    <div class="kuroco-container--white">
      <div class="kuroco-modal__body__pagetitle kuroco-modal__body__section">
        <h1>パスワード再設定</h1>
        <p v-if="step == 'input_email'">
          パスワード再設定用のURLを送信します。ご登録されているメールアドレスを入力してください。
        </p>
      </div>

      <div class="kuroco-modal__body__section">
        <form v-if="step == 'input_email'">
          <div class="kuroco-form__item" :class="err_field == 'email' ? 'kuroco-form__item--error' : ''">
            <label for="email" class="kuroco-form__item__title">メールアドレス</label>
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
            <p class="kuroco-form__item--error__msg" v-if="err_field == 'email'">メールアドレスが不正です。</p>
          </div>
          <div class="kuroco-form__button">
            <button type="submit" class="kuroco-button--primary" @click.prevent="sendEmail">
              送信する
            </button>
          </div>
          <div class="kuroco-form__link">
            <button type="submit" class="kuroco-button--text" @click.prevent="redirect({ target: 'SignIn' })">
              ログイン
            </button>
          </div>
        </form>

        <form v-if="step == 'input_new_pwd'">
          <div class="kuroco-form__item" :class="err_field == 'temp_pwd' ? 'kuroco-form__item--error' : ''">
            <label for="temp_pwd" class="kuroco-form__item__title">仮パスワード</label>
            <input
              name="temp_pwd"
              type="text"
              id="temp_pwd"
              inputmode="url"
              placeholder=""
              v-model="temp_pwd"
              required
            />
          </div>
          <div class="kuroco-form__item" :class="err_field == 'password' ? 'kuroco-form__item--error' : ''">
            <label for="password" class="kuroco-form__item__title">新しいパスワード</label>
            <input
              name="password"
              type="password"
              id="password"
              inputmode="url"
              placeholder=""
              v-model="login_pwd"
              required
            />
            <p class="kuroco-form__item__note">8文字以上英数混在</p>
          </div>
          <div class="kuroco-form__item" :class="err_field == 'password_confirm' ? 'kuroco-form__item--error' : ''">
            <label for="password_confirm" class="kuroco-form__item__title">新しいパスワード（確認）</label>
            <input
              name="password_confirm"
              type="password"
              id="password_confirm"
              inputmode="url"
              placeholder=""
              v-model="password_confirm"
              required
            />
          </div>
          <div class="kuroco-form__button">
            <button type="submit" class="kuroco-button--primary" @click.prevent="updatePassword">
              再設定する
            </button>
          </div>
        </form>

        <div v-if="step == 'done'">
          <div class="kuroco-form__button">
            <button
              type="submit"
              class="kuroco-button--primary"
              @click.prevent="redirect({ target: 'SignIn' })"
            >
              ログイン
            </button>
          </div>
          <div class="kuroco-form__link">
            <button type="button" class="kuroco-button--text" @click.prevent="redirect({ target: 'Mypage' })">
              マイページへ戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AbstractPage from '@/components/common/AbstractPage.vue';
import AlertSuccess from '@/components/app1/AlertSuccess.vue';
import AlertError from '@/components/app1/AlertError.vue';
import loginApi from '@/api/login';

export default {
  extends: AbstractPage,
  components: {
    AlertSuccess,
    AlertError,
  },
  props: {
    token: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      steps: ['input_email', 'input_new_pwd', 'done'],
      step: '',
      email: '',
      temp_pwd: '',
      login_pwd: '',
      password_confirm: '',
    };
  },
  mounted() {
    if (this.token) {
      this.step = 'input_new_pwd';
    } else {
      this.step = 'input_email';
    }
  },
  computed: {
    err_field() {
      if (this.err) {
        const colpos = this.err.indexOf(':');
        if (colpos !== -1) {
          return this.err.substring(0, colpos);
        }
      }
      return '';
    },
  },
  methods: {
    sendEmail() {
      this.setMsg('');
      this.error('');
      loginApi
        .reminderSendEmail({
          email: this.email,
        })
        .then(() => {
          this.setMsg('パスワード変更のURLが記載されたメールを送信しました');
        })
        .catch(() => {
          this.error('メールアドレスが不正です。');
        });
    },
    updatePassword() {
      this.error('');
      if (this.login_pwd == this.password_confirm) {
        loginApi
          .reminderUpdatePassword({
            token: this.token,
            temp_pwd: this.temp_pwd,
            login_pwd: this.login_pwd,
          })
          .then(() => {
            this.step = 'done';
          })
          .catch((err) => {
            this.error(err);
          });
      } else {
        this.error('新しいパスワード（確認）が一致しません。');
      }
    },
  },
};
</script>
