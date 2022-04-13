<template>
  <header class="docdog-modal__head">
    <div class="docdog-modal__head__nav">
      <button type="button" aria-label="Back to top" class="docdog-modal__head__nav__logo" @click.prevent="closeModal">
        <!-- site logo -->
        <img src="/src/assets/image/site-logo.svg" alt="site-title">
      </button>
      <nav class="docdog-modal__head__nav__list docdog-u-hidden-sp">
        <ul class="docdog-modal__head__nav__list__menu">
          <li v-if="isLogin">
            <button
              type="button"
              class="docdog-modal__head__nav__list__item"
              @click.prevent="
                redirect('Mypage');
                docdog_spmenu_display = !docdog_spmenu_display;
              "
            >
              マイページ
            </button>
          </li>
          <li v-if="isLogin">
            <button
              type="button"
              class="docdog-modal__head__nav__list__item"
              @click.prevent="
                redirect('Videos');
                docdog_spmenu_display = !docdog_spmenu_display;
              "
            >
              動画一覧
            </button>
          </li>
          <li v-if="isLogin">
            <button
              type="button"
              class="docdog-modal__head__nav__list__item"
              @click.prevent="
                redirect('Topics');
                docdog_spmenu_display = !docdog_spmenu_display;
              "
            >
              記事一覧
            </button>
          </li>
          <li v-if="isLogin">
            <button
              type="button"
              class="docdog-modal__head__nav__list__item"
              @click.prevent="
                redirect('List');
                docdog_spmenu_display = !docdog_spmenu_display;
              "
            >
              資料一覧
            </button>
          </li>
          <li v-if="isLogin">
            <button
              type="button"
              class="docdog-modal__head__nav__list__item"
              @click.prevent="
                redirect('Inquiry');
                docdog_spmenu_display = !docdog_spmenu_display;
              "
            >
              お問い合わせ
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <nav class="docdog-modal__head__nav">
      <button
        type="button"
        class="docdog-modal__head__account__button docdog-u-hidden-sp"
        v-if="!isLogin"
        @click.prevent="redirect('SignIn')"
      >
        ログイン
      </button>
      <button
        type="button"
        class="docdog-modal__head__account__toggle docdog-u-hidden-sp"
        v-if="isLogin"
        @click="docdog_menu_display = !docdog_menu_display"
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 2.5C8.1 2.5 2.5 8.1 2.5 15C2.5 21.9 8.1 27.5 15 27.5C21.9 27.5 27.5 21.9 27.5 15C27.5 8.1 21.9 2.5 15 2.5ZM15 6.25C17.075 6.25 18.75 7.925 18.75 10C18.75 12.075 17.075 13.75 15 13.75C12.925 13.75 11.25 12.075 11.25 10C11.25 7.925 12.925 6.25 15 6.25ZM15 24C11.875 24 9.1125 22.4 7.5 19.975C7.5375 17.4875 12.5 16.125 15 16.125C17.4875 16.125 22.4625 17.4875 22.5 19.975C20.8875 22.4 18.125 24 15 24Z"
            fill="#138AFF"
          />
        </svg>
      </button>
      <ul class="docdog-modal__head__account__nav" v-show="docdog_menu_display">
        <li>
          <button type="button" class="docdog-modal__head__account__nav__item" @click="redirect('EditProfile')">
            アカウント情報の編集
          </button>
        </li>
        <li>
          <button type="button" class="docdog-modal__head__account__nav__item" @click="logout">ログアウト</button>
        </li>
      </ul>
      <button
        type="button"
        class="docdog-modal__head__account__toggle docdog-u-hidden-pc"
        @click="docdog_spmenu_display = !docdog_spmenu_display"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#5d6775" />
        </svg>
      </button>
      <div
        class="docdog-u-hidden-pc"
        :class="docdog_spmenu_display ? 'docdog-modal__bg' : ''"
        @click.self="docdog_spmenu_display = !docdog_spmenu_display"
      >
        <div
          class="docdog-modal__head__nav__list"
          :class="docdog_spmenu_display ? 'docdog-modal__head__nav__list--fixed' : ''"
        >
          <div class="docdog-modal__head__nav--sp">
            <button
              type="button"
              aria-label="Back to top"
              class="docdog-modal__head__nav__logo"
              @click.prevent="closeModal"
            >
              <!-- site logo -->
              <img src="/src/assets/image/site-logo.svg" alt="site-title">
            </button>
            <button
              type="button"
              aria-label="Menu"
              class="docdog-modal__head__nav__logo"
              @click="docdog_spmenu_display = !docdog_spmenu_display"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="#5d6775"
                />
              </svg>
            </button>
          </div>
          <ul class="docdog-modal__head__nav__list__menu">
            <li v-if="isLogin">
              <button
                type="button"
                class="docdog-modal__head__nav__list__item"
                @click.prevent="
                  redirect('Mypage');
                  docdog_spmenu_display = !docdog_spmenu_display;
                "
              >
                マイページ
              </button>
            </li>
            <li v-if="isLogin">
              <button
                type="button"
                class="docdog-modal__head__nav__list__item"
                @click.prevent="
                  redirect('Videos');
                  docdog_spmenu_display = !docdog_spmenu_display;
                "
              >
                動画一覧
              </button>
            </li>
            <li v-if="isLogin">
              <button
                type="button"
                class="docdog-modal__head__nav__list__item"
                @click.prevent="
                  redirect('Topics');
                  docdog_spmenu_display = !docdog_spmenu_display;
                "
              >
                記事一覧
              </button>
            </li>
            <li v-if="isLogin">
              <button
                type="button"
                class="docdog-modal__head__nav__list__item"
                @click.prevent="
                  redirect('List');
                  docdog_spmenu_display = !docdog_spmenu_display;
                "
              >
                資料一覧
              </button>
            </li>
            <li v-if="isLogin">
              <button
                type="button"
                class="docdog-modal__head__nav__list__item"
                @click.prevent="
                  redirect('Inquiry');
                  docdog_spmenu_display = !docdog_spmenu_display;
                "
              >
                お問い合わせ
              </button>
            </li>
          </ul>
          <ul class="docdog-card__list" v-if="!isLogin">
            <li>
              <button
                type="button"
                class="docdog-button docdog-button--primary"
                @click="
                  redirect('SignIn');
                  docdog_spmenu_display = !docdog_spmenu_display;
                "
              >
                ログイン
              </button>
            </li>
          </ul>
          <ul class="docdog-card__list" v-if="isLogin">
            <li>
              <button
                type="button"
                class="docdog-button docdog-button--white"
                @click="
                  redirect('EditProfile');
                  docdog_spmenu_display = !docdog_spmenu_display;
                "
              >
                アカウント情報の変更
              </button>
            </li>
            <li>
              <button type="button" class="docdog-button docdog-button--white" @click="logout">ログアウト</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'redirect', 'logout'],
  data() {
    return {
      docdog_menu_display: false,
      docdog_spmenu_display: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    redirect(target, params = {}) {
      this.docdog_menu_display = false;
      this.$emit('redirect', { target, params });
    },
    logout() {
      this.docdog_menu_display = false;
      this.docdog_spmenu_display = false;
      this.$emit('logout');
    },
  },
};
</script>
