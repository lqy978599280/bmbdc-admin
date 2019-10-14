/**
 * 全局变量
 * @type {{url: string}}
 */
const config = {
  url:'http://192.168.1.9:8081'
}//    url:'http://testadmin.api.bmbdc.com'
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

let bindToGlobal = (obj, key) => {
  if (typeof window[key] === 'undefined') {
    window[key] = {};
  }

  for (let i in obj) {
    window[key][i] = obj[i]
  }
}
// bindToGlobal(config,'_const')
export default {
 config,delay
}
