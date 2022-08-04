<template>
  <div class="kuroco">
    <div
      @click="toggleExpand"
      v-show="toastDisplayed"
      :class="[
        'kuroco-sidebar__toggle',
        { 'kuroco-sidebar__toggle--hidden': expanded },
        { 'kuroco-sidebar__toggle--shrink': toast_shrink || currentPage === 'Download' },
        { 'kuroco-sidebar__toggle--up--sp': currentPage === 'Download' },
      ]"
    >
      <div class="kuroco-sidebar__toggle__icon">
        <span class="kuroco-sidebar__toggle__icon__badge">{{ total_items }}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.2 8.9701C0.86 8.9701 0.575 8.8551 0.345 8.6251C0.115 8.3951 0 8.1101 0 7.7701C0 7.4501 0.115 7.1751 0.345 6.9451C0.575 6.7151 0.86 6.6001 1.2 6.6001H13.2C13.54 6.6001 13.825 6.7151 14.055 6.9451C14.285 7.1751 14.4 7.4601 14.4 7.8001C14.4 8.1401 14.285 8.4201 14.055 8.6401C13.825 8.8601 13.54 8.9701 13.2 8.9701H1.2ZM1.2 14.3101C0.86 14.3101 0.575 14.1951 0.345 13.9651C0.115 13.7351 0 13.4501 0 13.1101C0 12.7901 0.115 12.5151 0.345 12.2851C0.575 12.0551 0.86 11.9401 1.2 11.9401H13.2C13.54 11.9401 13.825 12.0551 14.055 12.2851C14.285 12.5151 14.4 12.8001 14.4 13.1401C14.4 13.4801 14.285 13.7601 14.055 13.9801C13.825 14.2001 13.54 14.3101 13.2 14.3101H1.2ZM1.2 19.6801C0.86 19.6801 0.575 19.5651 0.345 19.3351C0.115 19.1051 0 18.8101 0 18.4501C0 18.1301 0.115 17.8551 0.345 17.6251C0.575 17.3951 0.86 17.2801 1.2 17.2801H8.28C8.62 17.2801 8.905 17.3951 9.135 17.6251C9.365 17.8551 9.48 18.1401 9.48 18.4801C9.48 18.8201 9.365 19.1051 9.135 19.3351C8.905 19.5651 8.62 19.6801 8.28 19.6801H1.2ZM15.75 23.1601L12.78 20.2201C12.56 19.9801 12.45 19.7001 12.45 19.3801C12.45 19.0601 12.56 18.7901 12.78 18.5701C13.04 18.3301 13.33 18.2051 13.65 18.1951C13.97 18.1851 14.25 18.2901 14.49 18.5101L16.44 20.4901L21.15 15.7801C21.39 15.5401 21.68 15.4201 22.02 15.4201C22.36 15.4201 22.64 15.5401 22.86 15.7801C23.1 16.0001 23.22 16.2751 23.22 16.6051C23.22 16.9351 23.11 17.2201 22.89 17.4601L17.16 23.1601C16.98 23.3601 16.75 23.4601 16.47 23.4601C16.19 23.4601 15.95 23.3601 15.75 23.1601Z"
            fill="#fff"
          />
        </svg>
      </div>
      <span class="kuroco-sidebar__toggle__heading">ダウンロードリスト</span>
      <button
        type="button"
        class="kuroco-sidebar__toggle__button kuroco-u-hidden-sp"
        @click="$emit('downloadToast')"
        aria-label="まとめてダウンロード"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.2003 13.3246C10.09 13.3246 9.98654 13.3039 9.88999 13.2626C9.79343 13.2212 9.70377 13.1591 9.62101 13.0763L6.37258 9.82791C6.20705 9.66239 6.12774 9.46583 6.13463 9.23823C6.14153 9.01063 6.22774 8.82097 6.39327 8.66924C6.55879 8.50371 6.7519 8.42095 6.9726 8.42095C7.19331 8.42095 7.38642 8.50371 7.55194 8.66924L9.37272 10.5107V3.82763C9.37272 3.59313 9.45203 3.39657 9.61066 3.23794C9.76929 3.07931 9.96585 3 10.2003 3C10.4348 3 10.6314 3.07931 10.79 3.23794C10.9487 3.39657 11.028 3.59313 11.028 3.82763V10.5107L12.8694 8.66924C13.035 8.50371 13.2281 8.42095 13.4488 8.42095C13.6695 8.42095 13.8626 8.50371 14.0281 8.66924C14.1936 8.82097 14.2764 9.01063 14.2764 9.23823C14.2764 9.46583 14.1936 9.66239 14.0281 9.82791L10.7797 13.0763C10.6969 13.1591 10.6038 13.2212 10.5004 13.2626C10.3969 13.3039 10.2969 13.3246 10.2003 13.3246ZM4.65525 17.6283C4.20006 17.6283 3.81038 17.4662 3.48623 17.1421C3.16208 16.8179 3 16.4282 3 15.973V13.3246C3 13.0901 3.07931 12.8936 3.23794 12.735C3.39657 12.5763 3.59313 12.497 3.82763 12.497C4.06212 12.497 4.25868 12.5763 4.41731 12.735C4.57594 12.8936 4.65525 13.0832 4.65525 13.3039V15.973H15.7454V13.3039C15.7454 13.0832 15.8248 12.8936 15.9834 12.735C16.142 12.5763 16.3386 12.497 16.5731 12.497C16.7938 12.497 16.9834 12.5763 17.1421 12.735C17.3007 12.8936 17.38 13.0832 17.38 13.3039V15.973C17.38 16.4282 17.2179 16.8179 16.8938 17.1421C16.5696 17.4662 16.1868 17.6283 15.7454 17.6283H4.65525Z"
            fill="#fff"
          />
        </svg>
      </button>
      <button
        type="button"
        class="kuroco-sidebar__toggle__button kuroco-u-hidden-pc"
        @click="$emit('downloadToast')"
        aria-label="まとめてURLを送る"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.02083 16.9583C2.57639 16.9583 2.19097 16.7951 1.86458 16.4687C1.53819 16.1423 1.375 15.7569 1.375 15.3124V4.68742C1.375 4.22909 1.53819 3.83672 1.86458 3.51034C2.19097 3.18395 2.57639 3.02075 3.02083 3.02075H16.9792C17.4375 3.02075 17.8299 3.18395 18.1562 3.51034C18.4826 3.83672 18.6458 4.22909 18.6458 4.68742V15.3124C18.6458 15.7569 18.4826 16.1423 18.1562 16.4687C17.8299 16.7951 17.4375 16.9583 16.9792 16.9583H3.02083ZM16.9792 6.10409L10.4583 10.4374C10.375 10.4791 10.2986 10.5138 10.2292 10.5416C10.1597 10.5694 10.0833 10.5833 10 10.5833C9.91667 10.5833 9.84028 10.5694 9.77083 10.5416C9.70139 10.5138 9.625 10.4791 9.54167 10.4374L3.02083 6.10409V15.3124H16.9792V6.10409ZM10 9.22909L16.8958 4.68742H3.125L10 9.22909ZM3.02083 6.10409V6.29159C3.02083 6.24992 3.02083 6.18395 3.02083 6.09367C3.02083 6.00339 3.02083 5.90964 3.02083 5.81242C3.02083 5.5902 3.02083 5.41311 3.02083 5.28117C3.02083 5.14922 3.02083 5.15964 3.02083 5.31242V4.68742V5.29159C3.02083 5.16659 3.02083 5.15964 3.02083 5.27075C3.02083 5.38186 3.02083 5.55547 3.02083 5.79159C3.02083 5.9027 3.02083 5.99992 3.02083 6.08325C3.02083 6.16659 3.02083 6.23603 3.02083 6.29159V6.10409V15.3124V6.10409Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
    <section class="kuroco-sidebar" :class="expanded ? 'kuroco-sidebar--fixed' : ''">
      <button
        type="button"
        aria-label="Close"
        :class="[
          'kuroco-sidebar__toggle',
          'kuroco-sidebar__toggle--close',
          { 'kuroco-sidebar__toggle--up--sp': currentPage === 'Download' },
        ]"
        @click="toggleExpand(false)"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.28804 15.638C7.10471 15.4213 7.00888 15.1796 7.00054 14.913C6.99221 14.6463 7.08804 14.413 7.28804 14.213L11.513 9.98796L7.26304 5.73796C7.07971 5.55463 6.99221 5.31713 7.00054 5.02546C7.00888 4.7338 7.10471 4.4963 7.28804 4.31296C7.50471 4.0963 7.74221 3.99213 8.00054 4.00046C8.25888 4.0088 8.48804 4.11296 8.68804 4.31296L13.663 9.28796C13.763 9.38796 13.838 9.4963 13.888 9.61296C13.938 9.72963 13.963 9.85463 13.963 9.98796C13.963 10.1213 13.938 10.2463 13.888 10.363C13.838 10.4796 13.763 10.588 13.663 10.688L8.71304 15.638C8.51304 15.838 8.27971 15.9338 8.01304 15.9255C7.74638 15.9171 7.50471 15.8213 7.28804 15.638Z"
            fill="#fff"
          />
        </svg>
      </button>
      <header class="kuroco-sidebar__head">
        <p class="kuroco-sidebar__head__heading">ダウンロードリスト</p>
        <div class="kuroco-sidebar__toggle__icon">
          <span class="kuroco-sidebar__toggle__icon__badge">{{ total_items }}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.2 8.9701C0.86 8.9701 0.575 8.8551 0.345 8.6251C0.115 8.3951 0 8.1101 0 7.7701C0 7.4501 0.115 7.1751 0.345 6.9451C0.575 6.7151 0.86 6.6001 1.2 6.6001H13.2C13.54 6.6001 13.825 6.7151 14.055 6.9451C14.285 7.1751 14.4 7.4601 14.4 7.8001C14.4 8.1401 14.285 8.4201 14.055 8.6401C13.825 8.8601 13.54 8.9701 13.2 8.9701H1.2ZM1.2 14.3101C0.86 14.3101 0.575 14.1951 0.345 13.9651C0.115 13.7351 0 13.4501 0 13.1101C0 12.7901 0.115 12.5151 0.345 12.2851C0.575 12.0551 0.86 11.9401 1.2 11.9401H13.2C13.54 11.9401 13.825 12.0551 14.055 12.2851C14.285 12.5151 14.4 12.8001 14.4 13.1401C14.4 13.4801 14.285 13.7601 14.055 13.9801C13.825 14.2001 13.54 14.3101 13.2 14.3101H1.2ZM1.2 19.6801C0.86 19.6801 0.575 19.5651 0.345 19.3351C0.115 19.1051 0 18.8101 0 18.4501C0 18.1301 0.115 17.8551 0.345 17.6251C0.575 17.3951 0.86 17.2801 1.2 17.2801H8.28C8.62 17.2801 8.905 17.3951 9.135 17.6251C9.365 17.8551 9.48 18.1401 9.48 18.4801C9.48 18.8201 9.365 19.1051 9.135 19.3351C8.905 19.5651 8.62 19.6801 8.28 19.6801H1.2ZM15.75 23.1601L12.78 20.2201C12.56 19.9801 12.45 19.7001 12.45 19.3801C12.45 19.0601 12.56 18.7901 12.78 18.5701C13.04 18.3301 13.33 18.2051 13.65 18.1951C13.97 18.1851 14.25 18.2901 14.49 18.5101L16.44 20.4901L21.15 15.7801C21.39 15.5401 21.68 15.4201 22.02 15.4201C22.36 15.4201 22.64 15.5401 22.86 15.7801C23.1 16.0001 23.22 16.2751 23.22 16.6051C23.22 16.9351 23.11 17.2201 22.89 17.4601L17.16 23.1601C16.98 23.3601 16.75 23.4601 16.47 23.4601C16.19 23.4601 15.95 23.3601 15.75 23.1601Z"
              fill="#565656"
            />
          </svg>
        </div>
      </header>
      <div class="kuroco-sidebar__body">
        <ul class="kuroco-cart">
          <CardToast v-for="(data, idx) in list" :data="data" @removeToast="removeByIdx(idx)"></CardToast>
        </ul>
      </div>
      <footer class="kuroco-sidebar__foot">
        <button type="button" class="kuroco-button--download kuroco-u-hidden-sp" @click="$emit('downloadToast')">
          <span>まとめてダウンロード</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.2003 13.3246C10.09 13.3246 9.98654 13.3039 9.88999 13.2626C9.79343 13.2212 9.70377 13.1591 9.62101 13.0763L6.37258 9.82791C6.20705 9.66239 6.12774 9.46583 6.13463 9.23823C6.14153 9.01063 6.22774 8.82097 6.39327 8.66924C6.55879 8.50371 6.7519 8.42095 6.9726 8.42095C7.19331 8.42095 7.38642 8.50371 7.55194 8.66924L9.37272 10.5107V3.82763C9.37272 3.59313 9.45203 3.39657 9.61066 3.23794C9.76929 3.07931 9.96585 3 10.2003 3C10.4348 3 10.6314 3.07931 10.79 3.23794C10.9487 3.39657 11.028 3.59313 11.028 3.82763V10.5107L12.8694 8.66924C13.035 8.50371 13.2281 8.42095 13.4488 8.42095C13.6695 8.42095 13.8626 8.50371 14.0281 8.66924C14.1936 8.82097 14.2764 9.01063 14.2764 9.23823C14.2764 9.46583 14.1936 9.66239 14.0281 9.82791L10.7797 13.0763C10.6969 13.1591 10.6038 13.2212 10.5004 13.2626C10.3969 13.3039 10.2969 13.3246 10.2003 13.3246ZM4.65525 17.6283C4.20006 17.6283 3.81038 17.4662 3.48623 17.1421C3.16208 16.8179 3 16.4282 3 15.973V13.3246C3 13.0901 3.07931 12.8936 3.23794 12.735C3.39657 12.5763 3.59313 12.497 3.82763 12.497C4.06212 12.497 4.25868 12.5763 4.41731 12.735C4.57594 12.8936 4.65525 13.0832 4.65525 13.3039V15.973H15.7454V13.3039C15.7454 13.0832 15.8248 12.8936 15.9834 12.735C16.142 12.5763 16.3386 12.497 16.5731 12.497C16.7938 12.497 16.9834 12.5763 17.1421 12.735C17.3007 12.8936 17.38 13.0832 17.38 13.3039V15.973C17.38 16.4282 17.2179 16.8179 16.8938 17.1421C16.5696 17.4662 16.1868 17.6283 15.7454 17.6283H4.65525Z"
              fill="#fff"
            />
          </svg>
        </button>
        <button type="button" class="kuroco-button--download kuroco-u-hidden-pc" @click="$emit('downloadToast')">
          <span>まとめてURLを送る</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.02083 16.9583C2.57639 16.9583 2.19097 16.7951 1.86458 16.4687C1.53819 16.1423 1.375 15.7569 1.375 15.3124V4.68742C1.375 4.22909 1.53819 3.83672 1.86458 3.51034C2.19097 3.18395 2.57639 3.02075 3.02083 3.02075H16.9792C17.4375 3.02075 17.8299 3.18395 18.1562 3.51034C18.4826 3.83672 18.6458 4.22909 18.6458 4.68742V15.3124C18.6458 15.7569 18.4826 16.1423 18.1562 16.4687C17.8299 16.7951 17.4375 16.9583 16.9792 16.9583H3.02083ZM16.9792 6.10409L10.4583 10.4374C10.375 10.4791 10.2986 10.5138 10.2292 10.5416C10.1597 10.5694 10.0833 10.5833 10 10.5833C9.91667 10.5833 9.84028 10.5694 9.77083 10.5416C9.70139 10.5138 9.625 10.4791 9.54167 10.4374L3.02083 6.10409V15.3124H16.9792V6.10409ZM10 9.22909L16.8958 4.68742H3.125L10 9.22909ZM3.02083 6.10409V6.29159C3.02083 6.24992 3.02083 6.18395 3.02083 6.09367C3.02083 6.00339 3.02083 5.90964 3.02083 5.81242C3.02083 5.5902 3.02083 5.41311 3.02083 5.28117C3.02083 5.14922 3.02083 5.15964 3.02083 5.31242V4.68742V5.29159C3.02083 5.16659 3.02083 5.15964 3.02083 5.27075C3.02083 5.38186 3.02083 5.55547 3.02083 5.79159C3.02083 5.9027 3.02083 5.99992 3.02083 6.08325C3.02083 6.16659 3.02083 6.23603 3.02083 6.29159V6.10409V15.3124V6.10409Z"
              fill="white"
            />
          </svg>
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
  emits: ['downloadToast', 'removeToast', 'changeStatus', 'toggleExpand', 'toggleShrink'],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    hide: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      status: '',
      toast_expand: true,
      toast_shrink: false,
      replay_delay: 3, // seconds between zip download retry
      max_replay_times: 5, // max tries
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
    toggleExpand(expand = undefined) {
      if (expand === undefined) {
        // Unspecified => toggle
        this.toast_expand = !this.toast_expand;
      } else {
        if (this.toast_expand == expand) {
          // Already in specified state
          return;
        }
        // Specified => set (as bool)
        this.toast_expand = !!expand;
      }
      this.$emit('toggleExpand', this.toast_expand);
    },
    toggleShrink(shrink = undefined) {
      if (shrink === undefined) {
        // Unspecified => toggle
        this.toast_shrink = !this.toast_shrink;
      } else {
        if (this.toast_shrink == shrink) {
          // Already in specified state
          return;
        }
        // Specified => set (as bool)
        this.toast_shrink = !!shrink;
      }
      this.$emit('toggleShrink', this.toast_shrink);
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
    onModalScroll() {
      this.toggleShrink(true);
    },
  },
};
</script>
