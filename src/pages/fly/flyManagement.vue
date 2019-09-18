<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="编号/姓名/手机号/区域" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>



      <flyManaEdit :data="filterFlyData[index]"
                      :dialogFormVisible="dialoginf"
                      @dialogcommit="dialogeditcommit"
                      @getdialogfv="getdialogfv"
                      :readOnly='true'
                      :pass_id="select_id"
                      :title="title"
                      :buttonClose="buttonClose"
                      :buttonCommit="buttonCommit"
                      @F5="handleCurrentChange"></flyManaEdit>

    </div>
    <el-table
      class="bgc"
      :data="filterFlyData"
    >
      <div v-for="data in columntype">
        <singleMenu :coltype="data"></singleMenu>
      </div>



      <el-table-column label="操作" width="320">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)">详 情
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
    import flyManaEdit from "./flyManaEdit";
    import dialogdel from "../../components/del";
    import authority from "../../components/authority";

    export default {
        components: {
            singleMenu,
            flyManaEdit,
            dialogdel,
            authority
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                title: "飞手社工订单",
                buttonClose: '',
                buttonCommit: '',
                currentPage: 1,
                total: 1,
                select_id: '',
                columntype: [

                    {
                        label: '状态',
                        width: '100',
                        type: 'status',
                    },
                    {
                        label: '订单编号',
                        width: '140',
                        type: 'number',
                    },
                    {
                        label: '小区名称',
                        width: '90',
                        type: 'villageName',
                    },
                    {
                        label: '飞手姓名',
                        width: '90',
                        type: 'name',
                    },
                    {
                        label: '接单时间',
                        width: '110',
                        type: 'acceptTime',
                    },
                    {
                        label: '提交时间',
                        width: '110',
                        type: 'submitTime',
                    },
                    {
                        label: '订单金额',
                        width: '80',
                        type: 'totalAmout',
                    },
                    {
                        label: '飞手收益余额',
                        width: '100',
                        type: 'bonus',
                    },
                    {
                        label: '通过时间',
                        width: '110',
                        type: 'approvalTime',
                    },
                    {
                        label: '被拒时间',
                        width: '110',
                        type: 'rejectTime',
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

            handleEdit(index) {
                this.index = index
                this.dialoginf= true;
                this.buttonClose = '取消'
                this.buttonCommit = '确定'
            },


            getdialogfv(val) {
                this.dialogedit = val;
                this.dialogadd = val;
                this.dialogdel = val;
                this.dialoginf = val;
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
