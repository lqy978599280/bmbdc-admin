import Vue from 'vue'
import Router from 'vue-router'
import CommerViews from '@/pages/commerViews'
import menus from "../pages/system/menus";
import Login from '@/pages/login/index'
import Layout from '@/pages/layout/layout'
import HomeMain from '@/pages/index/mainIndex'

import layout from "../pages/layout/layout";
import commerViews from "../pages/commerViews";


const Icon = () => import('@/pages/icon/index')
const Upload = () => import('@/pages/upload/upload')
const NotFound = () => import('@/page404')
const roles = ()=> import('@/pages/system/roles')
const depts = ()=> import('@/pages/system/depts')
const sysconfigs = ()=> import('@/pages/system/sysconfigs')
const syslogs = ()=> import('@/pages/system/syslogs')
const messages = ()=> import('@/pages/system/messages')
const system = ()=> import('@/pages/system/system')
const users = ()=> import('@/pages/system/users')
const forgetpassword = ()=>import('@/pages/login/forgetpassword')


Vue.use(Router)
let routeName

let defaultRouter = [
  {
    path: '/',
    redirect: '/login',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/passwordforget',
    component: forgetpassword,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/index',
    name: "home",
    component: Layout,
    alone: true,
    children: [
      {
        path: '/index',
        iconCls: 'fa fa-dashboard',
        name: '主页',
        component: HomeMain,
        children: []
      },
      {
        path: '/system',
        iconCls: 'fa fa-dashboard',
        name: '系统管理',
        component: system,
        children: [
          {
            path: '/menus',
            iconCls: 'fa fa-dashboard',
            name: '菜单管理',
            component: menus,
            children: []
          },
          {
            path: '/roles',
            iconCls: 'fa fa-dashboard',
            name: '角色管理',
            component: roles,
            children: []
          },
          {
            path: '/users',
            iconCls: 'fa fa-dashboard',
            name: '用户管理',
            component: users,
            children: []
          },
          {
            path: '/depts',
            iconCls: 'fa fa-dashboard',
            name: '部门管理',
            component: depts,
            children: []
          },
          {
            path: '/sysconfigs',
            iconCls: 'fa fa-dashboard',
            name: '字典管理',
            component: sysconfigs,
            children: []
          },
          {
            path: '/syslogs',
            iconCls: 'fa fa-dashboard',
            name: '登录日志',
            component: syslogs,
            children: []
          },
          {
            path: '/messages',
            iconCls: 'fa fa-dashboard',
            name: '消息管理',
            component: messages,
            children: []
          }]
      },

    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true,
    children: []
  },
  // {
  //   path:'*',
  //   redirect:"index"
  // }
]

//需要 addRouters 动态加载的路由
let addRouter = [
  {
    path: '/',
    name: '',
    component: Layout,
    children: [
      {
        path: '/system',
        name: '',
        component: system,
        children: []
      },
      // {
      //   path: '/erji3',
      //   iconCls: 'fa fa-server',
      //   name: routeName['menu2-3'],
      //   component: CommerViews, // 无限极菜单的容器 超过三级菜单父级容器需要使用 CommerViews
      //   children: [
      //     {
      //       path: '/sanji2',
      //       iconCls: 'fa fa-server',
      //       name: routeName['menu3-2'],
      //       component: Sanji2,
      //       children: []
      //     },
      //     {
      //       path: '/sanji3',
      //       iconCls: 'fa fa-server',
      //       name: routeName['menu3-3'],
      //       component: CommerViews,
      //       children: [
      //         {
      //           path: '/siji',
      //           iconCls: 'fa fa-server',
      //           name: routeName['menu4-1'],
      //           component: Siji,
      //           children: []
      //         },
      //         {
      //           path: '/siji1',
      //           iconCls: 'fa fa-server',
      //           name: routeName['menu4-2'],
      //           component: CommerViews,
      //           children: [
      //             {
      //               path: '/wuji',
      //               iconCls: 'fa fa-server',
      //               name: routeName['menu5-1'],
      //               component: Wuji,
      //               children: []
      //             }
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  },

  {
    path: '/',
    iconCls: 'el-icon-edit', // 图标样式class
    name: '',
    component: Layout,
    meta: {role: ['superAdmin', 'admin']}, // 需要权限 'superAdmin', 'admin'。meta属性可以放在父级，验证父级和所有子菜单，也可以放在子级单独验证某一个子菜单
    children: [
      {
        path: '/markdown',
        iconCls: 'fa fa-file-code-o', // 图标样式class
        name: '',
        component: layout,
        children: []
      }
    ]
  },
  {
    path: '*',  // 通配符拦截放在最后，不存在的路由全都指向404页面
    redirect: '/404',
    hidden: true,
    children: []
  },

]
export default new Router({
  routes: defaultRouter
})
export {defaultRouter, addRouter}


