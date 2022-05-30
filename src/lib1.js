import { createApp } from 'vue';
import App from './App1.vue';
import axios from 'axios';
import _ from 'lodash';

axios.defaults.headers.post['Content-Type'] = 'application/json';

if (window.Docdog === undefined) {
  window.Docdog = {
    app1: null,
  };
}

function processNodeParams(node, params) {
  if (window.Docdog.app1) {
    window.Docdog.app1.processNodeParams(node, params);
  }
}

function linkNode(node, params) {
  if (window.Docdog.app1) {
    window.Docdog.app1.linkNode(node, params);
  }
}

function unlinkNode(node) {
  if (window.Docdog.app1) {
    window.Docdog.app1.unlinkNode(node);
  }
}

function setNodeLogin(node) {
  if (window.Docdog.app1) {
    window.Docdog.app1.setNodeLogin(node);
  }
}

function setNodeLogout(node) {
  if (window.Docdog.app1) {
    window.Docdog.app1.setNodeLogout(node);
  }
}

function setNodeSignUp(node) {
  if (window.Docdog.app1) {
    window.Docdog.app1.setNodeSignUp(node);
  }
}

function setNodeReminder(node) {
  if (window.Docdog.app1) {
    window.Docdog.app1.setNodeReminder(node);
  }
}

function setNodeProfile(node) {
  if (window.Docdog.app1) {
    window.Docdog.app1.setNodeProfile(node);
  }
}

function setNodeList(node, params) {
  if (window.Docdog.app1) {
    window.Docdog.app1.setNodeList(node, params);
  }
}

function setNodeTopics(node, params) {
  if (window.Docdog.app1) {
    window.Docdog.app1.setNodeList(node, params);
  }
}

function setNodeVideos(node, params) {
  if (window.Docdog.app1) {
    window.Docdog.app1.setNodeList(node, params);
  }
}

function setNodeHeader(node) {
  if (window.Docdog.app1) {
    window.Docdog.app1.setNodeHeader(node);
  }
}

function setNodeMypage(node) {
  if (window.Docdog.app1) {
    window.Docdog.app1.setNodeMypage(node);
  }
}

function setNodeInquiry(node) {
  if (window.Docdog.app1) {
    window.Docdog.app1.setNodeMypage(node);
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
  if (window.Docdog.app1 == null) {
    // Even if the lib is loaded multiple times, ensure app init only once

    let docdogAppDiv = null;
    if (el) {
      docdogAppDiv = el;
    } else {
      docdogAppDiv = document.createElement('div');
      docdogAppDiv.classList.add('docdog-container');
      document.body.appendChild(docdogAppDiv);
    }
    window.Docdog.app1 = createApp(App).mount(docdogAppDiv);
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
  loadCSS();
  const docdogEls = [];
  const nodes = [];
  let el = null; // Element to be mounted

  // Scan <a> tags
  if (window.DOCDOG_API_HOST) {
    document.querySelectorAll('a[href^="' + window.DOCDOG_API_HOST + '"]').forEach((node) => {
      const url = new URL(node.href);
      const action = url.pathname.substr(1);
      node.removeAttribute('href'); // Disable click
      docdogEls.push({ node, action, searchParams: url.searchParams });
    });
  } else {
    console.error('[Docdog] is undefined. Please check your Google Tag Manager settings');
  }

  // Scan any tag having custom data-docdog attribute
  document.querySelectorAll('[data-docdog]').forEach((node) => {
    const [action, paramsQueryString] = node.getAttribute('data-docdog').split('?');
    docdogEls.push({ node, action, searchParams: new URLSearchParams(paramsQueryString) });
  });

  docdogEls.forEach((elData) => {
    const params = {};
    const paramsIter = elData.searchParams.entries();
    let res = paramsIter.next();
    while (!res.done) {
      const [key, value] = res.value;
      if (value != '') {
        if (key == 'id' || (!isNaN(value) && !isNaN(parseInt(value)))) {
          params[key] = parseInt(value);
        } else {
          params[key] = value;
        }
      }
      res = paramsIter.next();
    }
    nodes.push({ el: elData.node, action: elData.action, params });
  });

  initApp(el);

  nodes.forEach((node) => {
    processNodeParams(node.el, node.params);
    switch (node.action) {
      case 'logout':
        setNodeLogout(node.el);
        break;
      case 'login':
        setNodeLogin(node.el);
        break;
      case 'reminder':
        setNodeReminder(node.el);
        break;
      case 'signup':
        setNodeSignUp(node.el);
        break;
      case 'profile':
        setNodeProfile(node.el);
        break;
      case 'list':
        setNodeList(node.el, node.params);
        break;
      case 'topics':
        setNodeTopics(node.el, node.params);
        break;
      case 'videos':
        setNodeVideos(node.el, node.params);
        break;
      case 'header':
        setNodeHeader(node.el, node.params);
        break;
      case 'mypage':
        setNodeMypage(node.el, node.params);
        break;
      case 'inquiry':
        setNodeInquiry(node.el, node.params);
        break;
      case 'download':
        linkNode(node.el, node.params);
        break;
      default:
      // Actionless tags are possible, for example to make use of docdog event binding (such as isLogin)
      //console.err('[DocDog] Unrecognized or non specified action for the element', node.el);
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
  if (window.Docdog.app1) {
    window.Docdog.app1.logout();
  }
}

function loadCSS() {
  const cssId = 'docdog-lib1-css';
  if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://docdog.g.kuroco-img.app/files/user/docdog-lib/iife/lib1/docdog-lib1.css';
    link.media = 'all';
    head.appendChild(link);
  }
}

export { parseDOM, docdogLink, docdogUnlink, docdogLogout, loadCSS };
