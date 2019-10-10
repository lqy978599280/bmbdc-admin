<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="750px" :before-close='dialogfv'>



    <div class="basic" v-show="show===1">


      <el-form :model="getdata" :disabled="readOnly" style="margin: 0 auto">
        <el-form-item label="全景拍摄编号" :label-width="formLabelWidth">
          <el-input v-model="getdata.number" auto-complete="off" style="width: 400px;margin-right: 60px"></el-input>
        </el-form-item>

        <el-form-item label="房源编号" :label-width="formLabelWidth">
          <el-input v-model="getdata.houseNumber" auto-complete="off" style="width: 400px;margin-right: 60px"></el-input>
        </el-form-item>

        <el-form-item label="发布人姓名" :label-width="formLabelWidth">
          <el-input v-model="getdata.userName" auto-complete="off" style="width: 400px;margin-right: 60px"></el-input>
        </el-form-item>

        <el-form-item label="发布用户姓名" :label-width="formLabelWidth">
          <el-input v-model="getdata.phone" auto-complete="off" style="width: 400px;"></el-input>
        </el-form-item>



        <el-form-item label="全景拍摄社工姓名" :label-width="formLabelWidth">

          <el-input v-model="getdata.wholeSceneUserName" auto-complete="off" style="width: 400px;"></el-input>


        </el-form-item>


        <el-form-item label="审核用户姓名" :label-width="formLabelWidth">
          <el-input v-model="getdata.adminUserName" auto-complete="off" style="width: 400px;"></el-input>

        </el-form-item>



        <el-form-item label="房产经纪人姓名" class="border" :label-width="formLabelWidth">
          <el-input v-model="getdata.bedroom" auto-complete="off" style="width: 400px;"></el-input>

        </el-form-item>

        <el-form-item label=" 发布时间" :label-width="formLabelWidth">
          <el-input v-model="getdata.publishTime" style="width: 400px;  margin-right: 55px" auto-complete="off"></el-input>
        </el-form-item>


        <el-form-item label="社工接单时间" :label-width="formLabelWidth">
          <el-input v-model="getdata.acceptTime" auto-complete="off" style="width: 400px;"></el-input>
        </el-form-item>

        <el-form-item label="社工提交时间" :label-width="formLabelWidth">
          <el-input v-model="getdata.submitTime" auto-complete="off" style="width: 400px;"></el-input>
        </el-form-item>

        <el-form-item label="后台审核通过时间" :label-width="formLabelWidth">
          <el-input v-model="getdata.approvalTime" auto-complete="off" style="width: 400px;"></el-input>
        </el-form-item>

        <el-form-item label="后台审核拒绝时间" :label-width="formLabelWidth">
          <el-input v-model="getdata.rejectTime" auto-complete="off" style="width: 400px;"></el-input>
        </el-form-item>

        <el-form-item label="被拒原因" :label-width="formLabelWidth">
          <el-input v-model="getdata.rejectReason" auto-complete="off" style="width: 400px;"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>

</template>

<script>
    import VDistpicker from 'v-distpicker'
    import VueAMap from "vue-amap";

    let amapManager = new VueAMap.AMapManager();
    export default {

        name: "menuEdit",
        props: {
            data: {
                userName: '',
                number: '',
                houseNumber: '',

                compose:'',
                phone: '',
                rejectReason: '',
                adminUserName: '',
                wholeSceneUserName: '',
                publishTime: '',
                acceptTime: '',
                submitTime: '',
                id: '',
                approvalTime:'',
                rejectTime:'',
                status:''
            },
            dialogFormVisible: '',
            title: '',
            buttonClose: '',
            buttonCommit: '',
            readOnly: false,
            pass_id:''
        },
        components: {
            VDistpicker,

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
        mounted() {
            // console.log(this.$refs);
            const axios = require('axios');
            axios.get(`${this.global.config.url}/admin/house/selectAllHouseMessage?page=10&size=20`)
                .then((response) => {
                    // console.log(response);
                    this.houseUsageList = response.data.data.houseUsageList
                    this.houseOrientationList = response.data.data.houseOrientationList
                    this.houseDecorateList = response.data.data.houseDecorateList
                    this.tagList = response.data.data.tagList
                    this.matchingList = response.data.data.matchingList
                    this.areasList = response.data.data.areasList
                    this.villagesList = response.data.data.villagesList

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        data() {
            let self = this;
            return {
                getdata: {
                    userName: '',
                    number: '',
                    houseNumber: '',
                    compose:'',
                    phone: '',
                    rejectReason: '',
                    adminUserName: '',
                    wholeSceneUserName: '',
                    publishTime: '',
                    acceptTime: '',
                    submitTime: '',
                    id: '',
                    approvalTime:'',
                    rejectTime:'',
                    status:''
                },
                formLabelWidth: '160px',
                show: 1,
                area: '',
                map: false,
                rejected: false,
                areasList: [],
                houseUsageList: [],
                houseOrientationList: [],
                houseDecorateList: [],
                tagList: [],
                matchingList: [],
                villagesList: [],
                if_upload:false,
            }
        },

        methods: {



            dialogfv() {
                this.map = false;
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {}
                // console.log(this.getdata);
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
    width: 300px;
  }

  .button {
    margin-bottom: 20px;
  }

  .el-form {

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .el-form-item {
    margin-bottom: 3px;
  }

  .el-form-item__content {
    margin-left: 100px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-input {
    width: 180px;
    margin: 3px 10px;
    /*height: 30px;*/
  }

  .el-checkbox {
    margin-left: 10px;
  }

  .device {
    margin-left: 10px;

  }

  .amap-wrapper {
    width: 720px;
    height: 400px;
    margin: 15px 0;
    padding-left: 10px;
  }

  .footer {
    display: flex;
    justify-content: center;
  }

  .footer > button {
    margin: 0 30px;
  }

  hr {
    margin: 5px 0 5px 0;
  }

  .img > div {
    font-size: 21px;
    margin: 0 0;
  }

  .border > .el-input {
    border-left: none !important;
    border-top: none;
    border-right: none;
    outline: none;
  }

  .img_child {
    margin-bottom: 20px;
  }
</style>

