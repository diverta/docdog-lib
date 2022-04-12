import axios from 'axios';
import qs from 'qs';
import { get, post, processError } from './utils';
import loginApi from './login';

function parseErr(errors) {
  return errors.reduce((carry, obj) => {
    if (carry != '') {
      carry += '<br/>';
    }
    return obj.field ? carry.concat(obj.field + ':' + obj.code + ':' + obj.message) : carry.concat(obj.message);
  }, '');
}

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
      anonLogin: true,
    })
    .then((headers) =>
      get('/rcms-api/3/inquiry/form/' + inquiry_id, {}, headers)
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
