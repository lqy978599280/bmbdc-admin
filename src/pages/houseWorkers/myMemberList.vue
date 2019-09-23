<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="昵称/手机号" v-model="search"></el-input>
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
                        width: '140',
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

            }
        },
        computed: {
            filterFlyData: function () {
                return this.flyData.filter((data) => {
                    return  data.phone.match(this.search) || data.nickName.match(this.search)
                })
            }
        },

        mounted() {
            this.handleCurrentChange()

        },
        methods: {


            handleCurrentChange() {
                const axios = require("axios")
                axios.get(`${this.global.config.url}/admin/houseResources/selectAllRefUser?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        console.log(response);
                        this.flyData = response.data.data.refUserList;
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
