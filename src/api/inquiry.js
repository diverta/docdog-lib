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

export default {
  doSend,
};
