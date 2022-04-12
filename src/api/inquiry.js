import axios from 'axios';
import qs from 'qs';
import { post, processError } from './utils';
import loginApi from './login';

function doSend(data) {
  return loginApi
    .getAuthHeaders({
      autoLogin: true,
      anonLogin: true,
    })
    .then((headers) =>
      post('/rcms-api/3/inquiry/send', data, headers)
        .then(processError)
        .catch((err) => {
          let err_msg = 'Error during inquiry send'; // Default error message
          if (err.response && err.response.data && err.response.data.errors) {
            err_msg = parseErr(err.response.data.errors);
          } else {
            switch (err.response.status) {
              case 404:
                err_msg = 'The inquiry endpoint could not be found';
                break;
            }
          }
          return Promise.reject(err_msg);
        })
    );
}

function getInquiryForm(inquiry_id) {
  return loginApi
    .getAuthHeaders({
      autoLogin: true,
      anonLogin: isPublic,
    })
    .then((headers) =>
      get('/rcms-api/3/inquiry/form/' + inquiry_id, params, headers)
        .then(processError)
        .catch((err) => {
          let err_msg = 'Problem fetching inquiry form ' + inquiry_id; // Default error message
          switch (err.response.status) {
            case 401:
              err_msg = 'Unauthorized request';
              break;
            case 404:
              err_msg = 'Inquiry form ' + inquiry_id + ' unavailable';
              break;
          }
          return Promise.reject(err_msg);
        })
    );
}

export default {
  doSend,
  getInquiryForm,
};
