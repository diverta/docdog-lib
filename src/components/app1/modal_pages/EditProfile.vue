<template>
  <div class="docdog-container--form">
    <AlertError v-if="err" :err="err_msg" />
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />
    <div class="docdog-container--white">
      <div class="docdog-modal__body__pagetitle docdog-modal__body__section">
        <h1>アカウント情報の編集</h1>
      </div>
      <div class="docdog-modal__body__section">
        <div class="docdog-form__signup">
          <form>
            <div class="docdog-form__item--col-2">
              <div class="docdog-form__item">
                <label for="name1" class="docdog-form__item__title"
                  >姓<span class="docdog-form__item__title__badge">必須</span></label
                >
                <input name="name1" type="text" id="name1" placeholder="" v-model="name1" required />
              </div>
              <div class="docdog-form__item">
                <label for="name2" class="docdog-form__item__title"
                  >名<span class="docdog-form__item__title__badge">必須</span></label
                >
                <input name="name2" type="text" id="name2" placeholder="" v-model="name2" required />
              </div>
            </div>
            <div class="docdog-form__item" :class="err_field == 'email' ? 'docdog-form__item--error' : ''">
              <label for="email" class="docdog-form__item__title"
                >メールアドレス<span class="docdog-form__item__title__badge">必須</span></label
              >
              <input name="email" type="text" id="email" placeholder="" v-model="email" required />
            </div>
            <div class="docdog-form__item">
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
import AbstractPage from '@/components/common/AbstractPage.vue';
import memberApi from '@/api/member';
import loginApi from '@/api/login';
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
      email: '',
      name1: '',
      name2: '',
      login_pwd: '',
      formDef: [],
      customFields: {},
      errClass: 'docdog-form__item--error',
    };
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
      loginApi.getProfile().then((profile) => {
        if (profile.member_id) {
          this.email = profile.email;
          this.name1 = profile.name1;
          this.name2 = profile.name2;
          Object.values(this.formDef).forEach((customField) => {
            if (profile[customField.key_name] != null) {
              let val = profile[customField.key_name] || null;
              switch (customField.type) {
                case 'number':
                  if (val != null && val !== '') {
                    val = parseInt(val);
                  }
                  break;
                case 'relation':
                  if (val != null && val.module_id) {
                    val.module_id = parseInt(val.module_id);
                  }
                  break;
                case 'boolean':
                  val = val == '1';
                  break;
                case 'url':
                  if (!val || val == '' || (typeof val === 'object' && val.url == '' && val.title == '')) {
                    val = null;
                  }
                  break;
              }
              this.customFields[customField.key_name] = val;
            }
          });
        } else {
          this.close();
        }
      });
    });
  },
  methods: {
    editProfile(event) {
      this.error(''); // clean the error
      const newData = {
        email: this.email,
        name1: this.name1,
        name2: this.name2,
      };
      Object.entries(this.customFields).forEach(([key, val]) => {
        if (val != null) {
          newData[key] = val;
        }
      });
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
        })
        .then(() => {
          this.resetView();
        });
    },
  },
};
</script>
