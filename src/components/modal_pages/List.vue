<template>
  <!-- Modal Content -->
  <div class="docdog-modal__body__section">
    <h1 class="docdog-modal__body__pagetitle">資料一覧</h1>
    <p>Kuroco営業時に利用できる資料をまとめています。社内での確認やお客様へのご提案などにご活用ください。</p>
  </div>
  <div class="docdog-modal__body__section">
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
    <nav class="docdog-pagination">
      <ul class="docdog-pagination__list">
        <li>
          <button type="button" aria-label="Previous" :disabled="pageID == 1" @click="changePage(pageID - 1)">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
            </svg>
          </button>
        </li>
        <li v-for="num in pagedButtons">
          <span v-if="Number.isInteger(num) && num == pageInfo.pageNo">{{ num }}</span>
          <button v-else-if="Number.isInteger(num)" type="button" @click="changePage(num)">{{ num }}</button>
          <template v-else>{{ num }}</template>
        </li>
        <li>
          <button
            type="button"
            aria-label="Next"
            :disabled="pageInfo && pageID == pageInfo.totalPageCnt"
            @click="changePage(pageID + 1)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </div>
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
              this.pagedButtons.splice(1, 0, '...');
            }
          }
          if (lastNumTmp != this.pageInfo.totalPageCnt) {
            if (lastNumTmp != this.pageInfo.totalPageCnt - 1) {
              this.pagedButtons.push('...');
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
