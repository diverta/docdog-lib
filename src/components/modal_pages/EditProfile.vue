<template>
  <div class="docdog-container--form">
    <AlertError v-if="err" :err="err_msg" />
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />
    <div class="docdog-container--white">
      <div class="docdog-modal__body__section">
        <h1 class="docdog-modal__body__pagetitle">アカウント情報の編集</h1>
      </div>
      <div class="docdog-modal__body__section">
        <div class="docdog-form__signup">
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
            <div class="docdog-form__item" :class="err_field == 'email' ? 'docdog-form__item--error' : ''">
              <label for="email" class="docdog-form__item__title">メールアドレス</label>
              <input name="email" type="text" id="email" placeholder="" v-model="email" required />
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
              <label for="position" class="docdog-form__item__title">メールマガジンの配信設定</label>
              <div class="docdog-form__toggle">
                <input name="email_send_ng_flg" id="email_send_ng_flg" v-model="email_send_ng_flg" type="checkbox" value="1" />
                <label for="email_send_ng_flg">メールマガジンを受け取らない</label>
              </div>
            </div>
            <div class="docdog-form__item">
              <label for="position" class="docdog-form__item__title">役職</label>
              <input name="position" type="text" id="position" placeholder="" v-model="position" required />
            </div>
            <div class="docdog-form__button">
              <button type="submit" class="docdog-button docdog-button--primary" @click.prevent="editProfile">
                変更する
              </button>
            </div>
          </form>
          <div class="docdog-form__link">
            <button type="button" class="docdog-button--text" @click="redirect({ target: 'Withdrawal' })">
              アカウントを削除する
            </button>
          </div>
        </div>
      </div>
      <FormPolicy />
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

export default {
  extends: AbstractPage,
  components: {
    AlertSuccess,
    AlertError,
    FormPolicy
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
      email_send_ng_flg: '',
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
  mounted() {
    loginApi.getProfile().then((profile) => {
      if (profile.member_id) {
        this.email = profile.email;
        this.name1 = profile.name1;
        this.name2 = profile.name2;
        this.company_nm = profile.company_nm;
        this.industry = profile.industry ? profile.industry.key : '';
        this.position = profile.position;
      } else {
        this.close();
      }
    });
  },
  methods: {
    editProfile(event) {
      this.error(''); // clean the error
      const newData = {
        email: this.email,
        name1: this.name1,
        name2: this.name2,
        company_nm: this.company_nm,
        industry: this.industry,
        position: this.position,
      };
      if (this.login_pwd) {
        // Only update password if inputted
        newData.login_pwd = this.login_pwd;
      }
      memberApi
        .doEditProfile(newData)
        .then((resp) => {
          loginApi.updateProfile(newData);
          this.redirect({ target: 'EditProfile', msg: ' ' }); // For the msg
        })
        .catch((err) => {
          this.error(err);
        });
    },
  },
};
</script>
