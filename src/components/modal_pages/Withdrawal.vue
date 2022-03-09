<template>
  <div class="docdog-form">

    <!-- TODO: Show only before withdrawal -->
    <div class="docdog-modal__body__section">
      <h1 class="docdog-modal__body__pagetitle">アカウントの削除</h1>
      <p class="docdog-modal__body__text">アカウントを削除すると今後は資料ダウンロードができなくなります。アカウントを削除しますか？</p>
    </div>

    <!-- TODO: Show only before withdrawal -->
    <div class="docdog-modal__body__section">
      <form>
        <div class="docdog-form__button">
          <button type="submit" class="docdog-button docdog-button--danger" @click.prevent="withdrawal">
            アカウントを削除する
          </button>
        </div>
        <div class="docdog-form__link">
          <button type="button" class="docdog-button--text" @click.prevent="redirect({ target: 'List' })">
            資料一覧へ戻る
          </button>
        </div>
      </form>
    </div>

    <!-- TODO: Show only after withdrawal -->
    <div class="docdog-modal__body__section">
      <button type="button" class="docdog-button docdog-button--white" @click.prevent="redirect({ target: 'List' })">
        資料一覧へ戻る
      </button>
    </div>

  </div>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import memberApi from '@/api/member';
import loginApi from '@/api/login';

export default {
  extends: AbstractPage,
  data() {
    return {};
  },
  methods: {
    withdrawal() {
      memberApi.doWithdrawal().then(() => this.close());
    },
  },
};
</script>
