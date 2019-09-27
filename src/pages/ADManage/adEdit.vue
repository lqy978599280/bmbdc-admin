<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close='dialogfv'   >
    <el-form :model="getdata" style="margin: 0 auto">
      <el-form-item label="标题*" :label-width="formLabelWidth">
        <el-input v-model="getdata.title" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="图片URL*" :label-width="formLabelWidth">
        <el-input v-model="getdata.imgUrl" auto-complete="off"  ></el-input>
      </el-form-item>
      <el-form-item label="跳转链接URL*" :label-width="formLabelWidth" >
        <el-input v-model="getdata.linkUrl" auto-complete="off"  ></el-input>
      </el-form-item>
      <el-form-item label="广告分类名称" :label-width="formLabelWidth" >
        <el-select v-model="getdata.adName"  filterable placeholder="请选择类别"  style="width: 400px;"  >
          <el-option
            v-for="item in selectName"
            :key="item.id"
            :label="item.adName"
            :value='item.adName+"_"+item.id'
          >
            <span style="float: left">{{ item.adName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
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
                title: '',
                linkUrl: '',
                userName: '',
                adName: '',

                imgUrl: '',
                createTime: '',
                sortOrder:0,
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

            axios.get(`${this.global.config.url}/admin/AdContent/selectAllAdContent?page=1&size=8`)
                .then((response)=> {
                    // console.log(response);
                    this.selectName = response.data.data.adList;
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        data() {
            return {
                getdata: {
                    isShow: '',
                    title: '',
                    adName: '',
                    linkUrl: '',
                    userName: '',
                    imgUrl: '',
                    createTime: '',
                    sortOrder:0,
                    id: '',
                },
                formLabelWidth: '120px',
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

                if(this.getdata.title==='') {
                    this.$message({
                        message: "请输入标题",
                        type: "warning",
                        duration: 1000
                    })
                } else  if(this.getdata.imgUrla==='') {
                    this.$message({
                        message: "请输入URL",
                        type: "warning",
                        duration: 1000
                    })
                }
                else  if(isNaN(this.getdata.sortOrder) ||this.getdata.sortOrder<0 ||this.getdata.sortOrder>99 ) {
                    this.$message({
                        message: "请输入数字且在0-99之间",
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
    width: 400px;
  }
</style>
