<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="名称/关键词" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>
      <el-button class="add bgc" @click="add">添 加</el-button>
      <adSortEdit :data="form"
                     :dialogFormVisible="dialogadd"
                     @dialogcommit="dialogcommit"
                     @getdialogfv="getdialogfv"
                     :title="title[0]"
                     :buttonClose="buttonClose"
                     :buttonCommit="buttonCommit"></adSortEdit>
      <adSortEdit :data="filterFlyData[index]"
                     :dialogFormVisible="dialogedit"
                     @dialogcommit="dialogeditcommit"
                     @getdialogfv="getdialogfv"
                     :title="title[1]"
                     :buttonClose="buttonClose"
                     :buttonCommit="buttonCommit"></adSortEdit>

      <dialogdel :dialogVisible="dialogdel"
                 :del_id="select_id"
                 @getdialogfv="getdialogfv"
                 @commitdel="commitdel"></dialogdel>
    </div>
    <el-table
      class="bgc"
      :data="filterFlyData"
    >
      <div v-for="data in columntype">
        <singleMenu :coltype="data"></singleMenu>
      </div>

      <!--      <singleMenu  :coltype="this.columntype[0]"></singleMenu>-->
      <!--      <singleMenu  :coltype="this.columntype[1]"></singleMenu>-->


      <el-table-column label="操作" width="320">
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
import adSortEdit from "./adSortEdit";
    import singleMenu from "../../components/singleMenu";
    import dialogdel from "../../components/del";
    import authority from "../../components/authority";

    export default {
        components: {
            singleMenu,
            adSortEdit,
            dialogdel,
            authority
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                title: ["添加消息分类", "编辑消息分类", '删除'],
                buttonClose: '',
                buttonCommit: '',
                currentPage: 1,
                total: 1,
                select_id: '',
                columntype: [
                    {
                        label: '是否显示',
                        width: '80',
                        type: 'isShow',
                    },
                    {
                        label: '名称',
                        width: '110',
                        type: 'catName',
                    },
                    {
                        label: '关键词',
                        width: '110',
                        type: 'keywords',
                    },
                    {
                        label: '描述',
                        width: '150',
                        type: 'catDesc',
                    },
                    {
                        label: '上级分类名称',
                        width: '110',
                        type: 'pCatName',
                    },
                    {
                        label: '创建时间',
                        width: '110',
                        type: 'createTime',
                    },
                    {
                        label: '创建人',
                        width: '100',
                        type: 'userName',
                    },


                ],
                flyData: [],

                dialogadd: false,
                dialogedit: false,
                dialogdel: false,
                del_id: '',
                form: {
                    isShow: '',
                    catName: '',
                    keywords: '',
                    catDesc: '',
                    pCatName: '',
                    createTime: '',
                    userName: '',
                    sortOrder:0,
                    id: '',
                }
            }
        },
        computed: {
            filterFlyData: function () {
                return this.flyData.filter((data) => {
                    return data.catName.match(this.search) || data.keywords.match(this.search)
                })
            }
        },

        mounted() {
            this.handleCurrentChange()

        },
        methods: {

            add() {
                this.dialogadd = true;
                this.buttonClose = '取消'
                this.buttonCommit = '确定'
            },
            handleEdit(index) {
                this.index = index
                this.dialogedit = true;
                this.buttonClose = '取消'
                this.buttonCommit = '确定'
            },
            handleDelete(index, row) {
                this.dialogdel = true
                this.select_id = row.id
            },
            getdialogfv(val) {
                this.dialogedit = val;
                this.dialogadd = val;
                this.dialogdel = val;
                this.dialoginf = val;
            },
            dialogcommit(val, data) {
                const axios = require('axios');
                this.dialogedit = val;
                this.dialogadd = val;
                // this.tableData.push(data)
                this.form = {
                    isShow: '',
                    catName: '',
                    keywords: '',
                    catDesc: '',
                    pCatName: '',
                    createTime: '',
                    userName: '',
                    sortOrder:0,
                    id: '',
                }
                // console.log(data);
                axios.post(`${this.global.config.url}/admin/articleCat/insertArticleCat`, data)
                    .then((response) => {
                        console.log(response);
                        this.message(response)
                        this.handleCurrentChange()
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
                this.flyData[this.index] = data;
                axios.post(`${this.global.config.url}/admin/articleCat/updateArticleCat`, data)
                    .then((response) => {
                        this.message(response)
                        this.handleCurrentChange()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            commitdel(val, id) {
                this.dialogdel = val;
                const axios = require('axios');
                // console.log( row.id instanceof Integer )
                // console.log(id);
                axios.get(`${this.global.config.url}/admin/articleCat/deleteArticleCat`, {params: {id: id}})
                    .then((response) => {
                        this.message(response)
                        this.handleCurrentChange()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            message(response) {
                let type = false;
                if (response.data.code === 0) {
                    type = "success"
                } else type = "warning"
                this.$message({
                    message: response.data.message,
                    type: type,
                    duration: 1000
                })
            },
            authority() {
            },

            handleCurrentChange() {
                const axios = require("axios")
                axios.get(`${this.global.config.url}/admin/articleCat/selectAll?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        // console.log(response);
                        this.flyData = response.data.data.list
                        ;
                        this.total = response.data.data.total
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
