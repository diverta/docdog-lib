<template>
  <component
    :is="current_page_comp"
    v-bind="comp_props"
    v-model:footer_data="footer_data"
    @err="err = $event"
    @redirect="onRedirect"
    ref="page"
  />
</template>

<script>
import SignIn from './SignIn.vue';
import EditProfile from './EditProfile.vue';
import Withdrawal from './Withdrawal.vue';
import SignUp from './SignUp.vue';
import Download from './Download.vue';
import DownloadList from './DownloadList.vue';
import List from './List.vue';
import Error from './Error.vue';
import Loading from './Loading.vue';
import EmptyPage from './EmptyPage.vue';
import loginApi from '@/api/login';

const pages = {
  SignIn,
  SignUp,
  Download,
  DownloadList,
  List,
  EmptyPage,
  Loading,
  EditProfile,
  Withdrawal,
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
    toastIds: {
      type: Object,
      default: () => {},
    },
    footer_data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      msg: '',
      msg2: '',
      p_err_msg: '', // Do not manually modify, assign to 'err' computed prop instead
      redirect_params: {},
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
      return {
        ...page_params,
        err: this.err,
        msg: this.msg,
        msg2: this.msg2,
        toastIds: this.toastIds,
        ...this.redirect_params,
      };
    },
  },
  methods: {
    init() {
      this.setCurrentPage('Loading');
      this.redirect_params = {};
      loginApi
        .isLogin({
          autoLogin: true,
          anonLogin: (this.node_params && this.node_params.public) || false,
        })
        .then((isLogin) => {
          /*
          if (this.process) {
            switch (this.process) {
              case 'login':
                if (isLogin) {
                  // When pressed Login button after being logged in : functionnally incorrect flow, should not happen
                  this.msg = 'ログインしました';
                  this.setCurrentPage('EmptyPage');
                } else {
                  this.setCurrentPage('SignIn');
                }
                break;
              case 'signup':
                if (isLogin) {
                  this.msg = 'アカウント作成が完了しました';
                  this.setCurrentPage('EmptyPage');
                } else {
                  this.setCurrentPage('SignUp');
                }
                break;
              case 'single_download':
                this.setCurrentPage('Download');
                break;
              case 'downloadList':
                this.setCurrentPage('DownloadList');
                break;
              case 'profile':
                this.setCurrentPage('EditProfile');
                break;
              case 'list':
                this.setCurrentPage('List');
                break;
            }
            // Manual process such as login or signup
          } else {
            this.setCurrentPage(isLogin ? 'Download' : 'SignIn');
          }
          */
        });
    },
    pageExec(method) {
      // Executes the given method of the current component
      this.$refs['page'][method]();
    },
    setCurrentPage(newPage) {
      this.$emit('update:current_page', newPage);
    },
    onRedirect({ target, msg, msg2, err, params }) {
      // Reset eventual alerts after redirect
      this.msg = msg || '';
      this.msg2 = msg2 || '';
      this.err = err || '';
      this.redirect_params = params;
      this.setCurrentPage(target);
    },
  },
};
</script>

<style scoped></style>
