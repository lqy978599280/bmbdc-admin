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
const adSortManage = () => import('@/pages/ADManage/adSortManage')
const adManage = () => import('@/pages/ADManage/adManage')
const block = () => import('@/pages/block')
const member = () => import('@/pages/member')
const village = () => import('@/pages/village')
const houseOrderManage = () => import('@/pages/houseAgent/houseAgentManagement/houseOrderManage')
const moneyOrderManage = () => import('@/pages/houseAgent/houseAgentManagement/moneyOrderManage')
const signOrderManage = () => import('@/pages/houseAgent/houseAgentManagement/signOrderManage')
const bankOrderManage = () => import('@/pages/houseAgent/houseAgentManagement/bankOrderManage')

Vue.use(Router)

const whiteList = [
  '/'
];
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
export const asyncRouterMap = [
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
        meta:{
          permission:[]
        },
        children: []
      },
      {
        path: '/houseRes',
        name: '房源管理',
        component: houseRes,
        meta:{
          permission:[]
        },
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
            meta:{
              permission:[]
            },
            children: []
          },
          {
            path: '/roles',
            name: '角色管理',
            component: roles,
            meta:{
              permission:[]
            },
            children: []
          },
          {
            path: '/users',
            name: '用户管理',
            component: users,
            meta:{
              permission:[]
            },
            children: []
          },
          {
            path: '/depts',
            name: '部门管理',
            component: depts,
            meta:{
              permission:[]
            },
            children: []
          },
          {
            path: '/sysconfigs',
            name: '系统配置管理',
            component: sysconfigs,
            meta:{
              permission:[]
            },
            children: []
          },
          {
            path: '/syslogs',
            name: '登录日志',
            component: syslogs,
            meta:{
              permission:[]
            },
            children: []
          },
          {
            path: '/messages',
            name: '消息管理',
            component: messages,
            meta:{
              permission:[]
            },
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
            meta:{
              permission:[]
            },
            children: []
          },
          {
            path: '/headInformation',
            name: '头条信息管理',
            component: headInformation,
            meta:{
              permission:[]
            },
            children: []
          },
        ]
      },
      {
        path: '/ADManage',
        name: '广告管理',
        component: commerViews,
        children: [
          {
            path: '/adSortManage',
            name: '广告分类信息管理',
            component: adSortManage,
            meta:{
              permission:[]
            },
            children: []
          },
          {
            path: '/adManage',
            name: '广告信息管理',
            component: adManage,
            meta:{
              permission:[]
            },
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
            meta:{
              permission:[]
            },
            children: []
          },
          {
            path: '/flyManagement',
            name: '飞手订单管理',
            component: flyManagement,
            meta:{
              permission:[]
            },
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
            meta:{
              permission:[]
            },
            children: []
          },
          {
            path: '/overallViewManagement',
            name: '全景订单管理',
            component: overallViewManagement,
            meta:{
              permission:[]
            },
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
            meta:{
              permission:[]
            },
            children: []
          },
          {
            path: '/myHouseList',
            name: '我推荐的房源',
            component: myHouseList,
            meta:{
              permission:[]
            },
            children: []
          },
          {
            path: '/myMemberList',
            name: '我的推荐',
            component: myMemberList,
            meta:{
              permission:[]
            },
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
            meta:{
              permission:[]
            },
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
                  meta:{
                    permission:[]
                  },
                  children: []
                },
                {
                  path: '/moneyOrderManage',
                  name: '交定金订单管理',
                  component: moneyOrderManage,
                  meta:{
                    permission:[]
                  },
                  children: []
                },
                {
                  path: '/signOrderManage',
                  name: '网签过户订单管理',
                  component: signOrderManage,
                  meta:{
                    permission:[]
                  },
                  children: []
                },
                {
                  path: '/bankOrderManage',
                  name: '银行按揭订单管理',
                  component: bankOrderManage,
                  meta:{
                    permission:[]
                  },
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
        meta:{
          permission:[]
        },
        children: []
      },
      {
        path: '/member',
        name: '会员信息管理',
        component: member,
        meta:{
          permission:[]
        },
        children: []
      },
      {
        path: '/village',
        name: '小区信息管理',
        component: village,
        meta:{
          permission:[]
        },
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
]
// 需要 addRouters 动态加载的路由
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

    ]
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
        path: '/ADManage',
        name: '广告管理',
        component: commerViews,
        children: [
          {
            path: '/adSortManage',
            name: '广告分类信息管理',
            component: adSortManage,
            children: []
          },
          {
            path: '/adManage',
            name: '广告信息管理',
            component: adManage,
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
    path: '*',  // 通配符拦截放在最后，不存在的路由全都指向404页面
    redirect: '/404',
    hidden: true,
    children: []
  },

]
export default new Router({
  routes: defaultRouter
})
export {defaultRouter,addRouter}

// function routerMatch(permission,asyncRouter){
//   return new Promise(resolve => {
//     const routers = [];
//     function createRouter(permission) {
//       permission.forEach(item =>{
//         if (item.children &&item.children.length){
//           createRouter(item.children)
//         }
//         let path = item.path;
//         asyncRouter.find(s=>{
//           if(s.path === ''){
//             s.children.find(y=>{
//               if(y.path === path ){
//                 y.meta.permission = item.permission
//                 routers.push(s)
//               }
//             })
//           }
//           if(s.path === path){
//             s.meta.permission = item.permission
//             routers.push(s)
//           }
//         })
//       })
//     }
//     createRouter(permission)
//     resolve([routers])
//   })
// }
// router.beforeEach((to,from,next)=>{
//   if(sessionStorage.getItem('token')){
//     if(to.path === '/'){
//       router.replace('/index')
//     }else {
//       console.log(store.state.list.length);
//       if(store.state.list.length ==0){
//         store.dispatch('getPermission').then(res=>{
//           routerMatch(res,asyncRouterMap).then(res=>{
//             router.addRouters(res[0]);
//             next(to.path)
//           })
//         }).catch(()=>{
//           router.replace('/')
//         })
//       }else {
//         if(to.matched.length){
//           next()
//         }else {
//           router.replace('/')
//         }
//       }
//     }
//   }else{
//     if(whiteList.indexOf(to.path)>=0){
//       next()
//     }else {
//       router.replace('/')
//     }
//   }
// })
