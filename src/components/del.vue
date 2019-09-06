<template>
  <el-dialog
    title="确认"
    :visible.sync="dialogif"
    width="30%"
    :before-close="handleClose">
    <span>确认要删除吗</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="deletd">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
    export default {
        props: {
            dialogVisible: '',
            del_id:''
        },
        computed: {
            dialogif:function () {
                return this.dialogVisible
            }
        },data(){
          return{
              del:false
          }
        },
        methods: {
            handleClose() {
                del:false
                this.$emit('getdialogfv', !this.dialogif)
            },
            deletd() {
                del:false
                this.$emit('commitdel', !this.dialogif,this.del_id)

            }
        }
    }
</script>

<style scoped>

</style>
