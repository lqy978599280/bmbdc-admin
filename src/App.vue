<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>


  *{
    margin: 0;
    padding: 0;
  }
  @font-face {
    font-family: 'PF';
    src: url("./common/font-family/FZCYJ.ttf");
  }
#app {
  font-family:  PF,sans-serif;
  font-size: 13px;
  font-weight: bolder;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: 1px;
  color: #2c3e50;
}
</style>
