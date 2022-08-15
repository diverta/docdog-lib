<template>
  <div class="kuroco-container--middle">
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />
    <div
      class="kuroco-modal__body__pagetitle kuroco-modal__body__section kuroco-u-text-gray kuroco-u-hidden-sp"
      v-if="list.length"
      v-html="htmlParts.ext_3"
    />
    <div
      class="kuroco-modal__body__pagetitle kuroco-modal__body__section kuroco-u-text-gray kuroco-u-hidden-pc"
      v-if="list.length"
      v-html="htmlParts.ext_7"
    />
    <div class="kuroco-modal__body__section kuroco-container--col-2" v-if="list.length">
      <div class="kuroco-container--col-2__side" v-if="current_step != 'inputCompleted'">
        <div class="kuroco-card kuroco-cart--download-list">
          <button
            type="button"
            @click="isShowListSp = !isShowListSp"
            class="kuroco-cart--download-list__toggle kuroco-u-hidden-pc"
            :class="isShowListSp ? 'kuroco-cart--download-list__toggle--open' : ''"
          >
            <span class="kuroco-u-d-flex-grow-1">ダウンロードリスト({{ total_items }}件)を確認する</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.91304 13.9414C9.77971 13.9414 9.65471 13.9164 9.53804 13.8664C9.42138 13.8164 9.31304 13.7414 9.21304 13.6414L4.26304 8.69138C4.07971 8.50805 3.99221 8.27471 4.00054 7.99138C4.00888 7.70805 4.10471 7.47471 4.28804 7.29138C4.50471 7.07471 4.74221 6.97888 5.00054 7.00388C5.25888 7.02888 5.48804 7.13305 5.68804 7.31638L9.91304 11.5414L14.138 7.31638C14.3214 7.13305 14.5589 7.03305 14.8505 7.01638C15.1422 6.99971 15.3797 7.09971 15.563 7.31638C15.7797 7.49971 15.8755 7.72888 15.8505 8.00388C15.8255 8.27888 15.7214 8.51638 15.538 8.71638L10.613 13.6414C10.513 13.7414 10.4047 13.8164 10.288 13.8664C10.1714 13.9164 10.0464 13.9414 9.91304 13.9414Z"
                fill="#333"
              />
            </svg>
          </button>
          <div :class="isShowListSp ? 'kuroco-cart--download-list--show' : 'kuroco-cart--download-list--hidden'">
            <ul class="kuroco-cart">
              <CardToast v-for="(data, idx) in list" :data="data" :can_remove="false"></CardToast>
            </ul>
            <button
              type="button"
              class="
                kuroco-button--text kuroco-button--wide
                kuroco-u-d-flex
                kuroco-u-d-flex-align-center
                kuroco-u-d-flex-justify-center
                kuroco-u-py-md
                kuroco-u-my-sm
              "
              @click.prevent="redirect({ target: 'List' })"
            >
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.5323 7.82468C10.6848 7.9772 10.7645 8.16785 10.7715 8.39663C10.7784 8.62541 10.7056 8.81606 10.5531 8.96859L7.80771 11.6932H17.6661C17.9018 11.6932 18.0994 11.7729 18.2589 11.9323C18.4183 12.0918 18.498 12.2894 18.498 12.5251C18.498 12.7608 18.4183 12.9584 18.2589 13.1178C18.0994 13.2773 17.9018 13.357 17.6661 13.357H7.80771L10.5739 16.1024C10.7264 16.2688 10.7992 16.4629 10.7923 16.6848C10.7853 16.9066 10.7056 17.0938 10.5531 17.2463C10.3867 17.3988 10.1891 17.4751 9.96034 17.4751C9.73155 17.4751 9.5409 17.3988 9.38838 17.2463L5.24952 13.1075C5.16632 13.0243 5.10393 12.9341 5.06233 12.8371C5.02073 12.74 4.99994 12.636 4.99994 12.5251C4.99994 12.4142 5.02073 12.3102 5.06233 12.2131C5.10393 12.1161 5.16632 12.0259 5.24952 11.9427L9.36758 7.82468C9.53397 7.65829 9.72809 7.5751 9.94994 7.5751C10.1718 7.5751 10.3659 7.65829 10.5323 7.82468Z"
                ></path>
              </svg>
              <span>資料を選び直す</span>
            </button>
          </div>
        </div>
      </div>

      <div class="kuroco-container--col-2__main">
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

    <!-- Step3 if ok -->
    <DownloadCompleted
      v-if="current_step == 'inputCompleted' && toastStatus != 'download_error'"
      :list="list"
      :htmlParts="htmlParts"
      @redirect="redirect"
      :toastIds="toastIds"
      @addToast="addToast"
      @removeToastById="removeToastById"
      @closeModal="close"
    />

    <!-- Step3 if error -->
    <DownloadError
      v-if="current_step == 'inputCompleted' && toastStatus == 'download_error'"
      :htmlParts="htmlParts"
      @redirect="redirect"
      @closeModal="close"
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
import DownloadError from '@/components/app2/download_steps/DownloadError.vue';

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
    DownloadError,
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
      errClass: 'kuroco-form__item--error',
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
      switch (step) {
        case 'inputEmail':
          this.hideToast(true);
          this.updatePageParam('headerShowReturnButton', true);
          break;
        case 'inputInfo':
          this.hideToast(true);
          this.updatePageParam('headerShowReturnButton', true);
          break;
        case 'downloading':
          this.hideToast(true);
          this.updatePageParam('headerShowReturnButton', false);
          break;
        case 'inputCompleted':
          this.hideToast(false);
          this.updatePageParam('headerShowReturnButton', false);
          break;
      }
    },
    onInputInfoError(err) {
      this.error(err); // For it to get passed to InputEmail component
      this.setStep('inputEmail');
    },
    afterLogin() {
      this.$emit('update:isLogin', true);
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
