<template>
  <el-dialog :title="name" :visible.sync="dialogif" :before-close='dialogfv'>
    <el-form :model="getdata">
      <el-form-item label="菜单名称" :label-width="formLabelWidth">
        <el-input v-model="getdata.menuname" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单编码" :label-width="formLabelWidth">
        <el-input v-model="getdata.code" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="父级菜单编码" :label-width="formLabelWidth">
        <el-input v-model="getdata.fa_code" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="请求地址" :label-width="formLabelWidth">
        <el-input v-model="getdata.path" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="是否菜单" :label-width="formLabelWidth">
        <el-select v-model="getdata.menuif" placeholder="请选择是否菜单">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="getdata.status" placeholder="请选择状态">
          <el-option label="启用" value="启用"></el-option>
          <el-option label="未启用" value="未启用"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogfv">取 消</el-button>
      <el-button type="primary" @click="dialogcommit" >确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
    export default {
        name: "menuEdit",
        props: {
            data: {
                menuname: '',
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
            },
            // editdata:function () {
            //     return this.data
            // }
        },
      watch:{
          "dialogFormVisible":function () {
            this.getdata.menuname=this.data.menuname
            this.getdata.code= this.data.code
            this.getdata.fa_code= this.data.fa_code
            this.getdata.path= this.data.path
            this.getdata.menuif= this.data.menuif
            this.getdata.status= this.data.status
          }

      },
        data(){
            return{
              getdata:{
                menuname:this.data.menuname,
                code: this.data.code,
                fa_code: this.data.fa_code,
                path: this.data.path,
                menuif: this.data.menuif,
                status: this.data.status,
              },
              formLabelWidth: '120px'
            }
        },
        methods:{
            dialogfv(){
              this.$emit('getdialogfv',!this.dialogif)
            },
            dialogcommit(){
                this.data.menuname= this.getdata.menuname
                this.data.code= this.getdata.code
                this.data.fa_code= this.getdata.fa_code
                this.data.path= this.getdata.path
                this.data.menuif= this.getdata.menuif
                this.data.status= this.getdata.status
                this.$emit('dialogcommit',!this.dialogif,this.data)
            },
        }
    }

</script>

<style scoped>
.el-input{
  width: 300px;
}
</style>
