<script setup>
import AbstractPage from './AbstractPage.vue';
import loginApi from '@/api/login';
</script>

<template>
  <h1>Login or Sign up to Download</h1>
  Login ID : <input type="text" v-model="login_id" />
  <br />
  Password : <input type="password" v-model="password" />
  <br />
  <p class="err" v-if="err.length > 0">{{ err }}</p>
  <input type="button" value="Login" @click="login" />
  <br />
  <a href="#" @click.prevent="$emit('redirect', 'SignUp')">Sign Up</a>
</template>

<script>
export default {
  extends: AbstractPage,
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
</style>
