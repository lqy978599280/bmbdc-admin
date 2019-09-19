<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="800px" :before-close='dialogfv'>
    <passEdit :rejected="rejected" @getinnerDiafv="innerDiafv" @rejectedCommit="rejectedCommit"></passEdit>

    <el-form :model="getdata" style="margin: 0 auto" :disabled="readOnly">
      <el-form-item label="订单编号" :label-width="formLabelWidth" v-show="title!=='添加房产经纪人'">
        <el-input v-model="getdata.number" auto-complete="off" disabled style="width: 600px;"></el-input>
      </el-form-item>

      <el-form-item label="房源信息" :label-width="formLabelWidth">
        <el-input v-model="getdata.houseTitle" auto-complete="off" style="width: 600px;"></el-input>

      </el-form-item>

      <el-form-item label="飞手姓名" :label-width="formLabelWidth">
        <el-input v-model="getdata.name" auto-complete="off" style="padding-right: 85px;"></el-input>
        任务发布人姓名
        <el-input v-model="getdata.adminUserName" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="订单金额" :label-width="formLabelWidth">
        <el-input v-model="getdata.totalamout" auto-complete="off" style="padding-right: 130px;"></el-input>
        收益金额
        <el-input v-model="getdata.bonus" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="发布时间" :label-width="formLabelWidth">
        <el-input v-model="getdata.publishTime" auto-complete="off" style="padding-right: 130px;"></el-input>
        接单时间
        <el-input v-model="getdata.acceptTime" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="提交时间" :label-width="formLabelWidth">
        <el-input v-model="getdata.submitTime" auto-complete="off" style="padding-right: 130px;"></el-input>
        通过时间
        <el-input v-model="getdata.approvalTime" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="被拒时间" :label-width="formLabelWidth">
        <el-input v-model="getdata.rejectTime" auto-complete="off" style="padding-right: 130px;"></el-input>
        订单状态
        <el-input v-model="getdata.status" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="被拒原因" :label-width="formLabelWidth">
        <el-input v-model="getdata.rejectReason" auto-complete="off" disabled style="width: 600px;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="status0" v-show="buttonClose ==='取消订单'">{{buttonClose}}</el-button>
      <el-button @click="reject" v-show="buttonClose === '拒绝'">{{buttonClose}}</el-button>

      <el-button type="primary" @click="status2" v-show="buttonCommit ==='提交'">{{buttonCommit}}</el-button>
      <el-button type="primary" @click="status3" v-show="buttonCommit === '通过'">{{buttonCommit}}</el-button>
      <el-button type="primary" @click="status2" v-show="buttonCommit === '重新提交'">{{buttonCommit}}</el-button>
    </div>
  </el-dialog>

</template>

<script>
    import passEdit from "../../components/passEdit";

    export default {
        name: "menuEdit",
        components: {passEdit},
        props: {
            data: {
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
                },
                formLabelWidth: '120px',
                rejected: false,
                areasList: []


            }
        },

        methods: {
            innerDiafv() {
                this.rejected = false
            },
            rejectedCommit(reason) {
                this.rejected = false
                this.getdata.rejectReason = reason
                // console.log(reason);
                const axios = require('axios');
                axios.post(`${this.global.config.url}/admin/flyerOrders/examineOrder`, {
                        id: this.pass_id,
                        rejectReason: this.getdata.rejectReason
                    }
                )
                    .then((response) => {
                        console.log(response);
                        this.$emit('F5')
                        this.message(response)


                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            dialogfv() {
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {}
            },
            reject() {
                this.rejected = true
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


            statusChangeCommit() {
                this.$emit('getdialogfv', !this.dialogFormVisible)
                const axios = require('axios');
                axios.post(`${this.global.config.url}/admin/flyerOrders/examineOrder`, {
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
