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
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
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
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
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
