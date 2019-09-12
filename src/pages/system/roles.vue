<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="角色名称"  v-model="search" ></el-input>
      <el-button class="search bgc" >搜 索</el-button>
      <el-button class="add bgc" @click="dialogadd=true">添 加</el-button>
      <rolesEdit :data="form" :dialogFormVisible="dialogadd" @dialogcommit="dialogcommit" @getdialogfv="getdialogfv" :title="title[0]"></rolesEdit>
      <rolesEdit :data="filterRolesData[index]" :dialogFormVisible="dialogedit" @dialogcommit="dialogeditcommit" @getdialogfv="getdialogfv" :title="title[1]"></rolesEdit>
      <dialogdel :dialogVisible="dialogdel" :del_id="del_id" @getdialogfv="getdialogfv" @commitdel="commitdel"></dialogdel>
    </div>
    <el-table
      class="bgc"
      :data="filterRolesData"
    >
            <div v-for="data in columntype" >
              <singleMenu :coltype="data"></singleMenu>
            </div>

<!--      <singleMenu  :coltype="this.columntype[0]"></singleMenu>-->
<!--      <singleMenu  :coltype="this.columntype[1]"></singleMenu>-->



      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)">编 辑
          </el-button>

          <el-button
            size="mini"
            type="primary"
            @click="authority(scope.$index, scope.row)">权限配置
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
    import rolesEdit from "../../components/rolesEdit";
    import dialogdel from "../../components/del";
    import authority from "../../components/authority";
    export default {
        components: {
            singleMenu,
            rolesEdit,
            dialogdel,
            authority
        },
        data() {
            return {
                searching:'',
                search:'',
                index:0,
                title:["添加角色","编辑角色"],
                columntype:[
                    { label: '备注',
                        width: '110',
                        type: 'remark',
                    },
                    {
                        label: '角色名称',
                        width: '110',
                        type: 'name',
                    },

                ],
                rolesData: [
                    // {
                    //     name: '125553',
                    //     remark: '',
                    //     id:'',
                    // },{
                    //     name: '124123',
                    //     remark: '',
                    //     id:'',
                    // },{
                    //     name: '12344',
                    //     remark: '',
                    //     id:'',
                    // },{
                    //     name: '1233',
                    //     remark: '',
                    //     id:'',
                    // }
                ],

                dialogadd: false,
                dialogedit: false,
                dialogdel:false,
                del_id:'',
                form: {
                    name: '',
                    remark: '',
                    id:'',
                }
            }
        },
        computed:{
            filterRolesData:function (){
                return     this.rolesData.filter( (data) => {
                    return data.name.match(this.search)
                })
            }
        },
        // updated(){
        //     console.log(this.search);
        //     console.log(this.filterRolesData);
        // },
        mounted(){
            const axios = require('axios');
            axios.get(`${this.global.config.url}/admin/roles/selectAllRoles?page=10&size=20`)
                .then((response)=> {
                    // console.log(response);
                    this.rolesData = response.data.data.rolesList;
                    // console.log(this.rolesData);
                })
                .catch(function (error) {
                    console.log(error);
                });


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
                    remark: '',
                    id:'',
                }
                console.log(data);
                axios.post(`${this.global.config.url}/admin/roles/insertRole`,data)
                    .then( (response) =>{
                        this.message(response)

                        this.rolesData = response.data.data.result;
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
                this.rolesData[this.index]=data;
                axios.post(`${this.global.config.url}/admin/roles/updateRole`,data)
                    .then( (response)=> {
                        this.message(response)

                        // this.message(response)
                        this.rolesData = response.data.data.result;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            commitdel(val,id){
                this.dialogdel=val;
                const axios = require('axios');
                // console.log( row.id instanceof Integer )
                axios.get(`${this.global.config.url}/admin/roles/deleteRole`, {params: {id: id}})
                    .then((response) => {
                        this.message(response)

                        this.rolesData = response.data.data.result;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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
            },
            authority(){

            }
        }
    }
</script>

<style scoped>
  @import "../../assets/maincss.css";

</style>
