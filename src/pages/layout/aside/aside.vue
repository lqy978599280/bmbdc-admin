<template>

  <el-aside id="asideNav" width="210px">
    <div class="logo-name">
      <p v-if="$store.getters.logoShow">XU</p>
      <p v-else><img src="../../../assets/logo.png" alt="logo"></p>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#fff"
      text-color="rgba(0, 0, 0, 0.7)"
      router
    >
      <el-menu-item index="index">
          <i class="fa fa-eercast"></i>
          <span slot="title">首页</span>


      </el-menu-item>
      <el-submenu index="system">
        <template slot="title">
          <i class="fa fa-cog fa-2x"></i>
          <span >系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="menus" >菜单管理</el-menu-item>
          <el-menu-item index="roles" >角色管理</el-menu-item>
          <el-menu-item index="users">用户管理</el-menu-item>
          <el-menu-item index="depts">部门管理</el-menu-item>
          <el-menu-item index="sysconfigs">字典管理</el-menu-item>
          <el-menu-item index="syslogs">登录日志</el-menu-item>
          <el-menu-item index="messages">消息管理</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-home fa-2x"></i>
          <span >房源管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">二手房列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="fa fa-map-signs "></i>
          <span >小区信息管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">小区列表</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="fa fa-drivers-license"></i>
          <span >会员信息管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">会员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">
          <i class="fa fa-tachometer"></i>
          <span >广告信息管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">广告位置列表</el-menu-item>
          <el-menu-item index="5-2">广告列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="7">
        <template slot="title">
          <i class="fa fa-paper-plane"></i>
          <span >飞手社工管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="6-1">飞手社工列表</el-menu-item>
          <el-menu-item index="6-2">申请列表</el-menu-item>
          <el-menu-item index="6-3">订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="8">
        <template slot="title">
          <i class="fa fa-leaf"></i>
          <span >全景社工管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="7-1">全景社工列表</el-menu-item>
          <el-menu-item index="7-2">申请列表</el-menu-item>
          <el-menu-item index="7-3">订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="9">
      <template slot="title">
        <i class="fa fa-university"></i>
        <span >房源社工管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="8-1">房源社工列表</el-menu-item>
        <el-menu-item index="8-2">申请列表</el-menu-item>
        <el-menu-item index="8-3">订单列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

      <el-submenu index="10">
        <template slot="title">
          <i class="fa fa-users"></i>
          <span >房产经纪人管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="9-1">房产经纪人列表</el-menu-item>
          <el-menu-item index="9-2">申请列表</el-menu-item>
          <el-menu-item index="9-3">订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>

</template>

<script>
    import menuTree from './menuTree'

    export default {
        name: 'asideNav',
        // components: {
        //   menuTree,
        // },
        watch: {
            // 监听浏览器直接输入路由，将此路由添加到tabnavBox
            '$route.path': function (val) {
                this.selectmenu(val)
            }
        },
          methods: {
            selectmenu (key) {
                let router = this.$store.getters.routers
                let name = this.$route.name
                // let navTitle = function (path, routerARR) {
                //     for (let i = 0; i < routerARR.length; i++) {
                //         if (routerARR[i].children.length > 0 || routerARR[i].path === path) {
                //             if (routerARR[i].path === path && routerARR[i].children.length < 1) {
                //                 name = routerARR[i].name
                //                 break
                //             }
                //             navTitle(path, routerARR[i].children)
                //         }
                //     }
                //     return name
                // }
                this.$store.dispatch('addTab', {
                    title: name,
                    path: key
                })
            }
          }

    }
</script>

<style scoped>
  @import url("//unpkg.com/element-ui@2.0.11/lib/theme-chalk/index.css");

  .el-aside {
    background-color:#fff ;
    color: #333;
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
    background-color: #fff;
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
</style>
