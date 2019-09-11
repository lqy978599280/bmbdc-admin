<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="550px" :before-close='dialogfv'   >
    <el-form :model="getdata" style="margin: 0 auto">
      <el-form-item label="角色名称*" :label-width="formLabelWidth">
        <el-input v-model="getdata.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input type="textarea" size="small" v-model="getdata.remark"rows="8" auto-complete="off" style="width: 80%"></el-input>
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
                remark: '',
                id:''
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
                this.getdata = JSON.parse(JSON.stringify(this.data))

            }

        },
        data() {
            return {
                getdata: {
                    name: '',
                    remark: '',
                    id:''
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
                // this.data = JSON.parse(JSON.stringify(this.getdata))
                if(this.getdata.name==='') {
                    this.$message({
                        message: "请填写姓名",
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
