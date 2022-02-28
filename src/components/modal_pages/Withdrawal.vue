<template>
  <div class="docdog-form">
    <div class="docdog-modal__body__section">
      <p class="docdog-modal__body__text">アカウントを削除すると今後は資料ダウンロードができなくなります。アカウントを削除しますか？</p>
    </div>
    <div class="docdog-modal__body__section">
      <form>
        <div class="docdog-form__button">
          <button type="submit" class="docdog-button docdog-button--danger" @click.prevent="withdrawal">
            アカウントを削除する
          </button>
        </div>
      </form>
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
