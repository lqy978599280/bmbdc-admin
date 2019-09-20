import Vue from 'vue'
import App from '../App'
import router, {asyncRouterMap} from './index'

router.beforeEach((to,from,next)=>{
  if(sessionStorage.getItem('token')){
    if(to.path === '/'){
      router.replace('/index')
    }else {
      console.log(store.state.list.length);
      if(store.state.list.length ==0){
        store.dispatch('getPermission').then(res=>{
          routerMatch(res,asyncRouterMap).then(res=>{
            router.addRouters(res[0]);
            next(to.path)
          })
        }).catch(()=>{
          router.replace('/')
        })
      }else {
        if(to.matched.length){
          next()
        }else {
          router.replace('/')
        }
      }
    }
  }else{
    if(whiteList.indexOf(to.path)>=0){
      next()
    }else {
      router.replace('/')
    }
  }
})

function routerMatch(permission,asyncRouter){
  return new Promise(resolve => {
    const routers = [];
    function createRouter(permission) {
      permission.forEach(item =>{
        if (item.children &&item.children.length){
          createRouter(item.children)
        }
        let path = item.path;
        asyncRouter.find(s=>{
          if(s.path === ''){
            s.children.find(y=>{
              if(y.path === path ){
                y.meta.permission = item.permission
                routers.push(s)
              }
            })
          }
          if(s.path === path){
            s.meta.permission = item.permission
            routers.push(s)
          }
        })
      })
    }
    createRouter(permission)
    resolve([routers])
  })
}
