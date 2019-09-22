<template>
  <div>
    <div class="tabnavBox">
      <transition-group name="list" tag="ul" class="tabnavout">
        <li v-for="(item, index) in $store.getters.tabnavBox"
            :key="item.title" class="tabnav"
            :class="{ active: $route.path === item.path }">
          <router-link :to="item.path" class="link" @click="" >{{item.title}}</router-link>
          <i @click="removeTab(item)" class="el-icon-error" v-if="index!==0"></i>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'tabNav',
        data () {
            return {

            }
        },

        methods: {

            removeTab (tabItem) {
                this.$store.dispatch('removeTab', {tabItem, fullPath: this.$route.fullPath, router: this.$router})
            }
        }

    }
</script>

<style  scoped>
  .tabnavout{
    max-width: 800px;
    overflow-y: scroll;
    height: 60px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    /*border-right: 1px solid rgb(216, 220, 229);*/
  }
  .tabnavout::-webkit-scrollbar{
    width: 0;
    height: 5px;
  }
  .tabnavout::-webkit-scrollbar-thumb {
     background-color: rgba(100, 100, 100, 0.75);
     border-radius: 3px;
   }
  .tabnav{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    line-height: 35px;
    text-align: center;
    list-style: none;
    border: 1px solid rgb(216, 220, 229);
    margin: 0 3px ;
    padding:0 10px;
    transition: 0.1s;
  }
  .link{
    text-decoration:none;
    color: rgba(80, 80, 80,0.8);
    font-size: 13px ;
    font-weight: 600;
  }

  .active{
    background-color:  #409eff;
    transition: 0.1s;
  }
  .active >.link{
    color: white;
  }
  .active > i{
    color: white;
  }
  .tabnav>i{
    font-size: 12px;
    padding-left: 10px;
  }
  .tabnav>i:hover{
    cursor: pointer;
    color: red;
  }
</style>
