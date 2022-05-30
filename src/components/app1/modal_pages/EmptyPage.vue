<template>
  <!-- Modal Content -->
  <div class="docdog-modal__body__section">
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />
    <AlertError v-if="err" :err="err" />
  </div>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import AlertSuccess from '@/components/app1/AlertSuccess.vue';
import AlertError from '@/components/app1/AlertError.vue';

export default {
  extends: AbstractPage,
  components: {
    AlertSuccess,
    AlertError,
  },
};
</script>
