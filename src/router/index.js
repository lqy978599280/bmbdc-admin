import Vue from 'vue'
import Router from 'vue-router'
import CommerViews from '@/pages/commerViews'
import Login from '@/pages/login/index'
import Layout from '@/pages/layout/layout'
import HomeMain from '@/pages/index/mainIndex'

const Icon = () => import('@/pages/icon/index')
const Upload = () => import('@/pages/upload/upload')
const Markdown = () => import('@/pages/markdown/markdownView')
const NotFound = () => import('@/page404')



Vue.use(Router)
let routeName
let defaultRouter = [
  { path: '/',
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
    path: '/index',
    iconCls: 'fa fa-dashboard', // 菜单图标，直接填写字体图标的 class
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
      }
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
// let addRouter = [
//   {
//     path: '/',
//     iconCls: 'fa fa-server',
//     name: routeName.multiDirectory,
//     component: Layout,
//     children: [
//       {
//         path: '/erji1',
//         iconCls: 'fa fa-server',
//         name: routeName['menu2-1'],
//         component: Erji,
//         children: []
//       },
//       {
//         path: '/erji3',
//         iconCls: 'fa fa-server',
//         name: routeName['menu2-3'],
//         component: CommerViews, // 无限极菜单的容器 超过三级菜单父级容器需要使用 CommerViews
//         children: [
//           {
//             path: '/sanji2',
//             iconCls: 'fa fa-server',
//             name: routeName['menu3-2'],
//             component: Sanji2,
//             children: []
//           },
//           {
//             path: '/sanji3',
//             iconCls: 'fa fa-server',
//             name: routeName['menu3-3'],
//             component: CommerViews,
//             children: [
//               {
//                 path: '/siji',
//                 iconCls: 'fa fa-server',
//                 name: routeName['menu4-1'],
//                 component: Siji,
//                 children: []
//               },
//               {
//                 path: '/siji1',
//                 iconCls: 'fa fa-server',
//                 name: routeName['menu4-2'],
//                 component: CommerViews,
//                 children: [
//                   {
//                     path: '/wuji',
//                     iconCls: 'fa fa-server',
//                     name: routeName['menu5-1'],
//                     component: Wuji,
//                     children: []
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   },
//
//   {
//     path: '/',
//     iconCls: 'el-icon-edit', // 图标样式class
//     name: routeName.editor,
//     component: Layout,
//     meta: {role: ['superAdmin', 'admin']}, // 需要权限 'superAdmin', 'admin'。meta属性可以放在父级，验证父级和所有子菜单，也可以放在子级单独验证某一个子菜单
//     children: [
//       {
//         path: '/markdown',
//         iconCls: 'fa fa-file-code-o', // 图标样式class
//         name: routeName.markdown,
//         component: Markdown,
//         children: []
//       }
//     ]
//   },
//   { path: '*',  // 通配符拦截放在最后，不存在的路由全都指向404页面
//     redirect: '/404',
//     hidden: true,
//     children: []
//   },
//
// ]
export default new Router({
  routes: defaultRouter
})
export {defaultRouter, addRouter}


