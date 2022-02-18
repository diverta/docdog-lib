<template>
  <!-- ToDo: ModalHeading "アカウント情報の編集" -->
  <div class="docdog-modal__body__section">
    <!-- ToDo: After submit, display error or success message -->
    <AlertError />
    <AlertSuccess />
  </div>
  <div class="docdog-form docdog-modal__body__section">
    <div class="docdog-form__signup">
      <p class="err" v-html="err" />
      <form>
        <div class="docdog-form__item--col-2">
          <div class="docdog-form__item">
            <label for="name1" class="docdog-form__item__title">姓</label>
            <input name="name1" type="text" id="name1" placeholder="" v-model="name1" required />
          </div>
          <div class="docdog-form__item">
            <label for="name2" class="docdog-form__item__title">名</label>
            <input name="name2" type="text" id="name2" placeholder="" v-model="name2" required />
          </div>
        </div>
        <div :class="err_field == 'email' ? 'docdog-form__item docdog-form__item--error' : ''">
          <label for="email" class="docdog-form__item__title">メールアドレス</label>
          <input name="email" type="text" id="email" placeholder="" v-model="email" required />
          <p class="docdog-form__item--error__msg" v-if="err_field == 'email'">メールアドレスが不正です。</p>
        </div>
        <div class="docdog-form__item">
          <label for="password" class="docdog-form__item__title">パスワード</label>
          <input name="password" type="password" id="password" placeholder="" v-model="login_pwd" required />
        </div>
        <div class="docdog-form__item">
          <label for="company" class="docdog-form__item__title">会社名</label>
          <input name="company" type="text" id="company" placeholder="" v-model="company_nm" required />
        </div>
        <div class="docdog-form__item">
          <label for="industry" class="docdog-form__item__title">業種</label>
          <select name="industry" id="industry" v-model="industry" required>
            <option value="">選択してください</option>
            <option value="1">金融</option>
            <option value="2">官公庁・自治体</option>
            <option value="3">学校</option>
            <option value="4">IT・ソフトウェア</option>
            <option value="5">メディア</option>
            <option value="6">建設・不動産</option>
            <option value="7">製造業</option>
            <option value="8">食品</option>
            <option value="9">人材・HR</option>
            <option value="10">エネルギー・資源</option>
            <option value="11">流通・小売</option>
            <option value="12">スポーツ関連</option>
            <option value="99">その他</option>
          </select>
        </div>
        <div class="docdog-form__item">
          <label for="position" class="docdog-form__item__title">役職</label>
          <input name="position" type="text" id="position" placeholder="" v-model="position" required />
        </div>
        <div class="docdog-form__button">
          <button type="submit" class="docdog-button docdog-button--primary" @click.prevent="signup">
            変更する
          </button>
        </div>
      </form>
      <div class="docdog-form__link">
        <button type="button" class="docdog-button--text">アカウントを削除する</button>
      </div>
    </div>
  </div>
  <div class="docdog-modal__body__section">
    <p class="docdog-modal__body__text">
      続行することで<a href="/dummy/">利用規約</a>および<a href="/dummy/">プライバシーポリシー</a
      >を読み、これに同意するものとします。
    </p>
  </div>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import memberApi from '@/api/member';
import loginApi from '@/api/login';
import AlertSuccess from '@/components/AlertSuccess.vue';
import AlertError from '@/components/AlertError.vue';
export default {
  extends: AbstractPage,
  components: {
    AlertSuccess,
    AlertError
  },
  data() {
    return {
      email: '',
      name1: '',
      name2: '',
      company_nm: '',
      industry: '',
      position: '',
      login_pwd: '',
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
  },
  methods: {
    signup(event) {
      this.$emit('err', '');
      memberApi
        .doSignUp({
          email: this.email,
          name1: this.name1,
          name2: this.name2,
          company_nm: this.company_nm,
          industry: this.industry,
          position: this.position,
          login_pwd: this.login_pwd,
        })
        .then((resp) => {
          loginApi
            .doLogin({
              email: this.email,
              password: this.login_pwd,
            })
            .then(() => {
                this.$emit('redirect', {target: 'Download'});
            })
            .catch((err) => {
              this.$emit('err', err);
            });
        })
        .catch((err) => {
          this.$emit('err', err);
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
