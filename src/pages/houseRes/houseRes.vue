<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="房源编号/房东姓名/联系方式/小区名称" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>
      <el-button class="add bgc" @click='add'>添 加</el-button>
      <houseResEdit :data="form" :dialogFormVisible="dialogadd" @dialogcommit="dialogcommit" @getdialogfv="getdialogfv"
                    :title="title[0]" :buttonClose="buttonClose" :buttonCommit="buttonCommit"></houseResEdit>
      <houseResEdit :data="filterHouseResData[index]" :dialogFormVisible="dialogedit" @dialogcommit="dialogeditcommit"
                    @getdialogfv="getdialogfv" :title="title[1]":buttonClose="buttonClose"
                    :buttonCommit="buttonCommit"></houseResEdit>
      <houseResEdit :data="filterHouseResData[index]" :dialogFormVisible="dialoginf" @dialogcommit="dialogeditcommit"
                    @getdialogfv="getdialogfv" :title="title[2]"  :buttonClose="buttonClose"
                    :buttonCommit="buttonCommit" readOnly="true"></houseResEdit>
      <dialogdel :dialogVisible="dialogdel" :del_id="del_id" @getdialogfv="getdialogfv"
                 @commitdel="commitdel"></dialogdel>
    </div>
    <el-table
      class="bgc"
      :data="filterHouseResData"
    >
      <div v-for="data in columntype">
        <singleMenu :coltype="data"></singleMenu>
      </div>


      <el-table-column label="操作" width="460">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)">详 情
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)">编 辑
          </el-button>

          <el-button
            size="mini"
            @click="authority(scope.$index, scope.row)">上 架
          </el-button>
          <el-button
            size="mini"
            @click="authority(scope.$index, scope.row)">下 架
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="information(scope.$index, scope.row)">审 核
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
    import singleMenu from "../../components/singleMenu";
    import houseResEdit from "../../components/houseResEdit";
    import dialogdel from "../../components/del";
    import authority from "../../components/authority";

    export default {
        components: {
            singleMenu,
            houseResEdit,
            dialogdel,
            authority
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                currentPage:1,
                total:0,
                title: ["添加房源", "编辑房源", '审核'],

                columntype: [
                    {
                        label: '房源性质',
                        width: '100',
                        type: 'houseUsageName',
                    },
                    {
                        label: '房源编号',
                        width: '120',
                        type: 'number',
                    },
                    {
                        label: '房东姓名',
                        width: '80',
                        type: 'name',
                    },
                    {
                        label: '房东手机号码',
                        width: '120',
                        type: 'phone',
                    },
                    {
                        label: '所在区域',
                        width: '120',
                        type: 'areaName',
                    },
                    {
                        label: '小区名称',
                        width: '100',
                        type: 'villageName',
                    },
                    {
                        label: '户型',
                        width: '100',
                        type: 'compose',
                    },
                    {
                        label: '面积(m²)',
                        width: '80',
                        type: 'areaMeasure',
                    },
                    {
                        label: '总价(万)',
                        width: '80',
                        type: 'totalPrice',
                    },
                    {
                        label: '是否满两年',
                        width: '90',
                        type: 'is_twoYear',
                    }
                ],
                houseResData: [],

                dialogadd: false,
                dialogedit: false,
                dialogdel: false,
                dialoginf: false,
                del_id: '',
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
                    matchingNames:[],
                    title:'',
                    tagNames:[],
                    lng: '',
                    lat: '',
                    decorateName:'',
                    oriName:'',
                    otherInformation: '',
                    bedroom: '',
                    livingroom: '',
                    washroom: '',
                    balcony:'',
                    building: '',
                    unit: '',
                    house: '',
                    floor: '',
                    floorAll: ''
                },
                buttonClose: '',
                buttonCommit: ''
            }
        },
        computed: {
            filterHouseResData: function () {
                return this.houseResData.filter((data) => {
                    return data.name.match(this.search) || data.number.match(this.search) || data.phone.match(this.search)
                })
            }
        },

        created() {
            this.handleCurrentChange()
        },
        methods: {

            add() {
                this.dialogadd = true;
                this.buttonClose = '取消'
                this.buttonCommit = '确定'
            },

            information() {
                this.dialoginf = true;
                this.buttonClose = '拒绝'
                this.buttonCommit = '通过'
            },
            handleEdit(index) {
                this.index = index
                this.dialogedit = true;
                this.buttonClose = '取消'
                this.buttonCommit = '确定'
            },
            handleDelete(index, row) {
                this.dialogdel = true
                this.del_id = row.id
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
                this.form = {name: '',
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
                    matchingNames:[],
                    buildYear:'',

                    tagNames:[],
                    lng: '',
                    lat: '',
                    decorateName:'',
                    oriName:'',
                    otherInformation: '',
                    bedroom: '',
                    livingroom: '',
                    washroom: '',
                    balcony:'',

                    building: '',
                    unit: '',
                    house: '',
                    floor: '',
                    floorAll: ''}
                data.matchingNames =data.matchingNames.join(',')
                data.tagNames =data.tagNames.join(',')
                console.log(data);
                axios.post('http://192.168.1.5:8081/admin/house/insertOneHouseMessage', data)
                    .then((response) => {
                        console.log(response);
                        this.message(response)
                        // this.houseResData = response.data.data.houseList;
                        this.handleCurrentChange()
                        this.change()

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            dialogeditcommit(val, data) {
                const axios = require('axios');
                this.dialogedit = val;
                this.dialogadd = val;
                console.log(data);
                this.houseResData[this.index] = data;
                axios.post('http://192.168.1.5:8081/admin/house/updateHouseById', data)
                    .then((response) => {
                        this.message(response)
                        this.handleCurrentChange()

                        this.change()

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            commitdel(val, id) {
                this.dialogdel = val;
                const axios = require('axios');
                // console.log( row.id instanceof Integer )
                axios.get('http://192.168.1.5:8081/admin/house/deleteHouse', {params: {id: id}})
                    .then((response) => {
                        this.message(response)
                        this.handleCurrentChange()
                        this.message(response)
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
            authority() {

            },
            change() {
                for (let i = 0; i < this.houseResData.length; i++) {
                    this.houseResData[i].is_twoYear = this.houseResData[i].is_twoYear == true ? '是' : '否'
                    // this.deptData[i].sex = this.deptData[i].sex==1 ? '男' : '女'
                    this.houseResData[i].matchingNames =(this.houseResData[i].matchingNames==null||this.houseResData[i].matchingNames=='')?'': this.houseResData[i].matchingNames.split(',')
                    this.houseResData[i].tagNames =(this.houseResData[i].tagNames==null||this.houseResData[i].matchingNames=='')?'':this.houseResData[i].tagNames.split(',')
                }
            },
            handleCurrentChange() {
                const axios = require("axios")
                axios.get(`http://192.168.1.5:8081/admin/house/selectAllHouse?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        console.log(response);
                        this.houseResData = response.data.data.houseList;
                        this.total = response.data.data.total

                        this.change()
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
