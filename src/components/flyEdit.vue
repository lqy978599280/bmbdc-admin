<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="550px" :before-close='dialogfv'   >
    <el-form :model="getdata" style="margin: 0 auto">
      <el-form-item label="飞手社工编号*" :label-width="formLabelWidth">
        <el-input v-model="getdata.number" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="姓名" :label-width="formLabelWidth">
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
      <el-button type="primary" @click="dialogcommit">{{buttonCommit}}</el-button>
    </div>
  </el-dialog>

</template>

<script>
    export default {
        name: "menuEdit",
        props: {
            data: {
                number:'',
                name: '',
                phone: '',
                areaName:"",
                time:'',
                passTime:'',
                rejectReason:'',
                id:'',
            },
            dialogFormVisible: '',
            title: '',
            buttonClose:'',
            buttonCommit:''
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
                    time:'',
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
            axios.get(`${this.global.config.url}/admin/house/selectAllHouseMessage?page=10&size=20`)
                .then((response)=> {
                    this.areasList= response.data.data.areasList
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            innerDiafv(){
                this.rejected = false
            },
            rejectedCommit(reason){
                this.rejected = false
                this.getdata.rejectReason = reason

            },
            dialogfv() {
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {}
            },
            reject(){
                this.rejected = true
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {}
            },
            dialogcommit() {

                this.data = JSON.parse(JSON.stringify(this.getdata))
                // this.getdata = {}

                if(this.getdata.name==='') {
                    this.$message({
                        message: "请填写房东姓名",
                        type: "warning",
                        duration: 1000
                    })
                }

                else{
                    this.$emit('dialogcommit', !this.dialogFormVisible, this.getdata)

                }

            },


        }
    }

</script>

<style scoped>
  .el-input {
    width: 300px;
  }
</style>
