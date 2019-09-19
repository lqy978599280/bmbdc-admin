<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="编号/姓名/手机号/区域" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>

    </div>
      <el-table
        class="bgc"
        :data="filterFlyData"
      >
        <div v-for="data in columntype">
          <singleMenu :coltype="data"></singleMenu>
        </div>

        <!--      <singleMenu  :coltype="this.columntype[0]"></singleMenu>-->
        <!--      <singleMenu  :coltype="this.columntype[1]"></singleMenu>-->


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
    import singleMenu from "../../components/singleMenu";
    import houseAgentEdit from "../../components/houseAgentEdit";
    import dialogdel from "../../components/del";

    export default {
        components: {
            singleMenu,
            houseAgentEdit,
            dialogdel,
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                title: ["添加会员", "编辑会员", '审核'],
                buttonClose: '',
                buttonCommit: '',
                currentPage: 1,
                total: 1,
                select_id: '',
                columntype: [

                    {
                        label: '状态',
                        width: '80',
                        type: 'is_fc',
                    },
                    {
                        label: '序号',
                        width: '60',
                        type: 'userName',
                    },
                    {
                        label: '求购信息编号',
                        width: '110',
                        type: 'parentUserName',
                    },
                    {
                        label: '对应房源编号',
                        width: '110',
                        type: 'password',
                    },
                    {
                        label: '房源名称',
                        width: '100',
                        type: 'phone',
                    },
                    {
                        label: '房源描述',
                        width: '130',
                        type: 'nickName',
                    },
                    {
                        label: '具体地址',
                        width: '130',
                        type: 'sex',
                    },
                    {
                        label: '面积',
                        width: '80',
                        type: 'name',
                    }, {
                        label: '厅是卫生',
                        width: '110',
                        type: 'idCard',
                    },
                    {
                        label: '提交时间',
                        width: '100',
                        type: 'balance',
                    },
                    {
                        label: '审核时间',
                        width: '100',
                        type: 'is_fs',
                    },
                    {
                        label: '求购信息发布时间',
                        width: '100',
                        type: 'is_qj',
                    },
                    {
                        label: '求购信息发布人',
                        width: '110',
                        type: 'is_fy',
                    },


                ],
                flyData: [],

                dialogadd: false,
                dialogedit: false,
                dialogdel: false,
                dialoginf: false,
                del_id: '',
                form: {
                    number: '',
                    name: '',
                    phone: '',
                    areaName: "",
                    createTime: '',
                    passTime: '',
                    rejectReason: '',
                    id: '',
                }
            }
        },
        computed: {
            filterFlyData: function () {
                return this.flyData.filter((data) => {
                    return  data.phone.match(this.search)
                })
            }
        },

        mounted() {
            this.handleCurrentChange()

        },
        methods: {


            handleCurrentChange() {
                const axios = require("axios")
                axios.get(`${this.global.config.url}/admin//user//userList?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        console.log(response);
                        this.flyData = response.data.data.userList;
                        this.total = response.data.data.total
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

        }
    }
</script>

<style scoped>
  @import "../../assets/maincss.css";

</style>
