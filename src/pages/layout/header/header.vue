<template>
  <div class="layout">
    <tabNav class="left"></tabNav>
    <div class="right">

      <el-dropdown  @command="handleCommand">
      <span class="el-dropdown-link">
         <i class="fa fa-user-o"></i>
        {{name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personInformation">个人中心</el-dropdown-item>
          <el-dropdown-item command="changePass">修改密码</el-dropdown-item>
          <el-dropdown-item command="login">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!--      <el-menu-->
      <!--        :default-active="activeIndex"-->
      <!--        class="el-menu-demo"-->
      <!--        mode="horizontal"-->
      <!--        background-color="#eee"-->
      <!--        style='height:40px!important;'-->
      <!--        @select="handleSelect">-->

      <!--        <el-submenu index="1" style='height:40px!important;'>-->
      <!--&lt;!&ndash;          <div slot="title">&ndash;&gt;-->
      <!--&lt;!&ndash;            <i class="my-iconcount"></i>&ndash;&gt;-->
      <!--&lt;!&ndash;            {{name}}&ndash;&gt;-->
      <!--&lt;!&ndash;          </div>&ndash;&gt;-->
      <!--          <el-menu-item index="1-1">个人中心</el-menu-item>-->
      <!--          <el-menu-item index="1-2">修改密码</el-menu-item>-->
      <!--          <el-menu-item index="1-3" @click="lout">退出</el-menu-item>-->
      <!--        </el-submenu>-->

      <!--      </el-menu>-->
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
                name: "管理员"
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleCommand(command){
                this.$router.push('/'+command)
            }
        }
    }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;

  }

  li {
    list-style: none;
  }

  .el-dropdown-link {
    margin: 10px;
    cursor: pointer;
  }
  .el-dropdown-menu__item{
    padding: 0 15px;
    border-radius: 5px;
  }
  .right {
    margin-right: 5px;
    float: right;
  }

  .el-menu-item {
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
