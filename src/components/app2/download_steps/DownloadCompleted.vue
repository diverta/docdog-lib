<template>
  <section class="docdog-modal__body__section">
    <div class="docdog-article">
      <h2>ダウンロードしました</h2>
      <p>営業資料にご興味をお持ちいただきありがとうございます。</p>
      <div class="docdog-u-pa-x-sm">
        <ul class="docdog-article__check-list">
          <li><strong>資料の内容について質問したい</strong></li>
          <li><strong>構築方法やプロジェクト進行にういて相談したい</strong></li>
          <li><strong>デモを依頼したい</strong></li>
          <li><strong>機能や料金についてもっと知りたい</strong></li>
          <li><strong>パートナー契約について知りたい</strong></li>
        </ul>
      </div>
      <p>など、気になる点がございましたらお気軽にお問い合わせください。</p>
      <a
        href="https://kuroco.zendesk.com/hc/ja/requests/new?ticket_form_id=900002698263"
        target="_blank"
        rel="noopener"
        class="docdog-button docdog-button--primary"
      >
        <span class="docdog-u-d-flex-grow-1">問い合わせる</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.28804 15.638C7.10471 15.4213 7.00888 15.1796 7.00054 14.913C6.99221 14.6463 7.08804 14.413 7.28804 14.213L11.513 9.98796L7.26304 5.73796C7.07971 5.55463 6.99221 5.31713 7.00054 5.02546C7.00888 4.7338 7.10471 4.4963 7.28804 4.31296C7.50471 4.0963 7.74221 3.99213 8.00054 4.00046C8.25888 4.0088 8.48804 4.11296 8.68804 4.31296L13.663 9.28796C13.763 9.38796 13.838 9.4963 13.888 9.61296C13.938 9.72963 13.963 9.85463 13.963 9.98796C13.963 10.1213 13.938 10.2463 13.888 10.363C13.838 10.4796 13.763 10.588 13.663 10.688L8.71304 15.638C8.51304 15.838 8.27971 15.9338 8.01304 15.9255C7.74638 15.9171 7.50471 15.8213 7.28804 15.638Z"
            fill="white"
          />
        </svg>
      </a>
    </div>
  </section>
  <section class="docdog-modal__body__section docdog-container--white">
    <h2 class="docdog-modal__body__heading">あなたにおすすめのコンテンツ</h2>
    <ul class="docdog-card--media__list" v-if="recommended_list.length > 0">
      <li v-for="doc in recommended_list">
        <CardDocs
          :data="doc"
          :key="doc.topics_id"
          :toastIds="toastIds"
          @download="download(doc)"
          @addToast="addToast"
          @redirect="redirect"
        />
      </li>
    </ul>
    <button
      type="button"
      class="docdog-button docdog-button--white docdog-u-mt-lg"
      @click.prevent="redirect({ target: 'List' })"
    >
      営業資料一覧を見る
    </button>
  </section>
</template>

<script>
import FormPolicy from '@/components/app2/FormPolicy.vue';
import CardDocs from '@/components/app2/cards/CardDocs.vue';
import TopicsList from '@/mixins/TopicsList';

export default {
  emits: ['redirect', 'addToast'],
  mixins: [TopicsList],
  components: {
    FormPolicy,
    CardDocs,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    toastIds: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      recommended_list: [],
    };
  },
  mounted() {
    this.fetchList({
      pageID: 1,
      cnt: 4,
    }).then((resp) => {
      this.recommended_list = resp.list;
    });
  },
  methods: {
    redirect(params) {
      this.$emit('redirect', params);
    },
    addToast(params) {
      this.$emit('addToast', params);
    },
  },
};
</script>
