<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close='dialogfv'   >
    <el-form :model="getdata" style="margin: 0 auto">
      <el-form-item label="登录账号*" :label-width="formLabelWidth">
        <el-input v-model="getdata.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="登录密码*" :label-width="formLabelWidth">
        <el-input v-model="getdata.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属部门名称" :label-width="formLabelWidth">
        <el-input v-model="getdata.deptName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="getdata.realName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" :label-width="formLabelWidth">
        <el-input v-model="getdata.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-input v-model="getdata.sex" auto-complete="off"></el-input>
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
            title: ''
        },
        computed: {
            dialogif: function () {
                return this.dialogFormVisible
            },

        },
        watch: {
            "dialogFormVisible": function () {
                this.getdata.userName = this.data.userName
                this.getdata.password = this.data.password
                this.getdata.deptName = this.data.deptName
                this.getdata.realName = this.data.realName
                this.getdata.phone = this.data.phone
                this.getdata.sex = this.data.sex
                this.getdata.email = this.data.email
                this.getdata.id = this.data.id
            }

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
                formLabelWidth: '120px',



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
                this.getdata.userName = this.data.userName
                this.getdata.password = this.data.password
                this.getdata.deptName = this.data.deptName
                this.getdata.realName = this.data.realName
                this.getdata.phone = this.data.phone
                this.getdata.sex = this.data.sex
                this.getdata.email = this.data.email
                this.getdata.id = this.data.id
                if(this.data.name==='') {
                    this.$message({
                        message: "请填写角色编码",
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
