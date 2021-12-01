import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import _ from 'lodash';

axios.defaults.headers.post['Content-Type'] = 'application/json';

if (window.Docdog === undefined) {
  window.Docdog = {
    app: null,
  };
}

function linkNode(node, params) {
  if (window.Docdog.app) {
    window.Docdog.app.linkNode(node, params);
  }
}

function unlinkNode(node) {
  if (window.Docdog.app) {
    window.Docdog.app.unlinkNode(node);
  }
}

function setNodeLogout(node) {
  if (window.Docdog.app) {
    window.Docdog.app.setNodeLogout(node);
  }
}

function parseConfig(config) {
  if (typeof config === 'string' || config instanceof String) {
    return config.split(',').reduce((carry, keyval) => {
      let [k, v] = keyval.split(':');
      if (v === undefined) {
        v = true; // Key-only is a flag
      }
      return { ...carry, [k]: v };
    }, {});
  } else if (typeof config === 'object') {
    // Config is already an object
    return config;
  } else {
    return {};
  }
}

const initDocdogApp = _.once(() => {
  if (window.Docdog.app == null) {
    // Even if the lib is loaded multiple times, ensure app init only once

    const docdogAppDiv = document.createElement('div');
    docdogAppDiv.classList.add('docdog-container');
    document.body.appendChild(docdogAppDiv);
    window.Docdog.app = createApp(App).mount(docdogAppDiv);
  }
});

function parseDOM() {
  //const tags = document.evaluate(
  //  '//*[@*[starts-with(name(), "data-docdog-")]]',
  //  document,
  //  null,
  //  XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
  //  null
  //);
  initDocdogApp();

  const node_params_list = [];
  document.querySelectorAll('[data-docdog]').forEach((node) => {
    const params = parseConfig(node.getAttribute('data-docdog'));
    if (params.logout) {
      setNodeLogout(node);
    } else {
      linkNode(node, params);
    }
  });
}

function docdogLink(node, params) {
  initDocdogApp();
  linkNode(node, parseConfig(params));
}

function docdogUnlink(node) {
  unlinkNode(node);
}

function docdogLogout() {
  if (window.Docdog.app) {
    window.Docdog.app.logout();
  }
}

export { parseDOM, docdogLink, docdogUnlink, docdogLogout };
