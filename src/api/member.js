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

function doSignUp(data) {
  if (data.email_send_ng_flg != null) {
    data.email_send_ng_flg = parseInt(data.email_send_ng_flg); // TODO DELETE
  }
  if (data.tel_send_ng_flg != null) {
    data.tel_send_ng_flg = parseInt(data.tel_send_ng_flg); // TODO DELETE
  }
  return loginApi
    .getAuthHeaders({
      autoLogin: true,
      anonLogin: true,
    })
    .then((headers) =>
      post('/rcms-api/3/member/new', data, headers)
        .then(processError)
        .catch((err) => {
          let err_msg = 'Error during signup'; // Default error message
          if (err.response && err.response.data && err.response.data.errors) {
            err_msg = parseErr(err.response.data.errors);
          } else {
            switch (err.response.status) {
              case 404:
                err_msg = 'The signup endpoint could not be found';
                break;
            }
          }
          return Promise.reject(err_msg);
        })
    );
}

function doEditProfile(data) {
  if (data.email_send_ng_flg != null) {
    data.email_send_ng_flg = parseInt(data.email_send_ng_flg); // TODO DELETE
  }
  if (data.tel_send_ng_flg != null) {
    data.tel_send_ng_flg = parseInt(data.tel_send_ng_flg); // TODO DELETE
  }
  return loginApi.getAuthHeaders().then((headers) =>
    post('/rcms-api/3/member/edit', data, headers)
      .then(processError)
      .catch((err) => {
        let err_msg = 'Error during profile edit'; // Default error message
        if (err.response && err.response.data && err.response.data.errors) {
          err_msg = parseErr(err.response.data.errors);
        } else {
          switch (err.response.status) {
            case 404:
              err_msg = 'The edit profile endpoint could not be found';
              break;
          }
        }
        return Promise.reject(err_msg);
      })
  );
}

function doWithdrawal() {
  return loginApi.getAuthHeaders().then((headers) =>
    post('/rcms-api/3/member/withdraw', {}, headers)
      .then(processError)
      .then(() => loginApi.doLogout())
      .catch((err) => {
        let err_msg = 'Error during withdrawal'; // Default error message
        if (err.response && err.response.data && err.response.data.errors) {
          err_msg = parseErr(err.response.data.errors);
        } else {
          switch (err.response.status) {
            case 404:
              err_msg = 'The withdrawal endpoint could not be found';
              break;
          }
        }
        return Promise.reject(err_msg);
      })
  );
}

function getMemberForm() {
  return loginApi
    .getAuthHeaders({
      autoLogin: true,
      anonLogin: true,
    })
    .then((headers) =>
      get('/rcms-api/3/member/form', {}, headers)
        .then(processError)
        .catch((err) => {
          let err_msg = 'Problem fetching member form'; // Default error message
          switch (err.response.status) {
            case 401:
              err_msg = 'Unauthorized request';
              break;
            case 404:
              err_msg = 'Member form unavailable';
              break;
          }
          return Promise.reject(err_msg);
        })
    );
}

export default {
  doSignUp,
  doEditProfile,
  doWithdrawal,
  getMemberForm,
};
