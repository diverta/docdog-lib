<template>
  <div class="docdog-container--form">
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />
    <div class="docdog-container--white">
      <div class="docdog-modal__body__section" v-if="isLogin">
        <h1 class="docdog-modal__body__pagetitle">アカウントの削除</h1>
        <p class="docdog-modal__body__text">
          アカウントを削除すると今後は資料ダウンロードができなくなります。アカウントを削除しますか？
        </p>
      </div>
      <div class="docdog-modal__body__section" v-if="isLogin">
        <form>
          <div class="docdog-form__button">
            <button type="submit" class="docdog-button docdog-button--danger" @click.prevent="withdrawal">
              アカウントを削除する
            </button>
          </div>
          <div class="docdog-form__link">
            <button type="button" class="docdog-button--text" @click.prevent="redirect({ target: 'Mypage' })">
              マイページへ戻る
            </button>
          </div>
        </form>
      </div>
      <div class="docdog-modal__body__section" v-if="!isLogin">
        <button type="button" class="docdog-button docdog-button--white" @click.prevent="redirect({ target: 'List' })">
          資料一覧へ戻る
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import memberApi from '@/api/member';
import AlertSuccess from '@/components/app1/AlertSuccess.vue';
import loginApi from '@/api/login';

export default {
  extends: AbstractPage,
  components: { AlertSuccess },
  methods: {
    withdrawal() {
      memberApi.doWithdrawal().then(() => {
        this.logout();
        this.setMsg('削除しました。');
      });
    },
  },
};
</script>
