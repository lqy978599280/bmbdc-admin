<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="房源编号/房东姓名/联系方式" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>



      <buyEdit :data="houseResData[index]" :dialogFormVisible="dialoginf"
                @getdialogfv="getdialogfv" :title="title[2]"
                :readOnly='true' :pass_id="select_id" @F5="handleCurrentChange"></buyEdit>

    </div>
    <el-table
      class="bgc"
      :data="houseResData"
    >
      <div v-for="data in columntype">
        <singleMenu :coltype="data"></singleMenu>
      </div>


      <el-table-column label="操作" width="520">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="information(scope.$index,scope.row)">详 情
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
    import singleMenu from "../../components/singleMenu";
    import buyEdit from "./buyEdit";
    export default {
        components: {
            singleMenu,
            buyEdit,
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                currentPage:1,
                total:1,
                title: ['委托卖方管理'],

                columntype: [
                    {
                        label: '期望楼层',
                        width: '90',
                        type: 'floorDes',
                    },
                    {
                        label: '求购信息编号',
                        width: '125',
                        type: 'number',
                    },
                    {
                        label: '发布人姓名',
                        width: '90',
                        type: 'name',
                    },
                    {
                        label: '手机号码',
                        width: '120',
                        type: 'phone',
                    },
                    {
                        label: '期望区域',
                        width: '110',
                        type: 'areaName',
                    },
                    {
                        label: '期望小区',
                        width: '100',
                        type: 'villageName',
                    },
                    {
                        label: '期望户型',
                        width: '100',
                        type: 'compose',
                    },
                    {
                        label: '期望面积(m²)',
                        width: '80',
                        type: 'areaMeasure',
                    },
                    {
                        label: '期望总价(万)',
                        width: '80',
                        type: 'totalPrice',
                    },


                ],
                houseResData: [],


                dialoginf: false,
                select_id: '',
                form: {
                    name: '',
                    number: '',
                    compose:'',
                    phone: '',
                    areaName: '',
                    villageName: '',
                    areaMeasure: '',
                    totalPrice: '',
                    is_twoYear: '',
                    houseUsageName: '',
                    id: '',
                    buildYear:'',
                    title:'',
                    decorateName:'',
                    oriName:'',
                    otherInformation: '',
                    bedroom: '',
                    livingroom: '',
                    washroom: '',
                    balcony:'',
                    building: '',
                    status:''
                },
                buttonClose: '',
                buttonCommit: ''
            }
        },
        watch:{
            'search':function () {
                this.delay.delay(()=>{
                    const axios = require('axios');
                    axios.get(`${this.global.config.url}/admin/purhouses/selectAllPurhousesByValue?value=${this.search}&page=${this.currentPage}&size=8`)
                        .then((response) => {
                            console.log(response);
                            this.houseResData = response.data.data.list;
                            this.total = response.data.data.total

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },500)

            }
        },
        created() {
            this.handleCurrentChange()
        },
        methods: {
            information(index, row) {
                this.dialoginf = true;
                this.select_id = row.id
            },
            getdialogfv(val) {
                this.dialoginf = val;
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

            handleCurrentChange() {
                const axios = require("axios")
                axios.get(`${this.global.config.url}/admin/purhouses/selectAllPurhouses?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        console.log(response);
                        this.houseResData = response.data.data.list;
                        // console.log(this.houseResData);
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
