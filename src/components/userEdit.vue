<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="50%" :before-close='dialogfv'   >
    <el-form :model="getdata" style="margin: 0 auto">
      <el-form-item label="登录账号*" :label-width="formLabelWidth">
        <el-input  v-model="getdata.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码(不填默认不变)" :label-width="formLabelWidth">
        <el-input v-model="getdata.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属部门名称*" :label-width="formLabelWidth">
        <el-select v-model="getdata.deptName" placeholder="请选择">
          <el-option
            v-for="item in selectParent"
            :key="item.id"
            :label="item.name"
            :value='item.name+"_"+item.id'
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="getdata.realName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" :label-width="formLabelWidth">
        <el-input v-model="getdata.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio v-model="getdata.sex" label="男" value="1"></el-radio>
        <el-radio v-model="getdata.sex" label="女" value="2"></el-radio>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="getdata.email" auto-complete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogfv">取 消</el-button>
      <el-button type="primary" @click="dialogcommit">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
    export default {
        name: "menuEdit",
        props: {
            data: {
                userName: '',
                password: '',
                deptName:'',
                realName:'',
                phone:'',
                sex:'',
                email:'',
                id:'',
            },
            dialogFormVisible: '',
            title: '',
        },
        computed: {
            dialogif: function () {
                return this.dialogFormVisible
            },

        },
        watch: {
            "dialogFormVisible": function () {
                this.getdata.userName = this.data.userName
                this.getdata.password = ''
                this.getdata.deptName = this.data.deptName
                this.getdata.realName = this.data.realName
                this.getdata.phone = this.data.phone
                this.getdata.sex = this.data.sex
                this.getdata.email = this.data.email
                this.getdata.id = this.data.id
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

                    userName: '',
                    password: '',
                    deptName:'',
                    realName:'',
                    phone:'',
                    sex:'',
                    email:'',
                    id:'',
                },
                formLabelWidth: '180px',
                selectParent:[]


            }
        },

        methods: {
            dialogfv() {
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {
                    name: '',
                    remark: '',
                    id:''
                }
            },
            dialogcommit() {
                this.data.userName = this.getdata.userName
                this.data.password = this.getdata.password
                this.data.deptName = this.getdata.deptName
                this.data.realName = this.getdata.realName
                this.data.phone = this.getdata.phone
                this.data.sex = this.getdata.sex
                this.data.email = this.getdata.email
                this.data.id = this.getdata.id
                if(this.data.userName==='') {
                    this.$message({
                        message: "请填写账号",
                        type: "warning",
                        duration: 1000
                    })
                }
                else if(this.data.deptName==='') {
                    this.$message({
                        message: "请选择部门",
                        type: "warning",
                        duration: 1000
                    })
                }
                else{
                    this.$emit('dialogcommit', !this.dialogFormVisible, this.data)
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
