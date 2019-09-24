<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close='dialogfv'   >
    <el-form :model="getdata" style="margin: 0 auto">
      <el-form-item label="名称*" :label-width="formLabelWidth">
        <el-input v-model="getdata.catName" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="关键词*" :label-width="formLabelWidth">
        <el-input v-model="getdata.keywords" auto-complete="off"  ></el-input>
      </el-form-item>
      <el-form-item label="上级分类名称" :label-width="formLabelWidth" >
        <el-select v-model="getdata.pCatName"  filterable placeholder="请选择类别"  style="width: 300px;"  >
          <el-option
            v-for="item in selectName"
            :key="item.id"
            :label="item.catName"
            :value='item.catName+"_"+item.id'
          >
            <span style="float: left">{{ item.catName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="getdata.catDesc" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" :label-width="formLabelWidth">
        <el-radio v-model="getdata.isShow" label="是">是</el-radio>
        <el-radio v-model="getdata.isShow" label="否">否</el-radio>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth">
        <el-input v-model="getdata.sortOrder" auto-complete="off" ></el-input>
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
                catName: '',
                keywords: '',
                catDesc: '',
                pCatName: '',
                createTime: '',
                userName: '',
                sortOrder:'',
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
                    catName: '',
                    keywords: '',
                    catDesc: '',
                    pCatName: '',
                    createTime: '',
                    userName: '',
                    sortOrder:'',
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
                else  if(  this.getdata.sortOrder!==null&& (isNaN(this.getdata.sortOrder) ||this.getdata.sortOrder<0 ||this.getdata.sortOrder>99 ) ){
                    this.$message({
                        message: "排序框请输入数字且在0-99之间",
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
