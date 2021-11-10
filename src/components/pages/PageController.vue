<template>
  <component
    :is="current_page_comp"
    v-bind="comp_props"
    @err="err = $event"
    @close="$emit('close')"
    @redirect="onRedirect"
  />
</template>

<script>
import Login from './Login.vue';
import SignUp from './SignUp.vue';
import Download from './Download.vue';
import Error from './Error.vue';
import Loading from './Loading.vue';
import loginApi from '@/api/login';

const pages = {
  Login,
  SignUp,
  Download,
  Loading,
  Error, // In case a dynamic component is incorrectly indicated - should only be a case during development
};
export default {
  components: pages,
  props: {
    node_params: {
      type: Object,
      default: () => ({}),
    },
    current_page: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      p_err_msg: '', // Do not manually modify, assign to 'err' computed prop instead
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    err: {
      get() {
        if (!this.current_page in pages) {
          return 'Page component <' + this.current_page + '> does not exist';
        }
        switch (this.current_page) {
          case 'Download':
            if (!this.node_params || !this.node_params.id) {
              return 'Document id is undefined';
            }
        }
        return this.p_err_msg;
      },
      set(msg) {
        this.p_err_msg = msg;
      },
    },
    current_page_comp() {
      if (this.current_page in pages) {
        return pages[this.current_page];
      } else {
        return pages['Error'];
      }
    },
    comp_props() {
      const page_params = {};
      if (this.current_page == 'Download' && this.node_params) {
        if (this.node_params.id) {
          page_params.doc_id = this.node_params.id;
        }
        if (this.node_params.public) {
          page_params.isPublic = true;
        }
      }
      return { ...page_params, err: this.err };
    },
  },
  methods: {
    init() {
      this.setCurrentPage('Loading');
      loginApi
        .isLogin({
          autoLogin: true,
          anonLogin: this.node_params.public || false,
        })
        .then((isLogin) => {
          this.setCurrentPage(isLogin ? 'Download' : 'Login');
        });
    },
    setCurrentPage(newPage) {
      this.$emit('update:current_page', newPage);
    },
    onRedirect(target) {
      this.setCurrentPage(target);
    },
  },
};
</script>

<style scoped></style>
