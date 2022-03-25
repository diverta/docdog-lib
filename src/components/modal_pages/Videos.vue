<template>
  <!-- Modal Content -->
  <div class="docdog-modal__body__section">
    <h1 class="docdog-modal__body__pagetitle">動画一覧</h1>
    <p>Kuroco営業時に利用できる資料をまとめています。社内での確認やお客様へのご提案などにご活用ください。</p>
  </div>
  <div class="docdog-modal__body__section">
    <ul class="docdog-card__list" v-if="list.length > 0">
      <li v-for="doc in list">
        <CardVideos
          :data="doc"
          :key="doc.topics_id"
          @download="download(doc)"
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
          <span v-if="Number.isInteger(num) && num == pageInfo.pageNo" class="docdog-pagination__item--active">{{
            num
          }}</span>
          <button v-else-if="Number.isInteger(num)" type="button" @click="changePage(num)">{{ num }}</button>
          <span v-else class="docdog-pagination__item--ellipses">{{ num }}</span>
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
import AbstractList from './AbstractList.vue';
import CardVideos from '@/components/cards/CardVideos.vue';

export default {
  extends: AbstractList,
  components: {
    CardVideos,
  },
  data() {
    return {
      category: 17,
    };
  },
};
</script>
