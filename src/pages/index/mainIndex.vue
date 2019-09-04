<template>
  <div>
    <div class="main-top">
      <el-input type="text" placeholder="菜单管理"  v-model="search"></el-input>
      <el-button class="search">搜索</el-button>
      <el-button class="add">添加</el-button>
    </div>
    <el-table
      :data="tableData"
    >

      <singleMenu :data="this.tableData[0]"></singleMenu>
      <singleMenu :data="this.tableData[1]"></singleMenu>
      <singleMenu :data="this.tableData[2]"></singleMenu>
      <singleMenu :data="this.tableData[3]"></singleMenu>
      <singleMenu :data="this.tableData[4]"></singleMenu>
      <singleMenu :data="this.tableData[5]"></singleMenu>


      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


</template>


<script>
    import singleMenu from "../../components/singleMenu";

    export default {
        components: {
            singleMenu
        },
        data() {
            return {
                search:'',
                tableData: [
                    {
                        label: '菜单名称',
                        width: '110',
                        type: 'menu',
                        menu: '首页',
                        code: 'index',
                        fa_code: "",
                        path: "",
                        menuif: "是",
                        status:"启用"
                    },
                    {
                        label: '菜单编码',
                        width: '110',
                        type: 'code',
                        menu: '系统管理',
                        code: 'system',
                        fa_code: "0",
                        path: "#",
                        menuif: "是",
                        status:"启用"

                    },
                    {
                        label: '父级菜单编码',
                        width: '110',
                        type: 'fa_code',
                        menu: '菜单管理',
                        code: 'menus',
                        fa_code: "system",
                        path: "/menu",
                        menuif: "是",
                        status:"启用"
                    },
                    {
                        label: '请求地址',
                        width: '110',
                        type: 'path',
                        menu: '角色管理',
                        code: 'roles',
                        fa_code: "system",
                        path: "/roles",
                        menuif: "是",
                        status:"启用"
                    },
                    {
                        label: '是否菜单',
                        width: '110',
                        type: 'menuif',
                        menu: '部门管理',
                        code: 'depts',
                        fa_code: "system",
                        path: "/depts",
                        menuif: "是",
                        status:"启用"
                    },
                    {
                        label: '状态',
                        width: '110',
                        type: 'status',
                        menu: '字典管理',
                        code: 'sysconfigs',
                        fa_code: "system",
                        path: "/sysconfigs",
                        menuif: "是",
                        status:"启用"
                    },
                    {

                        menu: '登录日志',
                        code: 'syslogs',
                        fa_code: "system",
                        path: "/syslogs",
                        menuif: "是",
                        status:"启用"
                    },
                    {

                        menu: '消息管理',
                        code: 'messages',
                        fa_code: "system",
                        path: "/messages",
                        menuif: "是",
                        status:"启用"
                    }]
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
                console.log(this.$route.path);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        }
    }
</script>


<style scoped >
  @import url("//unpkg.com/element-ui@2.0.11/lib/theme-chalk/index.css");

  /*.box {*/
  /*  width: 90%;*/
  /*  height: 90%;*/
  /*  display: flex;*/
  /*  justify-content: center;*/
  /*}*/
  .main-top{
    display: flex;
    justify-self: left;
    padding-bottom: 10px;
    background-color: #f2f2f2;
  }

   .el-input{
     width: 200px ;
     margin-right: 20px;
     border-radius: 5px;
     background: #fff;
     -webkit-box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
     box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
     border-color: rgba(0, 0, 0, 0.2);

   }
   .main-top>.el-button{
     background: #fff;
     -webkit-box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
     box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
     border-color: rgba(0, 0, 0, 0.2);
   }
  .el-table {
    border:1px solid gainsboro;
    padding: 10px;
    border-radius: 10px;
    border-bottom: 0;
    /*-moz-box-shadow:10px 8px 7px #666075;*/
    /*-webkit-box-shadow:10px 8px 20px #666075;*/
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
  .el-table ::-webkit-scrollbar {

    width: 10px;
    height:7px;
  }
  .el-table ::-webkit-scrollbar-thumb {
    background-color: rgba(100, 100, 100, 0.75);
    border-radius: 3px;
  }
</style>
