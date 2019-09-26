export default {
  state: {
    isCollapse: false,
    logoShow: false,
    uniquerouter: true,
    rightNav: {},
    tabnavBox: [
      {
        title: '首页',
        path: '/index'
      }, {
        title: '角色管理',
        path: '/roles'
      }, {
        title: '用户管理',
        path: '/users'
      }
    ]
  },
  mutations: {
    addTab(state, arg) {
      state.isActive = arg.path
      for (let i = 0; i < state.tabnavBox.length; i++) {
        if (state.tabnavBox[i].path === arg.path) {
          return false
        }
      }
      state.tabnavBox.push({
        title: arg.title,
        path: arg.path
      })
    },
    removeTab(state, arg) {
      let index = state.tabnavBox.findIndex(function (value, key) {
        return value.path === arg.tabItem.path
      })
      state.tabnavBox.splice(index, 1)
      if (arg.tabItem.path === arg.fullPath) {
        let tabActive = state.tabnavBox[index] || state.tabnavBox[index - 1]
        arg.router.push(tabActive.path)
      }
    },
  },
  actions: {
    addTab({commit}, arg) {
      commit('addTab', arg)
    },

    removeTab({commit}, arg) {
      commit('removeTab', arg)
    },

  }
}
