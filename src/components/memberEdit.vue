<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="50%" :before-close='dialogfv'   >
    <el-form :model="getdata" style="margin: 0 auto" :disabled="readOnly">
      <el-form-item label="登录账号*" :label-width="formLabelWidth">
        <el-input  v-model="getdata.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码*" :label-width="formLabelWidth">
        <el-input v-model="getdata.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码*" :label-width="formLabelWidth">
        <el-input v-model="getdata.phone" auto-complete="off"></el-input>

      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="getdata.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="getdata.nickName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" :label-width="formLabelWidth">
        <el-input v-model="getdata.idCard" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio v-model="getdata.sex" label="男" ></el-radio>
        <el-radio v-model="getdata.sex" label="女" ></el-radio>
      </el-form-item>
      <el-form-item label="飞手社工" :label-width="formLabelWidth">
        <el-radio v-model="getdata.is_fs" label="是" ></el-radio>
        <el-radio v-model="getdata.is_fs" label="否" ></el-radio>
      </el-form-item>
      <el-form-item label="全景社工" :label-width="formLabelWidth">
        <el-radio v-model="getdata.is_qj" label="是" ></el-radio>
        <el-radio v-model="getdata.is_qj" label="否" ></el-radio>
      </el-form-item>
      <el-form-item label="房源社工" :label-width="formLabelWidth">
        <el-radio v-model="getdata.is_fy" label="是" ></el-radio>
        <el-radio v-model="getdata.is_fy" label="否" ></el-radio>
      </el-form-item>
      <el-form-item label="房产经纪人" :label-width="formLabelWidth">
        <el-radio v-model="getdata.is_fc" label="是" ></el-radio>
        <el-radio v-model="getdata.is_fc" label="否" ></el-radio>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogfv" >{{buttonClose}}</el-button>
      <el-button type="primary" @click="dialogcommit" >{{buttonCommit}}</el-button>
    </div>
  </el-dialog>

</template>

<script>
    export default {
        name: "menuEdit",
        props: {
            data: {
                is_fc: '',
                is_fy: '',
                is_qj: '',
                is_fs: "",
                balance: '',
                name: '',
                idCard: '',
                sex: '',
                nickName: '',
                phone: '',
                password: '',
                parentUserName: '',
                userName: '',
                isActive: '',
                uid: '',
            },
            dialogFormVisible: '',
            title: '',
            readOnly:false,
            buttonClose:'',
            buttonCommit:'',
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
        mounted(){
            const axios = require('axios');
            axios.get(`${this.global.config.url}/admin/depts/selectAllDepts?page=1&size=100`)
                .then((response)=> {
                    // console.log(response);
                    this.selectParent = response.data.data.deptList;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        data() {
            return {
                getdata: {
                    is_fc: '',
                    is_fy: '',
                    is_qj: '',
                    is_fs: "",
                    balance: '',
                    name: '',
                    idCard: '',
                    sex: '',
                    nickName: '',
                    phone: '',
                    password: '',
                    parentUserName: '',
                    userName: '',
                    isActive: '',
                    uid: '',
                },
                formLabelWidth: '180px',
                selectParent:[]


            }
        },

        methods: {
            dialogfv() {
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {

                }
            },
            dialogcommit() {

                if(this.getdata.userName==='') {
                    this.$message({
                        message: "请填写账号",
                        type: "warning",
                        duration: 1000
                    })
                }
                else if(this.getdata.password==='') {
                    this.$message({
                        message: "请输入密码",
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
