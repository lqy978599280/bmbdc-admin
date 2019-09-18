<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="800px" :before-close='dialogfv'>
    <passEdit :rejected="rejected" @getinnerDiafv="innerDiafv" @rejectedCommit="rejectedCommit"></passEdit>

    <el-form :model="getdata" style="margin: 0 auto" :disabled="readOnly">
      <el-form-item label="订单编号" :label-width="formLabelWidth" v-show="title!=='添加房产经纪人'">
        <el-input v-model="getdata.number" auto-complete="off" disabled style="width: 600px;"></el-input>
      </el-form-item>

      <el-form-item label="小区名称" :label-width="formLabelWidth">
        <el-input v-model="getdata.villageName" auto-complete="off" style="width: 600px;"></el-input>

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
      <el-button @click="dialogfv" v-show="buttonClose!=='拒绝'">{{buttonClose}}</el-button>
      <el-button @click="reject" v-show="buttonClose === '拒绝'">{{buttonClose}}</el-button>
      <el-button type="primary" @click="dialogcommit" v-show="buttonClose!=='拒绝'">{{buttonCommit}}</el-button>
      <el-button type="primary" @click="pass" v-show="buttonClose === '拒绝'">{{buttonCommit}}</el-button>
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
                phone: '',
                areaName: "",
                createTime: '',
                passTime: '',
                rejectReason: '',
                id: '',
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
                    phone: '',
                    areaName: "",
                    createTime: '',
                    passTime: '',
                    rejectReason: '',
                    id: '',
                },
                formLabelWidth: '120px',
                rejected: false,
                areasList: []


            }
        },
        mounted() {
            const axios = require('axios');
            axios.get(`${this.global.config.url}/admin/flyingHand/selectAllAreaName?page=10&size=20`)
                .then((response) => {
                    // console.log(response);
                    this.areasList = response.data.data.areaList
                })
                .catch(function (error) {
                    console.log(error);
                });
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
                axios.post(`${this.global.config.url}/admin/flyingHand/flyingHandExamine`, {
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
                this.map = false;
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {}
            },
            reject() {
                this.rejected = true
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {}
            },
            dialogcommit() {

                // this.data = JSON.parse(JSON.stringify(this.getdata))
                // this.getdata = {}
                this.map = false;

                if (this.getdata.name === '') {
                    this.$message({
                        message: "请填写社工姓名",
                        type: "warning",
                        duration: 1000
                    })
                } else if (this.getdata.phone === '') {
                    this.$message({
                        message: "请填写社工手机号码",
                        type: "warning",
                        duration: 1000
                    })
                } else if (this.getdata.area === '') {
                    this.$message({
                        message: "请选择社工区域",
                        type: "warning",
                        duration: 1000
                    })
                } else {
                    this.$emit('dialogcommit', !this.dialogFormVisible, this.getdata)

                }

            },


            pass() {
                this.$emit('getdialogfv', !this.dialogFormVisible)
                const axios = require('axios');
                axios.post(`${this.global.config.url}/admin/flyingHand/flyingHandExamine`, {
                        id: this.pass_id
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
