<template>
  <component
    :is="current_page_comp"
    v-bind="comp_props"
    v-model:footer_data="footer_data"
    v-model:msg="msg"
    v-model:isLogin="isLogin"
    :toastStatus="toastStatus"
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
import Topics from './Topics.vue';
import Videos from './Videos.vue';
import TopicDetails from './TopicDetails.vue';
import Reminder from './Reminder.vue';
import Error from './Error.vue';
import Loading from './Loading.vue';
import EmptyPage from './EmptyPage.vue';
import Mypage from './Mypage.vue';
import Inquiry from './Inquiry.vue';
import loginApi from '@/api/login';

const pages = {
  SignIn,
  SignUp,
  Download,
  DownloadList,
  List,
  Topics,
  Videos,
  TopicDetails,
  Reminder,
  EmptyPage,
  Loading,
  EditProfile,
  Mypage,
  Inquiry,
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
    isLogin: {
      type: Boolean,
      default: false,
    },
    toastStatus: {
      type: String,
      default: '',
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
      this.setCurrentPage('');
      this.redirect_params = {};
      loginApi.isLogin({
        // Make sure we login anonymously if specified so. Should this be moved to App ?
        autoLogin: true,
        anonLogin: (this.node_params && this.node_params.public) || false,
      });
    },
    pageExec(method) {
      // Executes the given method of the current component
      this.$refs['page'][method]();
    },
    setCurrentPage(newPage) {
      this.$emit('update:current_page', newPage);
    },
    onRedirect({ target, msg, msg2, err, params }, writeHist = true) {
      // Reset eventual alerts after redirect
      this.msg = msg || '';
      this.msg2 = msg2 || '';
      this.err = err || '';
      this.redirect_params = params;
      this.setCurrentPage(target);
      if (writeHist) {
        this.$emit('writePageHistory', target);
      }
    },
  },
};
</script>

<style scoped></style>
