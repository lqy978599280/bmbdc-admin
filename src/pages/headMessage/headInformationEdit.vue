<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close='dialogfv'  width="900px"  >
    <el-form :model="getdata" style="margin: 0 auto">
      <el-form-item label="标题*" :label-width="formLabelWidth">
        <el-input v-model="getdata.title" auto-complete="off"  style="padding-right: 40px"></el-input>
        作者
        <el-input v-model="getdata.author" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="关键词*" :label-width="formLabelWidth">
        <el-input v-model="getdata.keywords" auto-complete="off"  style="padding-right: 40px"></el-input>
        排序
        <el-input v-model="getdata.sortOrder" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="头条分类名称" :label-width="formLabelWidth" >
        <el-select v-model="getdata.catName"  filterable placeholder="请选择类别"  style="width: 330px;padding-right: 40px"  >
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
        是否显示
        <el-radio v-model="getdata.isShow" label="是" style="padding-left: 20px">是</el-radio>
        <el-radio v-model="getdata.isShow" label="否">否</el-radio>
      </el-form-item>
<!--      <el-form-item label="作者" :label-width="formLabelWidth">-->

<!--      </el-form-item>-->
<!--      <el-form-item label="是否显示" :label-width="formLabelWidth">-->
<!--        <el-radio v-model="getdata.isShow" label="是">是</el-radio>-->
<!--        <el-radio v-model="getdata.isShow" label="否">否</el-radio>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="排序" :label-width="formLabelWidth">-->

<!--      </el-form-item>-->
      <el-form-item label="内容" :label-width="formLabelWidth">
<!--        <el-input type="textarea" style="height: 200px;font-size: 18px;width: 400px;" rows="7" v-model="getdata.content" ></el-input>-->
        <div style="line-height: 0">
          <editor-bar v-model="getdata.content" :isClear="isClear"></editor-bar>
          <button @click.prevent="getContent">获取文本</button>
        </div>
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
    import EditorBar from "./WangEditor"; // ES6 Module
    export default {
        name: "menuEdit",
        props: {
            data: {
                isShow: '',
                title: '',
                keywords: '',
                userName: '',
                catName: '',
                createTime: '',
                content: '',
                author: '',
                sortOrder:0,
                id: '',
            },
            dialogFormVisible: '',
            title: ''
        },
        components:{EditorBar},
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

            axios.get(`${this.global.config.url}/admin/article/selectAllArticle?page=1&size=8`)
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
                    title: '',
                    keywords: '',
                    userName: '',
                    catName: '',
                    createTime: '',
                    content: '',
                    author: '',
                    sortOrder:0,
                    id: '',
                },
                formLabelWidth: '110px',
                selectType:['买房信息','卖房信息'],
                selectName:[],
                isClear : false,
            }
        },

        methods: {
            getContent(){
                alert(this.getdata.content)
            },
            dialogfv() {
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {}
            },
            dialogcommit() {
                if(this.getdata.title==='') {
                    this.$message({
                        message: "请输入标题",
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
                else  if(isNaN(this.getdata.sortOrder) ||this.getdata.sortOrder<0 ||this.getdata.sortOrder>99 ) {
                    this.$message({
                        message: "请输入数字且在0-99之间",
                        type: "warning",
                        duration: 1000
                    })
                }
                else{
                    this.$emit('dialogcommit', !this.dialogFormVisible, this.getdata)
                }

            },
        }
    }

</script>

<style scoped>
  .el-input {
    width: 330px;
  }

</style>
