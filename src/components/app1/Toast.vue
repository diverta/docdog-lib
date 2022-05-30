<template>
  <div class="docdog">
    <button type="button" class="docdog-button docdog-button--floating" v-if="!toast_expand" @click="toast_expand = !toast_expand">
      <div class="docdog-tooltip__outer">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_336_55)">
            <path d="M25.9014 19.7143H23.8571V13.2857C23.8571 12.5786 23.2786 12 22.5714 12H17.4286C16.7214 12 16.1429 12.5786 16.1429 13.2857V19.7143H14.0986C12.9543 19.7143 12.3757 21.1029 13.1857 21.9129L19.0871 27.8143C19.5886 28.3157 20.3986 28.3157 20.9 27.8143L26.8014 21.9129C27.6114 21.1029 27.0457 19.7143 25.9014 19.7143ZM11 32.5714C11 33.2786 11.5786 33.8571 12.2857 33.8571H27.7143C28.4214 33.8571 29 33.2786 29 32.5714C29 31.8643 28.4214 31.2857 27.7143 31.2857H12.2857C11.5786 31.2857 11 31.8643 11 32.5714Z" fill="white"/>
          </g>
          <defs>
          <clipPath id="clip0_336_55">
            <rect width="40" height="40" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <span class="docdog-tooltip">ダウンロードリスト</span>
      </div>
    </button>
    <section class="docdog-toast" v-if="toast_expand">
      <header class="docdog-toast__head">
        <p class="docdog-toast__head__heading">ダウンロードリスト</p>
        <button
          type="button"
          aria-label="Close"
          class="docdog-toast__head__close"
          @click="toast_expand = !toast_expand"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.59 8.58997L12 13.17L7.41 8.58997L6 9.99997L12 16L18 9.99997L16.59 8.58997Z" fill="#666666" />
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
import DeleteButton from '@/components/app1/DeleteButton.vue';
import zipApi from '@/api/zip';

export default {
  components: {
    DeleteButton,
  },
  emits: ['downloadToast', 'removeToast', 'changeStatus'],
  props: {
    list: {
      type: Array,
      default: () => [],
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
  methods: {
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
