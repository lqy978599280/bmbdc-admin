<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="编号/姓名/手机号/区域" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>
      <el-button class="add bgc" @click="add">添 加</el-button>
      <houseWorkersEdit :data="form"
               :dialogFormVisible="dialogadd"
               @dialogcommit="dialogcommit"
               @getdialogfv="getdialogfv"
               :title="title[0]"
               :buttonClose="buttonClose"
               :buttonCommit="buttonCommit"></houseWorkersEdit>
      <houseWorkersEdit :data="filterFlyData[index]"
               :dialogFormVisible="dialogedit"
               @dialogcommit="dialogeditcommit"
               @getdialogfv="getdialogfv"
               :title="title[1]"
               :buttonClose="buttonClose"
               :buttonCommit="buttonCommit"></houseWorkersEdit>
      <houseWorkersEdit :data="filterFlyData[index]"
               :dialogFormVisible="dialoginf"
               @dialogcommit="dialogeditcommit"
               @getdialogfv="getdialogfv"
               :readOnly='true'
               :pass_id="select_id"
               :title="title[2]"
               :buttonClose="buttonClose"
               :buttonCommit="buttonCommit"
               @F5="handleCurrentChange"></houseWorkersEdit>
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
            @click="handleEdit(scope.$index)">详 情
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)">编 辑
          </el-button>


          <el-button
            size="mini"
            type="primary"
            @click="information(scope.$index, scope.row)">审 核
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
    import houseWorkersEdit from "../../components/houseWorkersEdit";
    import dialogdel from "../../components/del";
    import authority from "../../components/authority";

    export default {
        components: {
            singleMenu,
            houseWorkersEdit,
            dialogdel,
            authority
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                title: ["添加房源社工", "编辑房源社工", '审核'],
                buttonClose: '',
                buttonCommit: '',
                currentPage: 1,
                total: 1,
                select_id: '',
                columntype: [

                    {
                        label: '申请通过时间',
                        width: '130',
                        type: 'passTime',
                    },
                    {
                        label: '全景社工编码',
                        width: '130',
                        type: 'number',
                    },
                    {
                        label: '姓名',
                        width: '90',
                        type: 'name',
                    },
                    {
                        label: '手机号码',
                        width: '130',
                        type: 'phone',
                    },
                    {
                        label: '申请区域',
                        width: '150',
                        type: 'areaName',
                    },
                    {
                        label: '申请时间',
                        width: '120',
                        type: 'createTime',
                    },
                ],
                flyData: [],

                dialogadd: false,
                dialogedit: false,
                dialogdel: false,
                dialoginf: false,
                del_id: '',
                form: {
                    number: '',
                    name: '',
                    phone: '',
                    areaName: "",
                    createTime: '',
                    passTime: '',
                    rejectReason: '',
                    id: '',
                }
            }
        },
        computed: {
            filterFlyData: function () {
                return this.flyData.filter((data) => {
                    return data.name.match(this.search) || data.number.match(this.search) || data.phone.match(this.search)
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

            information(index, row) {
                this.dialoginf = true;
                this.buttonClose = '拒绝'
                this.buttonCommit = '通过'
                this.select_id = row.id

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
                    remark: '',
                    id: '',
                }
                axios.post(`${this.global.config.url}/admin/flyingHand/insertFlyingHand`, data)
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
                axios.post(`${this.global.config.url}/admin/flyingHand/updateFlyingHand`, data)
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
                axios.get(`${this.global.config.url}/admin/flyingHand/updateEnableById`, {params: {id: id}})
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
                axios.get(`${this.global.config.url}/admin/flyingHand/selectAllFlyingHand?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        // console.log(response);
                        this.flyData = response.data.data.flyingHandlist;
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
