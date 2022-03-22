<template>
  <!-- Modal Content -->
  <div class="docdog-modal__body__section">
    <h1 class="docdog-modal__body__pagetitle">マイページ</h1>
  </div>
  <section class="docdog-modal__body__section docdog-container--white">
    <h2 class="docdog-modal__body__heading">お知らせ</h2>
    <ul class="docdog-list">
      <li class="docdog-list__item">
        <button type="button" class="docdog-list__item__link">
          <time datetime="2022-03-01">2022/03/01</time>
          <span class="docdog-badge">お知らせ</span>
          <span class="docdog-list__item__title">新着コンテンツがあります</span>
        </button>
      </li>
      <li class="docdog-list__item">
        <button type="button" class="docdog-list__item__link">
          <time datetime="2022-03-01">2022/01/01</time>
          <span class="docdog-badge">重要</span>
          <span class="docdog-list__item__title">4/1（月）システムメンテナンスのお知らせ</span>
        </button>
      </li>
      <li class="docdog-list__item">
        <button type="button" class="docdog-list__item__link">
          <time datetime="2022-03-01">2021/12/01</time>
          <span class="docdog-badge">お知らせ</span>
          <span class="docdog-list__item__title"> サイトをリニューアルしました</span>
        </button>
      </li>
    </ul>
  </section>
  <section class="docdog-modal__body__section docdog-container--white">
    <h2 class="docdog-modal__body__heading">あなたにおすすめのコンテンツ</h2>
    <ul class="docdog-list">
      <li class="docdog-list__item docdog-u-py-lg">
        <h3 class="docdog-modal__body__sub-heading">資料</h3>
        <ul class="docdog-card__list" v-if="list.length > 0">
          <li v-for="doc in list">
            <CardModal
              :data="doc"
              :key="doc.topics_id"
              :toastIds="toastIds"
              :showDownloadBtn="showDownloadBtn"
              @download="download(doc)"
              @addToast="addToast"
            />
          </li>
        </ul>
      </li>
      <li class="docdog-list__item docdog-u-py-lg">
        <h3 class="docdog-modal__body__sub-heading">動画</h3>
        <ul class="docdog-card__list" v-if="list.length > 0">
          <li v-for="doc in list">
            <CardModal
              :data="doc"
              :key="doc.topics_id"
              :toastIds="toastIds"
              :showDownloadBtn="showDownloadBtn"
              @download="download(doc)"
              @addToast="addToast"
            />
          </li>
        </ul>
      </li>
      <li class="docdog-list__item docdog-u-py-lg">
        <h3 class="docdog-modal__body__sub-heading">記事</h3>
        <ul class="docdog-card__list" v-if="list.length > 0">
          <li v-for="doc in list">
            <CardModal
              :data="doc"
              :key="doc.topics_id"
              :toastIds="toastIds"
              :showDownloadBtn="showDownloadBtn"
              @download="download(doc)"
              @addToast="addToast"
            />
          </li>
        </ul>
      </li>
    </ul>
  </section>
  <section class="docdog-modal__body__section docdog-container--white">
    <h2 class="docdog-modal__body__heading">アカウント情報</h2>
    <ul class="docdog-card__list">
      <li>
        <button type="button" class="docdog-button docdog-button--secondary" @click="redirect({ target: 'EditProfile' })">
          アカウント情報の変更
        </button>
      </li>
      <li>
        <button type="button" class="docdog-button docdog-button--white" @click="redirect({ target: 'Withdrawal' })">
          アカウントの削除
        </button>
      </li>
      <li>
        <button type="button" class="docdog-button docdog-button--white">
          ログアウト
        </button>
      </li>
    </ul>
  </section>
  <section class="docdog-modal__body__section docdog-container--white">
    <h2 class="docdog-modal__body__heading">ヘルプ</h2>
    <ul class="docdog-card__list">
      <li>
        <button type="button" class="docdog-button docdog-button--secondary">
          お問い合わせ
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import CardModal from '@/components/cards/CardModal.vue';
import docsApi from '@/api/docs';
import _ from 'lodash';

export default {
  extends: AbstractPage,
  components: {
    CardModal,
  },
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
      node_params_map: {},
      showDownloadBtn: true,
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
      return defaultParams;
    },
  },
  mounted() {
    this.list = [];
    this.fetchList({ pageID: this.pageID, cnt: this.cnt });
  },
  methods: {
    fetchList(params = {}) {
      params = { ...this.defaultParams, ...params };
      docsApi.getDocumentList(true, params).then((data) => {
        this.list = [];
        if (data) {
          data.list.forEach((topics) => {
            this.list.push(topics);
          });
          this.pageInfo = data.pageInfo;
          const firstNumTmp = Math.max(1, this.pageInfo.pageNo - 2);
          const lastNumTmp = Math.min(this.pageInfo.pageNo + 2, this.pageInfo.totalPageCnt);
          this.pagedButtons = _.range(firstNumTmp, lastNumTmp + 1);
          if (firstNumTmp != 1) {
            this.pagedButtons.unshift(1);
            if (firstNumTmp != 2) {
              if (firstNumTmp == 3) {
                this.pagedButtons.splice(1, 0, 2);
              } else {
                this.pagedButtons.splice(1, 0, '...');
              }
            }
          }
          if (lastNumTmp != this.pageInfo.totalPageCnt) {
            if (lastNumTmp != this.pageInfo.totalPageCnt - 1) {
              if (lastNumTmp == this.pageInfo.totalPageCnt - 2) {
                this.pagedButtons.push(this.pageInfo.totalPageCnt - 1);
              } else {
                this.pagedButtons.push('...');
              }
            }
            this.pagedButtons.push(this.pageInfo.totalPageCnt);
          }
        }
      });
    },
    changePage(num) {
      if (this.pageID != num) {
        this.pageID = num;
        this.fetchList();
      }
    },
    onRemoveToast(idx) {
      this.removeToast(idx);
      if (this.list.length == 0) {
        this.close();
      }
    },
  },
};
</script>
