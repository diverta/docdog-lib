import axios from 'axios';
import qs from 'qs';
import { get, post, processError } from './utils';

const header_keys = {
  ACCESS_TOKEN: 'X-RCMS-API-ACCESS-TOKEN',
};

const storage_keys = {
  REFRESH_TOKEN: { name: 'docdog.refresh_token', location: 'local' },
  ACCESS_TOKEN: { name: 'docdog.access_token', location: 'local' },
  PROFILE: { name: 'docdog.profile', location: 'session' },
};

// Checks whether user is logged in
// Returns Promise
function isLogin(
  options = {
    autoLogin: true, // Performs autoLogin if there is a Refresh token but not Access token
    anonLogin: false, // Fetches anonymous token if there is no Access or Refresh token
  }
) {
  return getAuthHeaders(options).then((headers) => {
    return header_keys.ACCESS_TOKEN in headers && headers[header_keys.ACCESS_TOKEN].length > 0;
  });
}

// Fetches login headers
// Returns Promise
function getAuthHeaders(
  options = {
    autoLogin: true, // Performs autoLogin if there is a Refresh token but not Access token
    anonLogin: false, // Fetches anonymous token if there is no Access or Refresh token
  }
) {
  const access_token = parseToken(storage_keys.ACCESS_TOKEN, fetchData(storage_keys.ACCESS_TOKEN));
  if (!access_token.value || (!options.anonLogin && access_token.isPublic)) {
    // If there is no access token, or if its public but we don't want public
    const token_data = {};
    let isPublic = true;
    const refresh_token = parseToken(storage_keys.REFRESH_TOKEN, fetchData(storage_keys.REFRESH_TOKEN));
    if (options.autoLogin && refresh_token.value) {
      token_data[refresh_token] = refresh_token.value;
      isPublic = false;
    } else if (!options.anonLogin) {
      // This case should not functionnally happen, except when checking if the user is logged in. If this code is reached, then page flow is may be incorrect.
      // If the API is public, use this function with enabled 'anonLogin' option. Else, don't initiate the API call at all
      return Promise.resolve({});
    }
    return getAccessToken(token_data).then((ret) => {
      storeData(storage_keys.ACCESS_TOKEN, { ...ret.access_token, isPublic });
      return {
        [header_keys.ACCESS_TOKEN]: ret.access_token.value,
      };
    });
  } else {
    return Promise.resolve({
      [header_keys.ACCESS_TOKEN]: access_token.value,
    });
  }
}

// Parses a token object, notably validates expiry date
function parseToken(key, token_data) {
  token_data.isPublic = (token_data.isPublic && token_data.isPublic !== 'false') || false; // Because storing and reading stringifies the boolean into string "false" which is true otherwise
  if (token_data.expiresAt) {
    const expirationTimestamp = parseInt(token_data.expiresAt);
    if (expirationTimestamp <= Math.floor(Date.now() / 1000)) {
      // Expired
      token_data.value = '';
      removeData(key);
    }
  }
  return token_data;
}

function storeData(key, value) {
  if (key.location == 'session') {
    sessionStorage.setItem(key.name, qs.stringify(value));
  } else {
    localStorage.setItem(key.name, qs.stringify(value));
  }
}

function fetchData(key) {
  let rawData = '';
  if (key.location == 'session') {
    rawData = sessionStorage.getItem(key.name);
  } else {
    rawData = localStorage.getItem(key.name);
  }
  return qs.parse(rawData);
}

function removeData(key) {
  if (key.location == 'session') {
    sessionStorage.removeItem(key.name);
  } else {
    localStorage.removeItem(key.name);
  }
}

function handleGrant(grant_token) {
  return getAccessToken({ grant_token }).then((ret) => {
    storeData(storage_keys.ACCESS_TOKEN, { ...ret.access_token, isPublic: false });
    if (ret.refresh_token) {
      storeData(storage_keys.REFRESH_TOKEN, { ...ret.refresh_token });
    }
    return true;
  });
}

function doLogin({ email, password, grant_token }) {
  if (grant_token) {
    return handleGrant(grant_token);
  } else {
    return post('/rcms-api/3/login', { email, password })
      .then(processError)
      .then((resp) => {
        if (resp.grant_token) {
          return handleGrant(resp.grant_token);
        } else {
          throw 'Login API did not contain a grant token';
        }
      })
      .catch((err) => {
        let err_msg = 'Error during login'; // Default error message
        switch (err.response.status) {
          case 401:
            err_msg =
              err.response &&
              err.response.data &&
              err.response.data.errors.length > 0 &&
              err.response.data.errors[0].message
                ? err.response.data.errors[0].message
                : 'メールアドレスが不正です。';
            break;
          case 404:
            err_msg = 'The login endpoint could not be found';
            break;
        }
        return Promise.reject(err_msg);
      });
  }
}

function doLogout() {
  removeData(storage_keys.ACCESS_TOKEN);
  removeData(storage_keys.REFRESH_TOKEN);
  removeData(storage_keys.PROFILE);
}

function getAccessToken({ grant_token, refresh_token }) {
  return post('/rcms-api/3/token', { grant_token, refresh_token })
    .then(processError)
    .catch((err) => {
      let err_msg = 'Problem fetching token'; // Default error message
      switch (err.response.status) {
        case 404:
          err_msg = 'The token URL is invalid';
          break;
      }
      return Promise.reject(err_msg);
    });
}

function updateProfile(data) {
  const profile = getProfile();
  storeData(storage_keys.PROFILE, { ...profile, ...data });
}

function getProfile(
  options = {
    autoLogin: true, // Performs autoLogin if there is a Refresh token but not Access token
    anonLogin: false, // Fetches anonymous token if there is no Access or Refresh token
  }
) {
  const profile = fetchData(storage_keys.PROFILE);
  if (profile.member_id) {
    return Promise.resolve(profile);
  } else {
    return getAuthHeaders(options).then((headers) => {
      if (header_keys.ACCESS_TOKEN in headers && headers[header_keys.ACCESS_TOKEN].length > 0) {
        return get('/rcms-api/3/profile', headers).then((res) => {
          updateProfile(res.data.details);
          return res.data.details;
        });
      } else {
        // Not logged in
        return {};
      }
    });
  }
}

function reminderSendEmail({ email }) {
  return getAuthHeaders({
    autoLogin: true,
    anonLogin: true,
  }).then((headers) =>
    post('/rcms-api/3/reminder', { email }, headers)
      .then(processError)
      .then((resp) => {
        if (resp.errors && resp.errors.length > 0) {
          return Promise.reject(resp.errors[1]);
        }
      })
      .catch((err) => {
        let err_msg = '不明エラー'; // Default error message
        switch (err.response.status) {
          case 401:
            err_msg =
              err.response &&
              err.response.data &&
              err.response.data.errors.length > 0 &&
              err.response.data.errors[0].message
                ? err.response.data.errors[0].message
                : 'メールアドレスが不正です。';
            break;
          case 404:
            err_msg = 'The reminder endpoint could not be found';
            break;
        }
        return Promise.reject(err_msg);
      })
  );
}

function reminderUpdatePassword({ token, temp_pwd, login_pwd }) {
  return getAuthHeaders({
    autoLogin: true,
    anonLogin: true,
  }).then((headers) =>
    post('/rcms-api/3/reminder', { token, temp_pwd, login_pwd }, headers)
      .then(processError)
      .then((resp) => {
        if (resp.errors && resp.errors.length > 0) {
          return Promise.reject(resp.errors[1]);
        }
      })
      .catch((err) => {
        let err_msg = '不明エラー'; // Default error message
        switch (err.response.status) {
          case 404:
            err_msg = 'The reminder endpoint could not be found';
            break;
          default:
            err_msg =
              err.response &&
              err.response.data &&
              err.response.data.errors.length > 0 &&
              err.response.data.errors[0].message
                ? reminderProcessMessage(err.response.data.errors[0].message)
                : '不明エラー';
        }
        return Promise.reject(err_msg);
      })
  );
}

function reminderProcessMessage(msg) {
  switch (msg) {
    case 'Invalid Temporary Password':
      return '仮パスワードが不正です。';
    default:
      return '不明エラー';
  }
}

// Public methods
export default {
  isLogin,
  getAuthHeaders,
  doLogin,
  doLogout,
  updateProfile,
  getProfile,
  reminderSendEmail,
  reminderUpdatePassword,
};
