import docsApi from '@/api/docs';
import _ from 'lodash';

export default {
  methods: {
    fetchList(params = {}) {
      if (!params.cnt) {
        // In case its set to falsey value (null or 0)
        delete params['cnt'];
      }
      return docsApi.getDocumentList(true, params).then((data) => {
        return { list: data.list, pageInfo: data.pageInfo };
      });
    },
    makePagedButtons(pageInfo) {
      const firstNumTmp = Math.max(1, pageInfo.pageNo - 2);
      const lastNumTmp = Math.min(pageInfo.pageNo + 2, pageInfo.totalPageCnt);
      const pagedButtons = _.range(firstNumTmp, lastNumTmp + 1);
      if (firstNumTmp != 1) {
        pagedButtons.unshift(1);
        if (firstNumTmp != 2) {
          if (firstNumTmp == 3) {
            pagedButtons.splice(1, 0, 2);
          } else {
            pagedButtons.splice(1, 0, '...');
          }
        }
      }
      if (lastNumTmp != pageInfo.totalPageCnt) {
        if (lastNumTmp != pageInfo.totalPageCnt - 1) {
          if (lastNumTmp == pageInfo.totalPageCnt - 2) {
            pagedButtons.push(pageInfo.totalPageCnt - 1);
          } else {
            pagedButtons.push('...');
          }
        }
        pagedButtons.push(pageInfo.totalPageCnt);
      }
      return pagedButtons;
    },
  },
};
