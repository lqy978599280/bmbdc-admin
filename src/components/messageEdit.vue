<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close='dialogfv'   >
    <el-form :model="getdata" style="margin: 0 auto">
      <el-form-item label="标题*" :label-width="formLabelWidth">
        <el-input v-model="getdata.title" auto-complete="off"  :disabled="title =='编辑消息'"></el-input>
      </el-form-item>
      <el-form-item label="接收人姓名*" :label-width="formLabelWidth">
        <el-select v-model="getdata.name"  filterable placeholder="请选择姓名"  style="width: 300px;" :disabled="title =='编辑消息'">
          <el-option
            v-for="item in selectName"
            :key="item.id"
            :label="item.name"
            :value='item.name+"_"+item.uid'
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.uid }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息分类名称" :label-width="formLabelWidth" >
        <el-select v-model="getdata.msgType"  filterable placeholder="请选择类别"  style="width: 300px;"  :disabled="title =='编辑消息'">
          <el-option
            v-for="item in selectType"
            :key="item"
            :label="item"
            :value='item'
          >
            <span style="float: left">{{ item}}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息内容" :label-width="formLabelWidth">
        <el-input v-model="getdata.msgContent" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="跳转路径" :label-width="formLabelWidth">
        <el-input v-model="getdata.routeUrl" auto-complete="off"></el-input>
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
                routeUrl: '',
                title: '',
                msgType: '',
                msgContent: '',
                status: '',
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

            axios.get(`${this.global.config.url}/admin/message/selectAllMessage?page=1&size=8`)
                .then((response)=> {
                    console.log(response);
                    this.selectName = response.data.data.nameList;
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        data() {
            return {
                getdata: {

                    name: '',
                    routeUrl: '',
                    title: '',
                    msgType: '',
                    msgContent: '',
                    status: '',
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

                if(this.getdata.name==='') {
                    this.$message({
                        message: "请填写部门名称",
                        type: "warning",
                        duration: 1000
                    })
                } else  if(this.getdata.name==='') {
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
