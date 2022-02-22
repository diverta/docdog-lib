import axios from 'axios';
import qs from 'qs';
import { post, processError } from './utils';
import loginApi from './login';

function parseErr(errors) {
  return errors.reduce((carry, obj) => {
    if (carry != '') {
      carry += '<br/>';
    }
    return obj.field ? carry.concat(obj.field + ':' + obj.code) : carry.concat(obj.message);
  }, '');
}

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

export default {
  doSignUp,
  doEditProfile,
  doWithdrawal,
};
