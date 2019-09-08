<template>
  <el-table-column
    :label = "coltype.label"
    :width = "coltype.width"
    align="center"
  >
    <template slot-scope="scope" >
      <span style="text-align: center;display: inline-block;width:100%" >{{
        type=="name"?scope.row.name:
        type=="code"?scope.row.code:
        type=="parentCode"?scope.row.parentCode:
        type=="url"?scope.row.url:
        type=="isMenu"?scope.row.isMenu :
        type=="icon"?scope.row.icon:
        type=="remark"?scope.row.remark:
        type=="roleName"?scope.row.roleName:
        type=="userName"?scope.row.userName:
        type=="deptName"?scope.row.deptName:
        type=="realName"?scope.row.realName:
        type=="phone"?scope.row.phone:
        type=="status"?scope.row.status:
        type=="email"?scope.row.email:
        type=="sex"?scope.row.sex:
        type=="password"?scope.row.password:
        type=="deptname"?scope.row.deptname:
        type=="parentdeptname"?scope.row.parentdeptname:
        type=="areaname"?scope.row.areaname:
        type=="address"?scope.row.address:
        type=="deptleadername"?scope.row.deptleadername:
        type=="configcode"?scope.row.configcode:
        type=="confignum"?scope.row.confignum:
        type=="describe"?scope.row.describe:''

        }}</span>
    </template>
  </el-table-column>
</template>

<script>
    export default {
        name: "singleMenu",
        props: {
          coltype:{
              label:'',
              width:'',
              type:'',
            },
        },
        data(){
            return {
                type : this.coltype.type,

            }
        }
    }
</script>

<style scoped>

</style>
