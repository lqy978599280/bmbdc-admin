<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="550px" :before-close='dialogfv'   >
    <passEdit :rejected="rejected" @getinnerDiafv="innerDiafv" @rejectedCommit="rejectedCommit"></passEdit>

    <el-form :model="getdata" style="margin: 0 auto" :disabled="readOnly">
      <el-form-item label="房源社工编号" :label-width="formLabelWidth" v-show="title!=='添加房源社工'" >
        <el-input v-model="getdata.number" auto-complete="off" disabled></el-input>
      </el-form-item>

      <el-form-item label="姓名*" :label-width="formLabelWidth">
        <el-input v-model="getdata.name" auto-complete="off"></el-input>

      </el-form-item>

      <el-form-item label="手机号码*" :label-width="formLabelWidth">
        <el-input v-model="getdata.phone" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="申请区域*" :label-width="formLabelWidth">
        <el-select v-model="getdata.areaName"  filterable placeholder="可输入快捷搜索"  style="width: 300px;">
          <el-option
            v-for="item in areasList"
            :key="item.id"
            :label="item.mergername"
            :value='item.mergername+"_"+item.id'
          >
            <span style="float: left">{{ item.mergername }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
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
    import passEdit from "./passEdit";

    export default {
        name: "menuEdit",
        components:{passEdit},
        props: {
            data: {
                number:'',
                name: '',
                phone: '',
                areaName:"",
                createTime:'',
                passTime:'',
                rejectReason:'',
                id:'',
            },
            dialogFormVisible: '',
            title: '',
            buttonClose:'',
            buttonCommit:'',
            readOnly:false,
            pass_id:''

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
                    number:'',
                    name: '',
                    phone: '',
                    areaName:"",
                    createTime:'',
                    passTime:'',
                    rejectReason:'',
                    id:'',
                },
                formLabelWidth: '120px',
                rejected: false,
                areasList:[]



            }
        },
        mounted(){
            const axios = require('axios');
            axios.get(`${this.global.config.url}/admin/flyingHand/selectAllAreaName?page=10&size=20`)
                .then((response)=> {
                    // console.log(response);
                    this.areasList= response.data.data.areaList
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
                        rejectReason:this.getdata.rejectReason
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
                }else if (this.getdata.phone === '') {
                    this.$message({
                        message: "请填写社工手机号码",
                        type: "warning",
                        duration: 1000
                    })
                }else if (this.getdata.area === '') {
                    this.$message({
                        message: "请选择社工区域",
                        type: "warning",
                        duration: 1000
                    })
                }
                else {
                    this.$emit('dialogcommit', !this.dialogFormVisible, this.getdata)

                }

            },
            onSelected(data) {
                this.area = data.province.value + ' ' + data.city.value + ' ' + data.area.value
                // console.log(data.province);
            },

            pass(){
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
    width: 300px;
  }
</style>
