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
    token: Cookies.get('token'),
    mode:'login',
    list:[]
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      Cookies.set('token', token ,{ expires: 1/24 });
    },
    setMode:(state,data) => {
      state.mode = data
    },
    setList:(state,data) => {
      state.mode = data
    },
  },
  actions: {
    setToken ({commit}, token) {
      return new Promise((resolve, reject) => {
        commit('setToken', token)
        resolve()
      })
    },
    //获取权限列表
    getPermission({commit}){
      return new Promise((resolve,reject) =>{
        axios({
          url:'' + sessionStorage.getItem('privId'),
          methods:'get',
          headers:{
            token:sessionStorage.getItem('token'),
            name:sessionStorage.getItem('name')
          }
        }).then((res)=>{
          commit('setList',res.data.cust.privileges[0].children);
          resolve(res.data.cust.privileges[0].children)
          }).catch(()=>{
            reject()
        })
      })
    }
  },
  getters: {
    addRouters: state => state.routerData.addRouters,
    token: state => state.token,
    info: state => state.role.info,
    routers: state => state.routerData.routers,
    logoShow: state => state.layout.logoShow,
    isCollapse: state => state.layout.isCollapse,
    uniquerouter: state => state.layout.uniquerouter,
    tabnavBox: state => state.layout.tabnavBox,
    visible: state => state.layout.visible,
    left: state => state.layout.left,
    top: state => state.layout.top,
    rightNav: state => state.layout.rightNav,
  },
  modules: {
    routerData,
    role,
    layout
  },
})

export default store
