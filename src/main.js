// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAMap from "vue-amap";
import config from './global.js'
import delay from './global.js'


Vue.prototype.global = config
Vue.prototype.delay = delay

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '958e3f2fa913bbf403c1f050081b6958',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','Geocoder'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios,axios)


// axios.defaults.baseURL = 'https://api.example.com';
const service = axios.create({
  timeout:5000
})
service.interceptors.request.use(
  config =>{
      if (store.state.user.token) {
        config.headers.Authorization = `token ${store.state.user.token}`;
      }
      return config
  },
  err => {
    return Promise.reject(err)
  }

)
export  default  service


router.beforeEach((to, from, next) => {
  // console.log(store.getters.token)
  // debugger

  if (store.getters.token) {
    store.dispatch('setToken', store.getters.token)
    if (to.path === '/login') {
      next()
    } else {
      if (!store.getters.info.role) {
        !async function getAddRouters () {
          await store.dispatch('getInfo', store.getters.token)
          await store.dispatch('newRoutes', store.getters.info.role)
          console.log(store.getters.addRouters)
          await router.addRoutes(store.getters.addRouters)
          next({path:'/index'})
        }()
      } else {
        let is404 = to.matched.some(record => {
          if(record.meta.role){
            return record.meta.role.indexOf(store.getters.info.role) === -1
          }
        })
        if(is404){
          next({path: '/404'})
          return false
        }
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    }
    next({path: '/login'})

  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
