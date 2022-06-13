<script>
import AbstractPage from './AbstractPage.vue';
import TopicsList from '@/mixins/TopicsList';

export default {
  extends: AbstractPage,
  mixins: [TopicsList],
  props: {
    cnt: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      list: [],
      pageInfo: {},
      pagedButtons: [],
      pageID: 1,
    };
  },
  computed: {
    defaultParams() {
      const defaultParams = {
        pageID: this.pageID,
      };
      if (this.cnt) {
        defaultParams.cnt = this.cnt;
      }
      if (this.category) {
        defaultParams.contents_type = this.category;
      }
      return defaultParams;
    },
  },
  mounted() {
    this.list = [];
    this.fetchList(this.defaultParams).then(({ list, pageInfo }) => {
      this.list = list;
      this.pageInfo = pageInfo;
      this.pagedButtons = this.makePagedButtons(pageInfo);
    });
  },
  methods: {
    changePage(num) {
      if (this.pageID != num) {
        this.pageID = num;
        this.fetchList(this.defaultParams).then(({ list, pageInfo }) => {
          this.list = list;
          this.pageInfo = pageInfo;
          this.pagedButtons = this.makePagedButtons(pageInfo);
        });
      }
    },
  },
};
</script>
