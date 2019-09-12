const config = {
  name:'张三',
  age:'13',
  url:'http://192.168.1.5:8081'
}

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
 config
}
