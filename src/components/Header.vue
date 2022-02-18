<template>
  <header class="l-header">
    <div class="l-header__main">
      <a href="/" class="l-header__title">
        <img src="~/assets/image/logo.svg">
        DocDog DEMO
      </a>
      <nav class="l-header__nav">
        <ul class="l-header__nav__list">
          <li>
            <a href="/docs">Docs</a>
          </li>
          <li>
            <a href="https://docdog.app/">Contact</a>
          </li>
        </ul>
        <!-- ToDo: Before SignIn for SP -->
        <button type="button" class="l-header__nav__button is-sp" v-on:click="openModalSignIn">ログイン</button>
        <!-- ToDo: After SignIn for SP -->
        <button type="button" class="l-header__nav__button--icon is-sp">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 2.5C8.1 2.5 2.5 8.1 2.5 15C2.5 21.9 8.1 27.5 15 27.5C21.9 27.5 27.5 21.9 27.5 15C27.5 8.1 21.9 2.5 15 2.5ZM15 6.25C17.075 6.25 18.75 7.925 18.75 10C18.75 12.075 17.075 13.75 15 13.75C12.925 13.75 11.25 12.075 11.25 10C11.25 7.925 12.925 6.25 15 6.25ZM15 24C11.875 24 9.1125 22.4 7.5 19.975C7.5375 17.4875 12.5 16.125 15 16.125C17.4875 16.125 22.4625 17.4875 22.5 19.975C20.8875 22.4 18.125 24 15 24Z" fill="#138AFF"/>
          </svg>
        </button>
      </nav>
    </div>
    <!-- ToDo: Before SignIn for PC -->
    <button type="button" class="l-header__nav__button is-pc" v-on:click="openModalSignIn">ログイン</button>
    <!-- ToDo: After SignIn for PC -->
    <button type="button" class="l-header__nav__button--icon is-pc">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 2.5C8.1 2.5 2.5 8.1 2.5 15C2.5 21.9 8.1 27.5 15 27.5C21.9 27.5 27.5 21.9 27.5 15C27.5 8.1 21.9 2.5 15 2.5ZM15 6.25C17.075 6.25 18.75 7.925 18.75 10C18.75 12.075 17.075 13.75 15 13.75C12.925 13.75 11.25 12.075 11.25 10C11.25 7.925 12.925 6.25 15 6.25ZM15 24C11.875 24 9.1125 22.4 7.5 19.975C7.5375 17.4875 12.5 16.125 15 16.125C17.4875 16.125 22.4625 17.4875 22.5 19.975C20.8875 22.4 18.125 24 15 24Z" fill="#138AFF"/>
      </svg>
    </button>
    <nav class="l-header__nav--user">
      <div class="l-header__nav--user__name">Mimori Maako さん</div>
      <button type="button" class="l-header__nav--user__button">アカウント情報の編集</button>
      <button type="button" class="l-header__nav--user__button">ログアウト</button>
    </nav>
  </header>
</template>

<script>
export default {
  props: {

  },
  methods: {
  },
};
</script>
