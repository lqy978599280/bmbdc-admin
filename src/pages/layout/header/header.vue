<template>
  <div class="layout">
    <tabNav class="left"></tabNav>
    <div class="right">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#eee"
        height="40px"
        @select="handleSelect">

        <el-submenu index="1">
          <template slot="title">
            <i class="my-iconcount"></i>
            {{name}}
          </template>
          <el-menu-item index="1-1">个人中心</el-menu-item>
          <el-menu-item index="1-2">修改密码</el-menu-item>
          <el-menu-item index="1-3" @click="lout">退出</el-menu-item>
        </el-submenu>

      </el-menu>
    </div>
  </div>
</template>

<script>
    import tabNav from "./tabNav";

    export default {
        name: "Header",
        components: {
            tabNav
        },
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                name:"管理员"
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            lout(){
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;

  }
  li {
    list-style: none;
  }

  .right {
    margin-right: 5px;
    float: right;
  }

  .el-menu-item{
    padding: 0 10px;
  }
  /*.layout{*/
  /*  display: flex;*/
  /*  justify-content: space-between;*/
  /*  align-items: center;*/
  /*}*/
  .left {

    max-width: 800px;
    float: left;
  }

</style>
