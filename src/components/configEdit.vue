<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close='dialogfv'   >
    <el-form :model="getdata" style="margin: 0 auto">
      <el-form-item label="配置编码*" :label-width="formLabelWidth">
        <el-input v-model="getdata.code" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="配置值*" :label-width="formLabelWidth">
        <el-input v-model="getdata.value" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述*" :label-width="formLabelWidth">
        <el-input v-model="getdata.remark" auto-complete="off"></el-input>
      </el-form-item>
<!--      <el-form-item label="状态" :label-width="formLabelWidth">-->
<!--        <el-radio v-model="getdata.status" label="启用" ></el-radio>-->
<!--        <el-radio v-model="getdata.status" label="未启用" ></el-radio>-->
<!--      </el-form-item>-->

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
                code: "",
                value: '',
                remark: '',
                id: '',
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
                this.getdata.code = this.data.code
                this.getdata.value = this.data.value
                this.getdata.remark = this.data.remark
                this.getdata.id = this.data.id
            }

        },
        data() {
            return {
                getdata: {

                    code: "",
                    value: '',
                    remark: '',
                    id: '',
                },
                formLabelWidth: '120px',



            }
        },

        methods: {
            dialogfv() {
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {
                    code: "",
                    value: '',
                    remark: '',
                    status: '',
                    id: '',
                }
            },
            dialogcommit() {
                this.data.code = this.getdata.code
                this.data.value = this.getdata.value
                this.data.remark = this.getdata.remark
                this.data.id = this.getdata.id
                if(this.data.code==='') {
                    this.$message({
                        message: "请填写配置编码",
                        type: "warning",
                        duration: 1000
                    })
                }else  if(this.data.value==='') {
                    this.$message({
                        message: "请填写配置值",
                        type: "warning",
                        duration: 1000
                    })
                }else  if(this.data.remark==='') {
                    this.$message({
                        message: "请填写相关描述",
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
