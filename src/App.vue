<template>
  <main class="l-container">
    <section class="l-container--large">
      <h1 class="c-heading--h1">営業資料</h1>
      <p>Kuroco営業時に利用できる資料をまとめています。社内での確認やお客様へのご提案などにご活用ください。</p>
      <ul class="c-card__list c-card__list--col-3">
        <li class="c-card">
          <div class="c-card__thumb" style="background-image: url(/src/assets/image/doc-1.png)">
            <span class="c-badge c-badge--pdf">PDF</span>
          </div>
          <div class="c-card__body">
            <h2 class="c-card__title">Kuroco説明資料</h2>
          </div>
          <div class="c-card__foot">
            <button type="button" class="c-button c-button--dark" v-on:click="openModal">ダウンロードする</button>
            <button type="button" class="c-button c-button--light">ダウンロードリストに追加する</button>
          </div>
        </li>
        <li class="c-card">
          <div class="c-card__thumb" style="background-image: url(/src/assets/image/doc-2.png)">
            <span class="c-badge c-badge--pdf">PDF</span>
          </div>
          <div class="c-card__body">
            <h2 class="c-card__title">インフラに関するドキュメント</h2>
          </div>
          <div class="c-card__foot">
            <button type="button" class="c-button c-button--dark" v-on:click="openModal">ダウンロードする</button>
            <button type="button" class="c-button c-button--light">ダウンロードリストに追加する</button>
          </div>
        </li>
        <li class="c-card">
          <div class="c-card__thumb" style="background-image: url(/src/assets/image/doc-3.png)">
            <span class="c-badge c-badge--excel">Excel</span>
          </div>
          <div class="c-card__body">
            <h2 class="c-card__title">案件ヒアリングシート</h2>
          </div>
          <div class="c-card__foot">
            <button type="button" class="c-button c-button--dark" v-on:click="openModal">ダウンロードする</button>
            <button type="button" class="c-button c-button--light">ダウンロードリストに追加する</button>
          </div>
        </li>
        <li class="c-card">
          <div class="c-card__thumb" style="background-image: url(/src/assets/image/doc-4.png)">
            <span class="c-badge c-badge--pdf">PDF</span>
          </div>
          <div class="c-card__body">
            <h2 class="c-card__title">Kurocoを利用したプロジェクトの進め方（サンプル）</h2>
          </div>
          <div class="c-card__foot">
            <button type="button" class="c-button c-button--dark" v-on:click="openModal">ダウンロードする</button>
            <button type="button" class="c-button c-button--light">ダウンロードリストに追加する</button>
          </div>
        </li>
        <li class="c-card">
          <div class="c-card__thumb" style="background-image: url(/src/assets/image/doc-5.png)">
            <span class="c-badge c-badge--pdf">PDF</span>
          </div>
          <div class="c-card__body">
            <h2 class="c-card__title">WBSやタスクリストのサンプル</h2>
          </div>
          <div class="c-card__foot">
            <button type="button" class="c-button c-button--dark" v-on:click="openModal">ダウンロードする</button>
            <button type="button" class="c-button c-button--light">ダウンロードリストに追加する</button>
          </div>
        </li>
        <li class="c-card">
          <div class="c-card__thumb" style="background-image: url(/src/assets/image/doc-6.png)">
            <span class="c-badge c-badge--excel">Excel</span>
          </div>
          <div class="c-card__body">
            <h2 class="c-card__title">プロジェクト役割分担表</h2>
          </div>
          <div class="c-card__foot">
            <button type="button" class="c-button c-button--dark" v-on:click="openModal">ダウンロードする</button>
            <button type="button" class="c-button c-button--light">ダウンロードリストに追加する</button>
          </div>
        </li>
      </ul>
    </section>
    <Modal v-model:show="is_node_selected" :title="current_page_title" @close="closeModal">
      <PageController v-model:current_page="current_page" :node_params="current_node_params" @close="closeModal" />
    </Modal>
  </main>
</template>

<script>
import Modal from '@/components/Modal.vue';
import PageController from './components/modal_pages/PageController.vue';
import { v4 as uuidv4 } from 'uuid';
import loginApi from '@/api/login';

// General NaiveUI font
import 'vfonts/Lato.css';

export default {
  components: {
    Modal,
    PageController,
  },
  data() {
    return {
      docdog_id_attr_name: 'data-docdog-id',
      node_params_map: {},
      current_node_uuid: null,
      current_page: 'Loading',
    };
  },
  computed: {
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
      const uuid = event.target.getAttribute(this.docdog_id_attr_name);
      if (this.current_node_uuid === null) {
        // No node is opened => open
        this.current_node_uuid = uuid;
      } else if (this.current_node_uuid === uuid) {
        // Current node is opened => close
        this.closeModal();
      } else {
        // Another node is opened => replace
        this.current_node_uuid = uuid;
      }
    },
    closeModal() {
      this.current_node_uuid = null;
      this.current_page = 'Loading'; // Reinit the page state
    },
    setNodeLogout(node) {
      node.addEventListener('click', this.logout);
    },
    removeNodeLogout(node) {
      node.removeEventListener('click', this.logout);
    },
    logout() {
      loginApi.doLogout();
    },
  },
};
</script>

<style lang="scss">
@import './src/assets/scss/app.scss';
</style>
