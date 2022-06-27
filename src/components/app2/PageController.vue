<script>
import AbstractPageController from '@/components/common/AbstractPageController.vue';

// This component loads all corresponding pages, and defines the current_page_comp value (cannot pass Vue components directly as props)
import pages from '@/components/app2/modal_pages/index';

// Common
import loginApi from '@/api/login';

export default {
  extends: AbstractPageController,
  components: pages,
  computed: {
    pages() {
      const pagesWithoutComponentValues = {};
      Object.keys(pages).forEach((key) => {
        pagesWithoutComponentValues[key] = null;
      });
      return pagesWithoutComponentValues;
    },
    current_page_comp() {
      if (this.current_page in this.pages) {
        return pages[this.current_page];
      } else {
        return pages['Error'];
      }
    },
  },
};
</script>
