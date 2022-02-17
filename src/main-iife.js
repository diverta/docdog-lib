import { parseDOM } from './lib';

if (document.readyState == 'complete') {
  // DOM already loaded, parse directly
  parseDOM();
} else {
  // Not yet loaded, add a trigger after loading
  window.addEventListener('load', parseDOM);
}
