<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="菜单名称/请求地址" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>
      <el-button class="add bgc" @click="dialogadd=true">添 加</el-button>
      <menuEdit :data="form" :dialogFormVisible="dialogadd" @dialogcommit="dialogcommit" @getdialogfv="getdialogfv"
                :title="title[0]"></menuEdit>
      <menuEdit :data="filetrtableData[index]" :dialogFormVisible="dialogedit" @dialogcommit="dialogeditcommit"
                @getdialogfv="getdialogfv" :title="title[1]"></menuEdit>
      <dialogdel :dialogVisible="dialogdel" :del_id="del_id" @getdialogfv="getdialogfv"
                 @commitdel="commitdel"></dialogdel>
    </div>
    <el-table
      class="bgc"
      :data="filetrtableData"
    >
            <div v-for="data in columntype" >
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
    <div class="block" style="display: flex;justify-content: center">

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="8"
        layout="prev, pager, next, jumper"
        :total="this.total">
      </el-pagination>
    </div>
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
                        label: '图标地址',
                        width: '130',
                        type: 'icon',
                    },
                    {
                        label: '菜单名称',
                        width: '120',
                        type: 'name',
                    },
                    {
                        label: '菜单编码',
                        width: '110',
                        type: 'code',
                    },
                    {
                        label: '父级菜单编码',
                        width: '110',
                        type: 'parentCode',
                    },
                    {
                        label: '请求地址',
                        width: '130',
                        type: 'url',
                    },
                    {
                        label: '状态',
                        width: '100',
                        type: 'status',
                    },
                    {
                        label: '是否菜单',
                        width: '100',
                        type: 'isMenu',
                    },
                ],
                tableData: [],
                total: 0,

                dialogadd: false,
                dialogedit: false,
                dialogdel: false,
                currentPage: 1,
                del_id: '',
                form: {
                    name: '',
                    code: '',
                    parentCode: '',
                    url: '',
                    isMenu: '',
                    status: '',
                    icon: '',
                    id: '',
                    parentid: ''
                }
            }
        },
        computed: {
            filetrtableData: function () {
                return this.tableData.filter((tableData) => {
                    return tableData.name.match(this.search) || tableData.url.match(this.search)
                })

            }
        },

        mounted() {
            this.handleCurrentChange()

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
                    name: '',
                    code: '',
                    parentCode: '',
                    url: '',
                    isMenu: '',
                    status: '',
                    icon: '',
                    id: '',
                    parentid: ''
                }
                console.log(data);
                axios.post(`${this.global.config.url}/admin/menus/insertMenu`, data)
                    .then((response) => {
                        // console.log(response);
                        this.message(response)

                        this.handleCurrentChange()

                        this.changeIsMenu()
                        // this.$message({
                        //     message: response.data.message,
                        //     type: "warning",
                        //     duration: 1000
                        // })

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            dialogeditcommit(val, data) {
                const axios = require('axios');
                this.dialogedit = val;
                this.dialogadd = val;
                // console.log(data);
                this.tableData[this.index] = data;
                console.log(this.tableData[this.index]);
                axios.post(`${this.global.config.url}/admin/menus/updateMenu`, data)
                    .then((response) => {
                        // console.log(response);
                        this.message(response)

                        this.handleCurrentChange()

                        this.changeIsMenu()

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            commitdel(val, id) {
                this.dialogdel = val;
                const axios = require('axios');
                // console.log( row.id instanceof Integer )
                axios.get(`${this.global.config.url}/admin/menus/updateMenuStatus`, {params: {id: id}})
                    .then((response) => {

                        this.message(response)
                        this.handleCurrentChange()
                        this.changeIsMenu()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            changeIsMenu() {
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].isMenu === 0)
                        this.tableData[i].isMenu = '否'
                    else
                        this.tableData[i].isMenu = '是'
                }
            },
            handleCurrentChange() {
                const axios = require("axios")
                axios.get(`${this.global.config.url}/admin/menus/selectAllMenus?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        // console.log(response);
                        this.tableData = response.data.data.menusMap;
                        this.total = response.data.data.total

                        this.changeIsMenu()

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
            }
        }
    }
</script>


<style scoped>
  @import "../../assets/maincss.css";
</style>
