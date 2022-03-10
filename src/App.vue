<template>
  <Modal v-model:show="showModal" @close="closeModalOuter">
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
      @close="closeModal"
      @addToast="addToast"
      @removeToast="removeToast"
      @download="download"
      @onLogin="onLogin"
      @logout="logout"
      ref="ctrl"
    />
    <template v-slot:footer v-if="footer_comp">
      <component
        :is="footer_comp"
        :footer_data="footer_data"
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
    ref="toast"
  />
</template>

<script>
import url from 'url';
import Modal from '@/components/Modal.vue';
import ModalHeader from '@/components/ModalHeader.vue';
import PageController from './components/modal_pages/PageController.vue';
import Footer1 from './components/modal_pages/Footer1.vue';
import Footer2 from './components/modal_pages/Footer2.vue';
import { v4 as uuidv4 } from 'uuid';
import loginApi from '@/api/login';
import Toast from './components/Toast.vue';
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
      current_page: 'Loading',
      footer_data: {}, // Data to be shared between the modal page and the footer
      isLogin: false, // Flag tracking down login state
      app_global_events: {
        // List of events that are handled by Docdog
        isLogin: [], // List of functions to be executed when isLogin event is fired. First argument is a boolean
      },
    };
  },
  created() {
    this.urlParams = url.parse(window.location.href, true).query;
  },
  computed: {
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
      }
      if (target) {
        this.redirect({ target, params });
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
    closeModalOuter() {
      // Triggered by general modal close user click
      this.footer_data = {};
      this.closeModal();
    },
    closeModal() {
      // Can be triggered through 'close' event by any modal page
      this.removeToast();
      this.showModal = false;
      this.current_node_uuid = null;
      this.current_page = 'Loading'; // Reinit the page state
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
    setNodeHeader(node, params) {
      this.customHeaderHtml = node.innerHTML;
      node.remove();
    },
    removeNodeLogin(node) {
      node.removeEventListener('click', this.login);
    },
    removeNodeLogout(node) {
      node.removeEventListener('click', this.logout);
    },
    checkLogin() {
      return loginApi.isLogin({
        autoLogin: true,
        anonLogin: false,
      });
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
    },
    onLogout() {
      this.isLogin = false;
      this.app_global_events.isLogin.forEach((func) => {
        func(false);
      });
    },
    login() {
      this.redirect({ target: 'SignIn' });
    },
    logout() {
      loginApi.doLogout();
      this.onLogout();
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
    list(params) {
      this.redirect({ target: 'List', params });
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
    redirect(pageData) {
      this.showModal = true;
      this.$refs['ctrl'].onRedirect(pageData);
    },
  },
};
</script>

<style lang="scss">
@import './src/assets/scss/docdog.scss';
</style>
