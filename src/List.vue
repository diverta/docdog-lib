<template>
  <div v-model:show="is_node_selected">
    <n-card style="width: 600px" title="Docdog" :bordered="false" size="huge">
      <template #header>
        <Header :title="current_page" @close="closeModal" />
      </template>
      <PageController v-model:current_page="current_page" :node_params="current_node_params" @close="closeModal" />
      <template #footer>
        <Footer />
      </template>
    </n-card>
  </div>
</template>

<script>
import { NModal, NCard } from 'naive-ui';
import Header from './components/pages/Header.vue';
import Footer from './components/pages/Footer.vue';
import PageController from './components/pages/PageController.vue';
import { v4 as uuidv4 } from 'uuid';
import loginApi from '@/api/login';

// General NaiveUI font
import 'vfonts/Lato.css';

export default {
  components: {
    NModal,
    NCard,
    Header,
    Footer,
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

<style></style>
