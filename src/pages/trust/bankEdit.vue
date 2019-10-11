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
        <el-input v-model="getdata.sellerCheckTime" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="买方支付时间" :label-width="formLabelWidth">
        <el-input v-model="getdata.buyerPayTime" auto-complete="off" style="padding-right: 100px;"></el-input>
        社工接单时间
        <el-input v-model="getdata.acceptTime" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="经纪人完成时间" :label-width="formLabelWidth">
        <el-input v-model="getdata.completeTime" auto-complete="off" style="padding-right: 100px;"></el-input>
        买方确实时间
        <el-input v-model="getdata.buyerCheckTime" auto-complete="off"></el-input>
      </el-form-item>


    </el-form>

  </el-dialog>

</template>

<script>
    import passEdit from "../../components/passEdit";
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
                buyerCheckTime:'',
                completeTime:'',
                acceptTime:'',
                buyerPayTime:'',
                sellerCheckTime:'',
                createTime:'',
                reserveTime:'',
                bonus:'',

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
                    buyerCheckTime:'',
                    completeTime:'',
                    acceptTime:'',
                    buyerPayTime:'',
                    sellerCheckTime:'',
                    createTime:'',
                    reserveTime:'',
                    bonus:'',

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
