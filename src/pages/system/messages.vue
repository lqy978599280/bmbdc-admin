<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="标题/内容/姓名" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>
      <el-button class="add bgc" @click="add">添 加</el-button>
      <messageEdit :data="form"
               :dialogFormVisible="dialogadd"
               @dialogcommit="dialogcommit"
               @getdialogfv="getdialogfv"
               :title="title[0]"
               :buttonClose="buttonClose"
               :buttonCommit="buttonCommit"></messageEdit>
      <messageEdit :data="filterFlyData[index]"
               :dialogFormVisible="dialogedit"
               @dialogcommit="dialogeditcommit"
               @getdialogfv="getdialogfv"
               :title="title[1]"
               :buttonClose="buttonClose"
               :buttonCommit="buttonCommit"></messageEdit>

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
    import messageEdit from "../../components/messageEdit";
    import singleMenu from "../../components/singleMenu";
    import dialogdel from "../../components/del";
    import authority from "../../components/authority";

    export default {
        components: {
            singleMenu,
            messageEdit,
            dialogdel,
            authority
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                title: ["添加消息", "编辑消息", '删除'],
                buttonClose: '',
                buttonCommit: '',
                currentPage: 1,
                total: 1,
                select_id: '',
                columntype: [
                    {
                        label: '跳转路径',
                        width: '140',
                        type: 'routeUrl',
                    },
                    {
                        label: '标题',
                        width: '130',
                        type: 'title',
                    },
                    {
                        label: '消息接收人姓名',
                        width: '120',
                        type: 'name',
                    },
                    {
                        label: '消息分类名称',
                        width: '100',
                        type: 'msgType',
                    },
                    {
                        label: '消息内容',
                        width: '160',
                        type: 'msgContent',
                    },



                ],
                flyData: [],

                dialogadd: false,
                dialogedit: false,
                dialogdel: false,
                del_id: '',
                form: {
                    name: '',
                    routeUrl: '',
                    title: '',
                    msgType: '',
                    msgContent: '',
                    status: '',
                    id: '',
                }
            }
        },
        computed: {
            filterFlyData: function () {
                return this.flyData.filter((data) => {
                    return data.title.match(this.search) || data.name.match(this.search) || data.msgContent.match(this.search)
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
                    name: '',
                    routeUrl: '',
                    title: '',
                    msgType: '',
                    msgContent: '',
                    status: '',
                    id: '',
                }
                axios.post(`${this.global.config.url}/admin/message/insertMessage`, data)
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
                axios.post(`${this.global.config.url}/admin/message/updateMessage`, data)
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
                console.log(id);
                axios.get(`${this.global.config.url}/admin/message/deleteMessage`, {params: {id: id}})
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
                axios.get(`${this.global.config.url}/admin/message/selectAllMessage?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        console.log(response);
                        this.flyData = response.data.data.messageList
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
