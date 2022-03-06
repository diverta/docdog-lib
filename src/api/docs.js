import axios from 'axios';
import { get, processError } from './utils';
import loginApi from './login';

export function getDocumentList(isPublic = false, params = {}) {
  return loginApi
    .getAuthHeaders({
      autoLogin: true,
      anonLogin: isPublic,
    })
    .then((headers) =>
      get('/rcms-api/3/files', headers, params)
        .then(processError)
        .catch((err) => {
          let err_msg = 'Problem fetching document list'; // Default error message
          switch (err.response.status) {
            case 401:
              err_msg = 'Unauthorized request';
              break;
            case 404:
              err_msg = 'Documents unavailable';
              break;
          }
          return Promise.reject(err_msg);
        })
    );
}

export function getDocumentData(id, isPublic = false, params = {}) {
  return loginApi
    .getAuthHeaders({
      autoLogin: true,
      anonLogin: isPublic,
    })
    .then((headers) =>
      get('/rcms-api/3/files/' + id, headers, params)
        .then(processError)
        .catch((err) => {
          let err_msg = 'Problem fetching document data'; // Default error message
          switch (err.response.status) {
            case 401:
              err_msg = 'Unauthorized request';
              break;
            case 404:
              err_msg = 'The document with id <' + id + '> could not be found';
              break;
          }
          return Promise.reject(err_msg);
        })
    );
}

export default {
  getDocumentList,
  getDocumentData,
};
