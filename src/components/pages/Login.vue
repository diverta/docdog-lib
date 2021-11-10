<template>
  <h2>This is a private file. Please login to download</h2>
  <p class="err" v-if="err.length > 0" v-html="err" />
  Login ID : <n-input type="text" v-model:value="login_id" />
  <br />
  Password : <n-input type="password" v-model:value="password" />
  <br />
  <n-button @click="login">Login</n-button>
  <n-button class="signup-btn" href="#" @click.prevent="$emit('redirect', 'SignUp')">Sign Up</n-button>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
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
      login_id: '',
      password: '',
    };
  },
  methods: {
    login(event) {
      this.$emit('err', '');
      loginApi
        .doLogin({
          email: this.login_id,
          password: this.password,
        })
        .then((login_ok) => {
          if (login_ok) {
            this.$emit('redirect', 'Download');
          } else {
            this.$emit('err', 'Could not login');
          }
          event.target.blur();
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
.signup-btn {
  float: right;
}
</style>
