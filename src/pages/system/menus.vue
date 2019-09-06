<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="菜单名称/请求地址"  v-model="search"></el-input>
      <el-button class="search bgc" >搜 索</el-button>
      <el-button class="add bgc" @click="dialogadd=true">添 加</el-button>
      <menuEdit :data="form" :dialogFormVisible="dialogadd" @dialogcommit="dialogcommit" @getdialogfv="getdialogfv" :title="title[0]"></menuEdit>
      <menuEdit :data="filetrtableData[index]" :dialogFormVisible="dialogedit" @dialogcommit="dialogeditcommit" @getdialogfv="getdialogfv" :title="title[1]"></menuEdit>
      <dialogdel :dialogVisible="dialogdel" :del_id="del_id" @getdialogfv="getdialogfv" @commitdel="commitdel"></dialogdel>
    </div>
    <el-table
      class="bgc"
      :data="filetrtableData"
    >
      <!--      <div v-for="data in columntype" >-->
      <!--        <singleMenu :coltype="data"></singleMenu>-->
      <!--      </div>-->

      <singleMenu  :coltype="this.columntype[0]"></singleMenu>
      <singleMenu  :coltype="this.columntype[1]"></singleMenu>
      <singleMenu  :coltype="this.columntype[2]"></singleMenu>
      <singleMenu  :coltype="this.columntype[3]"></singleMenu>
      <singleMenu  :coltype="this.columntype[4]"></singleMenu>
      <singleMenu  :coltype="this.columntype[5]"></singleMenu>


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
    import dialogdel from "../../components/del"
    export default {
        components: {
            singleMenu,
            menuEdit,
            dialogdel
        },
        data() {
            return {
                searching:'',
                search:'',
                index:0,
                title:["添加菜单","编辑菜单"],
                columntype:[
                    {
                        label: '菜单名称',
                        width: '110',
                        type: 'name',
                    },
                    { label: '菜单编码',
                        width: '110',
                        type: 'code',
                    },
                    {
                        label: '父级菜单编码',
                        width: '110',
                        type: 'parentid',
                    },
                    {
                        label: '请求地址',
                        width: '130',
                        type: 'url',
                    },
                    {
                        label: '是否菜单',
                        width: '110',
                        type: 'isMenu',
                    },
                    {
                        label: '图标地址',
                        width: '110',
                        type: 'icon',
                    }
                ],
                tableData: [],
                // [
                // {
                //     menuname: '首页',
                //     code: 'index',
                //     fa_code: "",
                //     path: "",
                //     menuif: "是",
                //     status:"启用"
                // },
                // {
                //     menuname: '系统管理',
                //     code: 'system',
                //     fa_code: "0",
                //     path: "#",
                //     menuif: "是",
                //     status:"启用"
                //
                // },
                // {
                //     menuname: '菜单管理',
                //     code: 'menus',
                //     fa_code: "system",
                //     path: "/menu",
                //     menuif: "是",
                //     status:"启用"
                // },
                // {
                //     menuname: '角色管理',
                //     code: 'roles',
                //     fa_code: "system",
                //     path: "/roles",
                //     menuif: "是",
                //     status:"启用"
                // },
                // {
                //     menuname: '部门管理',
                //     code: 'depts',
                //     fa_code: "system",
                //     path: "/depts",
                //     menuif: "是",
                //     status:"启用"
                // },
                // {
                //     menuname: '字典管理',
                //     code: 'sysconfigs',
                //     fa_code: "system",
                //     path: "/sysconfigs",
                //     menuif: "是",
                //     status:"启用"
                // },
                // {
                //     menuname: '登录日志',
                //     code: 'syslogs',
                //     fa_code: "system",
                //     path: "/syslogs",
                //     menuif: "是",
                //     status:"启用"
                // },
                // {
                //     menuname: '消息管理',
                //     code: 'messages',
                //     fa_code: "system",
                //     path: "/messages",
                //     menuif: "是",
                //     status:"启用"
                // }],
                dialogadd: false,
                dialogedit: false,
                dialogdel:false,
                del_id:'',
                form: {
                    name: '',
                    code: '',
                    parentid: '',
                    url: '',
                    isMenu: '',
                    status: '',
                    icon:'',
                    id:'',
                }
            }
        },
        computed:{
            filetrtableData:function (){
                return     this.tableData.filter( (tableData) => {
                    return tableData.name.match(this.search) || tableData.url.match(this.search)
                })

            }
        },

        created(){
            const axios = require('axios');
            axios.get('http://192.168.1.6:8081/admin/menus/selectAllMenus?page=10&size=20')
                .then((response)=> {
                    this.tableData = response.data.data.menusMap;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            handleEdit(index) {

                this.index=index

                this.dialogedit=true;

                // console.log(this.$route.path);
            },
            handleDelete(index,row) {
              this.dialogdel =true
                this.del_id=row.id
            },
            getdialogfv(val){
                this.dialogedit=val;
                this.dialogadd=val;
                this.dialogdel=val;
            },
            dialogcommit(val,data){
                const axios = require('axios');
                this.dialogedit=val;
                this.dialogadd=val;
                // this.tableData.push(data)
                this.form= {
                    name: '',
                    code: '',
                    parentid: '',
                    url: '',
                    isMenu: '',
                    status: '',
                    icon:'',
                    id:'',
                }
                axios.post('http://192.168.1.6:8081/admin/menus/insertMenu',data)
                    .then( (response) =>{
                        this.$message({
                            message: "添加成功",
                            type: "success",
                            duration: 1000
                        })
                        this.tableData = response.data.data.result;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            dialogeditcommit(val,data){
                const axios = require('axios');
                this.dialogedit=val;
                this.dialogadd=val;
                this.tableData[this.index]=data;
                axios.post('http://192.168.1.6:8081/admin/menus/updateMenu',data)
                    .then( (response)=> {
                        this.$message({
                            message: "修改成功",
                            type: "success",
                            duration: 1000
                        })
                        this.tableData = response.data.data.result;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            commitdel(val,id){
                this.dialogdel=val;
                const axios = require('axios');
                // console.log( row.id instanceof Integer )
                axios.get('http://192.168.1.6:8081/admin/menus/updateMenuStatus', {params: {id: id}})
                    .then((response) => {
                        this.$message({
                            message: "删除成功",
                            type: "success",
                            duration: 1000
                        })
                        this.tableData = response.data.data.result;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            // filter:function () {
            //     this.search=this.searching
            // }
        }
    }
</script>


<style scoped >
  @import "../../assets/maincss.css";
</style>
