<template>
  <header class="kuroco-modal__head">
    <div class="kuroco-modal__head__nav">
      <button type="button" aria-label="Back to top" class="kuroco-modal__head__nav__logo" @click.prevent="closeModal">
        <!-- site logo -->
        <img :src="site_logo" alt="site-title" />
      </button>
      <nav class="kuroco-modal__head__nav__list kuroco-u-hidden-sp">
        <ul class="kuroco-modal__head__nav__list__menu">
          <li v-if="isLogin">
            <button
              type="button"
              class="kuroco-modal__head__nav__list__item"
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
              class="kuroco-modal__head__nav__list__item"
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
              class="kuroco-modal__head__nav__list__item"
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
              class="kuroco-modal__head__nav__list__item"
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
              class="kuroco-modal__head__nav__list__item"
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
    <nav class="kuroco-modal__head__nav">
      <button
        type="button"
        class="kuroco-modal__head__account__button kuroco-u-hidden-sp"
        v-if="!isLogin"
        @click.prevent="redirect('SignIn')"
      >
        ログイン
      </button>
      <button
        type="button"
        class="kuroco-modal__head__account__toggle kuroco-u-hidden-sp"
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
      <ul class="kuroco-modal__head__account__nav" v-show="docdog_menu_display">
        <li>
          <button type="button" class="kuroco-modal__head__account__nav__item" @click="redirect('EditProfile')">
            アカウント情報の編集
          </button>
        </li>
        <li>
          <button type="button" class="kuroco-modal__head__account__nav__item" @click="logout">ログアウト</button>
        </li>
      </ul>
      <button
        type="button"
        class="kuroco-modal__head__account__toggle kuroco-u-hidden-pc"
        @click="docdog_spmenu_display = !docdog_spmenu_display"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#5d6775" />
        </svg>
      </button>
      <div
        class="kuroco-u-hidden-pc"
        :class="docdog_spmenu_display ? 'kuroco-modal__bg' : ''"
        @click.self="docdog_spmenu_display = !docdog_spmenu_display"
      >
        <div
          class="kuroco-modal__head__nav__list"
          :class="docdog_spmenu_display ? 'kuroco-modal__head__nav__list--fixed' : ''"
        >
          <div class="kuroco-modal__head__nav--sp">
            <button
              type="button"
              aria-label="Back to top"
              class="kuroco-modal__head__nav__logo"
              @click.prevent="closeModal"
            >
              <!-- site logo -->
              <img :src="site_logo" alt="site-title" />
            </button>
            <button
              type="button"
              aria-label="Menu"
              class="kuroco-modal__head__nav__logo"
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
          <ul class="kuroco-modal__head__nav__list__menu">
            <li v-if="isLogin">
              <button
                type="button"
                class="kuroco-modal__head__nav__list__item"
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
                class="kuroco-modal__head__nav__list__item"
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
                class="kuroco-modal__head__nav__list__item"
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
                class="kuroco-modal__head__nav__list__item"
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
                class="kuroco-modal__head__nav__list__item"
                @click.prevent="
                  redirect('Inquiry');
                  docdog_spmenu_display = !docdog_spmenu_display;
                "
              >
                お問い合わせ
              </button>
            </li>
          </ul>
          <ul class="kuroco-card__list" v-if="!isLogin">
            <li>
              <button
                type="button"
                class="kuroco-button--primary"
                @click="
                  redirect('SignIn');
                  docdog_spmenu_display = !docdog_spmenu_display;
                "
              >
                ログイン
              </button>
            </li>
          </ul>
          <ul class="kuroco-card__list" v-if="isLogin">
            <li>
              <button
                type="button"
                class="kuroco-button--white"
                @click="
                  redirect('EditProfile');
                  docdog_spmenu_display = !docdog_spmenu_display;
                "
              >
                アカウント情報の変更
              </button>
            </li>
            <li>
              <button type="button" class="kuroco-button--white" @click="logout">ログアウト</button>
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
      site_logo:
        'data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjI4IiBoZWlnaHQ9IjQ1IiB2aWV3Qm94PSIwIDAgMjI4IDQ1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoCiAgICBkPSJNMzIuOTg1IDEuNTNDMzIuMjgzIDAuODI4IDMwLjkwMTUgMC4yNTY1IDI5LjkxMTUgMC4yNTY1SDE1LjA4ODVDMTQuMDk4NSAwLjI1NjUgMTIuNzE3IDAuODI4IDEyLjAxNSAxLjUzTDEuNTI5OTcgMTIuMDE1QzAuODI3OTcgMTIuNzE3IDAuMjU2NDcgMTQuMDk4NSAwLjI1NjQ3IDE1LjA4ODVWMjkuOTExNUMwLjI1NjQ3IDMwLjkwMTUgMC44Mjc5NyAzMi4yODMgMS41Mjk5NyAzMi45ODVMMTIuMDE1IDQzLjQ3QzEyLjcxNyA0NC4xNzIgMTQuMDk4NSA0NC43NDM1IDE1LjA4ODUgNDQuNzQzNUgyOS45MTE1QzMwLjkwMTUgNDQuNzQzNSAzMi4yODMgNDQuMTcyIDMyLjk4NSA0My40N0w0My40NyAzMi45ODVDNDQuMTcyIDMyLjI4MyA0NC43NDM1IDMwLjkwMTUgNDQuNzQzNSAyOS45MTE1VjE1LjA4ODVDNDQuNzQzNSAxNC4wOTg1IDQ0LjE3MiAxMi43MTcgNDMuNDcgMTIuMDE1TDMyLjk4NSAxLjUzWiIKICAgIGZpbGw9IiNGRjQ2MTMiCiAgLz4KICA8cGF0aAogICAgZD0iTTIwLjMyMiA1LjgwOTUxQzIwLjUwNjQgNS43MTA5NSAyMC42NzQ4IDUuNTg1MDIgMjAuODIxNSA1LjQzNjAxTDIwLjAzNCA0Ljk1NDUxQzE5LjU4ODUgNC42ODkwMSAxOS4wMTI1IDQuNjg5MDEgMTguNTY3IDQuOTk5NTFDMTguNTI2NSA1LjA0MDAxIDE4LjI5NyA1LjIxNTUxIDE3Ljk5NTUgNS41MDgwMUMxOC4zMDc3IDUuNzg2ODUgMTguNjk2OSA1Ljk2NDgzIDE5LjExMjEgNi4wMTg2M0MxOS41MjczIDYuMDcyNDQgMTkuOTQ5IDUuOTk5NTQgMjAuMzIyIDUuODA5NTFWNS44MDk1MVoiCiAgICBmaWxsPSJ3aGl0ZSIKICAvPgogIDxwYXRoCiAgICBkPSJNMzkuNTIzNiAxNy4xODU1QzM4LjcyMjYgMTIuMzM0NSAzNC40NTIxIDguNzM0NSAyOS40NzA1IDguNzM0NUgyNi4yMjE1TDIxLjUyOCA1Ljg2MzQ5QzIxLjMxMiA2LjA3MDQ5IDIxLjA2NDUgNi4yNTA0OSAyMC43OTQ1IDYuMzg5OTlDMjAuMjY4MyA2LjY1ODY3IDE5LjY3NjQgNi43NzE3NCAxOS4wODgyIDYuNzE1OTVDMTguNSA2LjY2MDE1IDE3LjkzOTkgNi40Mzc4MSAxNy40NzM1IDYuMDc1QzE3LjIzMDUgNi4zNTg1IDE2Ljk3ODUgNi42OTYgMTYuNzQ5IDcuMDkyQzE0Ljg4MTUgMTAuNDI2NSAxNC40MzYgMTYuMzQ0IDE5LjI4NyAxOS4xOTI1QzI4LjAxNyAyNC4zNjMgMjYuODM4IDMzLjY2OSAyMy43NzggNDQuNzQzNUgyOS45ODgxQzMwLjk0MjEgNDQuNzQzNSAzMi4yNzQxIDQ0LjE5IDMyLjk0NDYgNDMuNTE5NUwzOC44MDM2IDM3LjY2MDVDMzcuNzQxNiAzNi4wNzIgMzYuOTcyMSAzNC41MTk1IDM2Ljc1NjEgMzMuMTQ3QzM2LjE4NDYgMzAuMjgwNSAzNy43MjgxIDI4LjQ5ODUgMzcuNTI1NiAyNy4yMTE1QzM2Ljg5MDggMjcuMTU1MiAzNi4yODA4IDI2LjkzODYgMzUuNzUyNyAyNi41ODJDMzUuMjI0NSAyNi4yMjU1IDM0Ljc5NTYgMjUuNzQwNyAzNC41MDYxIDI1LjE3M0wzMS43NzAxIDE5LjgwOUMzMS42MDgxIDE5LjQ5NCAzMS43Mjk2IDE5LjEyOTUgMzIuMDQ0NiAxOC45Njc1QzMyLjM1OTYgMTguODA1NSAzMi43MjQxIDE4LjkyNyAzMi44ODYxIDE5LjI0MkwzNS42MTc2IDI0LjYwMTVDMzUuNzY3NiAyNC44OTY0IDM1Ljk3NDMgMjUuMTU4OCAzNi4yMjU5IDI1LjM3MzhDMzYuNDc3NCAyNS41ODg4IDM2Ljc2ODggMjUuNzUyMiAzNy4wODM1IDI1Ljg1NDZDMzcuMzk4MSAyNS45NTcgMzcuNzI5OCAyNS45OTYzIDM4LjA1OTcgMjUuOTcwNUMzOC4zODk2IDI1Ljk0NDcgMzguNzExMiAyNS44NTQxIDM5LjAwNjEgMjUuNzA0QzM5LjMzOTEgMjUuNTMzIDM5LjYwOTEgMjUuMjgxIDM5LjgzODYgMjQuOTk3NUwzOS44NDc2IDI1LjAwMkM0MC42NTMxIDIzLjE4NCA0MC4xMTc2IDIwLjY0NiAzOS41MjM2IDE3LjE4NTVaTTI5LjAyNTEgMTMuNDA1NUMyOC4zMTg1IDEzLjQwNTUgMjcuNzQyNiAxMi44Mjk1IDI3Ljc0MjYgMTIuMTIzQzI3Ljc0MjYgMTEuNDE2NSAyOC4zMTg1IDEwLjg0MDUgMjkuMDI1MSAxMC44NDA1QzI5LjczMTYgMTAuODQwNSAzMC4zMDc2IDExLjQxNjUgMzAuMzA3NiAxMi4xMjNDMzAuMzA3NiAxMi44MzQgMjkuNzM2MSAxMy40MDU1IDI5LjAyNTEgMTMuNDA1NVoiCiAgICBmaWxsPSJ3aGl0ZSIKICAvPgogIDxwYXRoCiAgICBkPSJNMjEuMTY4MSAyMi40MDU1TDE4LjMwMTYgMjEuMzM0NUwxOS4wNjY2IDEzLjU1NEMxOS4wOTgxIDEzLjIzOSAxOC44Njg2IDEyLjk2NDUgMTguNTUzNiAxMi45MzNDMTguMjM4NiAxMi45MDE1IDE3Ljk2NDEgMTMuMTMxIDE3LjkzMjYgMTMuNDQ2TDE3LjkyMzYgMTMuNTMxNUMxNy44OTIxIDEzLjU1ODUgMTcuODYwNiAxMy41ODEgMTcuODMzNiAxMy42MTI1TDEzLjU5OTEgMTkuNTc5NUwxMC42NzQxIDE4LjQ4NkMxMC4zMzY2IDE4LjM2IDkuOTU4NTYgMTguNTMxIDkuODMyNTYgMTguODY4NUw1Ljg0MTA2IDI5LjU0N0M1LjA0NDU2IDMxLjY4IDYuMTI5MDYgMzQuMDU2IDguMjYyMDYgMzQuODUyNUwxMi4yNTM2IDM2LjM0MkMxNC4zODY2IDM3LjEzODUgMTYuNzYyNiAzNi4wNTQgMTcuNTU5MSAzMy45MjFMMjEuNTUwNiAyMy4yNDI1QzIxLjY4MTEgMjIuOTA5NSAyMS41MTAxIDIyLjUzNiAyMS4xNjgxIDIyLjQwNTVWMjIuNDA1NVpNMTQuMjA2NiAyMC44NzU1QzE0LjExMjEgMjEuMTI3NSAxMy44Mjg2IDIxLjI1OCAxMy41NzY2IDIxLjE2MzVDMTMuMzI0NiAyMS4wNjkgMTMuMTk0MSAyMC43ODU1IDEzLjI4ODYgMjAuNTMzNUMxMy4zMzY3IDIwLjQxNTYgMTMuNDI4OCAyMC4zMjEgMTMuNTQ1NCAyMC4yNjk5QzEzLjY2MjEgMjAuMjE4NyAxMy43OTQgMjAuMjE0OSAxMy45MTM0IDIwLjI1OTRDMTQuMDMyNyAyMC4zMDM5IDE0LjEzMDEgMjAuMzkzIDE0LjE4NDggMjAuNTA4MUMxNC4yMzk1IDIwLjYyMzEgMTQuMjQ3MyAyMC43NTQ4IDE0LjIwNjYgMjAuODc1NVYyMC44NzU1Wk0xNC43MDYxIDE5Ljk5MzVMMTcuNzA3NiAxNS43NjM1TDE3LjE5OTEgMjAuOTI1TDE0LjcwNjEgMTkuOTkzNVpNMTcuOTkxMSAyMi4yODg1QzE3Ljg5NjYgMjIuNTQwNSAxNy42MTMxIDIyLjY3MSAxNy4zNjExIDIyLjU3NjVDMTcuMTA5MSAyMi40ODIgMTYuOTc4NiAyMi4xOTg1IDE3LjA3MzEgMjEuOTQ2NUMxNy4xNjc2IDIxLjY5NDUgMTcuNDUxMSAyMS41NjQgMTcuNzAzMSAyMS42NTg1QzE3Ljk1NTEgMjEuNzUzIDE4LjA4NTYgMjIuMDM2NSAxNy45OTExIDIyLjI4ODVaIgogICAgZmlsbD0id2hpdGUiCiAgLz4KICA8cGF0aAogICAgb3BhY2l0eT0iMC4yIgogICAgZD0iTTEyLjI1OCAzNi4zNDY1TDguMjY2NDggMzQuODU3QzE2Ljc5NCAzNi4yNjEgMjEuMTcyNSAyMi40MSAyMS4xNzI1IDIyLjQxQzIxLjUxIDIyLjUzNiAyMS42ODEgMjIuOTE0IDIxLjU1NSAyMy4yNTE1TDE3LjU2MzUgMzMuOTNDMTYuNzY3IDM2LjA2MyAxNC4zOTEgMzcuMTQ3NSAxMi4yNTggMzYuMzQ2NVYzNi4zNDY1WiIKICAgIGZpbGw9IiNCRTJDMTEiCiAgLz4KICA8cGF0aAogICAgZD0iTTI2Ljk0MTQgMzQuMjk5QzI3LjMwMTggMzQuMjk5IDI3LjU5MzkgMzQuMDA2OSAyNy41OTM5IDMzLjY0NjVDMjcuNTkzOSAzMy4yODYxIDI3LjMwMTggMzIuOTk0IDI2Ljk0MTQgMzIuOTk0QzI2LjU4MTEgMzIuOTk0IDI2LjI4ODkgMzMuMjg2MSAyNi4yODg5IDMzLjY0NjVDMjYuMjg4OSAzNC4wMDY5IDI2LjU4MTEgMzQuMjk5IDI2Ljk0MTQgMzQuMjk5WiIKICAgIGZpbGw9IiNGRjQ2MTMiCiAgLz4KICA8cGF0aAogICAgZD0iTTI4LjY4MyAzNC41NzM1QzI5LjA0MzQgMzQuNTczNSAyOS4zMzU1IDM0LjI4MTQgMjkuMzM1NSAzMy45MjFDMjkuMzM1NSAzMy41NjA2IDI5LjA0MzQgMzMuMjY4NSAyOC42ODMgMzMuMjY4NUMyOC4zMjI3IDMzLjI2ODUgMjguMDMwNSAzMy41NjA2IDI4LjAzMDUgMzMuOTIxQzI4LjAzMDUgMzQuMjgxNCAyOC4zMjI3IDM0LjU3MzUgMjguNjgzIDM0LjU3MzVaIgogICAgZmlsbD0iI0ZGNDYxMyIKICAvPgogIDxwYXRoCiAgICBkPSJNMzAuNDIgMzQuNjU5QzMwLjc4MDMgMzQuNjU5IDMxLjA3MjUgMzQuMzY2OSAzMS4wNzI1IDM0LjAwNjVDMzEuMDcyNSAzMy42NDYxIDMwLjc4MDMgMzMuMzU0IDMwLjQyIDMzLjM1NEMzMC4wNTk2IDMzLjM1NCAyOS43Njc1IDMzLjY0NjEgMjkuNzY3NSAzNC4wMDY1QzI5Ljc2NzUgMzQuMzY2OSAzMC4wNTk2IDM0LjY1OSAzMC40MiAzNC42NTlaIgogICAgZmlsbD0iI0ZGNDYxMyIKICAvPgogIDxwYXRoCiAgICBkPSJNMzIuMTYxNSAzNC41ODI1QzMyLjUyMTkgMzQuNTgyNSAzMi44MTQgMzQuMjkwNCAzMi44MTQgMzMuOTNDMzIuODE0IDMzLjU2OTYgMzIuNTIxOSAzMy4yNzc1IDMyLjE2MTUgMzMuMjc3NUMzMS44MDEyIDMzLjI3NzUgMzEuNTA5IDMzLjU2OTYgMzEuNTA5IDMzLjkzQzMxLjUwOSAzNC4yOTA0IDMxLjgwMTIgMzQuNTgyNSAzMi4xNjE1IDM0LjU4MjVaIgogICAgZmlsbD0iI0ZGNDYxMyIKICAvPgogIDxwYXRoCiAgICBkPSJNMzMuOTAzIDM0LjI1ODVDMzQuMjYzNCAzNC4yNTg1IDM0LjU1NTUgMzMuOTY2NCAzNC41NTU1IDMzLjYwNkMzNC41NTU1IDMzLjI0NTYgMzQuMjYzNCAzMi45NTM1IDMzLjkwMyAzMi45NTM1QzMzLjU0MjYgMzIuOTUzNSAzMy4yNTA1IDMzLjI0NTYgMzMuMjUwNSAzMy42MDZDMzMuMjUwNSAzMy45NjY0IDMzLjU0MjYgMzQuMjU4NSAzMy45MDMgMzQuMjU4NVoiCiAgICBmaWxsPSIjRkY0NjEzIgogIC8+CiAgPHBhdGgKICAgIGQ9Ik0zNS42NCAzMy42OTE1QzM2LjAwMDQgMzMuNjkxNSAzNi4yOTI1IDMzLjM5OTQgMzYuMjkyNSAzMy4wMzlDMzYuMjkyNSAzMi42Nzg2IDM2LjAwMDQgMzIuMzg2NSAzNS42NCAzMi4zODY1QzM1LjI3OTcgMzIuMzg2NSAzNC45ODc1IDMyLjY3ODYgMzQuOTg3NSAzMy4wMzlDMzQuOTg3NSAzMy4zOTk0IDM1LjI3OTcgMzMuNjkxNSAzNS42NCAzMy42OTE1WiIKICAgIGZpbGw9IiNGRjQ2MTMiCiAgLz4KICA8cGF0aAogICAgZD0iTTYxIDEyLjU3OEg2Ny45OTZDNjkuNjY4IDEyLjU3OCA3MS4xNDIgMTIuOTAwNyA3Mi40MTggMTMuNTQ2QzczLjcwODcgMTQuMTc2NyA3NC43MDYgMTUuMDcxMyA3NS40MSAxNi4yM0M3Ni4xMjg3IDE3LjM4ODcgNzYuNDg4IDE4LjczOCA3Ni40ODggMjAuMjc4Qzc2LjQ4OCAyMS44MTggNzYuMTI4NyAyMy4xNjczIDc1LjQxIDI0LjMyNkM3NC43MDYgMjUuNDg0NyA3My43MDg3IDI2LjM4NjcgNzIuNDE4IDI3LjAzMkM3MS4xNDIgMjcuNjYyNyA2OS42NjggMjcuOTc4IDY3Ljk5NiAyNy45NzhINjFWMTIuNTc4Wk02Ny44MiAyNS4wNTJDNjkuMzYgMjUuMDUyIDcwLjU4NDcgMjQuNjI2NyA3MS40OTQgMjMuNzc2QzcyLjQxOCAyMi45MTA3IDcyLjg4IDIxLjc0NDcgNzIuODggMjAuMjc4QzcyLjg4IDE4LjgxMTMgNzIuNDE4IDE3LjY1MjcgNzEuNDk0IDE2LjgwMkM3MC41ODQ3IDE1LjkzNjcgNjkuMzYgMTUuNTA0IDY3LjgyIDE1LjUwNEg2NC41NjRWMjUuMDUySDY3LjgyWiIKICAgIGZpbGw9IiNGRjQ2MTMiCiAgLz4KICA8cGF0aAogICAgZD0iTTg0LjU2NTggMjguMTU0QzgzLjMxOTEgMjguMTU0IDgyLjE5NzEgMjcuODk3MyA4MS4xOTk4IDI3LjM4NEM4MC4yMTcxIDI2Ljg1NiA3OS40NDcxIDI2LjEzIDc4Ljg4OTggMjUuMjA2Qzc4LjMzMjQgMjQuMjgyIDc4LjA1MzggMjMuMjMzMyA3OC4wNTM4IDIyLjA2Qzc4LjA1MzggMjAuODg2NyA3OC4zMzI0IDE5LjgzOCA3OC44ODk4IDE4LjkxNEM3OS40NDcxIDE3Ljk5IDgwLjIxNzEgMTcuMjcxMyA4MS4xOTk4IDE2Ljc1OEM4Mi4xOTcxIDE2LjIzIDgzLjMxOTEgMTUuOTY2IDg0LjU2NTggMTUuOTY2Qzg1LjgxMjQgMTUuOTY2IDg2LjkyNzEgMTYuMjMgODcuOTA5OCAxNi43NThDODguODkyNCAxNy4yNzEzIDg5LjY2MjQgMTcuOTkgOTAuMjE5OCAxOC45MTRDOTAuNzc3MSAxOS44MzggOTEuMDU1OCAyMC44ODY3IDkxLjA1NTggMjIuMDZDOTEuMDU1OCAyMy4yMzMzIDkwLjc3NzEgMjQuMjgyIDkwLjIxOTggMjUuMjA2Qzg5LjY2MjQgMjYuMTMgODguODkyNCAyNi44NTYgODcuOTA5OCAyNy4zODRDODYuOTI3MSAyNy44OTczIDg1LjgxMjQgMjguMTU0IDg0LjU2NTggMjguMTU0Wk04NC41NjU4IDI1LjMzOEM4NS40NDU4IDI1LjMzOCA4Ni4xNjQ0IDI1LjA0NDcgODYuNzIxOCAyNC40NThDODcuMjkzOCAyMy44NTY3IDg3LjU3OTggMjMuMDU3MyA4Ny41Nzk4IDIyLjA2Qzg3LjU3OTggMjEuMDYyNyA4Ny4yOTM4IDIwLjI3MDcgODYuNzIxOCAxOS42ODRDODYuMTY0NCAxOS4wODI3IDg1LjQ0NTggMTguNzgyIDg0LjU2NTggMTguNzgyQzgzLjY4NTggMTguNzgyIDgyLjk1OTggMTkuMDgyNyA4Mi4zODc4IDE5LjY4NEM4MS44MTU4IDIwLjI3MDcgODEuNTI5OCAyMS4wNjI3IDgxLjUyOTggMjIuMDZDODEuNTI5OCAyMy4wNTczIDgxLjgxNTggMjMuODU2NyA4Mi4zODc4IDI0LjQ1OEM4Mi45NTk4IDI1LjA0NDcgODMuNjg1OCAyNS4zMzggODQuNTY1OCAyNS4zMzhaIgogICAgZmlsbD0iI0ZGNDYxMyIKICAvPgogIDxwYXRoCiAgICBkPSJNOTkuMDY5OCAyOC4xNTRDOTcuODA4NSAyOC4xNTQgOTYuNjcxOCAyNy44OTczIDk1LjY1OTggMjcuMzg0Qzk0LjY2MjUgMjYuODU2IDkzLjg3NzggMjYuMTMgOTMuMzA1OCAyNS4yMDZDOTIuNzQ4NSAyNC4yODIgOTIuNDY5OCAyMy4yMzMzIDkyLjQ2OTggMjIuMDZDOTIuNDY5OCAyMC44ODY3IDkyLjc0ODUgMTkuODM4IDkzLjMwNTggMTguOTE0QzkzLjg3NzggMTcuOTkgOTQuNjYyNSAxNy4yNzEzIDk1LjY1OTggMTYuNzU4Qzk2LjY3MTggMTYuMjMgOTcuODA4NSAxNS45NjYgOTkuMDY5OCAxNS45NjZDMTAwLjMxNiAxNS45NjYgMTAxLjQwMiAxNi4yMyAxMDIuMzI2IDE2Ljc1OEMxMDMuMjY0IDE3LjI3MTMgMTAzLjk0NiAxOC4wMTIgMTA0LjM3MiAxOC45OEwxMDEuNzEgMjAuNDFDMTAxLjA5NCAxOS4zMjQ3IDEwMC4yMDYgMTguNzgyIDk5LjA0NzggMTguNzgyQzk4LjE1MzEgMTguNzgyIDk3LjQxMjUgMTkuMDc1MyA5Ni44MjU4IDE5LjY2MkM5Ni4yMzkxIDIwLjI0ODcgOTUuOTQ1OCAyMS4wNDggOTUuOTQ1OCAyMi4wNkM5NS45NDU4IDIzLjA3MiA5Ni4yMzkxIDIzLjg3MTMgOTYuODI1OCAyNC40NThDOTcuNDEyNSAyNS4wNDQ3IDk4LjE1MzEgMjUuMzM4IDk5LjA0NzggMjUuMzM4QzEwMC4yMjEgMjUuMzM4IDEwMS4xMDggMjQuNzk1MyAxMDEuNzEgMjMuNzFMMTA0LjM3MiAyNS4xNjJDMTAzLjk0NiAyNi4xMDA3IDEwMy4yNjQgMjYuODM0IDEwMi4zMjYgMjcuMzYyQzEwMS40MDIgMjcuODkgMTAwLjMxNiAyOC4xNTQgOTkuMDY5OCAyOC4xNTRaIgogICAgZmlsbD0iI0ZGNDYxMyIKICAvPgogIDxwYXRoCiAgICBkPSJNMTA2LjU5IDEyLjU3OEgxMTMuNTg2QzExNS4yNTggMTIuNTc4IDExNi43MzIgMTIuOTAwNyAxMTguMDA4IDEzLjU0NkMxMTkuMjk5IDE0LjE3NjcgMTIwLjI5NiAxNS4wNzEzIDEyMSAxNi4yM0MxMjEuNzE5IDE3LjM4ODcgMTIyLjA3OCAxOC43MzggMTIyLjA3OCAyMC4yNzhDMTIyLjA3OCAyMS44MTggMTIxLjcxOSAyMy4xNjczIDEyMSAyNC4zMjZDMTIwLjI5NiAyNS40ODQ3IDExOS4yOTkgMjYuMzg2NyAxMTguMDA4IDI3LjAzMkMxMTYuNzMyIDI3LjY2MjcgMTE1LjI1OCAyNy45NzggMTEzLjU4NiAyNy45NzhIMTA2LjU5VjEyLjU3OFpNMTEzLjQxIDI1LjA1MkMxMTQuOTUgMjUuMDUyIDExNi4xNzUgMjQuNjI2NyAxMTcuMDg0IDIzLjc3NkMxMTguMDA4IDIyLjkxMDcgMTE4LjQ3IDIxLjc0NDcgMTE4LjQ3IDIwLjI3OEMxMTguNDcgMTguODExMyAxMTguMDA4IDE3LjY1MjcgMTE3LjA4NCAxNi44MDJDMTE2LjE3NSAxNS45MzY3IDExNC45NSAxNS41MDQgMTEzLjQxIDE1LjUwNEgxMTAuMTU0VjI1LjA1MkgxMTMuNDFaIgogICAgZmlsbD0iI0ZGNDYxMyIKICAvPgogIDxwYXRoCiAgICBkPSJNMTMwLjE1NiAyOC4xNTRDMTI4LjkwOSAyOC4xNTQgMTI3Ljc4NyAyNy44OTczIDEyNi43OSAyNy4zODRDMTI1LjgwNyAyNi44NTYgMTI1LjAzNyAyNi4xMyAxMjQuNDggMjUuMjA2QzEyMy45MjIgMjQuMjgyIDEyMy42NDQgMjMuMjMzMyAxMjMuNjQ0IDIyLjA2QzEyMy42NDQgMjAuODg2NyAxMjMuOTIyIDE5LjgzOCAxMjQuNDggMTguOTE0QzEyNS4wMzcgMTcuOTkgMTI1LjgwNyAxNy4yNzEzIDEyNi43OSAxNi43NThDMTI3Ljc4NyAxNi4yMyAxMjguOTA5IDE1Ljk2NiAxMzAuMTU2IDE1Ljk2NkMxMzEuNDAyIDE1Ljk2NiAxMzIuNTE3IDE2LjIzIDEzMy41IDE2Ljc1OEMxMzQuNDgyIDE3LjI3MTMgMTM1LjI1MiAxNy45OSAxMzUuODEgMTguOTE0QzEzNi4zNjcgMTkuODM4IDEzNi42NDYgMjAuODg2NyAxMzYuNjQ2IDIyLjA2QzEzNi42NDYgMjMuMjMzMyAxMzYuMzY3IDI0LjI4MiAxMzUuODEgMjUuMjA2QzEzNS4yNTIgMjYuMTMgMTM0LjQ4MiAyNi44NTYgMTMzLjUgMjcuMzg0QzEzMi41MTcgMjcuODk3MyAxMzEuNDAyIDI4LjE1NCAxMzAuMTU2IDI4LjE1NFpNMTMwLjE1NiAyNS4zMzhDMTMxLjAzNiAyNS4zMzggMTMxLjc1NCAyNS4wNDQ3IDEzMi4zMTIgMjQuNDU4QzEzMi44ODQgMjMuODU2NyAxMzMuMTcgMjMuMDU3MyAxMzMuMTcgMjIuMDZDMTMzLjE3IDIxLjA2MjcgMTMyLjg4NCAyMC4yNzA3IDEzMi4zMTIgMTkuNjg0QzEzMS43NTQgMTkuMDgyNyAxMzEuMDM2IDE4Ljc4MiAxMzAuMTU2IDE4Ljc4MkMxMjkuMjc2IDE4Ljc4MiAxMjguNTUgMTkuMDgyNyAxMjcuOTc4IDE5LjY4NEMxMjcuNDA2IDIwLjI3MDcgMTI3LjEyIDIxLjA2MjcgMTI3LjEyIDIyLjA2QzEyNy4xMiAyMy4wNTczIDEyNy40MDYgMjMuODU2NyAxMjcuOTc4IDI0LjQ1OEMxMjguNTUgMjUuMDQ0NyAxMjkuMjc2IDI1LjMzOCAxMzAuMTU2IDI1LjMzOFoiCiAgICBmaWxsPSIjRkY0NjEzIgogIC8+CiAgPHBhdGgKICAgIGQ9Ik0xNTEuMTUgMTYuMTQyVjI1Ljk5OEMxNTEuMTUgMjguMTY4NyAxNTAuNTg1IDI5Ljc4MiAxNDkuNDU2IDMwLjgzOEMxNDguMzI2IDMxLjg5NCAxNDYuNjc2IDMyLjQyMiAxNDQuNTA2IDMyLjQyMkMxNDMuMzYyIDMyLjQyMiAxNDIuMjc2IDMyLjI4MjcgMTQxLjI1IDMyLjAwNEMxNDAuMjIzIDMxLjcyNTMgMTM5LjM3MiAzMS4zMjIgMTM4LjY5OCAzMC43OTRMMTQwLjA2MiAyOC4zM0MxNDAuNTYgMjguNzQwNyAxNDEuMTkxIDI5LjA2MzMgMTQxLjk1NCAyOS4yOThDMTQyLjcxNiAyOS41NDczIDE0My40NzkgMjkuNjcyIDE0NC4yNDIgMjkuNjcyQzE0NS40MyAyOS42NzIgMTQ2LjMwMiAyOS40MDA3IDE0Ni44NiAyOC44NThDMTQ3LjQzMiAyOC4zMyAxNDcuNzE4IDI3LjUyMzMgMTQ3LjcxOCAyNi40MzhWMjUuOTMyQzE0Ni44MjMgMjYuOTE0NyAxNDUuNTc2IDI3LjQwNiAxNDMuOTc4IDI3LjQwNkMxNDIuODkyIDI3LjQwNiAxNDEuODk1IDI3LjE3MTMgMTQwLjk4NiAyNi43MDJDMTQwLjA5MSAyNi4yMTggMTM5LjM4IDI1LjU0MzMgMTM4Ljg1MiAyNC42NzhDMTM4LjMyNCAyMy44MTI3IDEzOC4wNiAyMi44MTUzIDEzOC4wNiAyMS42ODZDMTM4LjA2IDIwLjU1NjcgMTM4LjMyNCAxOS41NTkzIDEzOC44NTIgMTguNjk0QzEzOS4zOCAxNy44Mjg3IDE0MC4wOTEgMTcuMTYxMyAxNDAuOTg2IDE2LjY5MkMxNDEuODk1IDE2LjIwOCAxNDIuODkyIDE1Ljk2NiAxNDMuOTc4IDE1Ljk2NkMxNDUuNjk0IDE1Ljk2NiAxNDYuOTk5IDE2LjUzMDcgMTQ3Ljg5NCAxNy42NlYxNi4xNDJIMTUxLjE1Wk0xNDQuNjYgMjQuNTlDMTQ1LjU2OSAyNC41OSAxNDYuMzEgMjQuMzI2IDE0Ni44ODIgMjMuNzk4QzE0Ny40NjggMjMuMjU1MyAxNDcuNzYyIDIyLjU1MTMgMTQ3Ljc2MiAyMS42ODZDMTQ3Ljc2MiAyMC44MjA3IDE0Ny40NjggMjAuMTI0IDE0Ni44ODIgMTkuNTk2QzE0Ni4zMSAxOS4wNTMzIDE0NS41NjkgMTguNzgyIDE0NC42NiAxOC43ODJDMTQzLjc1IDE4Ljc4MiAxNDMuMDAyIDE5LjA1MzMgMTQyLjQxNiAxOS41OTZDMTQxLjgyOSAyMC4xMjQgMTQxLjUzNiAyMC44MjA3IDE0MS41MzYgMjEuNjg2QzE0MS41MzYgMjIuNTUxMyAxNDEuODI5IDIzLjI1NTMgMTQyLjQxNiAyMy43OThDMTQzLjAwMiAyNC4zMjYgMTQzLjc1IDI0LjU5IDE0NC42NiAyNC41OVoiCiAgICBmaWxsPSIjRkY0NjEzIgogIC8+CiAgPHBhdGgKICAgIGQ9Ik0xNjAuODE2IDEyLjU3OEgxNjcuODEyQzE2OS40ODQgMTIuNTc4IDE3MC45NTggMTIuOTAwNyAxNzIuMjM0IDEzLjU0NkMxNzMuNTI1IDE0LjE3NjcgMTc0LjUyMiAxNS4wNzEzIDE3NS4yMjYgMTYuMjNDMTc1Ljk0NSAxNy4zODg3IDE3Ni4zMDQgMTguNzM4IDE3Ni4zMDQgMjAuMjc4QzE3Ni4zMDQgMjEuODE4IDE3NS45NDUgMjMuMTY3MyAxNzUuMjI2IDI0LjMyNkMxNzQuNTIyIDI1LjQ4NDcgMTczLjUyNSAyNi4zODY3IDE3Mi4yMzQgMjcuMDMyQzE3MC45NTggMjcuNjYyNyAxNjkuNDg0IDI3Ljk3OCAxNjcuODEyIDI3Ljk3OEgxNjAuODE2VjEyLjU3OFpNMTY3LjYzNiAyNS4wNTJDMTY5LjE3NiAyNS4wNTIgMTcwLjQwMSAyNC42MjY3IDE3MS4zMSAyMy43NzZDMTcyLjIzNCAyMi45MTA3IDE3Mi42OTYgMjEuNzQ0NyAxNzIuNjk2IDIwLjI3OEMxNzIuNjk2IDE4LjgxMTMgMTcyLjIzNCAxNy42NTI3IDE3MS4zMSAxNi44MDJDMTcwLjQwMSAxNS45MzY3IDE2OS4xNzYgMTUuNTA0IDE2Ny42MzYgMTUuNTA0SDE2NC4zOFYyNS4wNTJIMTY3LjYzNloiCiAgICBmaWxsPSIjRkY0NjEzIgogIC8+CiAgPHBhdGgKICAgIGQ9Ik0xOTAuMzQ0IDIyLjEwNEMxOTAuMzQ0IDIyLjE0OCAxOTAuMzIyIDIyLjQ1NiAxOTAuMjc4IDIzLjAyOEgxODEuMzI0QzE4MS40ODYgMjMuNzYxMyAxODEuODY3IDI0LjM0MDcgMTgyLjQ2OCAyNC43NjZDMTgzLjA3IDI1LjE5MTMgMTgzLjgxOCAyNS40MDQgMTg0LjcxMiAyNS40MDRDMTg1LjMyOCAyNS40MDQgMTg1Ljg3MSAyNS4zMTYgMTg2LjM0IDI1LjE0QzE4Ni44MjQgMjQuOTQ5MyAxODcuMjcyIDI0LjY1NiAxODcuNjgyIDI0LjI2TDE4OS41MDggMjYuMjRDMTg4LjM5NCAyNy41MTYgMTg2Ljc2NiAyOC4xNTQgMTg0LjYyNCAyOC4xNTRDMTgzLjI5IDI4LjE1NCAxODIuMTA5IDI3Ljg5NzMgMTgxLjA4MiAyNy4zODRDMTgwLjA1NiAyNi44NTYgMTc5LjI2NCAyNi4xMyAxNzguNzA2IDI1LjIwNkMxNzguMTQ5IDI0LjI4MiAxNzcuODcgMjMuMjMzMyAxNzcuODcgMjIuMDZDMTc3Ljg3IDIwLjkwMTMgMTc4LjE0MiAxOS44NiAxNzguNjg0IDE4LjkzNkMxNzkuMjQyIDE3Ljk5NzMgMTc5Ljk5NyAxNy4yNzEzIDE4MC45NSAxNi43NThDMTgxLjkxOCAxNi4yMyAxODIuOTk2IDE1Ljk2NiAxODQuMTg0IDE1Ljk2NkMxODUuMzQzIDE1Ljk2NiAxODYuMzkyIDE2LjIxNTMgMTg3LjMzIDE2LjcxNEMxODguMjY5IDE3LjIxMjcgMTg5LjAwMiAxNy45MzEzIDE4OS41MyAxOC44N0MxOTAuMDczIDE5Ljc5NCAxOTAuMzQ0IDIwLjg3MiAxOTAuMzQ0IDIyLjEwNFpNMTg0LjIwNiAxOC41NjJDMTgzLjQyOSAxOC41NjIgMTgyLjc3NiAxOC43ODIgMTgyLjI0OCAxOS4yMjJDMTgxLjcyIDE5LjY2MiAxODEuMzk4IDIwLjI2MzMgMTgxLjI4IDIxLjAyNkgxODcuMTFDMTg2Ljk5MyAyMC4yNzggMTg2LjY3IDE5LjY4NCAxODYuMTQyIDE5LjI0NEMxODUuNjE0IDE4Ljc4OTMgMTg0Ljk2OSAxOC41NjIgMTg0LjIwNiAxOC41NjJaIgogICAgZmlsbD0iI0ZGNDYxMyIKICAvPgogIDxwYXRoCiAgICBkPSJNMjA3Ljc4NyAxNS45NjZDMjA5LjI2OCAxNS45NjYgMjEwLjQ0MiAxNi40MDYgMjExLjMwNyAxNy4yODZDMjEyLjE4NyAxOC4xNTEzIDIxMi42MjcgMTkuNDU2NyAyMTIuNjI3IDIxLjIwMlYyNy45NzhIMjA5LjE5NVYyMS43M0MyMDkuMTk1IDIwLjc5MTMgMjA4Ljk5NyAyMC4wOTQ3IDIwOC42MDEgMTkuNjRDMjA4LjIyIDE5LjE3MDcgMjA3LjY3IDE4LjkzNiAyMDYuOTUxIDE4LjkzNkMyMDYuMTQ0IDE4LjkzNiAyMDUuNTA2IDE5LjIgMjA1LjAzNyAxOS43MjhDMjA0LjU2OCAyMC4yNDEzIDIwNC4zMzMgMjEuMDExMyAyMDQuMzMzIDIyLjAzOFYyNy45NzhIMjAwLjkwMVYyMS43M0MyMDAuOTAxIDE5Ljg2NzMgMjAwLjE1MyAxOC45MzYgMTk4LjY1NyAxOC45MzZDMTk3Ljg2NSAxOC45MzYgMTk3LjIzNCAxOS4yIDE5Ni43NjUgMTkuNzI4QzE5Ni4yOTYgMjAuMjQxMyAxOTYuMDYxIDIxLjAxMTMgMTk2LjA2MSAyMi4wMzhWMjcuOTc4SDE5Mi42MjlWMTYuMTQySDE5NS45MDdWMTcuNTA2QzE5Ni4zNDcgMTcuMDA3MyAxOTYuODgyIDE2LjYyNiAxOTcuNTEzIDE2LjM2MkMxOTguMTU4IDE2LjA5OCAxOTguODYyIDE1Ljk2NiAxOTkuNjI1IDE1Ljk2NkMyMDAuNDYxIDE1Ljk2NiAyMDEuMjE2IDE2LjEzNDcgMjAxLjg5MSAxNi40NzJDMjAyLjU2NiAxNi43OTQ3IDIwMy4xMDggMTcuMjcxMyAyMDMuNTE5IDE3LjkwMkMyMDQuMDAzIDE3LjI4NiAyMDQuNjEyIDE2LjgwOTMgMjA1LjM0NSAxNi40NzJDMjA2LjA5MyAxNi4xMzQ3IDIwNi45MDcgMTUuOTY2IDIwNy43ODcgMTUuOTY2WiIKICAgIGZpbGw9IiNGRjQ2MTMiCiAgLz4KICA8cGF0aAogICAgZD0iTTIyMS40NjQgMjguMTU0QzIyMC4yMTggMjguMTU0IDIxOS4wOTYgMjcuODk3MyAyMTguMDk4IDI3LjM4NEMyMTcuMTE2IDI2Ljg1NiAyMTYuMzQ2IDI2LjEzIDIxNS43ODggMjUuMjA2QzIxNS4yMzEgMjQuMjgyIDIxNC45NTIgMjMuMjMzMyAyMTQuOTUyIDIyLjA2QzIxNC45NTIgMjAuODg2NyAyMTUuMjMxIDE5LjgzOCAyMTUuNzg4IDE4LjkxNEMyMTYuMzQ2IDE3Ljk5IDIxNy4xMTYgMTcuMjcxMyAyMTguMDk4IDE2Ljc1OEMyMTkuMDk2IDE2LjIzIDIyMC4yMTggMTUuOTY2IDIyMS40NjQgMTUuOTY2QzIyMi43MTEgMTUuOTY2IDIyMy44MjYgMTYuMjMgMjI0LjgwOCAxNi43NThDMjI1Ljc5MSAxNy4yNzEzIDIyNi41NjEgMTcuOTkgMjI3LjExOCAxOC45MTRDMjI3LjY3NiAxOS44MzggMjI3Ljk1NCAyMC44ODY3IDIyNy45NTQgMjIuMDZDMjI3Ljk1NCAyMy4yMzMzIDIyNy42NzYgMjQuMjgyIDIyNy4xMTggMjUuMjA2QzIyNi41NjEgMjYuMTMgMjI1Ljc5MSAyNi44NTYgMjI0LjgwOCAyNy4zODRDMjIzLjgyNiAyNy44OTczIDIyMi43MTEgMjguMTU0IDIyMS40NjQgMjguMTU0Wk0yMjEuNDY0IDI1LjMzOEMyMjIuMzQ0IDI1LjMzOCAyMjMuMDYzIDI1LjA0NDcgMjIzLjYyIDI0LjQ1OEMyMjQuMTkyIDIzLjg1NjcgMjI0LjQ3OCAyMy4wNTczIDIyNC40NzggMjIuMDZDMjI0LjQ3OCAyMS4wNjI3IDIyNC4xOTIgMjAuMjcwNyAyMjMuNjIgMTkuNjg0QzIyMy4wNjMgMTkuMDgyNyAyMjIuMzQ0IDE4Ljc4MiAyMjEuNDY0IDE4Ljc4MkMyMjAuNTg0IDE4Ljc4MiAyMTkuODU4IDE5LjA4MjcgMjE5LjI4NiAxOS42ODRDMjE4LjcxNCAyMC4yNzA3IDIxOC40MjggMjEuMDYyNyAyMTguNDI4IDIyLjA2QzIxOC40MjggMjMuMDU3MyAyMTguNzE0IDIzLjg1NjcgMjE5LjI4NiAyNC40NThDMjE5Ljg1OCAyNS4wNDQ3IDIyMC41ODQgMjUuMzM4IDIyMS40NjQgMjUuMzM4WiIKICAgIGZpbGw9IiNGRjQ2MTMiCiAgLz4KPC9zdmc+',
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
