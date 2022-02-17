<template>
  <main class="l-container" v-if="initList">
    <section class="l-container--large">
      <h1 class="c-heading--h1">営業資料</h1>
      <p>Kuroco営業時に利用できる資料をまとめています。社内での確認やお客様へのご提案などにご活用ください。</p>
      <ul class="c-card__list c-card__list--col-3">
        <li class="c-card" v-for="doc in list" :key="doc.topics_id">
          <div class="c-card__thumb" :style="getThumbnailStyle(doc)">
            <span v-if="doc.type.key == 'pdf'" class="c-badge c-badge--pdf">PDF</span>
            <span v-if="doc.type.key == 'excel'" class="c-badge c-badge--excel">Excel</span>
          </div>
          <div class="c-card__body">
            <h2 class="c-card__title">{{ doc.subject }}</h2>
          </div>
          <div class="c-card__foot">
            <button type="button" class="c-button c-button--dark" @click="nodeAction(doc.topics_id)">
              ダウンロードする
            </button>
            <button type="button" class="c-button c-button--light">ダウンロードリストに追加する</button>
          </div>
        </li>
      </ul>
    </section>
    <Modal v-model:show="showModal" :title="current_page_title" @close="closeModal">
      <PageController
        v-model:current_page="current_page"
        :node_params="current_node_params"
        :process="current_process"
        @close="closeModal"
      />
    </Modal>
  </main>
</template>

<script>
import Modal from '@/components/Modal.vue';
import PageController from './components/modal_pages/PageController.vue';
import { v4 as uuidv4 } from 'uuid';
import loginApi from '@/api/login';
import docsApi from '@/api/docs';

// General NaiveUI font
import 'vfonts/Lato.css';

export default {
  components: {
    Modal,
    PageController,
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
      pageInfo: {},
      docdog_id_attr_name: 'data-docdog-id',
      node_params_map: {},
      current_node_uuid: null,
      current_page: 'Loading',
      current_process: '', // Setting simple process for the modal to show instead of automatic, such as 'signup' or 'login'
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
        this.closeModal();
      },
    },
    current_node() {
      if (this.is_node_selected) {
        return this.node_params_map[this.current_node_uuid].node;
      } else {
        return null;
      }
    },
    current_node_params() {
      if (this.is_node_selected) {
        return this.node_params_map[this.current_node_uuid].params;
      } else {
        return null;
      }
    },
    current_page_title() {
      let title = ''; // Todo : i18n
      switch (this.current_page) {
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
          title = 'ログインしてダウンロード';
          break;
        case 'Download':
          title = 'ダウンロード';
          break;
        default:
          title = this.current_page;
      }
      return title;
    },
  },
  mounted() {
    if (this.initList) {
      this.list = [];
      docsApi.getDocumentList(true).then((data) => {
        if (data) {
          data.list.forEach((topics) => {
            this.node_params_map[topics.topics_id] = {
              node: null,
              params: {
                id: topics.topics_id,
                public: true,
              },
            };
            this.list.push(topics);
          });
          this.pageInfo = data.pageInfo;
        }
      });
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
      } else if (this.current_node_uuid === node_id) {
        // Current node is opened => close
        this.closeModal();
      } else {
        // Another node is opened => replace
        this.current_node_uuid = node_id;
      }
    },
    closeModal() {
      this.current_node_uuid = null;
      this.current_page = 'Loading'; // Reinit the page state
      this.current_process = ''; // Terminate any process
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
    login() {
      this.current_process = 'login'; // Model action for this process
    },
    logout() {
      loginApi.doLogout();
    },
    signup() {
      this.current_process = 'signup'; // Model action for this process
    },
    getThumbnailStyle(doc) {
      if (doc.type.key == 'image' && doc.file) {
        return 'background-image: url(' + doc.file.url + ')';
      } else {
        // TODO preview image ?
        return '';
      }
    },
  },
};
</script>

<style lang="scss">
@import './src/assets/scss/app.scss';
@import './src/assets/scss/docdog.scss';
</style>
