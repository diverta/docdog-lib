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

function setNodeLogin(node) {
  if (window.Docdog.app) {
    window.Docdog.app.setNodeLogin(node);
  }
}

function setNodeLogout(node) {
  if (window.Docdog.app) {
    window.Docdog.app.setNodeLogout(node);
  }
}

function setNodeSignUp(node) {
  if (window.Docdog.app) {
    window.Docdog.app.setNodeSignUp(node);
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

const initApp = _.once((el) => {
  if (window.Docdog.app == null) {
    // Even if the lib is loaded multiple times, ensure app init only once

    let docdogAppDiv = null;
    let docdogApp = null;
    if (el) {
      docdogAppDiv = el;
      docdogApp = createApp(App, { initList: true });
    } else {
      docdogAppDiv = document.createElement('div');
      docdogAppDiv.classList.add('docdog-container');
      document.body.appendChild(docdogAppDiv);
      docdogApp = createApp(App);
    }
    window.Docdog.app = docdogApp.mount(docdogAppDiv);
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
  const nodes = [];
  let el = null; // Element to be mounted

  document.querySelectorAll('[data-docdog]').forEach((node) => {
    const params = parseConfig(node.getAttribute('data-docdog'));
    if (params.list) {
      // "list" is a rendering param. We mount the app on it, if it exists
      el = node;
    } else {
      nodes.push({ el: node, params });
    }
  });

  initApp(el);

  nodes.forEach((node) => {
    if (node.params.logout) {
      setNodeLogout(node.el);
    } else if (node.params.login) {
      setNodeLogin(node.el);
    } else if (node.params.signup) {
      setNodeSignUp(node.el);
    } else {
      linkNode(node.el, node.params);
    }
  });
}

function docdogLink(node, params) {
  initApp();
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
