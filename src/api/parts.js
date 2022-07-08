import axios from 'axios';
import { get, processError } from './utils';
import loginApi from './login';

export function getHTMLParts(isPublic = true, params = {}) {
  return loginApi
    .getAuthHeaders({
      autoLogin: true,
      anonLogin: isPublic,
    })
    .then((headers) =>
      get('/rcms-api/3/htmlparts', params, headers)
        .then(processError)
        .catch((err) => {
          let err_msg = 'Problem fetching HTML parts'; // Default error message
          switch (err.response.status) {
            case 401:
              err_msg = 'Unauthorized request';
              break;
            case 404:
              err_msg = 'HTML parts unavailable';
              break;
          }
          return Promise.reject(err_msg);
        })
    );
}

export default {
  getHTMLParts,
};
