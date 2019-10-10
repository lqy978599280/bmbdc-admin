<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="房源编号/房东姓名/联系方式" v-model="search"></el-input>
      <el-button class="search bgc">搜 索</el-button>



      <sellEdit :data="houseResData[index]" :dialogFormVisible="dialoginf"
                    @getdialogfv="getdialogfv" :title="title[2]"
                   :readOnly='true' :pass_id="select_id" @F5="handleCurrentChange"></sellEdit>

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
    import sellEdit from "./sellEdit";

export default {
        components: {
            singleMenu,
            sellEdit,
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
                    },
                    {
                        label: '状态',
                        width: '90',
                        type: 'status',
                    }
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
                    floorAll: '',
                    status:'',
                    thumbImgUrl:[],
                    imgList:[],
                    VRImgUrl:[],
                    houseImgUrl:[]
                },
                buttonClose: '',
                buttonCommit: ''
            }
        },

        watch:{
            'search':function () {
                this.delay.delay(()=>{
                    const axios = require('axios');
                    axios.get(`${this.global.config.url}/admin/house/selectAllVillagesByValue?value=${this.search}&page=${this.currentPage}&size=8`)
                        .then((response) => {
                            console.log(response);
                            this.houseResData = response.data.data.list;
                            this.total = response.data.data.total
                            this.change()
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
                this.dialogedit = val;
                this.dialogadd = val;
                this.dialogdel = val;
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
        }
    }
</script>

<style scoped>
  @import "../../assets/maincss.css";

</style>
