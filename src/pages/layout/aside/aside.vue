<template>

  <el-aside id="asideNav" width="210px">
    <div class="logo-name">
<!--      <p v-if="$store.getters.logoShow">XU</p>-->
      <p ><img src="../../../assets/logo.png" alt="logo"></p>
    </div>
    <el-menu
             :default-active.prevent="$route.path"
             class="el-menu-vertical-demo"
             background-color="rgba(27, 97, 106, 0.6)"
             text-color="rgba(255, 255, 255, 0.85)"
             active-text-color="#eab261"
             router
             :unique-opened = true

             :collapse-transition="true"
    >
      <template v-for="(item,index) in this.$store.getters.routers" v-if="!item.hidden">
        <el-submenu v-if="!item.alone && item.children.length>0" :index="index+''">
          <template slot="title">
            <i :class="item.iconCls?item.iconCls:''"></i>
            <span slot="title">{{ item.name}}</span>
          </template>

          <menu-tree :menuData="item.children"></menu-tree>

        </el-submenu>
        <el-menu-item :index="item.path" v-else>
          <i :class="item.iconCls?item.iconCls:''"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>

    </el-menu>


  </el-aside>

</template>

<script>
    import menuTree from './menuTree'

    export default {
        name: 'asideNav',
        components: {
          menuTree,
        },
        watch: {
            // 监听浏览器直接输入路由，将此路由添加到tabnavBox
            '$route.path': function (val) {
                this.selectmenu(val)
            }
        },
          // methods: {
          //   selectmenu (key) {
          //       let router = this.$store.getters.routers
          //       let name = this.$route.name
          //       // let navTitle = function (path, routerARR) {
          //       //     for (let i = 0; i < routerARR.length; i++) {
          //       //         if (routerARR[i].children.length > 0 || routerARR[i].path === path) {
          //       //             if (routerARR[i].path === path && routerARR[i].children.length < 1) {
          //       //                 name = routerARR[i].name
          //       //                 break
          //       //             }
          //       //             navTitle(path, routerARR[i].children)
          //       //         }
          //       //     }
          //       //     return name
          //       // }
          //       this.$store.dispatch('addTab', {
          //           title: name,
          //           path: key
          //       })
          //   }
          // }

        methods: {
            selectmenu (key) {
                let router = this.$store.getters.routers
                let name = ''
                let navTitle = function (path, routerARR) {
                    for (let i = 0; i < routerARR.length; i++) {
                        if (routerARR[i].children.length > 0 || routerARR[i].path === path) {
                            if (routerARR[i].path === path && routerARR[i].children.length < 1) {
                                name = routerARR[i].name
                                break
                            }
                            navTitle(path, routerARR[i].children)
                        }
                    }
                    return name
                }
                this.$store.dispatch('addTab', {
                    title: navTitle(key, router),
                    path: key
                })
            }
        }
    }
</script>

<style scoped>
  @import url("//unpkg.com/element-ui@2.0.11/lib/theme-chalk/index.css");

  .el-aside {

    text-align: left;

  }

  .el-aside::-webkit-scrollbar {
    width: 0;
  }

  .el-aside::-webkit-scrollbar-thumb {
    background-color: rgba(230, 230, 230, 0.85);
    border-radius: 3px;
  }

  .logo-name {
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color:rgba(27, 97, 106,0.8);
    box-shadow:10px 10px 20px  rgba(30, 100, 110,0.6) ;
  }

  .el-menu-vertical-demo {

    width: 100%;

  }

  .el-menu {
    border-right: 0;
  }
  i{
    font-size: 16px;
    margin-right: 5px;
  }
  .sec{
    padding-left: 60px!important;
  }
</style>
