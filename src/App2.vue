<template>
  <Modal v-model:show="showModal" @close="closeModalOuter" ref="modal" :class="modalClass" @scroll="onModalScroll">
    <template v-slot:header>
      <ModalHeader
        v-if="!customHeaderHtml"
        v-model:isLogin="isLogin"
        :htmlParts="htmlParts"
        @redirect="redirect"
        @close="closeModal"
        @logout="logout"
      />
      <header v-else v-html="customHeaderHtml" class="kuroco-modal__head"></header>
    </template>
    <PageController
      v-model:current_page="current_page"
      :showModal="showModal"
      :node_params="current_node_params"
      :toastIds="toastIds"
      :htmlParts="htmlParts"
      :urlParams="urlParams"
      v-model:footer_data="footer_data"
      v-model:isLogin="isLogin"
      v-model:toastStatus="toastStatus"
      @close="closeModal"
      @addToast="addToast"
      @removeToast="removeToast"
      @removeToastById="removeToastById"
      @download="download"
      @onLogin="onLogin"
      @logout="logout"
      @writePageHistory="writePageHistory"
      @onAfterRedirect="onAfterRedirect"
      @resetView="resetView"
      @hideToast="doHideToast"
      @downloadToast="downloadToast"
      ref="ctrl"
    />
  </Modal>
  <Toast
    v-model:list="toastList"
    :hide="hideToast"
    :currentPage="current_page"
    @downloadToast="downloadToast"
    @removeToast="removeToast"
    @changeStatus="toastStatus = $event"
    @toggleExpand="onToastExpand"
    ref="toast"
  />
  <ExternalPopup
    v-if="kurocoConfig.use_float_button"
    @redirect="redirect"
    v-show="!showModal"
    :kurocoConfig="kurocoConfig"
  />
  <Hubspot
    v-if="showModal"
    :hubId="kurocoConfig.hubId ? '' + kurocoConfig.hubId : ''"
    :currentPage="current_page"
    :profile="userProfile"
  />
</template>

<script>
import _ from 'lodash';
import Modal from '@/components/common/Modal.vue';
import ModalHeader from '@/components/app2/ModalHeader.vue';
import PageController from './components/app2/PageController.vue';
import { v4 as uuidv4 } from 'uuid';
import loginApi from '@/api/login';
import partsApi from '@/api/parts';
import Toast from './components/app2/Toast.vue';
import ExternalPopup from './components/app2/ExternalPopup.vue';
import Hubspot from './components/common/Hubspot.vue';

export default {
  components: {
    Modal,
    ModalHeader,
    PageController,
    Toast,
    ExternalPopup,
    Hubspot,
  },
  data() {
    return {
      hideToast: true, // A page might want to not display toast on individual level
      customHeaderHtml: null,
      urlParams: {},
      showModal: false,
      toastList: [],
      pageInfo: {},
      kuroco_id_attr_name: 'data-kuroco-id',
      node_params_map: {},
      current_node_uuid: null,
      current_page: '',
      userProfile: {},
      footer_data: {}, // Data to be shared between the modal page and the footer
      isLogin: false, // Flag tracking down login state
      isToastExpanded: false,
      app_global_events: {
        // List of events that are handled by Docdog
        isLogin: [], // List of functions to be executed when isLogin event is fired. First argument is a boolean
      },
      toastStatus: '',
      toast_storage_key: 'kuroco.toast',
      originalViewport: null,
      htmlParts: {},
      deviceType: 'pc', // Changed dynamically based on screen width
    };
  },
  created() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    this.urlParams = Object.fromEntries(urlSearchParams);

    window.addEventListener(
      'popstate',
      ($event) => {
        // When user changes page state (back/forward buttons for ex)
        const new_page = $event.state ? $event.state.kuroco_page || '' : '';
        if (new_page) {
          this.urlParams.kuroco_page = new_page;
        }
        const docdog_id = $event.state ? $event.state.docdog_id || '' : '';
        if (docdog_id) {
          this.urlParams.docdog_id = docdog_id;
        }
        if (!new_page || new_page == 'Loading') {
          this.closeModalOuter(false);
        } else {
          this.redirect({ target: new_page }, false); // This specific history redirection must not overwrite history
        }
      },
      false
    );
    this.saveViewport();
  },
  computed: {
    kurocoConfig() {
      return window.KUROCO_CONFIG || {};
    },
    is_node_selected: {
      get() {
        return this.current_node_uuid !== null;
      },
      set(unselect) {
        // Setting = closing the modal
        this.closeModalOuter();
      },
    },
    current_node() {
      if (this.is_node_selected && this.node_params_map[this.current_node_uuid]) {
        return this.node_params_map[this.current_node_uuid].node;
      } else {
        return null;
      }
    },
    current_node_params() {
      if (this.is_node_selected && this.node_params_map[this.current_node_uuid]) {
        return this.node_params_map[this.current_node_uuid].params;
      } else {
        return null;
      }
    },
    footer_comp() {
      // Currently, no footer components for this app
      let comp = '';
      return comp;
    },
    toastIds() {
      return this.toastList.reduce((carry, item) => {
        return { ...carry, [item.topics_id]: true };
      }, {});
    },
    modalClass() {
      return this.toastList.length > 0 && this.isToastExpanded ? 'kuroco-modal__open-sidebar' : '';
    },
  },
  mounted() {
    window.addEventListener(
      'resize',
      _.debounce((event) => {
        this.determineDeviceType();
      }, 100)
    );
    this.determineDeviceType(); // Run initially
    this.hideToast = true;
    if (this.kurocoConfig.css_vars) {
      for (const v in this.kurocoConfig.css_vars) {
        document.documentElement.style.setProperty(v, this.kurocoConfig.css_vars[v]);
      }
    }
    document.addEventListener('keydown', (event) => {
      if (event.key == 'Escape' && this.showModal) {
        this.closeModalOuter();
      }
    });
    this.checkLogin().then((loggedIn) => {
      this.isLogin = loggedIn;
      // Initial firing of logged in/logged out events
      if (loggedIn) {
        this.onLogin();
      } else {
        this.onLogout();
      }
    });
    if (this.urlParams.kuroco_page) {
      let target = '';
      const params = {};
      switch (this.urlParams.kuroco_page) {
        case 'reminder':
          target = 'Reminder';
          if (this.urlParams.token) {
            params.token = this.urlParams.token;
          }
          break;
        case 'login':
          target = 'SignIn';
          break;
        case 'profile':
          target = 'EditProfile';
          break;
        case 'list':
          target = 'List';
          break;
        case 'signup':
          target = 'SignUp';
          break;
        case 'mypage':
          target = 'Mypage';
          break;
        default:
          target = this.urlParams.kuroco_page;
      }
      if (target) {
        this.redirect({ target, params }, false); // Initial page load, no need to add history
      }
    }
    const toastInit = localStorage.getItem(this.toast_storage_key);
    if (toastInit) {
      this.toastList = JSON.parse(toastInit);
      if (this.deviceType == 'sp') {
        this.$refs.toast.toggleExpand(false);
      }
    }
  },
  methods: {
    linkNode(node, params) {
      let uuid = node.getAttribute(this.kuroco_id_attr_name);
      if (uuid == null || uuid == '') {
        uuid = uuidv4();
        this.node_params_map[uuid] = { node, params };
        node.setAttribute(this.kuroco_id_attr_name, uuid);
        node.addEventListener('click', this.nodeAction);
      } else {
        // Node already exists : update with new params
        this.node_params_map[uuid].params = params;
      }
    },
    unlinkNode(node) {
      const uuid = node.getAttribute(this.kuroco_id_attr_name);
      node.removeEventListener('click', this.nodeAction);
      delete this.node_params_map[uuid];
      node.removeAttribute(this.kuroco_id_attr_name);
    },
    nodeAction(event) {
      // Event can either be an HTML element having a docdoc uuid (in case el linking), or plain topics_id integer (in case of dynamic use)
      const node_id = isNaN(event) ? event.target.getAttribute(this.kuroco_id_attr_name) : event;
      if (this.current_node_uuid === null) {
        // No node is opened => open
        this.current_node_uuid = node_id;
        this.redirect({
          target: 'Download',
          params: { doc_id: this.current_node_params.id, page_params: { docdog_id: this.current_node_params.id } },
        });
      } else if (this.current_node_uuid === node_id) {
        // Current node is opened => close
        this.closeModalOuter();
      } else {
        // Another node is opened => replace
        this.current_node_uuid = node_id;
      }
    },
    closeModalOuter(writeHist = true) {
      // Triggered by general modal close user click
      this.footer_data = {};
      this.closeModal(writeHist);
    },
    closeModal(writeHist = true) {
      // Can be triggered through 'close' event by any modal page
      //this.removeToast(); // Delete toast on close modal
      this.doHideToast(true);
      this.showModal = false;
      this.current_node_uuid = null;
      this.current_page = ''; // Reinit the page state
      if (writeHist) {
        this.writePageHistory({ page: '' });
      }
      this.restoreViewport();
    },
    processNodeParams(node, params) {
      // Processing only relevant params
      if (params.show) {
        // Expecting a global docdog event
        const { eventMod, eventName } = /(?<eventMod>\!?)(?<eventName>[a-zA-Z_-]*)/.exec(params.show).groups;
        if (!eventName in this.app_global_events) {
          console.error('[Docdog] "show" handler expects an existing event among :', this.app_global_events.join(','));
        } else {
          this.app_global_events.isLogin.push((isLoggedIn) => {
            if ((isLoggedIn && eventMod != '!') || (!isLoggedIn && eventMod == '!')) {
              node.style.display = 'block';
            } else {
              node.style.display = 'none';
            }
          });
        }
      }
    },
    setNodeLogin(node) {
      node.addEventListener('click', this.login);
    },
    setNodeReminder(node) {
      node.addEventListener('click', this.reminder);
    },
    setNodeLogout(node) {
      node.addEventListener('click', this.logout);
    },
    setNodeSignUp(node) {
      node.addEventListener('click', this.signup);
    },
    setNodeProfile(node) {
      node.addEventListener('click', this.profile);
    },
    setNodeList(node, params) {
      node.addEventListener('click', () => this.list(params));
    },
    setNodeTopics(node) {
      node.addEventListener('click', this.topics);
    },
    setNodeVideos(node) {
      node.addEventListener('click', this.videos);
    },
    setNodeHeader(node, params) {
      this.customHeaderHtml = node.innerHTML;
      node.remove();
    },
    setNodeMypage(node) {
      node.addEventListener('click', this.mypage);
    },
    setNodeInquiry(node) {
      node.addEventListener('click', this.inquiry);
    },
    removeNodeLogin(node) {
      node.removeEventListener('click', this.login);
    },
    removeNodeLogout(node) {
      node.removeEventListener('click', this.logout);
    },
    checkLogin() {
      if (this.urlParams.grant_token) {
        // Return from successful SSO login
        return loginApi
          .doLogin({ grant_token: this.urlParams.grant_token })
          .then(() => {}) // On success
          .catch(() => {}) // On error
          .then(() => {
            // In all cases
            // Clean Kuroco URL params
            delete this.urlParams.grant_token;
            delete this.urlParams.member_id;
            const qs = new URLSearchParams(this.urlParams).toString();
            window.history.pushState(
              { prevUrl: window.location.href, kuroco_page: this.current_page || '' },
              null,
              '?' + qs
            );
            return true;
          });
      } else {
        return loginApi.isLogin({
          autoLogin: true,
          anonLogin: false,
        });
      }
    },
    onToastExpand(isExpanded) {
      this.isToastExpanded = isExpanded;
    },
    download(data) {
      if (this.current_page != 'Download') {
        this.redirect({ target: 'Download', params: { doc_data: data } });
      } else {
        // Coming from the footer, as download modal is open
        this.$refs['ctrl'].pageExec('onDownload');
      }
    },
    onLogin() {
      this.isLogin = true;
      this.app_global_events.isLogin.forEach((func) => {
        func(true);
      });
      loginApi.getProfile().then((profile) => {
        this.userProfile = profile;
      });
    },
    onLogout() {
      this.isLogin = false;
      this.app_global_events.isLogin.forEach((func) => {
        func(false);
      });
      loginApi.deleteProfileCache();
      this.userProfile = {};
    },
    login() {
      this.redirect({ target: 'SignIn' });
    },
    logout() {
      loginApi.doLogout();
      this.onLogout();
      this.closeModalOuter();
    },
    signup() {
      this.redirect({ target: 'SignUp' });
    },
    reminder() {
      this.redirect({ target: 'Reminder' });
    },
    profile() {
      this.redirect({ target: 'EditProfile' });
    },
    mypage() {
      this.redirect({ target: 'Mypage' });
    },
    inquiry(params) {
      this.redirect({ target: 'Inquiry', params });
    },
    list(params) {
      this.redirect({ target: 'List', params });
    },
    topics(params) {
      this.redirect({ target: 'Topics', params });
    },
    videos(params) {
      this.redirect({ target: 'Videos', params });
    },
    downloadToast() {
      if (this.current_page != 'DownloadList') {
        this.redirect({ target: 'DownloadList', params: { list: this.toastList } });
      } else {
        // Coming from DownloadList (or footer in the future)
        this.$refs['toast'].downloadAll();
        this.$refs['ctrl'].onToastDownload(); // Letting the current page know the download has started (might come from different component)
      }
    },
    getThumbnailStyle(doc) {
      if (doc.type.key == 'image' && doc.file) {
        return 'background-image: url(' + doc.file.url + ')';
      } else {
        // TODO preview image ?
        return '';
      }
    },
    addToast(item) {
      this.toastList.push(item);
      if (this.footer_data && this.footer_data.doc_data && this.footer_data.doc_data.topics_id == item.topics_id) {
        this.footer_data.isInToast = true;
      }
      if (this.toastList.length === 1 && !this.hideToast && this.deviceType == 'pc') {
        // Went from 0 to 1 => set expanded
        this.$refs.toast.toggleExpand(true);
      }
      localStorage.setItem(this.toast_storage_key, JSON.stringify(this.toastList));
      this.$refs.toast.toggleShrink(false);
    },
    removeToast(idx) {
      if (idx != null) {
        const item = this.toastList.splice(idx, 1)[0];
        if (this.footer_data && this.footer_data.doc_data && this.footer_data.doc_data.topics_id == item.topics_id) {
          this.footer_data.isInToast = false;
        }
        this.$refs.toast.toggleShrink(false);
      } else {
        // Delete all indexes
        this.toastList.splice(0, this.toastList.length);
        if (this.footer_data) {
          this.footer_data.isInToast = false;
        }
      }
      if (this.toastList.length == 0) {
        this.$refs.toast.toggleExpand(false);
      }
      localStorage.setItem(this.toast_storage_key, JSON.stringify(this.toastList));
    },
    removeToastById(id) {
      const idx = this.toastList.findIndex((item) => item.topics_id == id);
      this.removeToast(idx);
    },
    redirect(pageData, writeHist = true) {
      // Request for redirection external to PageController
      this.showModal = true;
      this.getHTMLParts();
      this.writeViewport();
      this.hideToast = false; // Each page determines its own logic of displaying/hiding the toast
      this.$refs['ctrl'].onRedirect(pageData, writeHist);
    },
    onAfterRedirect(pageData) {
      this.$refs['modal'].resetView();
    },
    writePageHistory({ page, params = {} }) {
      const newParams = { ...this.urlParams };
      if (page) {
        newParams.kuroco_page = page;
      } else {
        delete newParams.kuroco_page;
      }
      if (params.docdog_id) {
        newParams.docdog_id = params.docdog_id;
      } else {
        delete newParams.docdog_id;
      }
      const qs = new URLSearchParams(newParams).toString();
      window.history.pushState(
        { prevUrl: window.location.href, kuroco_page: this.current_page || '', ...params },
        null,
        '?' + qs
      );
    },
    resetView() {
      this.$refs['modal'].resetView();
    },
    doHideToast(val) {
      this.hideToast = val;
      if (val) {
        this.$refs.toast.toggleExpand(false);
      }
    },
    getViewportEl() {
      return document.head.querySelector('[name=viewport]');
    },
    saveViewport() {
      // Saves initial port. This runs once at page load
      const el = this.getViewportEl();
      if (el) {
        this.originalViewport = el.content;
      }
    },
    writeViewport() {
      // Write our viewport
      const el = this.getViewportEl();
      const content = 'width=device-width, initial-scale=1.0';
      if (el) {
        el.content = content;
      } else {
        // create new el, but not save anything to originalViewport (keep null)
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = content;
        document.getElementsByTagName('head')[0].appendChild(meta);
      }
    },
    restoreViewport() {
      const el = this.getViewportEl();
      // Restore original viewport
      if (this.originalViewport) {
        this.getViewportEl().content = this.originalViewport;
      } else {
        // Case where we had created this element
        el.remove();
      }
    },
    getHTMLParts() {
      if (Object.keys(this.htmlParts).length == 0) {
        partsApi.getHTMLParts().then((resp) => {
          if (resp.list && resp.list.length == 1) {
            this.htmlParts = resp.list[0];
          }
        });
      }
    },
    onModalScroll() {
      this.$refs.toast.onModalScroll();
    },
    determineDeviceType() {
      if (document.body.clientWidth <= 767) {
        this.deviceType = 'sp';
      } else {
        this.deviceType = 'pc';
      }
    },
  },
};
</script>

<style lang="scss">
:root {
  --color-primary: #1371ff;
  --color-secondary: #5d6775;
  --color-gray: #565758;
  --color-background: #f5f6f8;
  --color-border-light: #dde0e7;
  --color-border: #d1d6df;
  --color-disabled: #dcdcdc;
  --color-danger: #dc0000;
  --color-success: #05a87c;
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --spacing-x-sm: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 24px;
  --spacing-x-lg: 36px;
  --spacing-xx-lg: 48px;
  --spacing-xxx-lg: 60px;
  --z-index: 10000;
  --transition: 0.2s;
}
@import './src/assets/scss/kuroco.scss';
</style>
