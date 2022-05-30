<template>
  <div id="hubspot-loader" ref="hubLoader"></div>
</template>

<script>
export default {
  props: {
    hubId: {
      type: String,
      default: '',
    },
    currentPage: {
      type: String,
      default: '',
    },
    profile: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    if (this.hubId) {
      // Load the lib
      let scriptEl = document.createElement('script');
      scriptEl.setAttribute('src', '//js.hs-scripts.com/' + this.hubId + '.js');
      scriptEl.setAttribute('type', 'text/javascript');
      scriptEl.setAttribute('id', 'hs-script-loader');
      this.$refs['hubLoader'].appendChild(scriptEl);
    }
  },
  methods: {
    onRedirect(newPage) {
      if (this.hubId) {
        let pathQS = '';
        if (newPage) {
          pathQS = '?docdog_page=' + newPage;
        } else {
          // Modal closed : no QS
        }
        const pathToTrack = '/' + pathQS;
        const _hsq = (window._hsq = window._hsq || []);
        _hsq.push(['setPath', pathToTrack]);
        _hsq.push(['trackPageView']);
      }
    },
    identifyUser(email) {
      if (this.hubId) {
        var _hsq = (window._hsq = window._hsq || []);
        _hsq.push(['identify', { email }]);
      }
    },
  },
  watch: {
    currentPage(newPage, oldPage) {
      if (this.hubId && newPage != oldPage) {
        this.onRedirect(newPage);
      }
    },
    'profile.email': function (email) {
      if (email) {
        this.identifyUser(email);
      } else {
        // Logout happened : email is undefined
      }
    },
  },
};
</script>
