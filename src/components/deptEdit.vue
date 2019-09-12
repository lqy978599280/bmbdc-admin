<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close='dialogfv'   >
    <el-form :model="getdata" style="margin: 0 auto">
      <el-form-item label="部门名称*" :label-width="formLabelWidth">
        <el-input v-model="getdata.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="上级部门名称*" :label-width="formLabelWidth">
        <el-select v-model="getdata.parentName" placeholder="请选择">
          <el-option
            v-for="item in selectParent"
            :key="item.id"
            :label="item.name"
            :value='item.name+"_"+item.id'
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域名称" :label-width="formLabelWidth" >
        <el-select v-model="getdata.areaName" filterable placeholder="请选择">
          <el-option
            v-for="item in selectArea"
            :key="item.id"
            :label="item.mergershortname"
            :value="item.mergershortname"
          >
            <span style="float: left">{{ item.mergershortname }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" :label-width="formLabelWidth">
        <el-input v-model="getdata.address" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人姓名" :label-width="formLabelWidth">
        <el-input v-model="getdata.managerName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" :label-width="formLabelWidth">
        <el-input v-model="getdata.phone" auto-complete="off"></el-input>
      </el-form-item>
<!--      <el-form-item label="状态" :label-width="formLabelWidth">-->
<!--        <el-radio v-model="getdata.isMenu" label="启用" ></el-radio>-->
<!--        <el-radio v-model="getdata.isMenu" label="未启用" ></el-radio>-->
<!--      </el-form-item>-->

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
                parentName: '',
                areaName: '',
                address: '',
                managerName: '',
                status: '',
                phone: '',
                id: '',
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
                this.getdata.parentName = this.data.parentName
                this.getdata.areaName = this.data.areaName
                this.getdata.name = this.data.name
                this.getdata.address = this.data.address
                this.getdata.managerName = this.data.managerName
                this.getdata.status = this.data.status
                this.getdata.phone = this.data.phone
                this.getdata.id = this.data.id
            }

        },
        mounted(){
            const axios = require('axios');
            axios.get(`${this.global.config.url}/admin/depts/selectAllDepts?page=1&size=100`)
                .then((response)=> {
                    // console.log(response);
                    this.selectParent = response.data.data.deptList;
                })
                .catch(function (error) {
                    console.log(error);
                });
            axios.get(`${this.global.config.url}/admin/depts/findAllArea`)
                .then((response)=> {
                    // console.log(response);
                    this.selectArea = response.data.data.areaList;
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        data() {
            return {
                getdata: {

                    name: '',
                    parentName: '',
                    areaName: '',
                    address: '',
                    managerName: '',
                    status: '',
                    phone: '',
                    id: '',
                },
                formLabelWidth: '120px',
                selectParent:[],
                selectArea:[]


            }
        },

        methods: {
            dialogfv() {
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {
                    name: '',
                    parentName: '',
                    areaName: '',
                    address: '',
                    managerName: '',
                    status: '',
                    phone: '',
                    id: '',
                }

            },
            dialogcommit() {
                this.data.parentName = this.getdata.parentName
                this.data.areaName = this.getdata.areaName
                this.data.address = this.getdata.address
                this.data.status = this.getdata.status
                this.data.phone = this.getdata.phone
                this.data.managerName = this.getdata.managerName
                this.data.name = this.getdata.name
                this.data.id = this.getdata.id
                if(this.data.name==='') {
                    this.$message({
                        message: "请填写部门名称",
                        type: "warning",
                        duration: 1000
                    })
                } else  if(this.data.name==='') {
                    this.$message({
                        message: "请选择上级部门",
                        type: "warning",
                        duration: 1000
                    })
                }
                // else if(this.data.parentName.indexOf("_")!==-1) {
                //     this.$message({
                //         message: "部门名称不允许带有_",
                //         type: "warning",
                //         duration: 1000
                //     })
                // }

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
