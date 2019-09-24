<template>
  <el-dialog :title="title" :visible.sync="dialogif" :before-close='dialogfv'   >
    <el-form :model="getdata" style="margin: 0 auto">
      <el-form-item label="菜单名称*" :label-width="formLabelWidth">
        <el-input v-model="getdata.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单编码*" :label-width="formLabelWidth">
        <el-input v-model="getdata.code" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="父级菜单编码*" :label-width="formLabelWidth">
        <el-select v-model="getdata.parentCode" placeholder="请选择">
          <el-option
            v-for="item in selectParent"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
          </el-option>
        </el-select>

      </el-form-item>

      <el-form-item label="请求地址" :label-width="formLabelWidth">
        <el-input v-model="getdata.url" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="是否菜单*" :label-width="formLabelWidth">
      <el-radio v-model="getdata.isMenu" label="是" >是</el-radio>
      <el-radio v-model="getdata.isMenu" label="否" >否</el-radio>

      </el-form-item>
      <el-form-item label="图标地址" :label-width="formLabelWidth">
        <el-input v-model="getdata.icon" auto-complete="off"></el-input>

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
                name: '',
                code: '',
                parentCode: '',
                url: '',
                isMenu: '',
                status: '',
                icon: '',
                id: '',
                parentid:''

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
                this.getdata.name = this.data.name
                this.getdata.code = this.data.code
                this.getdata.parentCode = this.data.parentCode
                this.getdata.parentid = this.data.parentid
                this.getdata.url = this.data.url
                this.getdata.isMenu = this.data.isMenu
                this.getdata.icon = this.data.icon
                this.getdata.id =this.data.id
            }

        },
        data() {
            return {
                getdata: {
                    name: '',
                    code: '',
                    parentCode: '',
                    url: '',
                    isMenu:  '',
                    status: '',
                    icon:'',
                    id:'',
                    parentid:''

                },
                formLabelWidth: '120px',
                selectParent:[]
            }
        },
        mounted(){
            const axios = require('axios');
            axios.get(`${this.global.config.url}/admin/menus/selectAllMenuOfParentid`)
                .then((response)=> {
                    // console.log(response);
                    this.selectParent = response.data.data.result;
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        methods: {
            dialogfv() {
                this.$emit('getdialogfv', !this.dialogif)
                this.getdata = {
                    name: '',
                    code: '',
                    parentCode: '',
                    url: '',
                    isMenu:  '',
                    status: '',
                    icon:'',
                    id:'',
                    parentid:''

                }
            },
            dialogcommit() {
                this.data.name = this.getdata.name
                this.data.code = this.getdata.code
                this.data.parentCode = this.getdata.parentCode
                this.data.parentid = this.getdata.parentid
                this.data.url = this.getdata.url
                this.data.isMenu = this.getdata.isMenu
                this.data.status = this.getdata.status
                this.data.icon = this.getdata.icon
                this.data.id = this.getdata.id
                if(this.data.code==='') {
                    this.$message({
                        message: "请填写菜单编码",
                        type: "warning",
                        duration: 1000
                    })
                }
                else if(this.data.name==='') {
                    this.$message({
                        message: "请填写菜单名称",
                        type: "warning",
                        duration: 1000
                    })
                } else if(this.data.parentCode==='') {
                    this.$message({
                        message: "请选择父级",
                        type: "warning",
                        duration: 1000
                    })
                }
                else{

                    this.$emit('dialogcommit', !this.dialogif, this.data,)

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
