
<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="房源编号/房东姓名/联系方式" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>
      <el-button class="add bgc" @click='add' v-show="!dispatchStatus">添 加</el-button>
      <el-button class="add bgc" @click='dispatchIds' v-show="dispatchStatus">确 认</el-button>
      <villageEdit :data="form" :dialogFormVisible="dialogadd" @dialogcommit="dialogcommit" @getdialogfv="getdialogfv"
                    :title="title[0]" :buttonClose="buttonClose" :buttonCommit="buttonCommit"></villageEdit>
      <villageEdit :data="filterHouseResData[index]" :dialogFormVisible="dialogedit" @dialogcommit="dialogeditcommit"
                    @getdialogfv="getdialogfv" :title="title[1]":buttonClose="buttonClose"
                    :buttonCommit="buttonCommit"></villageEdit>
      <villageEdit :data="filterHouseResData[index]" :dialogFormVisible="dialoginf" @dialogcommit="dialogeditcommit"
                    @getdialogfv="getdialogfv" :title="title[2]"  :buttonClose="buttonClose"
                    :buttonCommit="buttonCommit" :readOnly='true' :pass_id="select_id" @F5="handleCurrentChange"></villageEdit>
      <dialogdel :dialogVisible="dialogdel" :del_id="select_id" @getdialogfv="getdialogfv"
                 @commitdel="commitdel"></dialogdel>
    </div>
    <el-table
      class="bgc"
      :data="filterHouseResData"
      @selection-change="out"
    >
      <div >
          <el-table-column type="selection" >
          </el-table-column>
      </div>

      <template v-for="data in columntype">
        <singleMenu :coltype="data"></singleMenu>
      </template>


      <el-table-column label="操作" width="520" v-if="!dispatchStatus">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="information(scope.$index)">详 情
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)">编 辑
          </el-button>


          <el-button
            size="mini"
            type="primary"
            @click.prevent="dispatch(scope.$index, scope.row)">派 单
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
    /**
     * 小区模块
     */
    import singleMenu from "../components/singleMenu";
    import villageEdit from "../components/villageEdit";
    import dialogdel from "../components/del";
    import authority from "../components/authority";
    export default {
        components: {
            singleMenu,
            villageEdit,
            dialogdel,
            authority
        },
        data() {
            return {
                searching: '',
                search: '',
                index: 0,
                currentPage:1,
                total:1,
                title: ["添加房源", "编辑房源", '审核'],

                columntype: [

                    {
                        label: '小区编号',
                        width: '120',
                        type: 'number',
                    },
                    {
                        label: '名称',
                        width: '80',
                        type: 'name',
                    },
                    {
                        label: '所在区域',
                        width: '110',
                        type: 'areaName',
                    },
                    {
                        label: '详细地址',
                        width: '100',
                        type: 'adress',
                    },
                    {
                        label: '经度',
                        width: '100',
                        type: 'lat',
                    },
                    {
                        label: '纬度',
                        width: '100',
                        type: 'lng',
                    },
                    {
                        label: '面积(m²)',
                        width: '80',
                        type: 'buildArea',
                    },

                    {
                        label: '开发商',
                        width: '100',
                        type: 'developName',
                    },
                    {
                        label: '绿化率(%)',
                        width: '90',
                        type: 'greenPercent',
                    },
                    {
                        label: '物业费(/m²)',
                        width: '100',
                        type: 'propertyFee',
                    },
                ],
                houseResData: [],
                ids:[],
                dialogadd: false,
                dialogedit: false,
                dialogdel: false,
                dialoginf: false,
                dispatchStatus:false,
                select_id: '',
                form: {
                    name: '',
                    number: '',
                    id: '',
                    lng: '',
                    lat: '',
                    building: '',
                    status:'',
                    title:'',
                    areaName:'',
                    address:'',
                    buildArea:'',
                    planArea:'',
                    developName:'',
                    propertyName:'',
                    greenPercent:'',
                    volumePercent:'',
                    propertyType:'',
                    BuildType:'',
                    statFamilyNumus:'',
                    parkingNum:'',
                    HouseRight:'',
                    buildYear:'',
                    speDesc:'',
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

            information(index, row) {
                this.dialoginf = true;
                this.buttonClose = '拒绝'
                this.buttonCommit = '通过'
                this.select_id = row.id

            },
            dispatch(index,row){
              this.dispatchStatus = true
            },
            dispatchIds(){
                this.dispatchStatus = false
                console.log(this.ids);

            },
            handleEdit(index) {
                this.index = index
                this.dialogedit = true;
                this.buttonClose = '取消'
                this.buttonCommit = '确定'
            },
            handleDelete(index, row) {
                this.dialogdel = true
                this.select_id = row.id
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
                this.form = {}
                data.matchingNames =data.matchingNames.join(',')
                data.tagNames =data.tagNames.join(',')
                console.log(data);
                axios.post(`${this.global.config.url}/admin/house/insertOneHouseMessage`, data)
                    .then((response) => {
                        this.message(response)
                        // this.houseResData = response.data.data.houseList;
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
                console.log(data);
                this.houseResData[this.index] = data;
                data.matchingNames =data.matchingNames.join(',')
                data.tagNames =data.tagNames.join(',')
                axios.post(`${this.global.config.url}/admin/house/updateHouseById`, data)
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
                axios.get(`${this.global.config.url}/admin/house/deleteHouse`, {params: {id: id}})
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
            authority() {

            },
            change() {
                for (let i = 0; i < this.houseResData.length; i++) {
                    this.houseResData[i].is_twoYear = this.houseResData[i].is_twoYear == true ? '是' : '否'
                    // this.deptData[i].sex = this.deptData[i].sex==1 ? '男' : '女'
                    // console.log(this.houseResData[i].status);
                    this.houseResData[i].status = this.houseResData[i].status == 0 ?'审核中':
                        this.houseResData[i].status == 1 ?'审核通过':
                            this.houseResData[i].status == 2 ?'审核未通过':
                                this.houseResData[i].status == 3 ?'上架':
                                    this.houseResData[i].status == 4 ?'下架':
                                        this.houseResData[i].status == 5 ?'删除':''

                    // if(!(this.houseResData[i].matchingNames==null||this.houseResData[i].matchingNames==''))
                    if(this.houseResData[i].matchingNames==null||this.houseResData[i].matchingNames=='' || this.houseResData[i].matchingNames.length ==0){
                        this.houseResData[i].matchingNames=[]
                        // console.log(this.houseResData[i].matchingNames);

                    }
                    else {
                        this.houseResData[i].matchingNames = this.houseResData[i].matchingNames.split(',')
                    }

                    // if(!(this.houseResData[i].tagNames==null||this.houseResData[i].tagNames==''))
                    if(this.houseResData[i].tagNames==null|| this.houseResData[i].tagNames=='' || this.houseResData[i].tagNames.length ==0){
                        this.houseResData[i].tagNames=[]
                        // console.log(this.houseResData[i].tagNames,this.houseResData[i].tagNames.length);
                    }
                    else
                    {
                        this.houseResData[i].tagNames = this.houseResData[i].tagNames.split(',')
                    }



                    if( this.houseResData[i].imgList.length>0)
                        for(let j=0,len=this.houseResData[i].imgList.length;j<len;j++){
                            this.houseResData[i].imgList[j].url = "http://image.bmbdc.com/"+this.houseResData[i].imgList[j].url
                        }
                    if(this.houseResData[i].thumbImgUrl.length>0 && this.houseResData[i].thumbImgUrl[0].url !='')   this.houseResData[i].thumbImgUrl[0].url = "http://image.bmbdc.com/"+this.houseResData[i].thumbImgUrl[0].url
                    if(this.houseResData[i].thumbImgUrl.length>0 &&  this.houseResData[i].thumbImgUrl[0].url =='' && this.houseResData[i].thumbImgUrl[0].name =='')  this.houseResData[i].thumbImgUrl.shift()
                    if(this.houseResData[i].houseImgUrl.length>0 && this.houseResData[i].houseImgUrl[0].url !='')this.houseResData[i].houseImgUrl[0].url = "http://image.bmbdc.com/"+this.houseResData[i].houseImgUrl[0].url
                    // if(this.houseResData[i].houseImgUrl[0].url =='' && this.houseResData[i].houseImgUrl[0].name =='')  this.houseResData[i].houseImgUrl.shift()
                    if(this.houseResData[i].VRImgUrl.length>0 && this.houseResData[i].VRImgUrl[0].url !='') this.houseResData[i].VRImgUrl[0].url = "http://image.bmbdc.com/"+this.houseResData[i].VRImgUrl[0].url
                    // if(this.houseResData[i].VRImgUrl[0].url =='' && this.houseResData[i].VRImgUrl[0].name =='')  this.houseResData[i].VRImgUrl.shift()
                    // console.log(this.houseResData[i].matchingNames);

                    // console.log(this.houseResData[i].tagNames);
                }
            },
            handleCurrentChange() {
                const axios = require("axios")
                axios.get(`${this.global.config.url}/admin/house/selectAllHouse?page=${this.currentPage}&size=8`)
                    .then((response) => {
                        console.log(response);
                        this.houseResData = response.data.data.houseList;
                        // console.log(this.houseResData);

                        this.total = response.data.data.total
                        this.change()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            out(val){
                this.ids =[]
                for (let i = 0 ,len = val.length;i<len;i++){
                    this.ids[i] = val[i].id
                }
                console.log(this.ids);
            }
        }
    }
</script>

<style scoped>
  @import "../assets/maincss.css";

</style>
