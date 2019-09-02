<template>
  <div id="loyout">
    <el-container>
      <layoutAside></layoutAside>
      <el-container>
        <layoutHeader></layoutHeader>
        <el-main id="elmain">
          <transition name="main" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
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
      Bottom,
      langSelect,
      layoutAside
    },
    created () {
      this.$router.push('/index')
    }
  }
</script>


<style scoped lang="scss">
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



</style>
