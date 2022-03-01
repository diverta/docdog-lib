<template>
  <main class="l-container">
    <section class="l-container--large p-top__hero">
      <header>
        <img src="/src/assets/image/logo.svg">
        <h1>DocDog デモサイト</h1>
      </header>
      <div class="p-top__hero__body">
        <!-- TOD: Click to display list modal -->
        <a href="/docs" class="c-button c-button--primary p-top__hero__body__button">ダウンロードページを見る</a>
      </div>
    </section>
    <!-- TODO: Change to modal -->
    <!-- <section class="l-container--large" v-if="initList">
      <ul class="c-card__list c-card__list--col-3">
        <CardMain
          v-for="doc in list"
          :data="doc"
          :key="doc.topics_id"
          :toastIds="toastIds"
          @download="download"
          @addToast="addToast"
        />
      </ul>
    </section> -->
    <Modal v-model:show="showModal" :title="current_page_title" @close="closeModalOuter">
      <PageController
        v-model:current_page="current_page"
        :node_params="current_node_params"
        :process="current_process"
        :process_params="current_process_params"
        :toastIds="toastIds"
        :initList="initList"
        v-model:footer_data="footer_data"
        @close="closeModal"
        @addToast="addToast"
        @removeToast="removeToast"
        ref="ctrl"
      />
      <template v-slot:footer v-if="footer_comp">
        <component :is="footer_comp" :footer_data="footer_data" @download="download" @addToast="addToast" />
      </template>
    </Modal>
    <Toast
      v-model:list="toastList"
      v-show="toastList.length > 0"
      @downloadToast="downloadToast"
      @removeToast="removeToast"
      ref="toast"
    />
  </main>
</template>

<script>
import Modal from '@/components/Modal.vue';
import PageController from './components/modal_pages/PageController.vue';
import Footer1 from './components/modal_pages/Footer1.vue';
import Footer2 from './components/modal_pages/Footer2.vue';
import { v4 as uuidv4 } from 'uuid';
import loginApi from '@/api/login';
// import CardMain from './components/cards/CardMain.vue';
import Toast from './components/Toast.vue';
// import docsApi from '@/api/docs';

const footerComps = {
  Footer1,
  Footer2,
};

// General NaiveUI font
import 'vfonts/Lato.css';

export default {
  components: {
    Modal,
    PageController,
    // CardMain,
    Toast,
    ...footerComps,
  },
  props: {
    initList: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [],
      toastList: [],
      pageInfo: {},
      docdog_id_attr_name: 'data-docdog-id',
      node_params_map: {},
      current_node_uuid: null,
      current_page: 'Loading',
      current_process: '', // Setting simple process for the modal to show instead of automatic, such as 'signup' or 'login'
      current_process_params: {}, // Params for the process
      footer_data: {}, // Data to be shared between the modal page and the footer
    };
  },
  computed: {
    showModal() {
      return this.is_node_selected || this.current_process != '';
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
    current_page_title() {
      let title = ''; // Todo : i18n
      switch (this.current_page) {
        case 'EmptyPage':
          title = '';
          break;
        case 'Loading':
          title = 'ローディング';
          break;
        case 'Error':
          title = 'エラー';
          break;
        case 'SignUp':
          title = 'アカウントの作成';
          break;
        case 'SignIn':
          title = 'ログイン';
          break;
        case 'DownloadList':
          title = 'ダウンロードリスト';
          break;
        case 'EditProfile':
          title = 'アカウント情報の編集';
          break;
        case 'Withdrawal':
          title = 'アカウントの削除';
          break;
        case 'Download':
          title = 'ダウンロード';
          break;
        case 'List':
          title = '資料一覧';
          break;
        default:
          title = this.current_page;
      }
      return title;
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
  // mounted() {
  //   if (this.initList) {
  //     this.list = [];
  //     docsApi.getDocumentList(true).then((data) => {
  //       if (data) {
  //         data.list.forEach((topics) => {
  //           this.node_params_map[topics.topics_id] = {
  //             node: null,
  //             params: {
  //               id: topics.topics_id,
  //               public: true,
  //             },
  //           };
  //           this.list.push(topics);
  //         });
  //         this.pageInfo = data.pageInfo;
  //       }
  //     });
  //   }
  // },
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
      this.current_node_uuid = null;
      this.current_page = 'Loading'; // Reinit the page state
      this.current_process = ''; // Terminate any process
      this.current_process_params = {}; // And clean its data
    },
    setNodeLogin(node) {
      node.addEventListener('click', this.login);
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
    removeNodeLogin(node) {
      node.removeEventListener('click', this.login);
    },
    removeNodeLogout(node) {
      node.removeEventListener('click', this.logout);
    },
    isLogin() {
      return loginApi.isLogin({
        autoLogin: true,
        anonLogin: false,
      });
    },
    download(data) {
      if (this.current_process != 'single_download') {
        this.current_process = 'single_download';
        this.current_process_params = { doc_data: data };
      } else {
        // Coming from the footer, as download modal is open
        this.$refs['ctrl'].pageExec('onDownload');
      }
    },
    login() {
      this.current_process = 'login'; // Model action for this process
    },
    logout() {
      loginApi.doLogout();
    },
    signup() {
      this.current_process = 'signup';
    },
    profile() {
      this.current_process = 'profile';
    },
    downloadToast() {
      this.current_process = 'downloadList';
      this.current_process_params = { list: this.toastList };
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
      if (item) {
        this.toastList.push(item);
      } else if (this.current_process == 'single_download') {
        // Coming from the footer of single download process
        this.$refs['ctrl'].pageExec('addToastCurrent');
      }
    },
    removeToast(idx) {
      if (idx != null) {
        this.toastList.splice(idx, 1);
      } else {
        // Delete all indexes
        this.toastList.splice(0, this.toastList.length);
      }
    },
    downloadToast() {
      this.current_process = 'downloadList';
      this.current_process_params = { list: this.toastList };
    },
  },
};
</script>

<style lang="scss">
@import './src/assets/scss/app.scss';
@import './src/assets/scss/docdog.scss';
</style>
