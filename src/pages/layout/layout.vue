<template>
  <div id="loyout">
    <el-container>
      <layoutAside width="160px"></layoutAside>
      <el-container>
        <el-header>
          <layoutHeader></layoutHeader>
        </el-header>
        <el-main>    <router-view/></el-main>
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

    background-color:#e9f1e7;
    color: #333;
    line-height: 50px ;
    height:60px!important;
    padding-left: 0;
    padding-right: 0;
    border-bottom: 1px solid rgb(216, 220, 229);
    box-shadow:10px 10px 20px  rgba(30, 100, 110,0.6) ;

  }

  /*.el-aside {*/
  /*  background-color: #D3DCE6;*/
  /*  color: #333;*/
  /*  text-align: center;*/
  /*}*/
  .el-container{
    height: 100vh;
  }
  .el-main {
    background-color: #e9f1e7;
    color: #333;
    max-height: 100vh;
    box-shadow:10px 10px 20px  rgba(30, 100, 110,0.6) ;

    /*margin-top:10px ;*/
    /*border-top: 1px solid gainsboro;*/
    /*border-left: 1px solid gainsboro;*/
  }
  .el-main::-webkit-scrollbar {
    width: 5px;
  }

  .el-main::-webkit-scrollbar-thumb {
    background-color: rgba(100, 100, 100, 0.75);
    border-radius: 3px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }




</style>
