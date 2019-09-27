<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="账号/手机号码/昵称" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>
      <el-button class="add bgc" @click="add">添 加</el-button>
      <memberEdit :data="form"
                      :dialogFormVisible="dialogadd"
                      @dialogcommit="dialogcommit"
                      @getdialogfv="getdialogfv"
                      :title="title[0]"
                      :buttonClose="buttonClose"
                      :buttonCommit="buttonCommit"></memberEdit>
      <memberEdit :data="flyData[index]"
                      :dialogFormVisible="dialogedit"
                      @dialogcommit="dialogeditcommit"
                      @getdialogfv="getdialogfv"
                      :title="title[1]"
                      :buttonClose="buttonClose"
                      :buttonCommit="buttonCommit"></memberEdit>
      <memberEdit :data="flyData[index]"
                      :dialogFormVisible="dialoginf"
                      @dialogcommit="dialogeditcommit"
                      @getdialogfv="getdialogfv"
                      :readOnly='true'
                      :pass_id="select_id"
                      :title="title[2]"
                      :buttonClose="buttonClose"
                      :buttonCommit="buttonCommit"
                      @F5="handleCurrentChange"></memberEdit>
      <dialogdel :dialogVisible="dialogdel"
                 :del_id="select_id"
                 @getdialogfv="getdialogfv"
                 @commitdel="commitdel"></dialogdel>
    </div>
    <el-table
      class="bgc"
      :data="flyData"
    >
      <div v-for="data in columntype">
        <singleMenu :coltype="data"></singleMenu>
      </div>

      <el-table-column label="操作" width="450">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="inf(scope.$index,scope.row)">详 情
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)">编 辑
          </el-button>


          <el-button
            size="mini"
            type="primary"
            @click="initPassword(scope.$index, scope.row)">重置密码
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删 除
          </el-button>
        </template>


      </el-table-column>

    </el-table>
    <div class="block" style="display: flex;justify-content: center">

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="8"
        layout="prev, pager, next, jumper"
        :total="this.total">
      </el-pagination>
    </div>
  </div>


</template>

<script>
    import singleMenu from "../components/singleMenu";
    import memberEdit from "../components/memberEdit";
    import dialogdel from "../components/del";

    export default {
        components: {
            singleMenu,
            dialogdel,
            memberEdit
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                title: ["添加会员", "编辑会员", '详情'],
                buttonClose: '',
                buttonCommit: '',
                currentPage: 1,
                total: 1,
                select_id: '',
                columntype: [

                    {
                        label: '是否启用',
                        width: '80',
                        type: 'isActive',
                    },
                    {
                        label: '账号',
                        width: '120',
                        type: 'userName',
                    },
                    {
                        label: '上级账号',
                        width: '100',
                        type: 'parentUserName',
                    },
                    {
                        label: '密码',
                        width: '80',
                        type: 'password',
                    },
                    {
                        label: '手机号码',
                        width: '130',
                        type: 'phone',
                    },
                    {
                        label: '昵称',
                        width: '110',
                        type: 'nickName',
                    },
                    {
                        label: '性别',
                        width: '60',
                        type: 'sex',
                    },
                    {
                        label: '真实姓名',
                        width: '100',
                        type: 'name',
                    }, {
                        label: '身份证号码',
                        width: '120',
                        type: 'idCard',
                    },
                    {
                        label: '余额',
                        width: '100',
                        type: 'balance',
                    },
                    {
                        label: '是否飞手社工',
                        width: '100',
                        type: 'is_fs',
                    },
                    {
                        label: '是否全景社工',
                        width: '100',
                        type: 'is_qj',
                    },
                    {
                        label: '是否房源社工',
                        width: '100',
                        type: 'is_fy',
                    },
                    {
                        label: '是否房产经纪人',
                        width: '115',
                        type: 'is_fc',
                    },

                ],
                flyData: [],

                dialogadd: false,
                dialogedit: false,
                dialogdel: false,
                dialoginf: false,
                del_id: '',
                init_id:'',
                form: {
                    is_fc: '',
                    is_fy: '',
                    is_qj: '',
                    is_fs: "",
                    balance: '',
                    name: '',
                    idCard: '',
                    sex: '',
                    nickName: '',
                    phone: '',
                    password: '',
                    parentUserName: '',
                    userName: '',
                    isActive: '',
                    uid: '',
                }
            }
        },
        watch:{
            'search':function () {
                this.delay.delay(()=>{
                    const axios = require('axios');
                    axios.get(`${this.global.config.url}/admin/user/selectAllUsersByValue?value=${this.search}&page=${this.currentPage}&size=8`)
                        .then((response) => {
                            console.log(response);
                            this.flyData = response.data.data.list;
                            this.total = response.data.data.total

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },500)

            }
        },

        mounted() {
            this.handleCurrentChange()

        },
        methods: {

            add() {
                this.dialogadd = true;
                this.buttonClose = '取消'
                this.buttonCommit = '确定'
            },

            inf(index,row){
                this.index = index
                this.dialoginf = true;
                this.buttonClose = '拒绝'

                this.buttonCommit = '通过'
                this.select_id = row.uid

            },
            handleEdit(index) {
                this.index = index
                this.dialogedit = true;
                this.buttonClose = '取消'
                this.buttonCommit = '确定'
            },
            handleDelete(index, row) {
                this.dialogdel = true
                this.select_id = row.uid
            },
            getdialogfv(val) {
                this.dialogedit = val;
                this.dialogadd = val;
                this.dialogdel = val;
                this.dialoginf = val;
            },
            dialogcommit(val, data) {
                const axios = require('axios');
                this.dialogedit = val;
                this.dialogadd = val;
                // this.tableData.push(data)
                this.form = {
                    is_fc: '',
                    is_fy: '',
                    is_qj: '',
                    is_fs: "",
                    balance: '',
                    name: '',
                    idCard: '',
                    sex: '',
                    nickName: '',
                    phone: '',
                    password: '',
                    parentUserName: '',
                    userName: '',
                    isActive: '',
                    uid: '',
                }
                axios.post(`${this.global.config.url}/admin/user/insertUser`, data)
                    .then((response) => {
                        console.log(response);
                        this.message(response)
                        this.handleCurrentChange()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            dialogeditcommit(val, data) {
                const axios = require('axios');
                this.dialogedit = val;
                this.dialogadd = val;
                // console.log(data);
                this.flyData[this.index] = data;
                axios.post(`${this.global.config.url}/admin/user/updateUser`, data)
                    .then((response) => {
                        this.message(response)
                        this.handleCurrentChange()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            commitdel(val, id) {
                this.dialogdel = val;
                const axios = require('axios');
                // console.log( row.id instanceof Integer )
                console.log(id);
                axios.get(`${this.global.config.url}/admin/user/deleteUser`, {params: {uid: id}})
                    .then((response) => {
                        this.message(response)
                        this.handleCurrentChange()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            message(response) {
                let type = false;
                if (response.data.code === 0) {
                    type = "success"
                } else type = "warning"
                this.$message({
                    message: response.data.message,
                    type: type,
                    duration: 1000
                })
            },
            change() {
                for (let i=0,len = this.flyData.length;i<len;i++){
                    if(this.flyData[i].idCard){
                        this.flyData[i].idCard = this.flyData[i].idCard.substr(0,4)+"****"+this.flyData[i].idCard.substr(14,4)
                    }
                    if(this.flyData[i].password){
                        this.flyData[i].password = "******"
                    }
                }
            },

            handleCurrentChange() {
                const axios = require("axios")
                axios.get(`${this.global.config.url}/admin/user/selectAllUsers?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        console.log(response);
                        this.flyData = response.data.data.list;
                        this.change()
                        this.total = response.data.data.total
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            initPassword(index,row){
                this.init_id = row.uid
                const axios = require('axios');

                axios.get(`${this.global.config.url}/admin/user/updatePassword`, {params: {uid: this.init_id}})
                    .then((response) => {
                        this.message(response)
                        this.handleCurrentChange()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>
  @import "../assets/maincss.css";

</style>
