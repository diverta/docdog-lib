<template>
  <p class="err" v-if="err.length > 0" v-html="err" />
  Email : <n-input type="text" v-model:value="email" /><br />
  Name1 : <n-input type="text" v-model:value="name1" /><br />
  Name2 : <n-input type="text" v-model:value="name2" /><br />
  Password : <n-input type="password" show-password-on="mousedown" placeholder="Password" v-model:value="login_pwd" />
  <n-button @click="signup">Sign Up</n-button>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import memberApi from '@/api/member';
import loginApi from '@/api/login';
import { NButton, NInput } from 'naive-ui';

export default {
  extends: AbstractPage,
  components: {
    NButton,
    NInput,
  },
  data() {
    return {
      email: '',
      name1: '',
      name2: '',
      login_pwd: '',
    };
  },
  methods: {
    signup(event) {
      this.$emit('err', '');
      memberApi
        .doSignUp({
          email: this.email,
          name1: this.name1,
          name2: this.name2,
          login_pwd: this.login_pwd,
        })
        .then((resp) => {
          loginApi
            .doLogin({
              email: this.email,
              password: this.login_pwd,
            })
            .then(() => {
              this.$emit('redirect', 'Download');
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
