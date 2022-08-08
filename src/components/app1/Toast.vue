<template>
  <div class="kuroco">
    <button type="button" class="kuroco-button--floating" v-if="!toast_expand" @click="toast_expand = !toast_expand">
      <div class="kuroco-tooltip__outer">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.301 19.987C15.1355 19.987 14.9803 19.9559 14.8355 19.8938C14.6906 19.8318 14.5561 19.7387 14.432 19.6145L9.55935 14.7419C9.31106 14.4936 9.19209 14.1987 9.20244 13.8573C9.21278 13.516 9.3421 13.2315 9.59039 13.0039C9.83868 12.7556 10.1283 12.6314 10.4594 12.6314C10.7904 12.6314 11.0801 12.7556 11.3284 13.0039L14.0596 15.7661V5.74144C14.0596 5.3897 14.1785 5.09486 14.4165 4.85691C14.6544 4.61897 14.9493 4.5 15.301 4.5C15.6527 4.5 15.9476 4.61897 16.1855 4.85691C16.4235 5.09486 16.5424 5.3897 16.5424 5.74144V15.7661L19.3046 13.0039C19.5529 12.7556 19.8426 12.6314 20.1737 12.6314C20.5047 12.6314 20.7944 12.7556 21.0427 13.0039C21.2909 13.2315 21.4151 13.516 21.4151 13.8573C21.4151 14.1987 21.2909 14.4936 21.0427 14.7419L16.17 19.6145C16.0459 19.7387 15.9062 19.8318 15.751 19.8938C15.5958 19.9559 15.4458 19.987 15.301 19.987ZM6.98337 26.4424C6.30057 26.4424 5.71606 26.1993 5.22983 25.7131C4.7436 25.2269 4.50049 24.6423 4.50049 23.9596V19.987C4.50049 19.6352 4.61946 19.3404 4.8574 19.1024C5.09534 18.8645 5.39019 18.7455 5.74193 18.7455C6.09367 18.7455 6.38851 18.8645 6.62645 19.1024C6.86439 19.3404 6.98337 19.6249 6.98337 19.9559V23.9596H23.6186V19.9559C23.6186 19.6249 23.7376 19.3404 23.9756 19.1024C24.2135 18.8645 24.5083 18.7455 24.8601 18.7455C25.1911 18.7455 25.4756 18.8645 25.7136 19.1024C25.9515 19.3404 26.0705 19.6249 26.0705 19.9559V23.9596C26.0705 24.6423 25.8274 25.2269 25.3411 25.7131C24.8549 26.1993 24.2807 26.4424 23.6186 26.4424H6.98337Z" fill="white"/>
        </svg>
        <span class="kuroco-tooltip">ダウンロードリスト</span>
      </div>
    </button>
    <section class="kuroco-toast" v-if="toast_expand">
      <header class="kuroco-toast__head">
        <p class="kuroco-toast__head__heading">ダウンロードリスト</p>
        <button
          type="button"
          aria-label="Close"
          class="kuroco-toast__head__close"
          @click="toast_expand = !toast_expand"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.59 8.58997L12 13.17L7.41 8.58997L6 9.99997L12 16L18 9.99997L16.59 8.58997Z" fill="#666666" />
          </svg>
        </button>
      </header>
      <!-- ダウンロードリストモーダル -->
      <div class="kuroco-toast__body">
        <ul class="kuroco-toast__body__list">
          <li v-for="(item, idx) in list">
            <p class="kuroco-toast__body__list__title">{{ item.subject }}</p>
            <DeleteButton @click="removeByIdx(idx)" />
          </li>
        </ul>
      </div>
      <footer class="kuroco-toast__foot">
        <button type="button" class="kuroco-button--download" @click="$emit('downloadToast')">
          <span>まとめてダウンロードする</span>
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
