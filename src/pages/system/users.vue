<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="菜单名称/请求地址"  v-model="search"></el-input>
      <el-button class="search bgc" >搜 索</el-button>
      <el-button class="add bgc" @click="dialogadd=true">添 加</el-button>
            <userEdit :data="form" :dialogFormVisible="dialogadd" @dialogcommit="dialogcommit" @getdialogfv="getdialogfv" :title="title[0]"></userEdit>
            <userEdit :data="userData[index]" :dialogFormVisible="dialogedit" @dialogcommit="dialogeditcommit" @getdialogfv="getdialogfv" :title="title[1]"></userEdit>
            <dialogdel :dialogVisible="dialogdel" :del_id="del_id" @getdialogfv="getdialogfv" @commitdel="commitdel"></dialogdel>
    </div>
    <el-table
      class="bgc"
      :data="userData"
    >
            <div v-for="data in columntype" >
              <singleMenu :coltype="data"></singleMenu>
            </div>

<!--      <singleMenu  :coltype="this.columntype[0]"></singleMenu>-->
<!--      <singleMenu  :coltype="this.columntype[1]"></singleMenu>-->



      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)">编 辑
          </el-button>

          <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)">分配角色
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
    import userEdit from "../../components/userEdit";
    import dialogdel from "../../components/del"
    export default {
        components: {
            singleMenu,
            userEdit,
            dialogdel
        },
        data() {
            return {
                searching:'',
                search:'',
                index:0,
                title:["添加菜单","编辑菜单"],
                columntype:[
                    { label: '角色名称',
                        width: '100',
                        type: 'roleName',
                    },
                    {
                        label: '登录账号',
                        width: '80',
                        type: 'userName',
                    },
                    { label: '登录密码',
                        width: '80',
                        type: 'password',
                    },
                    { label: '姓名',
                        width: '80',
                        type: 'realName',
                    },
                    { label: '所属部门名称',
                        width: '110',
                        type: 'deptName',
                    },
                    { label: '手机号码',
                        width: '110',
                        type: 'phone',
                    },
                    { label: '状态',
                        width: '60',
                        type: 'status',
                    },
                    { label: '邮箱',
                        width: '150',
                        type: 'email',
                    },
                    { label: '性别',
                        width: '50',
                        type: 'sex',
                    }
                ],
                userData: [
                    {
                        realName:"李青云",
                        roleName:"系统管理员",
                        sex:"男",
                        userName:"lqy",
                        password:"123456",
                        deptName:"技术部门",
                        status:"启用",
                        phone:"17757552613",
                        email:"978599280@qq.com",
                        id:''

                    }

                ],

                dialogadd: false,
                dialogedit: false,
                dialogdel:false,
                del_id:'',
                form: {
                    realName: '',
                    roleName: '',
                    sex: '',
                    userName: '',
                    password: '',
                    status: '',
                    deptName:'',
                    email:'',
                    phone:'',
                    id:''
                }
            }
        },
        methods:{
            handleEdit(index) {
                this.index=index
                this.dialogedit=true;
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
                    parentcode: '',
                    url: '',
                    isMenu: '',
                    status: '',
                    icon:'',
                    id:'',
                    parentid:''
                }
                console.log(data);
                axios.post('http://192.168.1.5:8081/admin/menus/insertMenu',data)
                    .then( (response) =>{
                        console.log(response);
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
                console.log(data);
                this.tableData[this.index]=data;
                console.log(this.tableData[this.index]);
                axios.post('http://192.168.1.5:8081/admin/menus/updateMenu',data)
                    .then( (response)=> {
                        console.log(response);
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
                axios.get('http://192.168.1.5:8081/admin/menus/updateMenuStatus', {params: {id: id}})
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
            },
        }
    }
</script>

<style scoped>
  @import "../../assets/maincss.css";

</style>
