<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="1000px" :before-close='dialogfv'>
    <passEdit :rejected="rejected" @getinnerDiafv="innerDiafv" @rejectedCommit="rejectedCommit"></passEdit>

    <div class="button">
      <el-button @click="show=1">基本信息</el-button>
      <el-button @click="show=2">图片信息</el-button>
    </div>

    <div class="basic" v-show="show===1">
      <el-form :model="getdata" :disabled="readOnly" style="margin: 0 auto">
        <el-form-item label="小区名称*" :label-width="formLabelWidth">

          <el-input v-model="getdata.name" auto-complete="off" style="width: 250px;margin-right: 110px"></el-input>
          <div v-show="title==='审核'" style="display: inline-block;width: 450px">
            小区编号*
            <el-input v-model="getdata.number" auto-complete="off" style="width: 275px;margin-right: 60px"></el-input>

          </div>
          &nbsp;
          <div v-show="title!=='审核'" style="width: 160px;margin-right: 60px;display: inline-block">

          </div>
        </el-form-item>

        <el-form-item label="小区名称*" :label-width="formLabelWidth">
          <el-select v-model="getdata.villageName" filterable placeholder="可输入快捷搜索"
                     style="width: 250px;padding:5px 110px 5px 10px">
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
          地区*
          <el-select v-model="getdata.areaName" filterable placeholder="可输入快捷搜索"
                     style="width: 305px;padding-left: 10px">
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


        <el-form-item label="标题*" :label-width="formLabelWidth">
          <el-input v-model="getdata.title" auto-complete="off" style="width: 725px;"></el-input>
        </el-form-item>




        <el-form-item label="建筑面积*" class="border" :label-width="formLabelWidth">
          <el-input v-model="getdata.building" auto-complete="off" style="width: 250px;margin-right: 110px">
            <template slot="append">平方米</template>
          </el-input>


          规划面积*
          <el-input v-model="getdata.unit" auto-complete="off" style="width: 275px;">
            <template slot="append">平方米</template>
          </el-input>



        </el-form-item>

        <el-form-item label="开发商名称*" :label-width="formLabelWidth">
          <el-input v-model="getdata.title" auto-complete="off" style="width: 725px;"></el-input>
        </el-form-item>
        <el-form-item label="物业名称*" :label-width="formLabelWidth">
          <el-input v-model="getdata.title" auto-complete="off" style="width: 725px;"></el-input>
        </el-form-item>
        <el-form-item label="绿化率(%)" class="border" :label-width="formLabelWidth">
          <el-input v-model="getdata.building" auto-complete="off" style="width: 250px;margin-right: 110px">
          </el-input>

          容积率(%)
          <el-input v-model="getdata.unit" auto-complete="off" style="width: 273px;">
          </el-input>
        </el-form-item>
        <el-form-item label="规划户数" class="border" :label-width="formLabelWidth">
          <el-input v-model="getdata.building" auto-complete="off" style="width: 250px;margin-right: 110px">
          </el-input>

          车位数
          <el-input v-model="getdata.unit" auto-complete="off" style="width: 299px;">
          </el-input>
        </el-form-item>


        <el-form-item label="物业费(元/平米)" class="border" :label-width="formLabelWidth">
          <el-input v-model="getdata.building" auto-complete="off" style="width: 250px;margin-right: 110px">
          </el-input>

          产权年限
          <el-select v-model="getdata.villageName" filterable placeholder="可输入快捷搜索"
                     style="width: 284px;padding:5px 0px 5px 10px">
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
        <el-form-item label="物业类型*" :label-width="formLabelWidth">
          <el-select v-model="getdata.villageName" filterable placeholder="可输入快捷搜索"
                     style="width: 250px;padding:5px 110px 5px 10px">
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
          建筑类型*
          <el-select v-model="getdata.areaName" filterable placeholder="可输入快捷搜索"
                     style="width: 276px;padding-left: 10px">
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

        <el-form-item label="建造年代" :label-width="formLabelWidth">
          <el-input v-model="getdata.buildYear" style="width: 725px; margin-right: 55px" auto-complete="off">
            <template slot="append">年</template>
          </el-input>

        </el-form-item>



        <el-form-item label="位置" :label-width="formLabelWidth">
          <div style="padding-left: 10px">
            经度
            <el-input v-model="getdata.lng" auto-complete="off" style="width: 150px;margin-right: 50px"></el-input>

            纬度
            <el-input v-model="getdata.lat" auto-complete="off" style="width: 150px;margin-right: 100px;"></el-input>


            <el-button @click="openMap">获取经纬度</el-button>


          </div>

        </el-form-item>

        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="getdata.address" auto-complete="off" style="width:720px;"></el-input>
          <div class="toolbar" style="display: inline-block;margin-right: 178px;" v-if="map">
            <div class="amap-wrapper">
              <el-amap
                class="amap-box"
                vid="amapDemp"
                :amap-manager="amapManager"
                :center="center"
                :zoom="zoom"
                :events.sync="events"
              >
                <el-amap-marker vid="marker" :position="center" :label="label"></el-amap-marker>
              </el-amap>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="小区特色" :label-width="formLabelWidth">

          <el-checkbox-group
            v-model="getdata.tagNames"
          >

            <el-checkbox
              v-for="item in tagList"
              :key="item.id"
              :label='item.name+"_"+item.id'
            >
              {{item.name }}
            </el-checkbox>
          </el-checkbox-group>


        </el-form-item>



      </el-form>


      <div slot="footer" class="footer">
        <el-button @click="dialogfv" v-show="buttonClose!=='拒绝'">{{buttonClose}}</el-button>
        <el-button @click="reject" v-show="buttonClose === '拒绝'">{{buttonClose}}</el-button>
        <el-button type="primary" @click="dialogcommit" v-show="buttonClose!=='拒绝'">{{buttonCommit}}</el-button>
        <el-button type="primary" @click="pass" v-show="buttonClose === '拒绝'">{{buttonCommit}}</el-button>
      </div>
    </div>


    <div class="img" v-show="show===2">
      <div style="width: 600px;margin:0 auto; border:1px solid gainsboro;padding:45px;border-radius: 10px" >
        <div class="img_child">
          缩略图【只需要一张】
          <hr>
          <imgUpload :disabled="readOnly" :limit="limit[0]" :myFileList="getdata.thumbImgUrl" @sub="getThumb"></imgUpload>
        </div>
        <div class="img_child">
          图片资料【最多上传五张】
          <hr>

          <imgUpload :disabled="readOnly" :limit="limit[1]" :myFileList="getdata.imgList" @sub="getImg"></imgUpload>
        </div>
        <div class="img_child">
          VR全景资料【只需要一张】
          <hr>

          <imgUpload :disabled="readOnly" :limit="limit[2]" :myFileList="getdata.VRImgUrl" @sub="getVR"></imgUpload>
        </div>
      </div>

    </div>



  </el-dialog>

</template>

<script>
    import VDistpicker from 'v-distpicker'
    import VueAMap from "vue-amap";
    import imgUpload from "./imgUpload";
    import passEdit from "./passEdit";
    let amapManager = new VueAMap.AMapManager();
    export default {

        name: "menuEdit",
        props: {
            data: {
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
            dialogFormVisible: '',
            title: '',
            buttonClose: '',
            buttonCommit: '',
            readOnly: false,
            pass_id:''
        },
        components: {
            VDistpicker,
            imgUpload,
            passEdit
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
                limit:[1,5,1,1],
                formLabelWidth: '130px',
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
            getThumb(img){
                this.getdata.thumbImgUrl= img
            },

            getImg(img){
                this.getdata.imgList = img
            },
            getVR(img){
                this.getdata.VRImgUrl = img
            },
            getHouseImg(img){
                this.getdata.houseImgUrl = img
            },
            innerDiafv() {
                this.rejected = false
            },
            rejectedCommit(reason) {
                this.rejected = false
                this.getdata.rejectReason = reason
                const axios = require('axios');
                axios.post(`${this.global.config.url}/admin/house/examineHouse`, {
                        id: this.pass_id,
                        rejectReason:this.getdata.rejectReason
                    }

                )
                    .then((response) => {
                        this.message(response)
                        this.$emit('F5')
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            dialogfv() {
                this.map = false;
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {}
                // console.log(this.getdata);
            },
            reject() {
                this.rejected = true
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {}
            },
            dialogcommit() {

                // this.data = JSON.parse(JSON.stringify(this.getdata))
                // this.getdata = {}
                this.map = false;

                if (this.getdata.name === '') {
                    this.$message({
                        message: "请填写房东姓名",
                        type: "warning",
                        duration: 1000
                    })
                } else {
                    // this.if_upload = true
                    this.$emit('dialogcommit', !this.dialogFormVisible, this.getdata)

                }
                this.getdata = {}
            },
            onSelected(data) {
                this.area = data.province.value + ' ' + data.city.value + ' ' + data.area.value
                // console.log(data.province);
            },
            // changelabel() {
            //     console.log(this.getdata.matchingNames);
            //     console.log(this.getdata.tagNames);
            // },

            openMap(){
                this.map = !this.map;
                if (this.getdata.lng&&this.getdata.lat){
                    this.center = [this.getdata.lng,this.getdata.lat]
                    this.label.offset = [this.getdata.lng,this.getdata.lat]
                }

            },
            pass(){
                this.$emit('getdialogfv', !this.dialogFormVisible)
                const axios = require('axios');
                axios.post(`${this.global.config.url}/admin/house/examineHouse`, {
                        id: this.pass_id
                    }
                )
                    .then((response) => {
                        this.message(response)
                        this.$emit('F5')
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
