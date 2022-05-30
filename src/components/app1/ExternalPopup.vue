<template>
  <div class="docdog docdog--toggle--open">
    <button type="button" v-if="!isLogin" class="docdog-button--floating" @click="redirect({ target: 'SignIn' })">
      <div class="docdog-tooltip__outer">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.13 18.17C17.701 18.599 17.701 19.281 18.13 19.71L20.22 21.8H10.1C9.495 21.8 9 22.295 9 22.9C9 23.505 9.495 24 10.1 24H20.22L18.13 26.09C17.701 26.519 17.701 27.201 18.13 27.63C18.559 28.059 19.241 28.059 19.67 27.63L23.619 23.681C24.048 23.252 24.048 22.559 23.619 22.13L19.67 18.17C19.241 17.741 18.559 17.741 18.13 18.17ZM28.8 30.6H21.1C20.495 30.6 20 31.095 20 31.7C20 32.305 20.495 32.8 21.1 32.8H28.8C30.01 32.8 31 31.81 31 30.6V15.2C31 13.99 30.01 13 28.8 13H21.1C20.495 13 20 13.495 20 14.1C20 14.705 20.495 15.2 21.1 15.2H28.8V30.6Z"
            fill="white"
          />
        </svg>
        <span class="docdog-tooltip">ログイン</span>
      </div>
    </button>
    <button type="button" v-if="isLogin" class="docdog-button--floating" @click="redirect({ target: 'Mypage' })">
      <div class="docdog-tooltip__outer">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 23C22.7625 23 25 20.7625 25 18C25 15.2375 22.7625 13 20 13C17.2375 13 15 15.2375 15 18C15 20.7625 17.2375 23 20 23ZM20 25.5C16.6625 25.5 10 27.175 10 30.5V31.75C10 32.4375 10.5625 33 11.25 33H28.75C29.4375 33 30 32.4375 30 31.75V30.5C30 27.175 23.3375 25.5 20 25.5Z"
            fill="white"
          />
        </svg>
        <span class="docdog-tooltip">マイページ</span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['redirect'],
  methods: {
    redirect(pageData) {
      this.$emit('redirect', pageData);
    },
  },
};
</script>
