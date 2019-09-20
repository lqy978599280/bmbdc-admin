<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="小区名称/飞手姓名" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>


      <flyManaEdit :data="filterFlyData[index]"
                   :dialogFormVisible="dialoginf"
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
    import flyManaEdit from "./flyManaEdit";

    export default {
        components: {
            singleMenu,
            flyManaEdit,
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
                        width: '100',
                        type: 'acceptTime',
                    },
                    {
                        label: '提交时间',
                        width: '100',
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
                        width: '100',
                        type: 'approvalTime',
                    },
                    {
                        label: '被拒时间',
                        width: '100',
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
                    rejectReason: '',
                    id: '',
                    villageName:'',
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
        computed: {
            filterFlyData: function () {
                return this.flyData.filter((data) => {
                    return data.villageName.match(this.search) || data.name.match(this.search)
                })
            }
        },

        mounted() {
            this.handleCurrentChange()

        },
        methods: {

            handleEdit(index,row) {
                this.index = index
                this.select_id = row.number
                switch (this.flyData[this.index].status) {
                    case  '已发布' :
                        this.buttonClose = ''
                        this.buttonCommit = ''

                        break;
                    case  '待提交' :
                        this.buttonClose = '取消订单'
                        this.buttonCommit = '提交'
                        break;
                    case  '待审核' :
                        this.buttonClose = '拒绝'
                        this.buttonCommit = '通过'
                        break;
                    case  '审核通过' :
                        this.buttonClose = ''
                        this.buttonCommit = ''

                        break;
                    case  '审核未通过' :
                        this.buttonClose = ''
                        this.buttonCommit = '重新提交'
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
                for (let i = 0; i < this.flyData.length; i++) {

                    this.flyData[i].status = this.flyData[i].status == 0 ? '已发布' :
                        this.flyData[i].status == 1 ? '待提交' :
                            this.flyData[i].status == 2 ? '待审核' :
                                this.flyData[i].status == 3 ? '审核通过' :
                                    this.flyData[i].status == 4 ? '审核未通过' : ''

                }
            },
            handleCurrentChange() {
                const axios = require("axios")
                axios.get(`${this.global.config.url}/admin/flyerOrders/selectAllFlyerOrders?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        console.log(response);
                        this.flyData = response.data.data.orderList;
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
  @import "../../assets/maincss.css";

</style>
