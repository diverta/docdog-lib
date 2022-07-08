<template>
  <!-- Modal Content -->
  <div class="docdog-container--middle">
    <div class="docdog-modal__body__pagetitle docdog-modal__body__section">
      <h1>マイページ</h1>
    </div>
    <section class="docdog-modal__body__section docdog-container--white">
      <h2 class="docdog-modal__body__heading">お知らせ</h2>
      <ul class="docdog-list">
        <li class="docdog-list__item" v-for="news in listNews">
          <button type="button" class="docdog-list__item__link" @click.prevent="redirect({ target: 'NewsDetails', params: { data: news} })">
            <time datetime="2022-03-01">{{ news.ymd }}</time>
            <span class="docdog-badge">{{ getCategoryName(news.contents_type) }}</span>
            <span class="docdog-list__item__title">{{ news.subject }} </span>
          </button>
        </li>
      </ul>
    </section>
    <section class="docdog-modal__body__section docdog-container--white">
      <h2 class="docdog-modal__body__heading">あなたにおすすめのコンテンツ</h2>
      <ul class="docdog-list">
        <li class="docdog-list__item docdog-u-py-lg">
          <h3 class="docdog-modal__body__sub-heading">動画</h3>
          <ul class="docdog-card__list" v-if="videos.length > 0">
            <li v-for="video in videos">
              <CardVideos
                :data="video"
                :key="video.topics_id"
                :toastIds="toastIds"
                :showDownloadBtn="showDownloadBtn"
                @download="download(video)"
                @addToast="addToast"
                @redirect="redirect"
              />
            </li>
          </ul>
        </li>
        <li class="docdog-list__item docdog-u-py-lg">
          <h3 class="docdog-modal__body__sub-heading">記事</h3>
          <ul class="docdog-card__list" v-if="topics.length > 0">
            <li v-for="topic in topics">
              <CardTopics
                :data="topic"
                :key="topic.topics_id"
                :toastIds="toastIds"
                :showDownloadBtn="showDownloadBtn"
                @download="download(topic)"
                @addToast="addToast"
                @redirect="redirect"
              />
            </li>
          </ul>
        </li>
        <li class="docdog-list__item docdog-u-py-lg">
          <h3 class="docdog-modal__body__sub-heading">資料</h3>
          <ul class="docdog-card__list" v-if="docs.length > 0">
            <li v-for="doc in docs">
              <CardDocs
                :data="doc"
                :key="doc.topics_id"
                :toastIds="toastIds"
                :showDownloadBtn="showDownloadBtn"
                @download="download(doc)"
                @addToast="addToast"
                @redirect="redirect"
              />
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section class="docdog-modal__body__section docdog-container--white" v-if="isLogin">
      <h2 class="docdog-modal__body__heading">アカウント情報</h2>
      <ul class="docdog-card__list">
        <li>
          <button
            type="button"
            class="docdog-button docdog-button--secondary"
            @click="redirect({ target: 'EditProfile' })"
          >
            アカウント情報の変更
          </button>
        </li>
        <li>
          <button type="button" class="docdog-button docdog-button--white" @click="redirect({ target: 'Withdrawal' })">
            アカウントの削除
          </button>
        </li>
        <li>
          <button type="button" class="docdog-button docdog-button--white" @click="logout()">ログアウト</button>
        </li>
      </ul>
    </section>
    <section class="docdog-modal__body__section docdog-container--white">
      <h2 class="docdog-modal__body__heading">ヘルプ</h2>
      <ul class="docdog-card__list">
        <li>
          <button type="button" class="docdog-button docdog-button--secondary" @click="redirect({ target: 'Inquiry' })">
            お問い合わせ
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import AbstractPage from '@/components/common/AbstractPage.vue';
import CardDocs from '@/components/app1/cards/CardDocs.vue';
import CardVideos from '@/components/app1/cards/CardVideos.vue';
import CardTopics from '@/components/app1/cards/CardTopics.vue';
import TopicsList from '@/mixins/TopicsList';
import newsApi from '@/api/news';

export default {
  extends: AbstractPage,
  mixins: [TopicsList],
  components: {
    CardDocs,
    CardVideos,
    CardTopics,
  },
  props: {
    cnt: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      lists: {
        15: [], // Docs
        17: [], // Videos
        18: [], // Topics
      },
      listNews: [],
      pageInfos: {
        15: {}, // Docs
        17: {}, // Videos
        18: {}, // Topics
      },
      pagedButtons: {
        15: [], // Docs
        17: [], // Videos
        18: [], // Topics
      },
      pageIDs: {
        15: 1, // Docs
        17: 1, // Videos
        18: 1, // Topics
      },
      cnts: {
        15: 4, // Docs
        17: 4, // Videos
        18: 4, // Topics
      },
      showDownloadBtn: true,
    };
  },
  computed: {
    docs() {
      return this.lists['15'];
    },
    videos() {
      return this.lists['17'];
    },
    topics() {
      return this.lists['18'];
    },
    defaultParams() {
      const defaultParams = {
        pageID: this.pageID,
      };
      if (this.cnt) {
        defaultParams.cnt = this.cnt;
      }
      return defaultParams;
    },
  },
  mounted() {
    this.listNews = [];
    this.fetchNewsList({ pageID: this.pageID, cnt: this.cnt });
    this.fetchDocList('15'); // Docs
    this.fetchDocList('17'); // Videos
    this.fetchDocList('18'); // Topics
  },
  methods: {
    getCategoryName(categoryId) {
      switch (categoryId) {
        case 1:
          return 'お知らせ';
        case 16:
          return '重要';
        default:
          return '';
      }
    },
    fetchNewsList(params = {}) {
      params = { ...this.defaultParams, ...params };
      newsApi.getNewsList(true, params).then((data) => {
        this.listNews = [];
        if (data) {
          data.list.forEach((topics) => {
            this.listNews.push(topics);
          });
        }
      });
    },
    fetchDocList(category) {
      const params = {
        pageID: this.pageIDs[category],
        cnt: this.cnts[category],
        contents_type: category,
      };
      this.fetchList(params).then(({ list, pageInfo }) => {
        this.lists[category] = list;
        this.pageInfos[category] = pageInfo;
        this.pagedButtons[category] = this.makePagedButtons(pageInfo);
      });
    },
  },
};
</script>
