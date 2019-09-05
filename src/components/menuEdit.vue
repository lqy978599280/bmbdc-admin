<template>
  <el-dialog :title="name" :visible.sync="dialogif" :before-close='dialogfv'>
    <el-form :model="data">
      <el-form-item label="菜单名称" :label-width="formLabelWidth">
        <el-input v-model="data.menuname" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单编码" :label-width="formLabelWidth">
        <el-input v-model="data.code" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="父级菜单编码" :label-width="formLabelWidth">
        <el-input v-model="data.fa_code" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="请求地址" :label-width="formLabelWidth">
        <el-input v-model="data.path" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="是否菜单" :label-width="formLabelWidth">
        <el-select v-model="data.menuif" placeholder="请选择是否菜单">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="data.status" placeholder="请选择状态">
          <el-option label="启用" value="启用"></el-option>
          <el-option label="未启用" value="未启用"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogfv">取 消</el-button>
      <el-button type="primary" @click="dialogfv">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
    export default {
        name: "menuEdit",
        props: {
            data: {
                menu: '',
                code: '',
                fa_code: "",
                path: "",
                menuif: "",
                status: ''
            },
            dialogFormVisible:'',
            name:''
        },
        computed:{
            dialogif:function () {
                return this.dialogFormVisible
            }
        },
        data(){
            return{
                formLabelWidth: '120px'
            }
        },
        methods:{
            dialogfv(){
                this.$emit('getdialogfv',!this.dialogif)

            }
        }
    }

</script>

<style scoped>
.el-input{
  width: 300px;
}
</style>
