<template>
  <div id="loyout">
    <el-container>
      <layoutAside width="160px"></layoutAside>
      <el-container>
        <el-header>
          <layoutHeader></layoutHeader>
        </el-header>
        <el-main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import layoutAside from './aside/aside'
  import layoutHeader from './header/header'
  export default {
    name: 'dc-home',
    components: {
      layoutHeader,
    //   langSelect,
      layoutAside
    },
    // created () {
    //   this.$router.push('/index')
    // }
  }
</script>


<style scoped >

  * {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #f2f2f2;
    font-size: 14px;
    color: #333333;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }

  .el-header {

    background-color: #fff;
    color: #333;
    line-height: 60px ;
    padding-left: 0;
    padding-right: 0;

  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    float: left;
  }

  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }




</style>
