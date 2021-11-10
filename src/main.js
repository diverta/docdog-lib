import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

window.addEventListener('load', function () {
  //const tags = document.evaluate(
  //  '//*[@*[starts-with(name(), "data-docdog-")]]',
  //  document,
  //  null,
  //  XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
  //  null
  //);
  const node_params_list = [];
  document.querySelectorAll('[data-docdog]').forEach((node) => {
    const params = node
      .getAttribute('data-docdog')
      .split(',')
      .reduce((carry, keyval) => {
        let [k, v] = keyval.split(':');
        if (v === undefined) {
          v = true; // Key-only is a flag
        }
        return { ...carry, [k]: v };
      }, {});
    node_params_list.push({ node, params });
  });

  if (node_params_list.length > 0) {
    const docdogAppDiv = document.createElement('div');
    docdogAppDiv.classList.add('docdog-container');
    document.body.appendChild(docdogAppDiv);
    createApp(App, { node_params_list }).mount(docdogAppDiv);
  }
});
