<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close='dialogfv'   >
    <el-form :model="getdata" style="margin: 0 auto">
      <el-form-item label="名称*" :label-width="formLabelWidth">
        <el-input v-model="getdata.adName" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="关键词*" :label-width="formLabelWidth">
        <el-input v-model="getdata.keyword" auto-complete="off"  ></el-input>
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
                isShow: '',
                adName: '',
                keyword: '',
                lastUpdateBy: '',
                lastUpdateTime: '',
                createTime: '',
                userName: '',
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
                this.getdata = JSON.parse(JSON.stringify(this.data))

            }
        },
        mounted(){
            const axios = require('axios');

            axios.get(`${this.global.config.url}/admin/articleCat/selectAll?page=1&size=8`)
                .then((response)=> {
                    // console.log(response);
                    this.selectName = response.data.data.nameList;
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        data() {
            return {
                getdata: {
                    isShow: '',
                    adName: '',
                    keyword: '',
                    lastUpdateBy: '',
                    lastUpdateTime: '',
                    createTime: '',
                    userName: '',
                    id: '',
                },
                formLabelWidth: '120px',
                selectType:['买房信息','卖房信息'],
                selectName:[]


            }
        },

        methods: {
            dialogfv() {
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {
                }

            },
            dialogcommit() {

                if(this.getdata.catName==='') {
                    this.$message({
                        message: "请输入名称",
                        type: "warning",
                        duration: 1000
                    })
                } else  if(this.getdata.keywords==='') {
                    this.$message({
                        message: "请输入关键词",
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
                    this.$emit('dialogcommit', !this.dialogFormVisible, this.getdata)
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
