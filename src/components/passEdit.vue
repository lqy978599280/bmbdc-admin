<template>
  <el-dialog
    title="输入被拒的理由"
    :visible.sync="rejected"
    width="30%"
    :before-close="innerDiafv"
    append-to-body >
    <el-input type="textarea" style="height: 200px;font-size: 18px" rows="7" v-model="rejectReason" ></el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="innerDiafv">取 消</el-button>
    <el-button type="primary" @click="rejectedCommit">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
    export default {
        name: "passEdit",
        props:{
            rejected:'',
        },
        data(){
          return{
              rejectReason:""
          }
        },
        methods:{
            innerDiafv(){
                this.$emit('getinnerDiafv', !this.rejected)
                this.rejectReason=''

            },
            rejectedCommit(){
                this.$emit('rejectedCommit',this.rejectReason)
                this.rejectReason=''
            }

        }
    }
</script>

<style scoped>

</style>
