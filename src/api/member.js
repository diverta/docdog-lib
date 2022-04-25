import axios from 'axios';
import qs from 'qs';
import { get, post, processError } from './utils';
import loginApi from './login';

function doSignUp(data) {
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
            err_msg = err.response.data.errors;
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
  return loginApi.getAuthHeaders().then((headers) =>
    post('/rcms-api/3/member/edit', data, headers)
      .then(processError)
      .catch((err) => {
        let err_msg = 'Error during profile edit'; // Default error message
        if (err.response && err.response.data && err.response.data.errors) {
          err_msg = err.response.data.errors;
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
          err_msg = err.response.data.errors;
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
        .then((resp) => {
          if (resp.details) {
            if (resp.details.email_send_ng_flg && resp.details.email_send_ng_flg.name == 'email_send_ng_flg') {
              resp.details.email_send_ng_flg.name = 'メールマガジンの配信設定';
              resp.details.email_send_ng_flg.label = 'メールマガジンを受け取らない';
            }
            if (resp.details.tel_send_ng_flg) {
              delete resp.details.tel_send_ng_flg; // Unneeded
            }
          }
          return resp;
        })
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
