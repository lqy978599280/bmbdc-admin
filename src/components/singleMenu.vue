<template>
  <el-table-column
    :label = "data.label"
    :width = "data.width">
    <template slot-scope="scope" >
      <span style="margin-left: 10px" >{{type == 'menu'?scope.row.menu: type=='code'? scope.row.code:type=='fa_code'?scope.row.fa_code:type=='path'?scope.row.path:type=='menuif'?scope.row.menuif:type=='status'?scope.row.status:''}}</span>
    </template>
  </el-table-column>
</template>

<script>
    export default {
        name: "singleMenu",
        props: {
            data: {
                label:'',
                width:'',
                type:'',
                menu: '',
                code: '',
                fa_code: "",
                path: "",
                menuif: "",
                status:""
            }
        },
        data(){
            return {
                type : this.data.type
            }
        },
        computed:{
            class: function () {
                console.log(this.data.type);
                return this.data.type

            }
        }
    }
</script>

<style scoped>

</style>
