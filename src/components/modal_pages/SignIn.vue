<style lang="scss" scoped>
$color-link: #1371ff;
$color-primary: #1371ff;
$color-border: #ccc;
$color-gray: #666;
$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 12px;
$spacing-x-sm: 4px;
$spacing-sm: 8px;
$spacing-md: 12px;
$spacing-lg: 24px;
$spacing-x-lg: 36px;
$transition: 0.2s;
.docdog {
  &-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    border-radius: $border-radius-sm;
    &--primary {
      background-color: $color-primary;
      color: #fff;
      &:hover {
        background-color: darken($color-primary, 8%);
      }
    }
    &--text {
      padding: $spacing-x-sm;
      background-color: transparent;
      color: $color-link;
      & + & {
        margin-top: $spacing-x-sm;
      }
    }
  }
}
.docdog-modal__body__heading {
  margin: 0 0 $spacing-lg;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
.docdog-form {
  @media screen and (min-width: 768px) {
    padding: $spacing-md;
    &--col-2 {
      display: flex;
      justify-content: space-between;
    }
    &__sso,
    &__signin {
      width: 42%;
    }
  }
  &__sso {
    &__button {
      display: flex;
      align-items: center;
      width: 100%;
      height: 50px;
      padding: $spacing-md;
      border: 1px solid;
      border-radius: $border-radius-sm;
      color: #fff;
      transition: $transition;
      svg {
        flex: 0 0 auto;
      }
      span {
        flex: 1 1 auto;
        line-height: 1;
      }
      & + & {
        margin-top: $spacing-sm;
      }
      &--google {
        border-color: $color-border;
        background-color: #fff;
        color: #222;
        &:hover {
          background-color: darken(#fff, 8%);
        }
      }
      &--facebook {
        border-color: #1877f2;
        background-color: #1877f2;
        &:hover {
          border-block-color: darken(#1877f2, 8%);
          background-color: darken(#1877f2, 8%);
        }
      }
      &--apple {
        border-color: #000;
        background-color: #000;
        &:hover {
          border-color: lighten(#000, 12%);
          background-color: lighten(#000, 12%);
        }
      }
      &--line {
        border-color: #06c755;
        background-color: #06c755;
        &:hover {
          border-color: darken(#06c755, 8%);
          background-color: darken(#06c755, 8%);
        }
      }
      &--yahoo {
        border-color: #ff0033;
        background-color: #ff0033;
        &:hover {
          border-color: darken(#ff0033, 8%);
          background-color: darken(#ff0033, 8%);
        }
      }
    }
  }
  &__hr {
    display: flex;
    align-content: center;
    justify-content: center;
    width: 8%;
    position: relative;
    @media screen and (max-width: 767px) {
      width: 100%;
      min-height: 20px;
      margin: $spacing-md 0;
      padding: $spacing-lg 0;
    }
    &::before {
      width: 1px;
      height: 100%;
      background-color: $color-border;
      content: '';
      @media screen and (max-width: 767px) {
        width: 100%;
        height: 1px;
      }
    }
    span {
      display: block;
      width: 100%;
      padding: $spacing-md 0;
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: #fff;
      text-align: center;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 767px) {
        width: auto;
        padding: 0 $spacing-md;
      }
    }
  }
  input[type='text'],
  input[type='email'],
  input[type='password'] {
    width: 100%;
    height: 50px;
    border: 1px solid $color-border;
    border-radius: $border-radius-sm;
    padding: $spacing-md;
  }
  input[type='checkbox'],
  input[type='radio'] {
    width: 16px;
    height: 16px;
    margin-right: $spacing-sm;
  }
  &__toggle {
    display: flex;
    align-items: center;
    padding: $spacing-sm 0;
  }
  &__item {
    &--error {
      input[type='text'],
      input[type='email'],
      input[type='password'] {
        border-color: #dc0000;
      }
      &__msg {
        margin: $spacing-sm 0;
        color: #dc0000;
        font-size: 12px;
      }
    }
  }
  &__link {
    margin-top: $spacing-lg;
    text-align: center;
    a,
    button {
      display: inline-block;
      margin: auto;
    }
  }
}
.docdog-form__signin {
  .docdog-form__item {
    &:not(:first-child) {
      margin-top: $spacing-sm;
    }
  }
}
</style>

<template>
  <div class="docdog-modal__body__section">
    <p class="docdog-modal__body__text">ダウンロードするにはログインまたはアカウントの作成が必要です。</p>
  </div>
  <div class="docdog-form docdog-form--col-2 docdog-modal__body__section">
    <div class="docdog-form__sso">
      <p class="docdog-modal__body__heading">他サイトのアカウントでログイン</p>
      <button type="button" class="docdog-form__sso__button docdog-form__sso__button--google">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24.6 16.2273C24.6 15.5182 24.5364 14.8364 24.4182 14.1819H15V18.0501H20.3818C20.15 19.3001 19.4455 20.3592 18.3864 21.0682V23.5773H21.6182C23.5091 21.8364 24.6 19.2728 24.6 16.2273Z"
            fill="#4285F4"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.9998 25.9999C17.6998 25.9999 19.9635 25.1044 21.618 23.5772L18.3862 21.0681C17.4907 21.6681 16.3453 22.0226 14.9998 22.0226C12.3953 22.0226 10.1907 20.2635 9.40439 17.8999H6.06348V20.4908C7.70893 23.759 11.0907 25.9999 14.9998 25.9999Z"
            fill="#34A853"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.40455 17.8999C9.20455 17.2999 9.09091 16.659 9.09091 15.9999C9.09091 15.3409 9.20455 14.6999 9.40455 14.0999V11.509H6.06364C5.38636 12.859 5 14.3863 5 15.9999C5 17.6136 5.38636 19.1409 6.06364 20.4909L9.40455 17.8999Z"
            fill="#FBBC05"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.9998 9.97727C16.468 9.97727 17.7862 10.4818 18.8226 11.4727L21.6907 8.60455C19.9589 6.99091 17.6953 6 14.9998 6C11.0907 6 7.70893 8.24091 6.06348 11.5091L9.40439 14.1C10.1907 11.7364 12.3953 9.97727 14.9998 9.97727Z"
            fill="#EA4335"
          />
        </svg>
        <span>Googleでログイン</span>
      </button>
      <button type="button" class="docdog-form__sso__button docdog-form__sso__button--facebook">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M27 15.5C27 8.59644 21.4036 3 14.5 3C7.59644 3 2 8.59644 2 15.5C2 21.739 6.57104 26.9104 12.5469 27.8481V19.1133H9.37305V15.5H12.5469V12.7461C12.5469 9.61328 14.4131 7.88281 17.2683 7.88281C18.6355 7.88281 20.0664 8.12695 20.0664 8.12695V11.2031H18.4902C16.9375 11.2031 16.4531 12.1667 16.4531 13.1563V15.5H19.9199L19.3657 19.1133H16.4531V27.8481C22.429 26.9104 27 21.739 27 15.5Z"
            fill="white"
          />
        </svg>
        <span>Facebookでログイン</span>
      </button>
      <button type="button" class="docdog-form__sso__button docdog-form__sso__button--apple">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_241_1435)">
            <path
              d="M15.2783 8.48076C16.3184 8.48076 17.6221 7.75604 18.3985 6.78974C19.1015 5.91401 19.6142 4.69104 19.6142 3.46805C19.6142 3.30197 19.5996 3.13589 19.5703 3C18.4131 3.0453 17.0215 3.80022 16.1865 4.81183C15.5273 5.58185 14.9268 6.78974 14.9268 8.02781C14.9268 8.209 14.9561 8.39017 14.9707 8.45057C15.044 8.46567 15.1611 8.48076 15.2783 8.48076ZM11.6162 26.75C13.0371 26.75 13.667 25.7686 15.4394 25.7686C17.2412 25.7686 17.6368 26.7197 19.2188 26.7197C20.7715 26.7197 21.8115 25.2401 22.793 23.7906C23.8916 22.1299 24.3458 20.4993 24.375 20.4238C24.2725 20.3935 21.2989 19.1404 21.2989 15.6224C21.2989 12.5725 23.6426 11.1985 23.7744 11.0928C22.2216 8.79784 19.8633 8.73745 19.2188 8.73745C17.4756 8.73745 16.0547 9.82454 15.1611 9.82454C14.1943 9.82454 12.9199 8.79784 11.4111 8.79784C8.54004 8.79784 5.625 11.2438 5.625 15.864C5.625 18.7326 6.70899 21.7675 8.04199 23.7302C9.18457 25.3911 10.1807 26.75 11.6162 26.75Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_241_1435">
              <rect width="20" height="23.75" fill="white" transform="translate(5 3)" />
            </clipPath>
          </defs>
        </svg>
        <span>Appleでログイン</span>
      </button>
      <button type="button" class="docdog-form__sso__button docdog-form__sso__button--line">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.3363 2C22.69 2 28.6725 6.855 28.6725 12.8225C28.6725 15.2075 27.7463 17.3625 25.8137 19.4813C23.0162 22.7025 16.76 26.6263 15.3363 27.225C13.9507 27.8077 14.1124 26.894 14.1762 26.5335C14.178 26.5236 14.1797 26.5141 14.1812 26.505C14.215 26.305 14.3713 25.3638 14.3713 25.3638C14.4163 25.0238 14.4625 24.495 14.3275 24.1575C14.1787 23.7863 13.5875 23.5938 13.1525 23.5C6.75 22.6538 2 18.1725 2 12.8225C2 6.855 7.9825 2 15.3363 2ZM11.6862 9.93872H12.6312C12.772 9.93872 12.8862 10.0529 12.8862 10.1937V16.0137C12.8862 16.1545 12.772 16.2687 12.6312 16.2687H11.6862C11.5453 16.2687 11.4312 16.1545 11.4312 16.0137V10.1937C11.4312 10.0529 11.5453 9.93872 11.6862 9.93872ZM10.3761 16.2687C10.4424 16.2687 10.506 16.2424 10.5529 16.1955C10.5998 16.1486 10.6261 16.085 10.6261 16.0187V15.0737C10.6261 15.0074 10.5998 14.9438 10.5529 14.897C10.506 14.8501 10.4424 14.8237 10.3761 14.8237H7.82988V10.1987C7.82988 10.1324 7.80354 10.0688 7.75666 10.022C7.70978 9.97507 7.64619 9.94873 7.57988 9.94873H6.62988C6.56358 9.94873 6.49999 9.97507 6.45311 10.022C6.40622 10.0688 6.37988 10.1324 6.37988 10.1987V16.015C6.37988 16.0813 6.40622 16.1449 6.45311 16.1918C6.49999 16.2386 6.56358 16.265 6.62988 16.265H10.3799L10.3761 16.2687ZM24.2349 16.2687H20.4849C20.4186 16.2687 20.355 16.2424 20.3081 16.1955C20.2612 16.1486 20.2349 16.085 20.2349 16.0187V10.2C20.2349 10.1336 20.2612 10.0701 20.3081 10.0232C20.355 9.97629 20.4186 9.94995 20.4849 9.94995H24.2349C24.3012 9.94995 24.3648 9.97629 24.4116 10.0232C24.4585 10.0701 24.4849 10.1336 24.4849 10.2V11.1462C24.4849 11.2125 24.4585 11.2761 24.4116 11.323C24.3648 11.3699 24.3012 11.3962 24.2349 11.3962H21.6886V12.3775H24.2349C24.3012 12.3775 24.3648 12.4038 24.4116 12.4507C24.4585 12.4976 24.4849 12.5611 24.4849 12.6275V13.5825C24.4849 13.6488 24.4585 13.7123 24.4116 13.7592C24.3648 13.8061 24.3012 13.8325 24.2349 13.8325H21.6886V14.815H24.2349C24.3012 14.815 24.3648 14.8413 24.4116 14.8882C24.4585 14.9351 24.4849 14.9986 24.4849 15.065V16.01C24.486 16.0435 24.4804 16.077 24.4684 16.1083C24.4564 16.1397 24.4381 16.1683 24.4148 16.1924C24.3915 16.2166 24.3635 16.2358 24.3326 16.2489C24.3017 16.262 24.2684 16.2687 24.2349 16.2687ZM19.0698 9.93872H18.1248C18.0585 9.93872 17.9949 9.96506 17.948 10.0119C17.9011 10.0588 17.8748 10.1224 17.8748 10.1887V13.6462L15.2123 10.05C15.2062 10.0404 15.1991 10.0316 15.191 10.0237L15.176 10.0087L15.1623 9.99747H15.1548L15.141 9.98747H15.1335L15.1198 9.97997H15.111H15.0973H15.0885H15.0735H15.0635H15.0485H15.0385H15.0248H14.061C13.9947 9.97997 13.9311 10.0063 13.8843 10.0532C13.8374 10.1001 13.811 10.1637 13.811 10.23V16.05C13.811 16.1163 13.8374 16.1799 13.8843 16.2267C13.9311 16.2736 13.9947 16.3 14.061 16.3H15.0073C15.0736 16.3 15.1372 16.2736 15.1841 16.2267C15.2309 16.1799 15.2573 16.1163 15.2573 16.05V12.5587L17.9235 16.1587C17.941 16.1842 17.963 16.2063 17.9885 16.2237L18.0035 16.2337H18.011L18.0235 16.24H18.036H18.0448H18.0623C18.0844 16.2454 18.107 16.2483 18.1298 16.2487H19.0698C19.1361 16.2487 19.1997 16.2224 19.2466 16.1755C19.2934 16.1286 19.3198 16.065 19.3198 15.9987V10.1937C19.3205 10.1605 19.3145 10.1274 19.3022 10.0965C19.2899 10.0656 19.2716 10.0374 19.2484 10.0137C19.2251 9.98996 19.1973 9.97109 19.1666 9.95822C19.136 9.94534 19.103 9.93871 19.0698 9.93872Z"
            fill="white"
          />
        </svg>
        <span>LINEでログイン</span>
      </button>
      <button type="button" class="docdog-form__sso__button docdog-form__sso__button--yahoo">
        <img src="/src/assets/image/logo-yahoo.png" />
        <span>Yahoo! JAPAN IDでログイン</span>
      </button>
    </div>
    <div class="docdog-form__hr"><span>または</span></div>
    <div class="docdog-form__signin">
      <p class="docdog-modal__body__heading">ログイン</p>
      <form>
        <div :class="err.length > 0 ? 'docdog-form__item docdog-form__item--error' : ''">
          <input name="email" type="text" id="email" placeholder="メールアドレス" v-model="login_id" required />
          <p class="docdog-form__item--error__msg" v-if="err.length > 0">{{ err }}</p>
        </div>
        <div class="docdog-form__item">
          <input name="password" type="password" id="password" placeholder="パスワード" v-model="password" required />
        </div>
        <div class="docdog-form__item">
          <div class="docdog-form__toggle">
            <input name="login_save" id="login_save" type="checkbox" value="1" checked="checked" />
            <label for="login_save">次回から自動的にログインする</label>
          </div>
        </div>
        <div class="docdog-form__item">
          <button type="button" class="docdog-button docdog-button--primary" @click="login">ログイン</button>
        </div>
      </form>
      <div class="docdog-form__link">
        <button type="button" class="docdog-button--text" @click.prevent="$emit('redirect', 'SignUp')">
          アカウントを作成する
        </button>
        <button type="button" class="docdog-button--text">パスワードを忘れた場合</button>
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
import loginApi from '@/api/login';

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
