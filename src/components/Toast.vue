<template>
  <div class="docdog">
    <button type="button" class="docdog-toast--contract" v-if="!toast_expand" @click="toast_expand = !toast_expand">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.41 16L12 11.42L16.59 16L18 14.59L12 8.59L6 14.59L7.41 16Z" fill="#ffffff"/>
      </svg>
    </button>
    <section class="docdog-toast" v-if="toast_expand">
      <header class="docdog-toast__head">
        <p class="docdog-toast__head__heading">ダウンロードリスト</p>
        <button type="button" aria-label="Close" class="docdog-toast__head__close" @click="toast_expand = !toast_expand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.59 8.58997L12 13.17L7.41 8.58997L6 9.99997L12 16L18 9.99997L16.59 8.58997Z" fill="#666666"/>
          </svg>
        </button>
      </header>
      <!-- ダウンロードリストモーダル -->
      <div class="docdog-toast__body">
        <ul class="docdog-toast__body__list">
          <li v-for="(item, idx) in list">
            <p class="docdog-toast__body__list__title">{{ item.subject }}</p>
            <DeleteButton @click="removeByIdx(idx)" />
          </li>
        </ul>
      </div>
      <footer class="docdog-toast__foot">
        <button type="button" class="docdog-button docdog-button--primary" @click="$emit('downloadToast')">
          まとめてダウンロードする
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import DeleteButton from '@/components/DeleteButton.vue';
export default {
  components: {
    DeleteButton,
  },
  emits: ['downloadToast', 'removeToast'],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      toast_expand: true,
    };
  },
  methods: {
    downloadAll() {
      console.log('downloading toast list');
    },
    removeByIdx(idx) {
      this.$emit('removeToast', idx);
    },
  },
};
</script>
