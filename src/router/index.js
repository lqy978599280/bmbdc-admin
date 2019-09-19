import Vue from 'vue'
import Router from 'vue-router'
import CommerViews from '@/pages/commerViews'
import menus from "../pages/system/menus";
import Login from '@/pages/login/index'
import Layout from '@/pages/layout/layout'
import HomeMain from '@/pages/index/mainIndex'

import layout from "../pages/layout/layout";
import commerViews from "../pages/commerViews";
import houseRes from "../pages/houseRes/houseRes";

const Icon = () => import('@/pages/icon/index')
const Upload = () => import('@/pages/upload/upload')
const NotFound = () => import('@/page404')
const roles = () => import('@/pages/system/roles')
const depts = () => import('@/pages/system/depts')
const sysconfigs = () => import('@/pages/system/sysconfigs')
const syslogs = () => import('@/pages/system/syslogs')
const messages = () => import('@/pages/system/messages')
const system = () => import('@/pages/system/system')
const users = () => import('@/pages/system/users')
const forgetpassword = () => import('@/pages/login/forgetpassword')
const headClass = () => import('@/pages/headMessage/headClass')
const headInformation = () => import('@/pages/headMessage/headInformation')
const flyList = () => import('@/pages/fly/flyList')
const flyManagement = () => import('@/pages/fly/flyManagement')
const overallViewManagement = () => import('@/pages/overallView/overallViewManagement')
const overallViewList = () => import('@/pages/overallView/overallViewList')
const houseWorkersList = () => import('@/pages/houseWorkers/houseWorkersList')
const myHouseList = () => import('@/pages/houseWorkers/myHouseList')
const myMemberList = () => import('@/pages/houseWorkers/myMemberList')
const houseAgentList = () => import('@/pages/houseAgent/houseAgentList')
const block = () => import('@/pages/block')
const member = () => import('@/pages/member')
const village = () => import('@/pages/village')
const houseOrderManage = () => import('@/pages/houseAgent/houseAgentManagement/houseOrderManage')
const moneyOrderManage = () => import('@/pages/houseAgent/houseAgentManagement/moneyOrderManage')
const signOrderManage = () => import('@/pages/houseAgent/houseAgentManagement/signOrderManage')
const bankOrderManage = () => import('@/pages/houseAgent/houseAgentManagement/bankOrderManage')

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
        name: '主页',
        component: HomeMain,
        children: []
      },
      {
        path: '/houseRes',
        name: '房源管理',
        component: houseRes,
        children: []
      },
      {
        path: '/system',
        name: '系统管理',
        component: commerViews,
        children: [
          {
            path: '/menus',
            name: '菜单管理',
            component: menus,
            children: []
          },
          {
            path: '/roles',
            name: '角色管理',
            component: roles,
            children: []
          },
          {
            path: '/users',
            name: '用户管理',
            component: users,
            children: []
          },
          {
            path: '/depts',
            name: '部门管理',
            component: depts,
            children: []
          },
          {
            path: '/sysconfigs',
            name: '系统配置管理',
            component: sysconfigs,
            children: []
          },
          {
            path: '/syslogs',
            name: '登录日志',
            component: syslogs,
            children: []
          },
          {
            path: '/messages',
            name: '消息管理',
            component: messages,
            children: []
          }]
      },
      {
        path: '/headMessage',
        name: '头条管理',
        component: commerViews,
        children: [
          {
            path: '/headClass',
            name: '头条分类信息管理',
            component: headClass,
            children: []
          },
          {
            path: '/headInformation',
            name: '头条信息管理',
            component: headInformation,
            children: []
          },
        ]
      },
      {
        path: '/fly',
        name: '飞手社工管理',
        component: commerViews,
        children: [
          {
            path: '/flyList',
            name: '飞手社工列表',
            component: flyList,
            children: []
          },
          {
            path: '/flyManagement',
            name: '飞手订单管理',
            component: flyManagement,
            children: []
          },
        ]
      },
      {
        path: '/overallView',
        name: '全景社工管理',
        component: commerViews,
        children: [
          {
            path: '/overallViewList',
            name: '全景社工列表',
            component: overallViewList,
            children: []
          },
          {
            path: '/overallViewManagement',
            name: '全景订单管理',
            component: overallViewManagement,
            children: []
          },
        ]
      },
      {
        path: '/houseWorkers',
        name: '房源社工管理',
        component: commerViews,
        children: [
          {
            path: '/houseWorkersList',
            name: '房源社工列表',
            component: houseWorkersList,
            children: []
          },
          {
            path: '/myHouseList',
            name: '我推荐的房源',
            component: myHouseList,
            children: []
          },
          {
            path: '/myMemberList',
            name: '我的推荐',
            component: myMemberList,
            children: []
          },
        ]
      },
      {
        path: '/houseAgent',
        name: '房产经纪人管理',
        component: commerViews,
        children: [
          {
            path: '/houseAgentList',
            name: '房产经纪人列表',
            component: houseAgentList,
            children: []
          },
          {
            path: '/houseAgentManagement',
            name: '房产经纪人订单管理',
            component: commerViews,
            children:
              [


          {
                  path: '/houseOrderManage',
                  name: '带看房订单管理',
                  component: houseOrderManage,
                  children: []
                },
                {
                  path: '/moneyOrderManage',
                  name: '交定金订单管理',
                  component: moneyOrderManage,
                  children: []
                },
                {
                  path: '/signOrderManage',
                  name: '网签过户订单管理',
                  component: signOrderManage,
                  children: []
                },
                {
                  path: '/bankOrderManage',
                  name: '银行按揭订单管理',
                  component: bankOrderManage,
                  children: []
                },
            ]
          },
        ]
      },

      {
        path: '/block',
        name: '区域信息管理',
        component: block,
        children: []
      },
      {
        path: '/member',
        name: '会员信息管理',
        component: member,
        children: []
      },
      {
        path: '/village',
        name: '小区信息管理',
        component: village,
        children: []
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


