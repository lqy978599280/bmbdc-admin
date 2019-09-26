import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import routerData from './modules/routerData'
import role from './modules/role'
import layout from './modules/layout/index'
import Axios from  'axios'
const  axios = Axios.create();
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: Cookies.get('token')
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      Cookies.set('token', token ,{ expires: 1/24 });
    },
    login_out(state){
      state.token = ''
    }
  },
  actions: {
    setToken ({commit}, token) {
      return new Promise((resolve, reject) => {
        commit('setToken', token)
        resolve()
      })
    },

  },
  getters: {
    addRouters: state => state.routerData.addRouters,
    token: state => state.token,
    info: state => state.role.info,
    routers: state => state.routerData.routers,
    tabnavBox: state => state.layout.tabnavBox,
  },
  modules: {
    routerData,
    role,
    layout
  },
})

export default store
