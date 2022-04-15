<template>
  <Modal v-model:show="showModal" @close="closeModalOuter" ref="modal">
    <template v-slot:header>
      <ModalHeader
        v-if="!customHeaderHtml"
        v-model:isLogin="isLogin"
        @redirect="redirect"
        @close="closeModal"
        @logout="logout"
      />
      <header v-else v-html="customHeaderHtml" class="docdog-modal__head"></header>
    </template>
    <PageController
      v-model:current_page="current_page"
      :node_params="current_node_params"
      :toastIds="toastIds"
      v-model:footer_data="footer_data"
      v-model:isLogin="isLogin"
      v-model:toastStatus="toastStatus"
      @close="closeModal"
      @addToast="addToast"
      @removeToast="removeToast"
      @download="download"
      @onLogin="onLogin"
      @logout="logout"
      @writePageHistory="writePageHistory"
      @onAfterRedirect="onAfterRedirect"
      @resetView="resetView"
      ref="ctrl"
    />
    <template v-slot:footer v-if="footer_comp">
      <component
        :is="footer_comp"
        :footer_data="footer_data"
        :toastStatus="toastStatus"
        @download="download"
        @addToast="addToast"
        @downloadToast="downloadToast"
        @redirect="redirect"
      />
    </template>
  </Modal>
  <Toast
    v-model:list="toastList"
    v-show="toastList.length > 0 && current_page != 'DownloadList' && current_page != 'Download'"
    @downloadToast="downloadToast"
    @removeToast="removeToast"
    @changeStatus="toastStatus = $event"
    ref="toast"
  />
  <ExternalPopup v-if="docdogConfig.use_float_button" v-model:isLogin="isLogin" @redirect="redirect" />
  <Hubspot :hubId="'' + docdogConfig.hubId || ''" :currentPage="current_page" :profile="userProfile" />
</template>

<script>
import Modal from '@/components/Modal.vue';
import ModalHeader from '@/components/ModalHeader.vue';
import PageController from './components/modal_pages/PageController.vue';
import Footer1 from './components/modal_pages/Footer1.vue';
import Footer2 from './components/modal_pages/Footer2.vue';
import { v4 as uuidv4 } from 'uuid';
import loginApi from '@/api/login';
import Toast from './components/Toast.vue';
import ExternalPopup from './components/ExternalPopup.vue';
import Hubspot from './components/Hubspot.vue';
// import docsApi from '@/api/docs';

const footerComps = {
  Footer1,
  Footer2,
};

export default {
  components: {
    Modal,
    ModalHeader,
    PageController,
    Toast,
    ExternalPopup,
    Hubspot,
    ...footerComps,
  },
  data() {
    return {
      customHeaderHtml: null,
      urlParams: {},
      showModal: false,
      toastList: [],
      pageInfo: {},
      docdog_id_attr_name: 'data-docdog-id',
      node_params_map: {},
      current_node_uuid: null,
      current_page: '',
      userProfile: {},
      footer_data: {}, // Data to be shared between the modal page and the footer
      isLogin: false, // Flag tracking down login state
      app_global_events: {
        // List of events that are handled by Docdog
        isLogin: [], // List of functions to be executed when isLogin event is fired. First argument is a boolean
      },
      toastStatus: '',
    };
  },
  created() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    this.urlParams = Object.fromEntries(urlSearchParams);

    window.addEventListener(
      'popstate',
      ($event) => {
        // When user changes page state (back/forward buttons for ex)
        const new_page = $event.state ? $event.state.docdog_page || '' : '';
        this.urlParams.docdog_page = new_page;
        if (!new_page || new_page == 'Loading') {
          this.closeModalOuter(false);
        } else {
          this.redirect({ target: new_page }, false); // This specific history redirection must not overwrite history
        }
      },
      false
    );
  },
  computed: {
    docdogConfig() {
      return window.DOCDOG_CONFIG || {};
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
      let comp = '';
      switch (this.current_page) {
        case 'Download':
          comp = footerComps['Footer1'];
          break;
        case 'DownloadList':
          comp = footerComps['Footer2'];
          break;
      }
      return comp;
    },
    toastIds() {
      return this.toastList.reduce((carry, item) => {
        return { ...carry, [item.topics_id]: true };
      }, {});
    },
  },
  mounted() {
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
    if (this.urlParams.docdog_page) {
      let target = '';
      const params = {};
      switch (this.urlParams.docdog_page) {
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
          target = this.urlParams.docdog_page;
      }
      if (target) {
        this.redirect({ target, params }, false); // Initial page load, no need to add history
      }
    }
  },
  methods: {
    linkNode(node, params) {
      let uuid = node.getAttribute(this.docdog_id_attr_name);
      if (uuid == null || uuid == '') {
        uuid = uuidv4();
        this.node_params_map[uuid] = { node, params };
        node.setAttribute(this.docdog_id_attr_name, uuid);
        node.addEventListener('click', this.nodeAction);
      } else {
        // Node already exists : update with new params
        this.node_params_map[uuid].params = params;
      }
    },
    unlinkNode(node) {
      const uuid = node.getAttribute(this.docdog_id_attr_name);
      node.removeEventListener('click', this.nodeAction);
      delete this.node_params_map[uuid];
      node.removeAttribute(this.docdog_id_attr_name);
    },
    nodeAction(event) {
      // Event can either be an HTML element having a docdoc uuid (in case el linking), or plain topics_id integer (in case of dynamic use)
      const node_id = isNaN(event) ? event.target.getAttribute(this.docdog_id_attr_name) : event;
      if (this.current_node_uuid === null) {
        // No node is opened => open
        this.current_node_uuid = node_id;
        this.redirect({ target: 'Download', params: { doc_id: this.current_node_params.id } });
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
      this.removeToast();
      this.showModal = false;
      this.current_node_uuid = null;
      this.current_page = ''; // Reinit the page state
      if (writeHist) {
        this.writePageHistory({ page: '' });
      }
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
              { prevUrl: window.location.href, docdog_page: this.current_page || '' },
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
        // Coming from footer => execute page action
        this.$refs['toast'].downloadAll();
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
    },
    removeToast(idx) {
      if (idx != null) {
        const item = this.toastList.splice(idx, 1)[0];
        if (this.footer_data && this.footer_data.doc_data && this.footer_data.doc_data.topics_id == item.topics_id) {
          this.footer_data.isInToast = false;
        }
      } else {
        // Delete all indexes
        this.toastList.splice(0, this.toastList.length);
        if (this.footer_data) {
          this.footer_data.isInToast = false;
        }
      }
    },
    redirect(pageData, writeHist = true) {
      // Request for redirection external to PageController
      this.showModal = true;
      this.$refs['ctrl'].onRedirect(pageData, writeHist);
    },
    onAfterRedirect(pageData) {
      this.$refs['modal'].resetView();
    },
    writePageHistory({ page, params = {} }) {
      const newParams = { ...this.urlParams };
      if (page) {
        newParams.docdog_page = page;
      } else {
        delete newParams.docdog_page;
      }
      const qs = new URLSearchParams(newParams).toString();
      window.history.pushState(
        { prevUrl: window.location.href, docdog_page: this.current_page || '', params },
        null,
        '?' + qs
      );
    },
    resetView() {
      this.$refs['modal'].resetView();
    },
  },
};
</script>

<style lang="scss">
@import './src/assets/scss/docdog.scss';
</style>
