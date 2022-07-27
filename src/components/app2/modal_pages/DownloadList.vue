<template>
  <div class="docdog-container--middle">
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />
    <div
      class="docdog-modal__body__pagetitle docdog-modal__body__section docdog-u-text-gray"
      v-if="list.length"
      v-html="htmlParts.ext_3"
    />

    <div class="docdog-modal__body__section docdog-container--col-2" v-if="list.length">
      <div class="docdog-container--col-2__side" v-if="current_step != 'inputCompleted'">
        <div class="docdog-card docdog-cart--download-list">
          <button
            type="button"
            @click="isShowListSp = !isShowListSp"
            class="docdog-cart--download-list__toggle docdog-u-hidden-pc"
            :class="isShowListSp ? 'docdog-cart--download-list__toggle--open' : ''"
          >
            <span class="docdog-u-d-flex-grow-1">ダウンロードリスト({{ total_items }}件)を確認する</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.91304 13.9414C9.77971 13.9414 9.65471 13.9164 9.53804 13.8664C9.42138 13.8164 9.31304 13.7414 9.21304 13.6414L4.26304 8.69138C4.07971 8.50805 3.99221 8.27471 4.00054 7.99138C4.00888 7.70805 4.10471 7.47471 4.28804 7.29138C4.50471 7.07471 4.74221 6.97888 5.00054 7.00388C5.25888 7.02888 5.48804 7.13305 5.68804 7.31638L9.91304 11.5414L14.138 7.31638C14.3214 7.13305 14.5589 7.03305 14.8505 7.01638C15.1422 6.99971 15.3797 7.09971 15.563 7.31638C15.7797 7.49971 15.8755 7.72888 15.8505 8.00388C15.8255 8.27888 15.7214 8.51638 15.538 8.71638L10.613 13.6414C10.513 13.7414 10.4047 13.8164 10.288 13.8664C10.1714 13.9164 10.0464 13.9414 9.91304 13.9414Z"
                fill="#333"
              />
            </svg>
          </button>
          <div :class="isShowListSp ? 'docdog-cart--download-list--show' : 'docdog-cart--download-list--hidden'">
            <ul class="docdog-cart">
              <CardToast v-for="(data, idx) in list" :data="data" :can_remove="false"></CardToast>
            </ul>
          </div>
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
          :formDef="formDef"
          :htmlParts="htmlParts"
          :err="err"
          :initFields="customFields"
          v-if="current_step == 'inputInfo'"
          @onLogin="afterLogin"
          @prev="setStep('inputEmail')"
          @next="setStep('inputCompleted')"
          @error="onInputInfoError"
          @updateField="onUpdateField"
          @resetView="resetView"
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
      @removeToastById="removeToastById"
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

import memberApi from '@/api/member';

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
      formDef: [],
      customFields: {},
      errClass: 'docdog-form__item--error',
      isShowListSp: false,
    };
  },
  mounted() {
    memberApi.getMemberForm().then((resp) => {
      Object.values(resp.details).forEach((val) => {
        const exclude = {
          // These are handled separately
          name1: true,
          name2: true,
          email: true,
          login_pwd: true,
          // These are excluded
          login_id: true,
          login_ok_flg: true,
          login_ok_ymd: true,
          email_send_ng_flg: true,
        };

        if (!exclude[val.key_name]) {
          this.formDef.push(val);
        }
      });
    });
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
  },
  computed: {
    noimage_vertical() {
      return noimage_vertical; // Need to reference the instance variable for rendering
    },
    htmlParts() {
      return this.custom_data.htmlParts || {};
    },
    total_items() {
      return this.list.length;
    },
  },
  methods: {
    hideToast(val) {
      this.$emit('hideToast', val);
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
    onUpdateField({ key, value }) {
      this.customFields[key] = value;
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
