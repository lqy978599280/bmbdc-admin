<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="房源名称/地址" v-model="search"></el-input>
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
                // title: ["添加会员", "编辑会员", '审核'],
                buttonClose: '',
                buttonCommit: '',
                currentPage: 1,
                total: 1,
                select_id: '',
                columntype: [

                    {
                        label: '厅是卫生',
                        width: '110',
                        type: 'compose',
                    },

                    // {
                    //     label: '序号',
                    //     width: '60',
                    //     type: 'id',
                    // },
                    {
                        label: '求购信息编号',
                        width: '125',
                        type: 'purHouseNumber',
                    },
                    {
                        label: '求购人姓名',
                        width: '110',
                        type: 'purHouseName',
                    },
                    {
                        label: '求购信息状态',
                        width: '80',
                        type: 'purHouseStatus',
                    },
                    {
                        label: '求购提交时间',
                        width: '110',
                        type: 'purHouseCreateTime',
                    },
                    {
                        label: '求购审核时间',
                        width: '100',
                        type: 'purHouseCheckTime',
                    },
                    {
                        label: '对应房源编号',
                        width: '125',
                        type: 'houseNumber',
                    },
                    {
                        label: '房源人姓名',
                        width: '110',
                        type: 'houseName',
                    },
                    {
                        label: '房源信息状态',
                        width: '80',
                        type: 'houseStatus',
                    },
                    {
                        label: '房源提交时间',
                        width: '110',
                        type: 'houseCreateTime',
                    },
                    {
                        label: '房源审核时间',
                        width: '110',
                        type: 'houseCheckTime',
                    },
                    {
                        label: '房源名称',
                        width: '100',
                        type: 'name',
                    },
                    {
                        label: '房源描述',
                        width: '130',
                        type: 'title',
                    },
                    {
                        label: '具体地址',
                        width: '140',
                        type: 'address',
                    },
                    {
                        label: '面积',
                        width: '80',
                        type: 'areaMeasure',
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
                    return  data.address.match(this.search) || data.name.match(this.search)
                })
            }
        },

        mounted() {
            this.handleCurrentChange()

        },
        methods: {


            handleCurrentChange() {
                const axios = require("axios")
                axios.get(`${this.global.config.url}/admin/houseResources/myRecommendHouses?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        console.log(response);
                        this.flyData = response.data.data.list
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
