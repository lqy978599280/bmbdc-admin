<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="姓名/部门名称" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>
      <el-button class="add bgc" @click="dialogadd=true">添 加</el-button>
      <userEdit :data="form" :dialogFormVisible="dialogadd" @dialogcommit="dialogcommit" @getdialogfv="getdialogfv"
                :title="title[0]"></userEdit>
      <userEdit :data="filterUsersData[index]" :dialogFormVisible="dialogedit" @dialogcommit="dialogeditcommit"
                @getdialogfv="getdialogfv" :title="title[1]"></userEdit>
      <dialogdel :dialogVisible="dialogdel" :del_id="del_id" @getdialogfv="getdialogfv"
                 @commitdel="commitdel"></dialogdel>
      <casting :dialogVisible="dialogcasting" :role="filterUsersData[index]" @getdialogfv="getdialogfv" @commitcasting="commitcasting"></casting>
    </div>
    <el-table
      class="bgc"
      :data="filterUsersData"
    >
      <div v-for="data in columntype">
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
            @click="casting(scope.$index, scope.row)">分配角色
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删 除
          </el-button>
        </template>


      </el-table-column>

    </el-table>
    <div class="block" style="display: flex;justify-content: center">

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="userData.length">
      </el-pagination>
    </div>
  </div>


</template>

<script>
    import singleMenu from "../../components/singleMenu";
    import userEdit from "../../components/userEdit";
    import dialogdel from "../../components/del"
    import casting from "../../components/casting";
    import rolesEdit from "../../components/rolesEdit";

    export default {
        components: {
            singleMenu,
            userEdit,
            dialogdel,
            casting
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                title: ["添加用户", "编辑用户"],
                columntype: [
                    {
                        label: '角色名称',
                        width: '100',
                        type: 'roleName',
                    },
                    {
                        label: '登录账号',
                        width: '100',
                        type: 'userName',
                    },
                    {
                        label: '登录密码',
                        width: '80',
                        type: 'password',
                    },
                    {
                        label: '姓名',
                        width: '80',
                        type: 'realName',
                    },
                    {
                        label: '所属部门名称',
                        width: '110',
                        type: 'deptName',
                    },
                    {
                        label: '手机号码',
                        width: '110',
                        type: 'phone',
                    },

                    {
                        label: '邮箱',
                        width: '160',
                        type: 'email',
                    },
                    {
                        label: '性别',
                        width: '60',
                        type: 'sex',
                    }
                ],
                userData: [],

                dialogadd: false,
                dialogedit: false,
                dialogdel: false,
                dialogcasting: false,
                currentPage: 1,
                del_id: '',
                class_id:'',
                form: {
                    realName: '',
                    roleName: '',
                    sex: '',
                    userName: '',
                    password: '',
                    status: '',
                    deptName: '',
                    email: '',
                    phone: '',
                    id: ''
                }
            }
        },
        computed: {
            filterUsersData: function () {
                return this.userData.filter((userData) => {
                    return userData.realName.match(this.search) || userData.deptName.match(this.search)
                })
            }
        },

        mounted() {
            const axios = require('axios');
            axios.get(`http://192.168.1.5:8081/admin/adminUser/selectAllAdminUser?page=${this.currentPage}&size=10`)
                .then((response) => {
                    // console.log(response);
                    this.userData = response.data.data.adminUserList;
                    this.change()
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        methods: {
            handleEdit(index) {
                this.index = index
                this.dialogedit = true;
            },
            handleDelete(index, row) {
                this.dialogdel = true
                this.del_id = row.id
            },
            getdialogfv(val) {
                this.dialogedit = val;
                this.dialogadd = val;
                this.dialogdel = val;
                this.dialogcasting = val
            },
            dialogcommit(val, data) {
                const axios = require('axios');
                this.dialogedit = val;
                this.dialogadd = val;
                // this.tableData.push(data)
                this.form = {
                    name: '',
                    code: '',
                    parentcode: '',
                    url: '',
                    isMenu: '',
                    status: '',
                    icon: '',
                    id: '',
                    parentid: ''
                }
                console.log(data);
                axios.post('http://192.168.1.5:8081/admin/adminUser/insertAdminUser', data)
                    .then((response) => {
                        // console.log(response);
                        this.message(response)

                        this.userData = response.data.data.result;
                        this.change()


                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            dialogeditcommit(val, data) {
                const axios = require('axios');
                this.dialogedit = val;
                this.dialogadd = val;
                console.log(data);
                // this.userData[this.index] = data;
                // console.log(this.userData[this.index]);
                axios.post('http://192.168.1.5:8081/admin/adminUser/updateAdminUser', data)
                    .then((response) => {
                        console.log(response);
                        this.message(response)

                        this.userData = response.data.data.result;
                        this.change()

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            commitdel(val, id) {
                this.dialogdel = val;
                const axios = require('axios');
                // console.log( row.id instanceof Integer )
                axios.get('http://192.168.1.5:8081/admin/adminUser/updateAdminUserStatus', {params: {id: id}})
                    .then((response) => {
                        // console.log(response);
                        this.message(response)

                        this.userData = response.data.data.result;
                        this.change()

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            change(){
                for (let i=0 ;i<this.userData.length;i++){
                    this.userData[i].status = this.userData[i].status==true ? '启用' : '未启用'
                    this.userData[i].sex = this.userData[i].sex==1 ? '男' : '女'
                }
            },
            casting(index,row) {
                this.index = index
                this.class_id = row.id
                this.dialogcasting = true;
                // console.log(this.class_id);
            },
            commitcasting(val,role) {
                const axios = require('axios');

                this.dialogcasting = val;

                axios.post('http://192.168.1.5:8081/admin/adminUser/updateRole',  {'id': this.class_id , 'roleName':role})
                    .then((response) => {
                        // console.log(response);

                        this.message(response)
                        this.userData = response.data.data.result;
                        this.change()

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleCurrentChange() {

            },
            message(response){
                let type = false;
                if (response.data.code === 0) {
                    type = "success"
                }
                else type = "warning"
                this.$message({
                    message: response.data.message,
                    type: type,
                    duration: 1000
                })
            }
        }
    }
</script>

<style scoped>
  @import "../../assets/maincss.css";

</style>
