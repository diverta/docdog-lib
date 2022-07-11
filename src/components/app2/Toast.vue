<template>
  <div class="docdog">
    <button
      type="button"
      class="docdog-sidebar__toggle"
      @click="toggleExpand"
      v-show="toastDisplayed"
      :class="expanded ? 'docdog-sidebar__toggle--fixed' : ''"
    >
      <span class="docdog-sidebar__toggle__badge">{{ total_items }}</span>
      <div class="docdog-tooltip__outer">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.5 7.4625C1.075 7.4625 0.71875 7.31875 0.43125 7.03125C0.14375 6.74375 0 6.3875 0 5.9625C0 5.5625 0.14375 5.21875 0.43125 4.93125C0.71875 4.64375 1.075 4.5 1.5 4.5H16.5C16.925 4.5 17.2812 4.64375 17.5687 4.93125C17.8562 5.21875 18 5.575 18 6C18 6.425 17.8562 6.775 17.5687 7.05C17.2812 7.325 16.925 7.4625 16.5 7.4625H1.5ZM1.5 14.1375C1.075 14.1375 0.71875 13.9938 0.43125 13.7063C0.14375 13.4188 0 13.0625 0 12.6375C0 12.2375 0.14375 11.8937 0.43125 11.6062C0.71875 11.3187 1.075 11.175 1.5 11.175H16.5C16.925 11.175 17.2812 11.3187 17.5687 11.6062C17.8562 11.8937 18 12.25 18 12.675C18 13.1 17.8562 13.45 17.5687 13.725C17.2812 14 16.925 14.1375 16.5 14.1375H1.5ZM1.5 20.85C1.075 20.85 0.71875 20.7062 0.43125 20.4187C0.14375 20.1312 0 19.7625 0 19.3125C0 18.9125 0.14375 18.5688 0.43125 18.2812C0.71875 17.9937 1.075 17.85 1.5 17.85H10.35C10.775 17.85 11.1313 17.9937 11.4188 18.2812C11.7063 18.5688 11.85 18.925 11.85 19.35C11.85 19.775 11.7063 20.1312 11.4188 20.4187C11.1313 20.7062 10.775 20.85 10.35 20.85H1.5ZM19.6875 25.2L15.975 21.525C15.7 21.225 15.5625 20.875 15.5625 20.475C15.5625 20.075 15.7 19.7375 15.975 19.4625C16.3 19.1625 16.6625 19.0063 17.0625 18.9938C17.4625 18.9813 17.8125 19.1125 18.1125 19.3875L20.55 21.8625L26.4375 15.975C26.7375 15.675 27.1 15.525 27.525 15.525C27.95 15.525 28.3 15.675 28.575 15.975C28.875 16.25 29.025 16.5937 29.025 17.0062C29.025 17.4187 28.8875 17.775 28.6125 18.075L21.45 25.2C21.225 25.45 20.9375 25.575 20.5875 25.575C20.2375 25.575 19.9375 25.45 19.6875 25.2Z"
            fill="#005DE9"
          />
        </svg>
        <span class="docdog-tooltip">ダウンロードリスト</span>
      </div>
    </button>
    <section class="docdog-sidebar" :class="expanded ? 'docdog-sidebar--fixed' : ''">
      <header class="docdog-sidebar__head">
        <p class="docdog-sidebar__head__heading">ダウンロードリスト</p>
        <button type="button" aria-label="Close" class="docdog-sidebar__head__close" @click="toggleExpand">
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 11.5332L6.25461 15.2786C6.10701 15.4262 5.93481 15.5 5.73801 15.5C5.54121 15.5 5.369 15.4262 5.2214 15.2786C5.0738 15.131 5 14.9588 5 14.762C5 14.5652 5.0738 14.393 5.2214 14.2454L8.96679 10.5L5.2214 6.75461C5.0738 6.60701 5 6.43481 5 6.23801C5 6.04121 5.0738 5.869 5.2214 5.7214C5.369 5.5738 5.54121 5.5 5.73801 5.5C5.93481 5.5 6.10701 5.5738 6.25461 5.7214L10 9.46679L13.7454 5.7214C13.893 5.5738 14.0652 5.5 14.262 5.5C14.4588 5.5 14.631 5.5738 14.7786 5.7214C14.9262 5.869 15 6.04121 15 6.23801C15 6.43481 14.9262 6.60701 14.7786 6.75461L11.0332 10.5L14.7786 14.2454C14.9262 14.393 15 14.5652 15 14.762C15 14.9588 14.9262 15.131 14.7786 15.2786C14.631 15.4262 14.4588 15.5 14.262 15.5C14.0652 15.5 13.893 15.4262 13.7454 15.2786L10 11.5332Z"
              fill="#CDCDCD"
            />
          </svg>
        </button>
      </header>
      <!-- ダウンロードリストモーダル -->
      <div class="docdog-sidebar__body">
        <ul class="docdog-cart">
          <CardToast v-for="(data, idx) in list" :data="data" @removeToast="removeByIdx(idx)"></CardToast>
        </ul>
      </div>
      <footer class="docdog-sidebar__foot">
        <button type="button" class="docdog-button--download docdog-u-hidden-sp" @click="$emit('downloadToast')">
          まとめてダウンロード
        </button>
        <button type="button" class="docdog-button--mail docdog-u-hidden-pc" @click="$emit('downloadToast')">
          まとめてURLを送る
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import { noimage_vertical } from '@/components/app2/svg_images';
import CardToast from '@/components/app2/cards/CardToast.vue';
import zipApi from '@/api/zip';

export default {
  components: {
    CardToast,
  },
  emits: ['downloadToast', 'removeToast', 'changeStatus', 'toggleExpand'],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    hide: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      status: '',
      toast_expand: true,
      replay_delay: 3, // seconds between zip download retry
      max_replay_times: 10, // max tries
    };
  },
  mounted() {
    this.updateStatus('');
  },
  computed: {
    toastDisplayed() {
      return this.list.length > 0 && !this.hide;
    },
    expanded() {
      return this.list.length > 0 && this.toast_expand && !this.hide;
    },
    noimage_vertical() {
      return noimage_vertical; // Need to reference the instance variable for rendering
    },
    total_items() {
      return this.list.length;
    },
  },
  methods: {
    toggleExpand() {
      this.toast_expand = !this.toast_expand;
      this.$emit('toggleExpand', this.toast_expand);
    },
    updateStatus(status) {
      this.status = status;
      this.$emit('changeStatus', status);
    },
    downloadAll() {
      if (this.status == 'downloading') return; // Already downloading
      this.updateStatus('downloading');
      zipApi
        .makeZip(
          this.list
            .filter((i) => i.file && i.file.url)
            .map((i) => {
              const url = i.file.url;
              const firstIdx = url.indexOf('/files');
              return { url: url.substr(firstIdx + 1, url.indexOf('?') - firstIdx - 1) };
            })
        )
        .then((resp) => {
          this.removeByIdx(null); // Clear toast contents after download has begun
          const tempFileId = resp.data;
          let currentRetry = 1;
          let downloadUrl = null;
          const timer = setInterval(() => {
            zipApi
              .getFileUrl(tempFileId)
              .then((resp2) => {
                if (resp2.data) {
                  downloadUrl = resp2.data;
                  this.downloadFile(downloadUrl);
                }
              })
              .catch(() => {})
              .then(() => {
                if (downloadUrl != null || ++currentRetry > this.max_replay_times) {
                  clearInterval(timer);
                  this.updateStatus('');
                }
              });
          }, this.replay_delay * 1000);
        })
        .catch(() => {
          this.updateStatus('');
        });
    },
    downloadFile(url) {
      const link = document.createElement('a');
      link.href = url;
      document.body.appendChild(link);
      link.click();
    },
    removeByIdx(idx) {
      this.$emit('removeToast', idx);
    },
  },
};
</script>
