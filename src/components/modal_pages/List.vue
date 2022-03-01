<template>
  <!-- Modal Content -->
  <div class="docdog-modal__body__section">
    <p class="docdog-modal__body__heading">営業資料</p>
    <p>Kuroco営業時に利用できる資料をまとめています。社内での確認やお客様へのご提案などにご活用ください。</p>
  </div>
  <div class="docdog-modal__body__section">
    <ul class="docdog-card__list" v-if="initList">
      <li v-for="doc in list">
        <CardModal :data="doc" :key="doc.topics_id" :toastIds="toastIds" :showDownloadBtn="showDownloadBtn" @download="download" @addToast="addToast" />
      </li>
    </ul>
    <nav>
      <ul class="docdog-pagination">
        <li>
          <button type="button" aria-label="Previous" disabled>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z"/></svg>
          </button>
        </li>
        <li><span>1</span></li>
        <li><button type="button">2</button></li>
        <li><button type="button">3</button></li>
        <li><button type="button">4</button></li>
        <li><button type="button">5</button></li>
        <li>
          <button type="button" aria-label="Next">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"/></svg>
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
export default {
  extends: AbstractPage,
  components: {
    CardModal,
  },
  props: {
    initList: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [],
      toastList: [],
      pageInfo: {},
      docdog_id_attr_name: 'data-docdog-id',
      node_params_map: {},
      current_node_uuid: null,
      current_page: 'Loading',
      current_process: '', // Setting simple process for the modal to show instead of automatic, such as 'signup' or 'login'
      current_process_params: {}, // Params for the process
      footer_data: {}, // Data to be shared between the modal page and the footer
      showDownloadBtn: true,
    };
  },
  mounted() {
    if (this.initList) {
      this.list = [];
      docsApi.getDocumentList(true).then((data) => {
        if (data) {
          data.list.forEach((topics) => {
            this.node_params_map[topics.topics_id] = {
              node: null,
              params: {
                id: topics.topics_id,
                public: true,
              },
            };
            this.list.push(topics);
          });
          this.pageInfo = data.pageInfo;
        }
      });
    }
  },
  methods: {
    onRemoveToast(idx) {
      this.removeToast(idx);
      if (this.list.length == 0) {
        this.close();
      }
    },
  },
};
</script>
