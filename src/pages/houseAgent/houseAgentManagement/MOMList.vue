<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="800px" :before-close='dialogfv'>

    <el-form :model="getdata" style="margin: 0 auto" :disabled="readOnly">
      <el-form-item label="订单编号" :label-width="formLabelWidth" v-show="title!=='添加房产经纪人'">
        <el-input v-model="getdata.number" auto-complete="off" disabled style="width: 600px;"></el-input>
      </el-form-item>

      <el-form-item label="房源介绍" :label-width="formLabelWidth">
        <el-input v-model="getdata.houseTitle" auto-complete="off" style="width: 600px;"></el-input>

      </el-form-item>


      <el-form-item label="卖方姓名" :label-width="formLabelWidth">
        <el-input v-model="getdata.sellerUserName" auto-complete="off" style="padding-right: 85px;"></el-input>
        任务发布人姓名
        <el-input v-model="getdata.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="房产经纪人姓名" :label-width="formLabelWidth">
        <el-input v-model="getdata.hAgentUserName" auto-complete="off" style="width: 600px;"></el-input>
      </el-form-item>

      <el-form-item label="买方发布时间" :label-width="formLabelWidth">
        <el-input v-model="getdata.createTime" auto-complete="off" style="padding-right: 100px;"></el-input>
        卖方确认时间
        <el-input v-model="getdata.sellerConfirmTime" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="买方支付时间" :label-width="formLabelWidth">
        <el-input v-model="getdata.buyerPayTime" auto-complete="off" style="padding-right: 100px;"></el-input>
        社工接单时间
        <el-input v-model="getdata.acceptTime" auto-complete="off"></el-input>
      </el-form-item>


      <el-form-item label="卖方签署时间" :label-width="formLabelWidth">
        <el-input v-model="getdata.sellerSignTime" auto-complete="off" style="padding-right: 100px;"></el-input>
        买方签署时间
        <el-input v-model="getdata.buyerSignTime" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="财务确认时间" :label-width="formLabelWidth">
        <el-input v-model="getdata.adminConfirmTime" auto-complete="off" style="padding-right: 130px;"></el-input>
        订单状态
        <el-input v-model="getdata.status" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="订单金额" :label-width="formLabelWidth">
        <el-input v-model="getdata.totalAmout" auto-complete="off" style="padding-right: 130px;"></el-input>
        收益金额
        <el-input v-model="getdata.bonus" auto-complete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="status0" v-show="getdata.status ==='待卖方确认'&&buttonClose">{{buttonClose}}</el-button>


      <el-button type="primary" @click="status2" v-show="getdata.status ==='待卖方确认'">{{buttonCommit}}</el-button>
      <el-button type="primary" @click="status3" v-show="getdata.status ==='待买方支付'">{{buttonCommit}}</el-button>
      <el-button type="primary" @click="status4" v-show="getdata.status ==='待房产经纪人接单'">{{buttonCommit}}</el-button>
      <el-button type="primary" @click="status5" v-show="getdata.status ==='待买卖双方签署合同'">{{buttonCommit}}</el-button>
      <el-button type="primary" @click="status6" v-show="getdata.status ==='待财务确认'">{{buttonCommit}}</el-button>

    </div>
  </el-dialog>

</template>

<script>
    import passEdit from "../../../components/passEdit";
    const axios = require('axios');
    export default {
        name: "menuEdit",
        components: {passEdit},
        props: {
            data: {
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

            },
            dialogFormVisible: '',
            title: '',
            buttonClose: '',
            buttonCommit: '',
            readOnly: false,
            pass_id: ''

        },
        computed: {
            dialogif: function () {
                return this.dialogFormVisible
            },

        },
        watch: {
            "dialogFormVisible": function () {
                this.getdata = JSON.parse(JSON.stringify(this.data))

            }

        },
        data() {
            return {
                getdata: {
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
                },
                formLabelWidth: '120px',
                areasList: []


            }
        },

        methods: {

            dialogfv() {
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {}
            },

            status0(){
                this.getdata.status = 0
                this.statusChangeCommit()
            },
            status2(){
                this.getdata.status = 2
                this.statusChangeCommit()
            },
            status3(){
                this.getdata.status = 3
                this.statusChangeCommit()
            },
            status1(){
                this.getdata.status = 1
                this.statusChangeCommit()
            },
            status4(){
                this.getdata.status = 4
                this.statusChangeCommit()
            },
            status5(){
                this.getdata.status = 5
                this.statusChangeCommit()
            },
            status6(){
                this.getdata.status = 6
                this.statusChangeCommit()
            },

            statusChangeCommit() {
                this.$emit('getdialogfv', !this.dialogFormVisible)

                axios.post(`${this.global.config.url}/admin/djcontractOrders/updateStatus`, {
                        id: this.pass_id,
                        status:this.getdata.status
                    }
                )
                    .then((response) => {
                        // console.log(response);
                        this.$emit('F5')
                        this.message(response)
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

        }
    }

</script>

<style scoped>
  .el-input {
    width: 200px;
  }
</style>
