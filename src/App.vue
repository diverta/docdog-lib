<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Modal from './components/Modal.vue';
import Header from './components/pages/Header.vue';
import Footer from './components/pages/Footer.vue';
import PageController from './components/pages/PageController.vue';
</script>

<template>
  <Modal v-if="is_node_selected" @close="closeModal">
    <template v-slot:header>
      <Header @close="closeModal" />
    </template>
    <template v-slot:body>
      <PageController :node_params="current_node_params" @close="closeModal" />
    </template>
    <template v-slot:footer>
      <Footer />
    </template>
  </Modal>
</template>

<script>
export default {
  props: {
    node_params_list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      current_node_idx: null,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    is_node_selected() {
      return this.current_node_idx !== null;
    },
    current_node() {
      if (this.is_node_selected) {
        return this.node_params_list[this.current_node_idx].node;
      } else {
        return null;
      }
    },
    current_node_params() {
      if (this.is_node_selected) {
        return this.node_params_list[this.current_node_idx].params;
      } else {
        return null;
      }
    },
  },
  methods: {
    init() {
      this.node_params_list.forEach(({ node }, idx) => {
        node.onclick = () => {
          if (this.current_node_idx === null) {
            // No node is opened => open
            this.current_node_idx = idx;
          } else if (this.current_node_idx === idx) {
            // Current node is opened => close
            this.current_node_idx = null;
          } else {
            // Another node is opened => replace
            this.current_node_idx = idx;
          }
        };
      });
    },
    closeModal() {
      this.current_node_idx = null;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
