<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="系统配置名称/系统配置描述" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>
      <el-button class="add bgc" @click="dialogadd=true">添 加</el-button>
      <configEdit :data="form" :dialogFormVisible="dialogadd" @dialogcommit="dialogcommit" @getdialogfv="getdialogfv"
                  :title="title[0]"></configEdit>
      <configEdit :data="filterConfigData[index]" :dialogFormVisible="dialogedit" @dialogcommit="dialogeditcommit"
                  @getdialogfv="getdialogfv" :title="title[1]"></configEdit>
      <dialogdel :dialogVisible="dialogdel" :del_id="del_id" @getdialogfv="getdialogfv"
                 @commitdel="commitdel"></dialogdel>
    </div>
    <el-table
      class="bgc"
      :data="filterConfigData"
    >
      <div v-for="data in columntype">
        <singleMenu :coltype="data"></singleMenu>
      </div>


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
    import configEdit from "../../components/configEdit";
    import dialogdel from "../../components/del"

    export default {
        components: {
            singleMenu,
            configEdit,
            dialogdel
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                title: ["添加系统配置", "编辑系统配置"],
                columntype: [
                    {
                        label: '描述',
                        width: '240',
                        type: 'remark',
                    },
                    {
                        label: '配置编码',
                        width: '180',
                        type: 'code',
                    },
                    {
                        label: '配置值',
                        width: '110',
                        type: 'value',
                    },


                ],
                configData: [],

                dialogadd: false,
                dialogedit: false,
                dialogdel: false,
                del_id: '',
                form: {
                    code: "",
                    value: '',
                    remark: '',
                    status: '',
                    id: '',
                }
            }
        },
        computed: {
            filterConfigData: function () {
                return this.configData.filter((data) => {
                    return data.code.match(this.search) || data.remark.match(this.search)
                })
            }
        },

        mounted() {
            const axios = require('axios');
            axios.get(`${this.global.config.url}/admin/sysConfig/selectAllSysconfig?page=1&size=100`)
                .then((response) => {
                    console.log(response);
                    this.configData = response.data.data.sysConfigList;
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
            },
            dialogcommit(val, data) {
                const axios = require('axios');
                this.dialogedit = val;
                this.dialogadd = val;
                // this.tableData.push(data)
                this.form = {
                    code: "",
                    value: '',
                    remark: '',
                    status: '',
                    id: '',
                }
                console.log(data);
                axios.post(`${this.global.config.url}/admin/sysConfig/insertAdminUser`, data)
                    .then((response) => {
                        this.message(response)

                        this.configData = response.data.data.result;
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
                this.configData[this.index] = data;
                axios.post(`${this.global.config.url}/admin/sysConfig/updateAdminUser`, data)
                    .then((response) => {
                        this.message(response)

                        this.configData = response.data.data.result;
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
                axios.get(`${this.global.config.url}/admin/sysConfig/updateAdminUserStatus`, {params: {id: id}})
                    .then((response) => {
                        console.log(response);
                        this.message(response)

                        this.configData = response.data.data.result;
                        this.change()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            change() {
                for (let i = 0; i < this.configData.length; i++) {
                    this.configData[i].status = this.configData[i].status == true ? '启用' : '未启用'
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
