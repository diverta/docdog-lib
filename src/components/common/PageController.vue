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
import SignIn from '@/components/app1/modal_pages/SignIn.vue';
import EditProfile from '@/components/app1/modal_pages/EditProfile.vue';
import Withdrawal from '@/components/app1/modal_pages/Withdrawal.vue';
import SignUp from '@/components/app1/modal_pages/SignUp.vue';
import Download from '@/components/app1/modal_pages/Download.vue';
import DownloadList from '@/components/app1/modal_pages/DownloadList.vue';
import List from '@/components/app1/modal_pages/List.vue';
import Topics from '@/components/app1/modal_pages/Topics.vue';
import Videos from '@/components/app1/modal_pages/Videos.vue';
import TopicDetails from '@/components/app1/modal_pages/TopicDetails.vue';
import VideoDetails from '@/components/app1/modal_pages/VideoDetails.vue';
import NewsDetails from '@/components/app1/modal_pages/NewsDetails.vue';
import Reminder from '@/components/app1/modal_pages/Reminder.vue';
import Error from '@/components/app1/modal_pages/Error.vue';
import Loading from '@/components/app1/modal_pages/Loading.vue';
import EmptyPage from '@/components/app1/modal_pages/EmptyPage.vue';
import Mypage from '@/components/app1/modal_pages/Mypage.vue';
import Inquiry from '@/components/app1/modal_pages/Inquiry.vue';
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
  VideoDetails,
  NewsDetails,
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
        this.$emit('writePageHistory', { page: target });
      }
      this.$emit('onAfterRedirect', { target, params });
    },
  },
};
</script>

<style scoped></style>
