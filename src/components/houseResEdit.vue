<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close='dialogfv'   >
    <el-form :model="getdata" style="margin: 0 auto">
      <el-form-item label="房源编号*" :label-width="formLabelWidth">
        <el-input v-model="getdata.deptName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="上级部门名称*" :label-width="formLabelWidth">
        <el-input v-model="getdata.parentDeptName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属区域名称" :label-width="formLabelWidth">
        <el-input v-model="getdata.areaName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" :label-width="formLabelWidth">
        <el-input v-model="getdata.address" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人姓名" :label-width="formLabelWidth">
        <el-input v-model="getdata.deptLeaderName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" :label-width="formLabelWidth">
        <el-input v-model="getdata.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-input v-model="getdata.status" auto-complete="off"></el-input>
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
                number: '',
                compose: '',
                phone: '',
                areaName: '',
                villageName: '',
                areaMeasure: '',
                totalPrice: '',
                is_twoYear: '',
                houseUsageName: '',
                id:'',
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
                this.getdata.name = this.data.name
                this.getdata.number = this.data.number
                this.getdata.compose = this.data.compose
                this.getdata.areaName = this.data.areaName
                this.getdata.villageName = this.data.villageName
                this.getdata.areaMeasure = this.data.areaMeasure
                this.getdata.phone = this.data.phone
                this.getdata.is_twoYear = this.data.is_twoYear
                this.getdata.houseUsageName = this.data.houseUsageName
                this.getdata.id = this.data.id
            }

        },
        data() {
            return {
                getdata: {

                    name: '',
                    number: '',
                    compose: '',
                    phone: '',
                    areaName: '',
                    villageName: '',
                    areaMeasure: '',
                    totalPrice: '',
                    is_twoYear: '',
                    houseUsageName: '',
                    id:'',
                },
                formLabelWidth: '120px',



            }
        },

        methods: {
            dialogfv() {
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {
                    name: '',
                    number: '',
                    compose: '',
                    phone: '',
                    areaName: '',
                    villageName: '',
                    areaMeasure: '',
                    totalPrice: '',
                    is_twoYear: '',
                    houseUsageName: '',
                    id:'',
                }
            },
            dialogcommit() {
                this.data.name = this.getdata.name
                this.data.number = this.getdata.number
                this.data.compose = this.getdata.compose
                this.data.areaName = this.getdata.areaName
                this.data.villageName = this.getdata.villageName
                this.data.areaMeasure = this.getdata.areaMeasure
                this.data.phone = this.getdata.phone
                this.data.is_twoYear= this.getdata.is_twoYear
                this.data.houseUsageName = this.getdata.houseUsageName
                this.data.id = this.getdata.id
                if(this.data.name==='') {
                    this.$message({
                        message: "请填写角色编码",
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
