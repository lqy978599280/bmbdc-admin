<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="菜单管理"  v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>
      <el-button class="add bgc" @click="dialogadd=true">添 加</el-button>
      <menuEdit :data="form" :dialogFormVisible="dialogadd" @dialogcommit="dialogcommit" @getdialogfv="getdialogfv" :name="name[0]"></menuEdit>
      <menuEdit :data="tableData[index]" :dialogFormVisible="dialogedit" @dialogcommit="dialogeditcommit" @getdialogfv="getdialogfv" :name="name[1]"></menuEdit>
    </div>
    <el-table
      class="bgc"
      :data="tableData"
    >

      <singleMenu :data="this.tableData[0]" :coltype="this.columntype[0]"></singleMenu>
      <singleMenu :data="this.tableData[1]" :coltype="this.columntype[1]"></singleMenu>
      <singleMenu :data="this.tableData[2]" :coltype="this.columntype[2]"></singleMenu>
      <singleMenu :data="this.tableData[3]" :coltype="this.columntype[3]"></singleMenu>
      <singleMenu :data="this.tableData[4]" :coltype="this.columntype[4]"></singleMenu>
      <singleMenu :data="this.tableData[5]" :coltype="this.columntype[5]"></singleMenu>


      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)">编 辑
          </el-button>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删 除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


</template>


<script>
    import singleMenu from "../../components/singleMenu";
    import menuEdit from "../../components/menuEdit";

    export default {
        components: {
            singleMenu,
            menuEdit
        },
        data() {
            return {
                search:'',
                index:0,
                name:["添加菜单","编辑菜单"],
                columntype:[
                  {
                    label: '菜单名称',
                    width: '110',
                    type: 'menuname',
                  },
                  { label: '菜单编码',
                    width: '110',
                    type: 'code',
                  },
                  {
                    label: '父级菜单编码',
                    width: '110',
                    type: 'fa_code',
                  },
                  {
                    label: '请求地址',
                    width: '110',
                    type: 'path',
                  },
                  {
                    label: '是否菜单',
                    width: '110',
                    type: 'menuif',
                  },
                  {
                    label: '状态',
                    width: '110',
                    type: 'status',
                  }
                ],
                tableData: [
                    {

                        menuname: '首页',
                        code: 'index',
                        fa_code: "",
                        path: "",
                        menuif: "是",
                        status:"启用"
                    },
                    {

                        menuname: '系统管理',
                        code: 'system',
                        fa_code: "0",
                        path: "#",
                        menuif: "是",
                        status:"启用"

                    },
                    {

                        menuname: '菜单管理',
                        code: 'menus',
                        fa_code: "system",
                        path: "/menu",
                        menuif: "是",
                        status:"启用"
                    },
                    {

                        menuname: '角色管理',
                        code: 'roles',
                        fa_code: "system",
                        path: "/roles",
                        menuif: "是",
                        status:"启用"
                    },
                    {

                        menuname: '部门管理',
                        code: 'depts',
                        fa_code: "system",
                        path: "/depts",
                        menuif: "是",
                        status:"启用"
                    },
                    {

                        menuname: '字典管理',
                        code: 'sysconfigs',
                        fa_code: "system",
                        path: "/sysconfigs",
                        menuif: "是",
                        status:"启用"
                    },
                    {

                        menuname: '登录日志',
                        code: 'syslogs',
                        fa_code: "system",
                        path: "/syslogs",
                        menuif: "是",
                        status:"启用"
                    },
                    {

                        menuname: '消息管理',
                        code: 'messages',
                        fa_code: "system",
                        path: "/messages",
                        menuif: "是",
                        status:"启用"
                    }],
                dialogadd: false,
                dialogedit: false,
                form: {
                    menuname: '',
                    code: '',
                    fa_code: '',
                    path: '',
                    menuif: '',
                    status: ''
                }
            }
        },
        mounted(){
            const axios = require('axios');
            axios.get('http://192.168.1.6:8081/admin/menus/selectAllMenus?page=10&size=20')
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            handleEdit(index) {
                this.index=index
                this.dialogedit=true;
                console.log(index);
                // console.log(this.$route.path);

            },
            handleDelete(index) {

                this.tableData.splice(index,1)
            },
            getdialogfv(val){
                this.dialogedit=val;
                this.dialogadd=val;
            },
            dialogcommit(val,data){
                this.dialogedit=val;
                this.dialogadd=val;
              this.tableData.push(data)
            },
          dialogeditcommit(val,data){
            this.dialogedit=val;
            this.dialogadd=val;
            this.tableData[this.index]=data;
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
  .bgc{
    background: #fff;
    -webkit-box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);

  }
  .main-top{
    display: flex;
    justify-self: left;
    padding-bottom: 10px;
    background-color: #f2f2f2;
  }

   .el-input{
     width: 300px ;
     margin-right: 20px;
     border-radius: 5px;

     font-size: 13px;
   }
   .search,.add{
     font-size: 14px;
     padding:8px 15px;
   }



  .el-table {
    border:1px solid gainsboro;
    padding: 10px;
    border-radius: 10px;
    border-bottom: 0;
    font-size: 12px;
    font-family: Arial,serif;
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
