<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="部门名称/所属区域名称" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>
      <el-button class="add bgc" @click="dialogadd=true">添 加</el-button>
            <deptEdit :data="form" :dialogFormVisible="dialogadd" @dialogcommit="dialogcommit" @getdialogfv="getdialogfv" :title="title[0]"></deptEdit>
            <deptEdit :data="filterDeptData[index]" :dialogFormVisible="dialogedit" @dialogcommit="dialogeditcommit" @getdialogfv="getdialogfv" :title="title[1]"></deptEdit>
            <dialogdel :dialogVisible="dialogdel" :del_id="del_id" @getdialogfv="getdialogfv" @commitdel="commitdel"></dialogdel>
    </div>
    <el-table
      class="bgc"
      :data="filterDeptData"
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
    import dialogdel from "../../components/del"
    import deptEdit from "../../components/deptEdit";
    export default {
        components: {
            singleMenu,
            deptEdit,
            dialogdel
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                title: ["添加部门", "编辑部门"],
                columntype: [
                    {
                        label: '联系电话',
                        width: '110',
                        type: 'phone',
                    },
                    {
                        label: '部门名称',
                        width: '110',
                        type: 'name',
                    },
                    {
                        label: '上级部门名称',
                        width: '100',
                        type: 'parentName',
                    },
                    {
                        label: '所属区域名称',
                        width: '160',
                        type: 'areaName',
                    },
                    {
                        label: '详细地址',
                        width: '120',
                        type: 'address',
                    },
                    {
                        label: '部门负责人姓名',
                        width: '120',
                        type: 'managerName',
                    },


                ],
                deptData: [],

                dialogadd: false,
                dialogedit: false,
                dialogdel: false,
                del_id: '',
                form: {
                    name: '',
                    parentName: '',
                    areaName: '',
                    address: '',
                    managerName: '',
                    status: '',
                    phone: '',
                    id: '',
                }
            }
        },
        computed:{
            filterDeptData:function (){
                return     this.deptData.filter( (data) => {
                    return data.name.match(this.search) || data.areaName.match(this.search)
                })
            }
        },

        mounted(){
            const axios = require('axios');
            axios.get(`${this.global.config.url}/admin/depts/selectAllDepts?page=1&size=10`)
                .then((response)=> {
                    console.log(response);
                    this.deptData = response.data.data.deptList;
                    this.change()

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
                    parentName: '',
                    areaName: '',
                    address: '',
                    managerName: '',
                    status: '',
                    phone: '',
                    id: '',
                }
                console.log(data);
                axios.post(`${this.global.config.url}/admin/depts/insertDept`,data)
                    .then( (response) =>{
                        this.message(response)

                        this.deptData = response.data.data.result;

                        this.change()

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            dialogeditcommit(val,data){
                const axios = require('axios');
                this.dialogedit=val;
                this.dialogadd=val;
                // this.deptData[this.index]=data;
                console.log(data);
                axios.post(`${this.global.config.url}/admin/depts/updateDept`,data)
                    .then( (response)=> {
                        this.message(response)

                        this.deptData = response.data.data.result;
                        this.change()

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            commitdel(val,id){
                this.dialogdel=val;
                const axios = require('axios');
                // console.log( row.id instanceof Integer )
                axios.get(`${this.global.config.url}/admin/depts/updateDeptStatus`, {params: {id: id}})
                    .then((response) => {

                        this.message(response)
                        this.deptData = response.data.data.result;
                        this.change()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            change(){
                for (let i=0 ;i<this.deptData.length;i++){
                    this.deptData[i].status = this.deptData[i].status==true ? '启用' : '未启用'
                    // this.deptData[i].sex = this.deptData[i].sex==1 ? '男' : '女'
                }
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
