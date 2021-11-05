import axios from 'axios';
import _ from 'lodash';
import qs from 'qs';

export const API_RESPONSE_SUCCESS = 200;
export const API_HOST = 'https://docdog.g.kuroco.app';

export function get(uri, headers = {}) {
  return axios.get(API_HOST + uri, {
    headers,
  });
}

export function post(uri, post_data = {}, headers = {}) {
  return axios.post(API_HOST + uri, JSON.stringify(post_data), {
    headers,
  });
}

export function processError(res) {
  if (!res.data) {
    return Promise.reject();
  }
  const data = res.data;

  if (!(data instanceof Object)) {
    return Promise.reject();
  }

  if (data.validation_errors && data.validation_errors.length > 0) {
    return Promise.reject({ validationErrors: data.validation_errors });
  }
  if (data.errors && data.errors.length > 0) {
    return Promise.reject({ errors: data.errors });
  }
  if (res.status !== API_RESPONSE_SUCCESS) {
    return Promise.reject();
  }
  return res.data;
}
