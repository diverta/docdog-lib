<template>
  <div class="docdog-form">

    <AlertError v-if="err" :err="err_msg" />
    <!-- TODO: Implement success message -->
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />

    <div class="docdog-modal__body__section">
      <h1 class="docdog-modal__body__pagetitle">パスワード再設定</h1>

      <!-- TODO: Show only Step1 -->
      <p class="docdog-modal__body__text">
        パスワード再設定用のURLを送信します。ご登録されているメールアドレスを入力してください。
      </p>

    </div>

    <div class="docdog-modal__body__section">

      <!-- TODO: Implement step1 -->
      <form>
        <div class="docdog-form__item" :class="err_field == 'email' ? 'docdog-form__item--error' : ''">
          <label for="email" class="docdog-form__item__title">メールアドレス</label>
          <input name="email" type="text" id="email" placeholder="" v-model="email" required />
          <p class="docdog-form__item--error__msg" v-if="err_field == 'email'">メールアドレスが不正です。</p>
        </div>
        <div class="docdog-form__button">
          <button type="submit" class="docdog-button docdog-button--primary" @click.prevent="signup">
            送信する
          </button>
        </div>
        <div class="docdog-form__link">
          <button type="submit" class="docdog-button--text" @click.prevent="redirect({ target: 'SignIn' })">
            ログイン
          </button>
        </div>
      </form>

      <!-- TODO: Implement step2 -->
      <form>
        <div class="docdog-form__item" :class="err_field == 'temp_pwd' ? 'docdog-form__item--error' : ''">
          <label for="temp_pwd" class="docdog-form__item__title">仮パスワード</label>
          <input name="temp_pwd" type="text" id="temp_pwd" placeholder="" v-model="temp_pwd" required />
        </div>
        <div class="docdog-form__item" :class="err_field == 'password' ? 'docdog-form__item--error' : ''">
          <label for="password" class="docdog-form__item__title">新しいパスワード</label>
          <input name="password" type="password" id="password" placeholder="" v-model="login_pwd" required />
          <p class="docdog-form__item__note">8文字以上英数混在</p>
        </div>
        <div class="docdog-form__item" :class="err_field == 'password_confirm' ? 'docdog-form__item--error' : ''">
          <label for="password_confirm" class="docdog-form__item__title">新しいパスワード（確認）</label>
          <input name="password_confirm" type="password" id="password_confirm" placeholder="" v-model="login_pwd" required />
        </div>
        <div class="docdog-form__button">
          <button type="submit" class="docdog-button docdog-button--primary" @click.prevent="signup">
            再設定する
          </button>
        </div>
      </form>

      <!-- TODO: Implement step2 success -->
      <div>
        <div class="docdog-form__button">
          <button type="submit" class="docdog-button docdog-button--primary" @click.prevent="signup">
            ログイン
          </button>
        </div>
        <div class="docdog-form__link">
          <button type="button" class="docdog-button--text" @click.prevent="redirect({ target: 'List' })">
            資料一覧へ戻る
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import AbstractPage from './AbstractPage.vue';

export default {
  extends: AbstractPage,
  data() {
    return {
      email: '',
      temp_pwd: '',
      password: '',
      password_confirm: '',
    };
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
  },
};
</script>
