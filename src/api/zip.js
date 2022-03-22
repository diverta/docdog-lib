import axios from 'axios';
import { get, post, processError } from './utils';
import loginApi from './login';

export function makeZip(entries, isPublic = false) {
  return loginApi
    .getAuthHeaders({
      autoLogin: true,
      anonLogin: isPublic,
    })
    .then((headers) => post('/rcms-api/3/zip', { entries }, headers).then(processError));
}

export function getFileUrl(path, isPublic = false) {
  return loginApi
    .getAuthHeaders({
      autoLogin: true,
      anonLogin: isPublic,
    })
    .then((headers) => get('/rcms-api/3/get_file_url', { path }, headers).then(processError));
}

export default {
  makeZip,
  getFileUrl,
};
