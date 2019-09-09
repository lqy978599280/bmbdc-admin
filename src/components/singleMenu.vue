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
        type=="email"?scope.row.email:
        type=="sex"?scope.row.sex:
        type=="password"?"******":
        type=="describe"?scope.row.describe:
        type=="parentName"?scope.row.parentName:
        type=="areaName"?scope.row.areaName:
        type=="address"?scope.row.address:
        type=="managerName"?scope.row.managerName:
        type=="describe"?scope.row.describe:
        type=="number"?scope.row.number:
        type=="villageName"?scope.row.villageName:
        type=="areaMeasure"?scope.row.areaMeasure:
        type=="totalPrice"?scope.row.totalPrice:
        type=="is_twoYear"?scope.row.is_twoYear:
        type=="compose"?scope.row.compose:
        type=="houseUsageName"?scope.row.houseUsageName:''


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
