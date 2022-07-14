<template>
  <div class="docdog-container--middle">
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />

    <div class="docdog-modal__body__section docdog-container--col-2" v-if="list.length">
      <div class="docdog-container--col-2__side">
        <div class="docdog-card docdog-cart--download-list">
          <ul class="docdog-cart">
            <CardToast v-for="(data, idx) in list" :data="data" :can_remove="false"></CardToast>
          </ul>
        </div>
      </div>

      <div class="docdog-container--col-2__main">
        <!-- Step1 -->
        <DownloadInputEmail
          v-model:email="email"
          v-if="current_step == 'inputEmail'"
          :err="err"
          :htmlParts="htmlParts"
          @update:email="onEmailInput"
          @next="setStep('inputInfo')"
        />
        <!-- Step2 -->
        <DownloadInputInfo
          v-model:email="email"
          v-model:name1="name1"
          v-model:name2="name2"
          v-model:company_nm="company_nm"
          :htmlParts="htmlParts"
          :err="err"
          v-if="current_step == 'inputInfo'"
          @onLogin="afterLogin"
          @prev="setStep('inputEmail')"
          @next="setStep('inputCompleted')"
          @error="onInputInfoError"
        />
      </div>
    </div>

    <!-- Step3 -->
    <DownloadCompleted
      v-if="current_step == 'inputCompleted'"
      :list="list"
      :htmlParts="htmlParts"
      @redirect="redirect"
      :toastIds="toastIds"
      @addToast="addToast"
    />
  </div>
  <Loading v-if="toastStatus == 'downloading'" :loadingMessage="'圧縮ファイル作成中です。しばらくお待ちください。'" />
</template>

<script>
import AbstractPage from '@/components/common/AbstractPage.vue';
import AlertSuccess from '@/components/app2/AlertSuccess.vue';
import Loading from '@/components/app2/modal_pages/Loading.vue';
import CardToast from '@/components/app2/cards/CardToast.vue';
import { noimage_vertical } from '@/components/app2/svg_images';

import DownloadInputEmail from '@/components/app2/download_steps/DownloadInputEmail.vue';
import DownloadInputInfo from '@/components/app2/download_steps/DownloadInputInfo.vue';
import DownloadCompleted from '@/components/app2/download_steps/DownloadCompleted.vue';

export default {
  extends: AbstractPage,
  components: {
    AlertSuccess,
    Loading,
    CardToast,
    DownloadInputEmail,
    DownloadInputInfo,
    DownloadCompleted,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      steps: ['inputEmail', 'inputInfo', 'downloading', 'inputCompleted'],
      current_step: null,
      email: '',
      name1: '',
      name2: '',
      company_nm: '',
      formDef: [],
      customFields: {},
      errClass: 'docdog-form__item--error',
    };
  },
  mounted() {
    if (this.isLogin) {
      this.setStep('downloading');
      this.downloadToast(); // Begin downloading
    } else {
      this.setStep('inputEmail');
    }
    if (this.list.length == 0) {
      // Redirect must happen after setStep because we want hideToast false set by redirect to not be overridden by the emit in setStep
      this.redirect({ target: 'List' });
    }
    this.footer_data.toastList = this.list;
    /*
    memberApi.getMemberForm().then((resp) => {
      Object.values(resp.details).forEach((val) => {
        const manualElements = {
          // Exclude processing of these
          name1: true,
          name2: true,
          email: true,
          login_pwd: true,
        };

        if (!manualElements[val.key_name]) {
          this.formDef.push(val);
        }
      });
    });
    */
  },
  computed: {
    noimage_vertical() {
      return noimage_vertical; // Need to reference the instance variable for rendering
    },
    htmlParts() {
      return this.custom_data.htmlParts || {};
    },
  },
  methods: {
    hideToast(val) {
      this.$emit('hideToast', val);
    },
    onRemoveToast(idx) {
      this.removeToast(idx);
      if (this.list.length == 0) {
        this.close();
      }
    },
    setStep(step) {
      this.current_step = step;
      if (step == 'inputCompleted') {
        this.hideToast(false);
      } else {
        this.hideToast(true);
      }
    },
    onInputInfoError(err) {
      this.error(err); // For it to get passed to InputEmail component
      this.setStep('inputEmail');
    },
    afterLogin() {
      this.setStep('downloading');
      this.downloadToast(); // Begin downloading
    },
    onToastDownload() {
      this.setStep('downloading');
    },
    onEmailInput() {
      if (this.err) {
        this.error(''); // Clear error
      }
    },
  },
  watch: {
    toastStatus: function (newStatus, oldStatus) {
      if (oldStatus == 'downloading') {
        // Download finished
        this.setStep('inputCompleted');
      }
    },
  },
};
</script>
