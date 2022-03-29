import axios from 'axios';
import _ from 'lodash';
import qs from 'qs';

export function get(uri, params = {}, headers = {}) {
  if (window.DOCDOG_API_HOST) {
    return axios.get(window.DOCDOG_API_HOST + uri, {
      headers,
      params,
    });
  } else {
    console.error('[Docdog] DOCDOG_API_HOST is undefined. Please check your Google Tag Manager settings');
  }
}

export function post(uri, post_data = {}, headers = {}) {
  if (window.DOCDOG_API_HOST) {
    return axios.post(window.DOCDOG_API_HOST + uri, JSON.stringify(post_data), {
      headers,
    });
  } else {
    console.error('[Docdog] API Host is undefined. Please check your Google Tag Manager settings');
  }
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
  if (res.status > 400) {
    return Promise.reject();
  }
  return res.data;
}
