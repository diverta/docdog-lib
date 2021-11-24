import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import _ from 'lodash';

axios.defaults.headers.post['Content-Type'] = 'application/json';

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

const initDocdogApp = _.once((node_params_list) => {
  console.log('Initting DocDog App');

  const docdogAppDiv = document.createElement('div');
  docdogAppDiv.classList.add('docdog-container');
  document.body.appendChild(docdogAppDiv);
  createApp(App, { node_params_list }).mount(docdogAppDiv);
});

function parseDOM() {
  //const tags = document.evaluate(
  //  '//*[@*[starts-with(name(), "data-docdog-")]]',
  //  document,
  //  null,
  //  XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
  //  null
  //);
  const node_params_list = [];
  document.querySelectorAll('[data-docdog]').forEach((node) => {
    const params = parseConfig(node.getAttribute('data-docdog'));

    node_params_list.push({ node, params });
  });

  if (node_params_list.length > 0) {
    initDocdogApp(node_params_list);
  }
}

function docdog(node, params) {
  initDocdogApp([{ node, params: parseConfig(params) }]);
}

export { parseDOM, docdog };
