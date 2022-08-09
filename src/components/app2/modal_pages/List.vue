<template>
  <!-- Modal Content -->
  <div class="kuroco-container--middle">
    <div class="kuroco-modal__body__pagetitle kuroco-modal__body__section" v-html="htmlParts.ext_1" />
    <div class="kuroco-modal__body__section">
      <nav class="kuroco-tab__list__outer">
        <ul role="tablist" class="kuroco-tab__list">
          <li role="tab">
            <button
              type="button"
              :class="['kuroco-tab', { 'kuroco-tab--active': category == null }]"
              @click="changeCategory(null)"
            >
              おすすめ
            </button>
          </li>
          <li
            role="tab"
            v-for="current_category in all_categories"
            @click="changeCategory(current_category.topics_category_id)"
            :class="{ 'kuroco-tab--active': current_category.topics_category_id == category }"
          >
            <button type="button" class="kuroco-tab">{{ current_category.category_nm }}</button>
          </li>
        </ul>
      </nav>
    </div>
    <div class="kuroco-modal__body__section">
      <ul class="kuroco-card--media__list" v-if="list.length > 0">
        <li v-for="doc in list">
          <CardDocs
            :data="doc"
            :key="doc.topics_id"
            :toastIds="toastIds"
            :showDownloadBtn="showDownloadBtn"
            @download="download(doc)"
            @addToast="addToast"
            @removeToast="removeToastById(doc.topics_id)"
            @redirect="redirect"
          />
        </li>
      </ul>
      <nav class="kuroco-pagination">
        <ul class="kuroco-pagination__list">
          <li>
            <button type="button" aria-label="Previous" :disabled="pageID == 1" @click="changePage(pageID - 1)">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.712 4.36204C13.8953 4.5787 13.9911 4.82037 13.9995 5.08704C14.0078 5.3537 13.912 5.58704 13.712 5.78704L9.48696 10.012L13.737 14.262C13.9203 14.4454 14.0078 14.6829 13.9995 14.9745C13.9911 15.2662 13.8953 15.5037 13.712 15.687C13.4953 15.9037 13.2578 16.0079 12.9995 15.9995C12.7411 15.9912 12.512 15.887 12.312 15.687L7.33696 10.712C7.23696 10.612 7.16196 10.5037 7.11196 10.387C7.06196 10.2704 7.03696 10.1454 7.03696 10.012C7.03696 9.8787 7.06196 9.7537 7.11196 9.63704C7.16196 9.52037 7.23696 9.41204 7.33696 9.31204L12.287 4.36204C12.487 4.16204 12.7203 4.0662 12.987 4.07454C13.2536 4.08287 13.4953 4.1787 13.712 4.36204Z"
                />
              </svg>
            </button>
          </li>
          <li v-for="num in pagedButtons">
            <span v-if="Number.isInteger(num) && num == pageInfo.pageNo" class="kuroco-pagination__item--active">{{
              num
            }}</span>
            <button v-else-if="Number.isInteger(num)" type="button" @click="changePage(num)">{{ num }}</button>
            <span v-else class="kuroco-pagination__item--ellipses">{{ num }}</span>
          </li>
          <li>
            <button
              type="button"
              aria-label="Next"
              :disabled="pageInfo && pageID == pageInfo.totalPageCnt"
              @click="changePage(pageID + 1)"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.28804 15.638C7.10471 15.4213 7.00888 15.1796 7.00054 14.913C6.99221 14.6463 7.08804 14.413 7.28804 14.213L11.513 9.98796L7.26304 5.73796C7.07971 5.55463 6.99221 5.31713 7.00054 5.02546C7.00888 4.7338 7.10471 4.4963 7.28804 4.31296C7.50471 4.0963 7.74221 3.99213 8.00054 4.00046C8.25888 4.0088 8.48804 4.11296 8.68804 4.31296L13.663 9.28796C13.763 9.38796 13.838 9.4963 13.888 9.61296C13.938 9.72963 13.963 9.85463 13.963 9.98796C13.963 10.1213 13.938 10.2463 13.888 10.363C13.838 10.4796 13.763 10.588 13.663 10.688L8.71304 15.638C8.51304 15.838 8.27971 15.9338 8.01304 15.9255C7.74638 15.9171 7.50471 15.8213 7.28804 15.638Z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import AbstractList from '@/components/common/AbstractList.vue';
import CardDocs from '@/components/app2/cards/CardDocs.vue';

export default {
  extends: AbstractList,
  components: {
    CardDocs,
  },
  mounted() {
    this.getDocumentCategories().then((resp) => {
      this.all_categories = resp.list.map((cat) => {
        cat.topics_category_id = parseInt(cat.topics_category_id);
        return cat;
      });
    });
  },
  computed: {
    htmlParts() {
      return this.custom_data.htmlParts || {};
    },
    defaultParams() {
      const defaultParams = {
        pageID: this.pageID,
      };
      if (this.cnt) {
        defaultParams.cnt = this.cnt;
      }
      if (this.category) {
        defaultParams.contents_type = this.category;
      } else {
        defaultParams.filter = 'recommend_flg eq "1"';
      }
      return defaultParams;
    },
  },
  data() {
    return {
      all_categories: [],
      category: null,
      showDownloadBtn: true,
    };
  },
  methods: {
    changeCategory(category_id) {
      if (this.category != category_id) {
        this.category = category_id;
        this.changePage(1, true); // Force reload at the first page with the given category
      }
    },
  },
};
</script>
