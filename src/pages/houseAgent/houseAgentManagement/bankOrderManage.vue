<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="编号/姓名/手机号" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>


      <BOMList :data="overallViewData[index]"
                           :dialogFormVisible="dialoginf"
                           @getdialogfv="getdialogfv"
                           :readOnly='true'
                           :pass_id="select_id"
                           :title="title"
                           :buttonClose="buttonClose"
                           :buttonCommit="buttonCommit"
                           @F5="handleCurrentChange"></BOMList>

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
    import singleMenu from "../../../components/singleMenu";
import BOMList from "./BOMList";
    export default {
        components: {
            singleMenu,
            BOMList,
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                title: "银行按揭订单",
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
                        label: '房源介绍',
                        width: '160',
                        type: 'houseTitle',
                    },
                    {
                        label: '买方姓名',
                        width: '90',
                        type: 'name',
                    },
                    {
                        label: '买方手机号码',
                        width: '140',
                        type: 'phone',
                    },
                    {
                        label: '卖方姓名',
                        width: '90',
                        type: 'name',
                    },
                    {
                        label: '房产经纪人姓名',
                        width: '90',
                        type: 'name',
                    },
                    {
                        label: '订单金额',
                        width: '80',
                        type: 'totalAmout',
                    },
                    {
                        label: '预约时间',
                        width: '100',
                        type: 'acceptTime',
                    },
                    {
                        label: '买方提交时间',
                        width: '100',
                        type: 'acceptTime',
                    },
                    {
                        label: '卖方确认时间',
                        width: '100',
                        type: 'acceptTime',
                    },
                    {
                        label: '买方支付时间',
                        width: '100',
                        type: 'acceptTime',
                    },
                    {
                        label: '经纪人接单时间',
                        width: '100',
                        type: 'acceptTime',
                    },
                    {
                        label: '经纪人完成时间',
                        width: '100',
                        type: 'acceptTime',
                    },
                    {
                        label: '买方确认时间',
                        width: '100',
                        type: 'acceptTime',
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
                    name: '',
                    rejectReason: '',
                    id: '',
                    houseTitle:'',
                    adminUserName:'',
                    totalamout:'',
                    bonus:'',
                    publishTime:'',
                    acceptTime:'',
                    submitTime:'',
                    approvalTime:'',
                    rejectTime:'',
                }
            }
        },
        // computed: {
        //     filteroverallViewData: function () {
        //         return this.overallViewData.filter((data) => {
        //             return data.houseTitle.match(this.search) || data.name.match(this.search)
        //         })
        //     }
        // },
        watch:{
            'search':function () {
                this.delay.delay(()=>{
                    const axios = require('axios');
                    axios.get(`${this.global.config.url}/admin/adList/selectAllAdListByValue?value=${this.search}&page=${this.currentPage}&size=8`)
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
                this.select_id = row.number
                switch (this.overallViewData[this.index].status) {
                    case  '已发布' :
                        this.buttonClose = ''
                        this.buttonCommit = ''
                        break;
                    case  '待卖方确认' :
                        this.buttonClose = '取消'
                        this.buttonCommit = '确认'
                        break;
                    case  '待卖方支付' :
                        this.buttonClose = ''
                        this.buttonCommit = '支付'
                        break;
                    case  '待接单' :
                        this.buttonClose = ''
                        this.buttonCommit = '立即抢单'
                        break;
                    case  '待经纪人完成' :
                        this.buttonClose = ''
                        this.buttonCommit = '完成'
                        break;
                    case  '待买方确实' :
                        this.buttonClose = ''
                        this.buttonCommit = '确认'
                        break;
                }
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
            change() {
                for (let i = 0; i < this.overallViewData.length; i++) {

                    this.overallViewData[i].status = this.overallViewData[i].status == 0 ? '已发布' :
                        this.overallViewData[i].status == 1 ? '待提交' :
                            this.overallViewData[i].status == 2 ? '待审核' :
                                this.overallViewData[i].status == 3 ? '审核通过' :
                                    this.overallViewData[i].status == 4 ? '审核未通过' : ''

                }
            },
            handleCurrentChange() {
                const axios = require("axios")
                axios.get(`${this.global.config.url}/admin/wholesceneOrders/selectAllOrder?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        console.log(response);
                        this.overallViewData = response.data.data.list;
                        this.total = response.data.data.total
                        this.change()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

        }
    }
</script>

<style scoped>
  @import "../../../assets/maincss.css";

</style>
