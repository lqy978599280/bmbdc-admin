<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="750px" :before-close='dialogfv'>



    <div class="basic" v-show="show===1">


      <el-form :model="getdata" :disabled="readOnly" style="margin: 0 auto">
        <el-form-item label="求购信息编号" :label-width="formLabelWidth">
        <el-input v-model="getdata.number" auto-complete="off" style="width: 400px;margin-right: 60px"></el-input>
      </el-form-item>

        <el-form-item label="发布人姓名" :label-width="formLabelWidth">
          <el-input v-model="getdata.name" auto-complete="off" style="width: 400px;margin-right: 60px"></el-input>
        </el-form-item>

        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="getdata.phone" auto-complete="off" style="width: 400px;"></el-input>
        </el-form-item>



        <el-form-item label="期望小区" :label-width="formLabelWidth">
          <el-select v-model="getdata.villageName" filterable placeholder="可输入快捷搜索"
                     style="width: 250px;padding:5px 40px 5px 10px">
            <el-option
              v-for="item in villagesList"
              :key="item.id"
              :label="item.name"
              :value='item.name+"_"+item.id'
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
            </el-option>
          </el-select>

        </el-form-item>


        <el-form-item label="期望地区" :label-width="formLabelWidth">
          <el-select v-model="getdata.areaName" filterable placeholder="可输入快捷搜索"
                     style="width: 315px;padding-left: 10px">
            <el-option
              v-for="item in areasList"
              :key="item.id"
              :label="item.mergername"
              :value='item.mergername+"_"+item.id'
            >
              <span style="float: left">{{ item.mergername }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
            </el-option>
          </el-select>
        </el-form-item>



        <el-form-item label="期望户型" class="border" :label-width="formLabelWidth">
          <el-input v-model="getdata.bedroom" auto-complete="off" style="width: 110px;">
            <template slot="append">室</template>
          </el-input>
          <el-input v-model="getdata.livingroom" auto-complete="off" style="width: 125px;">
            <template slot="append">厅</template>
          </el-input>
          <el-input v-model="getdata.washroom" auto-complete="off" style="width: 110px;">
            <template slot="append">卫</template>
          </el-input>
          <el-input v-model="getdata.balcony" auto-complete="off" style="width: 130px;">
            <template slot="append">阳台</template>
          </el-input>

        </el-form-item>

        <el-form-item label=" 期望面积" :label-width="formLabelWidth">
          <el-input v-model="getdata.areaMeasure" style="width: 150px;  margin-right: 55px" auto-complete="off">
            <template slot="append">平米</template>
          </el-input>

          期望总价
          <el-input v-model="getdata.totalPrice" style="width: 150px;" auto-complete="off">
            <template slot="append">万</template>
          </el-input>
        </el-form-item>


        <el-form-item label="期望楼层" :label-width="formLabelWidth">
          <el-input v-model="getdata.phone" auto-complete="off" style="width: 400px;"></el-input>
        </el-form-item>

      </el-form>
    </div>
  </el-dialog>

</template>

<script>
    import VDistpicker from 'v-distpicker'
    import VueAMap from "vue-amap";

    let amapManager = new VueAMap.AMapManager();
    export default {

        name: "menuEdit",
        props: {
            data: {
                name: '',
                number: '',
                compose: '',
                phone: '',
                areaName: '',
                villageName: '',
                areaMeasure: '',
                totalPrice: '',
                is_twoYear: '',
                houseUsageName: '',
                id: '',
                buildYear: '',
                matchingNames: [],
                tagNames: [],
                lng: '',
                lat: '',
                decorateName: '',
                oriName: '',
                title: '',
                otherInformation: '',
                bedroom: '',
                livingroom: '',
                washroom: '',
                balcony: '',
                building: '',
                unit: '',
                house: '',
                floor: '',
                floorAll: '',
                rejectReason: '',
                status:'',
                thumbImgUrl:[],
                imgList:[],
                VRImgUrl:[],
                houseImgUrl:[]
            },
            dialogFormVisible: '',
            title: '',
            buttonClose: '',
            buttonCommit: '',
            readOnly: false,
            pass_id:''
        },
        components: {
            VDistpicker,

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
        mounted() {
            // console.log(this.$refs);
            const axios = require('axios');
            axios.get(`${this.global.config.url}/admin/house/selectAllHouseMessage?page=10&size=20`)
                .then((response) => {
                    // console.log(response);
                    this.houseUsageList = response.data.data.houseUsageList
                    this.houseOrientationList = response.data.data.houseOrientationList
                    this.houseDecorateList = response.data.data.houseDecorateList
                    this.tagList = response.data.data.tagList
                    this.matchingList = response.data.data.matchingList
                    this.areasList = response.data.data.areasList
                    this.villagesList = response.data.data.villagesList

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        data() {
            let self = this;
            return {
                getdata: {
                    name: '',
                    number: '',
                    compose: '',
                    phone: '',
                    areaName: '',
                    villageName: '',
                    areaMeasure: '',
                    totalPrice: '',
                    is_twoYear: '',
                    houseUsageName: '',
                    id: '',
                    matchingNames: [],
                    tagNames: [],
                    lng: '',
                    lat: '',
                    decorateName: '',
                    oriName: '',
                    title: '',
                    buildYear: '',
                    otherInformation: '',
                    bedroom: '',
                    livingroom: '',
                    washroom: '',
                    balcony: '',
                    building: '',
                    unit: '',
                    house: '',
                    floor: '',
                    floorAll: '',
                    rejectReason: '',
                    status:'',
                    thumbImgUrl:[],
                    imgList:[],
                    VRImgUrl:[],
                    houseImgUrl:[]
                },
                limit:[1,5,1,1],
                formLabelWidth: '120px',
                show: 1,
                area: '',
                map: false,
                rejected: false,
                areasList: [],
                houseUsageList: [],
                houseOrientationList: [],
                houseDecorateList: [],
                tagList: [],
                matchingList: [],
                villagesList: [],
                if_upload:false,


                zoom: 12,
                amapManager,
                label:{
                    content:'',
                    offset:[120.152263, 30.255481]
                },
                center: [120.152263, 30.255481],
                address: '',
                events: {
                    click(e) {
                        let {lng, lat} = e.lnglat;
                        self.getdata.lng = lng;
                        self.getdata.lat = lat;
                        var geocoder = new AMap.Geocoder({
                            radius: 1000,
                            extensions: "all"
                        });
                        geocoder.getAddress([lng, lat], function (status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                if (result && result.regeocode) {
                                    self.getdata.address = result.regeocode.formattedAddress;
                                    self.center =[self.getdata.lng,self.getdata.lat]
                                    self.label.offset=[self.getdata.lng,self.getdata.lat]
                                    self.label.content=result.regeocode.formattedAddress;
                                    self.$nextTick();
                                }
                            }
                        });


                    }
                },
            }

        },

        methods: {



            dialogfv() {
                this.map = false;
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {}
                // console.log(this.getdata);
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
        }
    }

</script>

<style scoped>
  .el-input {
    width: 300px;
  }

  .button {
    margin-bottom: 20px;
  }

  .el-form {

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .el-form-item {
    margin-bottom: 3px;
  }

  .el-form-item__content {
    margin-left: 100px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-input {
    width: 180px;
    margin: 3px 10px;
    /*height: 30px;*/
  }

  .el-checkbox {
    margin-left: 10px;
  }

  .device {
    margin-left: 10px;

  }

  .amap-wrapper {
    width: 720px;
    height: 400px;
    margin: 15px 0;
    padding-left: 10px;
  }

  .footer {
    display: flex;
    justify-content: center;
  }

  .footer > button {
    margin: 0 30px;
  }

  hr {
    margin: 5px 0 5px 0;
  }

  .img > div {
    font-size: 21px;
    margin: 0 0;
  }

  .border > .el-input {
    border-left: none !important;
    border-top: none;
    border-right: none;
    outline: none;
  }

  .img_child {
    margin-bottom: 20px;
  }
</style>

