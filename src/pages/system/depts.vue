<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="菜单名称/请求地址" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>
      <el-button class="add bgc" @click="dialogadd=true">添 加</el-button>
      <!--      <menuEdit :data="form" :dialogFormVisible="dialogadd" @dialogcommit="dialogcommit" @getdialogfv="getdialogfv" :title="title[0]"></menuEdit>-->
      <!--      <menuEdit :data="filetrtableData[index]" :dialogFormVisible="dialogedit" @dialogcommit="dialogeditcommit" @getdialogfv="getdialogfv" :title="title[1]"></menuEdit>-->
            <dialogdel :dialogVisible="dialogdel" :del_id="del_id" @getdialogfv="getdialogfv" @commitdel="commitdel"></dialogdel>
    </div>
    <el-table
      class="bgc"
      :data="rolesdata"
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
                searching: '',
                search: '',
                index: 0,
                title: ["添加菜单", "编辑菜单"],
                columntype: [
                    {
                        label: '状态',
                        width: '60',
                        type: 'status',
                    },
                    {
                        label: '部门名称',
                        width: '80',
                        type: 'deptname',
                    },
                    {
                        label: '上级部门名称',
                        width: '100',
                        type: 'parentdeptname',
                    },
                    {
                        label: '所属区域名称',
                        width: '100',
                        type: 'areaname',
                    },
                    {
                        label: '详细地址',
                        width: '120',
                        type: 'address',
                    },
                    {
                        label: '部门负责人姓名',
                        width: '110',
                        type: 'deptleadername',
                    },
                    {
                        label: '联系电话',
                        width: '100',
                        type: 'phone',
                    }

                ],
                rolesdata: [
                    {
                        status: "启用",
                        deptname: "总经理室",
                        parentdeptname: "杭州总部",
                        areaname: "浙江省杭州市西湖区",
                        address: "登新公寓40幢2单元202",
                        deptleadername: "余林",
                        phone: "19179000928",
                    }

                ],

                dialogadd: false,
                dialogedit: false,
                dialogdel: false,
                del_id: '',
                form: {
                    name: '',
                    code: '',
                    parentid: '',
                    url: '',
                    isMenu: '',
                    status: '',
                    icon: '',
                    id: '',
                }
            }
        },
        methods:{
            handleDelete(index,row) {
                this.dialogdel =true
                this.del_id=row.id
            },
            getdialogfv(val){
                this.dialogedit=val;
                this.dialogadd=val;
                this.dialogdel=val;
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
            }
        }
    }
</script>

<style scoped>
  @import "../../assets/maincss.css";

</style>
