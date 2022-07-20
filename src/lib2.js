import { createApp } from 'vue';
import App from './App2.vue';
import _ from 'lodash';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

if (window.Docdog === undefined) {
  window.Docdog = {
    app2: null,
  };
}

function processNodeParams(node, params) {
  if (window.Docdog.app2) {
    window.Docdog.app2.processNodeParams(node, params);
  }
}

function setNodeList(node, params) {
  if (window.Docdog.app2) {
    window.Docdog.app2.setNodeList(node, params);
  }
}

function parseDOM() {
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
      case 'list':
        setNodeList(node.el, node.params);
        break;
      default:
      // Actionless tags are possible, for example to make use of docdog event binding (such as isLogin)
      //console.err('[DocDog] Unrecognized or non specified action for the element', node.el);
    }
  });
}

const initApp = _.once((el) => {
  if (window.Docdog.app2 == null) {
    // Even if the lib is loaded multiple times, ensure app init only once

    let docdogAppDiv = null;
    if (el) {
      docdogAppDiv = el;
    } else {
      docdogAppDiv = document.createElement('div');
      docdogAppDiv.classList.add('docdog-container');
      document.body.appendChild(docdogAppDiv);
    }
    //docdogAppDiv.style.display = "none"; // Prevent flickering during loading
    window.Docdog.el = docdogAppDiv;
    window.Docdog.app2 = createApp(App).mount(docdogAppDiv);
  }
});

function loadCSS() {
  const cssId = 'docdog-lib1-css';
  if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://docdog.g.kuroco-img.app/files/user/docdog-lib/iife/lib2/docdog-lib2.css';
    link.media = 'all';
    head.appendChild(link);
  }
}

export { parseDOM, initApp };
