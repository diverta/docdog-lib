<template>
  <section class="docdog-modal__body__section" v-html="htmlParts.ext_2" />
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
      一覧を見る
    </button>
  </section>
</template>

<script>
import CardDocs from '@/components/app2/cards/CardDocs.vue';
import TopicsList from '@/mixins/TopicsList';

export default {
  emits: ['redirect', 'addToast'],
  mixins: [TopicsList],
  components: {
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
    htmlParts: {
      type: Object,
      default: () => ({}),
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
