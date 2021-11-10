<template>
  <n-modal v-model:show="is_node_selected">
    <n-card style="width: 600px" title="Docdog" :bordered="false" size="huge">
      <template #header>
        <Header :title="current_page" @close="closeModal" />
      </template>
      <PageController v-model:current_page="current_page" :node_params="current_node_params" @close="closeModal" />
      <template #footer>
        <Footer />
      </template>
    </n-card>
  </n-modal>
</template>

<script>
import { NModal, NCard } from 'naive-ui';
import Header from './components/pages/Header.vue';
import Footer from './components/pages/Footer.vue';
import PageController from './components/pages/PageController.vue';

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
  props: {
    node_params_list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      current_node_idx: null,
      current_page: 'Loading',
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    is_node_selected: {
      get() {
        return this.current_node_idx !== null;
      },
      set(unselect) {
        // Setting = closing the modal
        this.current_node_idx = null;
      },
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
