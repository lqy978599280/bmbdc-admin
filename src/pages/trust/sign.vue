<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="编号/姓名/手机号" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>


      <signEdit :data="overallViewData[index]"
                 :dialogFormVisible="dialoginf"
                 @getdialogfv="getdialogfv"
                 :readOnly='true'
                 :pass_id="select_id"
                 :title="title"
                 :buttonClose="buttonClose"
                 :buttonCommit="buttonCommit"
                 @F5="handleCurrentChange"></signEdit>

    </div>
    <el-table
      class="bgc"
      :data="overallViewData"
    >
      <div v-for="data in columntype">
        <singleMenu :coltype="data"></singleMenu>
      </div>


      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">详 情
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
    import signEdit from "./signEdit";
    export default {
        components: {
            singleMenu,
            signEdit,
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                title: "网签过户订单",
                buttonClose: '',
                buttonCommit: '',
                currentPage: 1,
                total: 1,
                select_id: '',
                columntype: [
                    {
                        label: '买方确认时间',
                        width: '110',
                        type: 'buyerConfirmTime',
                    },
                    {
                        label: '订单编号',
                        width: '140',
                        type: 'number',
                    },
                    {
                        label: '房源介绍',
                        width: '160',
                        type: 'houseTitle',
                    },
                    {
                        label: '买方姓名',
                        width: '80',
                        type: 'userName',
                    },
                    {
                        label: '买方手机号码',
                        width: '120',
                        type: 'phone',
                    },
                    {
                        label: '卖方姓名',
                        width: '80',
                        type: 'sellerUserName',
                    },
                    {
                        label: '房产经纪人姓名',
                        width: '80',
                        type: 'hAgentUserName',
                    },

                    {
                        label: '买方提交时间',
                        width: '110',
                        type: 'createTime',
                    },
                    {
                        label: '卖方确认时间',
                        width: '110',
                        type: 'sellerConfirmTime',
                    },
                    {
                        label: '买方支付时间',
                        width: '110',
                        type: 'buyerPayTime',
                    },
                    {
                        label: '经纪人接单时间',
                        width: '110',
                        type: 'acceptTime',
                    },
                    {
                        label: '卖方签署合同时间',
                        width: '110',
                        type: 'sellerSignTime',
                    },
                    {
                        label: '买方签署合同时间',
                        width: '110',
                        type: 'buyerSignTime',
                    },
                    {
                        label: '总部邮寄时间',
                        width: '110',
                        type: 'postTime',
                    },

                    {
                        label: '经纪人完成时间',
                        width: '110',
                        type: 'completeTime',
                    },


                ],
                overallViewData: [],

                dialogadd: false,
                dialogedit: false,
                dialogdel: false,
                dialoginf: false,
                del_id: '',
                form: {
                    number: '',
                    userName: '',
                    id: '',
                    houseTitle:'',
                    sellerUserName:'',
                    totalAmout:'',
                    hAgentUserName:'',

                    acceptTime:'',
                    buyerPayTime:'',
                    sellerConfirmTime:'',
                    createTime:'',
                    reserveTime:'',
                    bonus:'',
                    sellerSignTime:'',
                    buyerSignTime:'',
                    adminConfirmTime:'',
                }
            }
        },
        watch:{
            'search':function () {
                this.delay.delay(()=>{
                    const axios = require('axios');
                    axios.get(`${this.global.config.url}/admin/onlinesignOrders/selectAllOnlinesignOrdersByValue?value=${this.search}&page=${this.currentPage}&size=8`)
                        .then((response) => {
                            console.log(response);
                            this.overallViewData = response.data.data.list;
                            this.total = response.data.data.total

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },500)

            }
        },
        mounted() {
            this.handleCurrentChange()
        },
        methods: {
            handleEdit(index,row) {
                this.index = index
                this.select_id = row.id

                this.dialoginf = true;
            },
            getdialogfv(val) {
                this.dialoginf = val;
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

            handleCurrentChange() {
                const axios = require("axios")
                axios.get(`${this.global.config.url}/admin/onlinesignOrders/selectAllOnlinesignOrders?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        console.log(response);
                        this.overallViewData = response.data.data.list;
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
