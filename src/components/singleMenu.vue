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
        type=="value"?scope.row.value:
        type=="villageName"?scope.row.villageName:
        type=="areaMeasure"?scope.row.areaMeasure:
        type=="totalPrice"?scope.row.totalPrice:
        type=="is_twoYear"?scope.row.is_twoYear:
        type=="compose"?scope.row.bedroom+'室'+scope.row.livingroom+'厅'+scope.row.washroom+'卫':
        type=="houseUsageName"?scope.row.houseUsageName:
        type=="time"?scope.row.time:
        type=="status"?scope.row.status:
        type=="createTime"?scope.row.createTime:
        type=="passTime"?scope.row.passTime:
        type=="mergername"?scope.row.mergername:
        type=="shortname"?scope.row.shortname:
        type=="mergershortname"?scope.row.mergershortname:
        type=="pinyin"?scope.row.pinyin:
        type=="lat"?scope.row.lat:
        type=="lng"?scope.row.lng:
        type=="id"?scope.row.id:
        type=="parentid"?scope.row.parentid:
        type=="nickName"?scope.row.nickName:
        type=="balance"?scope.row.balance:
        type=="is_fs"?scope.row.is_fs:
        type=="is_fc"?scope.row.is_fc:
        type=="is_fy"?scope.row.is_fy:
        type=="is_qj"?scope.row.is_qj:
        type=="idCard"?scope.row.idCard:
        type=="isActive"?scope.row.isActive:
        type=="acceptTime"?scope.row.acceptTime:
        type=="submitTime"?scope.row.submitTime:
        type=="totalAmout"?scope.row.totalAmout:
        type=="bonus"?scope.row.bonus:
        type=="approvalTime"?scope.row.approvalTime:
        type=="rejectTime"?scope.row.rejectTime:
        ''


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
