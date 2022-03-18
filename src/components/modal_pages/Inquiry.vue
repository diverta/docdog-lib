<template>
  <div class="docdog-container--form">
    <AlertError v-if="err" :err="err_msg" />
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />
    <div class="docdog-container--white">
      <div class="docdog-modal__body__section">
        <h1 class="docdog-modal__body__pagetitle">お問い合わせ</h1>
      </div>
      <div class="docdog-modal__body__section">
        <div class="docdog-form__signup">
          <form>
            <template v-if="isLogin">
              <!-- TODO: Set member info name1 + name2 -->
              <input name="name" type="hidden" id="name" placeholder="" v-model="name" required />
              <!-- TODO: Set member info email -->
              <input name="email" type="hidden" id="email" placeholder="" v-model="email" required />
            </template>
            <template v-else>
              <div class="docdog-form__item">
                <div class="docdog-form__item">
                  <label for="name" class="docdog-form__item__title">名前<span class="docdog-form__item__title__badge">必須</span></label>
                  <input name="name" type="text" id="name" placeholder="" required />
                </div>
              </div>
              <div class="docdog-form__item" :class="err_field == 'email' ? 'docdog-form__item--error' : ''">
                <label for="email" class="docdog-form__item__title">メールアドレス<span class="docdog-form__item__title__badge">必須</span></label>
                <input name="email" type="text" id="email" placeholder="" v-model="email" required />
              </div>
            </template>
            <div class="docdog-form__item">
              <label for="category" class="docdog-form__item__title">お問い合わせカテゴリ</label>
              <select name="category" id="category" v-model="category" required>
                <option value="">選択してください</option>
                <option value="1">製品についてのお問い合わせ</option>
                <option value="2">Webサイトについてのお問い合わせ</option>
                <option value="3">会員情報についてのお問い合わせ</option>
                <option value="99">その他のお問い合わせ</option>
              </select>
            </div>
            <div class="docdog-form__item">
              <label for="message" class="docdog-form__item__title">お問い合わせ内容<span class="docdog-form__item__title__badge">必須</span></label>
              <textarea name="message" id="message" placeholder="" v-model="message" required />
            </div>
            <div class="docdog-form__button">
              <button type="submit" class="docdog-button docdog-button--primary" @click.prevent="editProfile">
                送信する
              </button>
            </div>
          </form>
        </div>
      </div>
      <FormPolicy />
    </div>
  </div>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import memberApi from '@/api/member';
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
      name: '',
      category: '',
      message: '',
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
  // mounted() {
  //   loginApi.getProfile().then((profile) => {
  //     if (profile.member_id) {
  //       this.email = profile.email;
  //       this.name1 = profile.name1;
  //       this.name2 = profile.name2;
  //     } else {
  //       this.close();
  //     }
  //   });
  // },
  // methods: {
  //   editProfile(event) {
  //     this.error(''); // clean the error
  //     const newData = {
  //       email: this.email,
  //       name1: this.name1,
  //       name2: this.name2,
  //       company_nm: this.company_nm,
  //       industry: this.industry,
  //       position: this.position,
  //     };
  //     if (this.login_pwd) {
  //       // Only update password if inputted
  //       newData.login_pwd = this.login_pwd;
  //     }
  //     memberApi
  //       .doEditProfile(newData)
  //       .then((resp) => {
  //         loginApi.updateProfile(newData);
  //         this.redirect({ target: 'EditProfile', msg: ' ' }); // For the msg
  //       })
  //       .catch((err) => {
  //         this.error(err);
  //       });
  //   },
  // },
};
</script>
