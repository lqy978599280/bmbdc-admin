<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="780px":before-close='dialogfv'   >
    <div class="button">
      <el-button @click="show=1">基本信息</el-button>
      <el-button @click="show=2">图片信息</el-button>
      <el-button @click="show=3">其他</el-button>
    </div>

    <div class="basic" v-show="show===1">
      <el-form :model="getdata" style="margin: 0 auto" >
        <el-form-item label="房源编号*" :label-width="formLabelWidth">
          <el-input v-model="getdata.number" auto-complete="off" style="width: 120px;"></el-input>

          房东姓名* <el-input v-model="getdata.name" auto-complete="off" style="width: 90px;"></el-input>
&nbsp;

          房东手机号码<el-input v-model="getdata.phone" auto-complete="off" style="width: 120px;"></el-input>
        </el-form-item>



        <el-form-item label="小区名称" :label-width="formLabelWidth">
          <el-select v-model="getdata.villageName"  filterable placeholder="可输入快捷搜索"  style="width: 200px;padding:0 0 0 10px">
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

        <el-form-item label="地区" :label-width="formLabelWidth">
          <el-select v-model="getdata.areaName"  filterable placeholder="可输入快捷搜索"  style="width: 315px;padding-left: 10px">
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

        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="getdata.address" auto-complete="off"style="width: 550px;"></el-input>
        </el-form-item>

        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="getdata.title" auto-complete="off" style="width: 550px;"></el-input>
        </el-form-item>

        <el-form-item label="门牌号" class="border" :label-width="formLabelWidth">
          <el-input v-model="getdata.compose" auto-complete="off" style="width: 110px;">
            <template slot="append">幢</template>
          </el-input>
          <el-input v-model="getdata.compose" auto-complete="off" style="width: 130px;">
            <template slot="append">单元</template>
          </el-input>
          <el-input v-model="getdata.compose" auto-complete="off" style="width: 110px;">
            <template slot="append">室</template>
          </el-input>


        </el-form-item>

        <el-form-item label="建筑面积" class="border" :label-width="formLabelWidth">
          <el-input v-model="getdata.areaMeasure" style="width: 160px;margin-right: 55px" auto-complete="off">
            <template slot="append">平米</template>
          </el-input>

          期望总价<el-input v-model="getdata.totalPrice" style="width: 160px;" auto-complete="off">
          <template slot="append">万</template>
        </el-input>
        </el-form-item>
        <el-form-item label="户型" class="border" :label-width="formLabelWidth">
          <el-input v-model="getdata.bedroom" auto-complete="off" style="width: 110px;">
            <template slot="append">室</template>
          </el-input>
          <el-input v-model="getdata.livingroom" auto-complete="off" style="width: 110px;">
            <template slot="append">厅</template>
          </el-input>
          <el-input v-model="getdata.washroom" auto-complete="off" style="width: 110px;">
          <template slot="append">卫</template>
        </el-input>
          <el-input v-model="getdata.compose" auto-complete="off" style="width: 130px;">
          <template slot="append">阳台</template>
        </el-input>

        </el-form-item>
        <el-form-item label="楼层" class="border" :label-width="formLabelWidth">
          <el-input v-model="getdata.floor" auto-complete="off" style="width: 120px;">
            <template slot="append">层</template>

          </el-input>
          &nbsp;&nbsp; &nbsp;
          <el-input v-model="getdata.totalFloor" auto-complete="off" style="width: 180px;">
          <template slot="prepend">共</template>
          <template slot="append">层</template>

        </el-input>
        </el-form-item>

        <el-form-item label="物业类型" :label-width="formLabelWidth">
            <el-select v-model="getdata.houseUsageName"  filterable placeholder="请选择"  style="width: 205px;padding-left: 10px;padding-right: 44px">
          <el-option
            v-for="item in houseDecorateList"
            :key="item.id"
            :label="item.name"
            :value='item.name+"_"+item.id'

          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
          建造年代
          <el-input v-model="getdata.year" style="width: 130px;" auto-complete="off">
            <template slot="append">年</template>
          </el-input>
        </el-form-item>
        <el-form-item label="朝向" :label-width="formLabelWidth">
          <el-select v-model="getdata.direction"  filterable placeholder="请选择"  style="width: 205px;padding-left: 10px">
            <el-option
              v-for="item in houseOrientationList"
              :key="item.id"
              :label="item.name"
              :value='item.name+"_"+item.id'

            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
            </el-option>
          </el-select>
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          装修程度
          <el-select v-model="getdata.fix"  filterable placeholder="请选择"  style="width: 205px;padding-left: 10px">
            <el-option
              v-for="item in houseDecorateList"
              :key="item.id"
              :label="item.name"
              :value='item.name+"_"+item.id'

            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否满两年" :label-width="formLabelWidth">
          <el-radio v-model="getdata.is_twoYear" style="padding-left: 10px" label="是" value="1"></el-radio>
          <el-radio v-model="getdata.is_twoYear" label="否" value="0"></el-radio>

        </el-form-item>

        <el-form-item label="位置" :label-width="formLabelWidth">
          <div style="padding-left: 10px">
            经度
            <el-input v-model="getdata.lng" auto-complete="off"style="width: 130px"></el-input>
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;

            纬度
            <el-input v-model="getdata.lat" auto-complete="off"style="width: 130px"></el-input>
            <el-button @click="map =!map" >获取经纬度</el-button>
          </div>
          <div class="amap-wrapper" v-if="map">
            <el-amap
              class="amap-box"
              vid="amapDemp"
              :amap-manager="amapManager"
              :center="center"
              :zoom="zoom"
              :events="events"
            ></el-amap>
            <div class="toolbar">
               地点: {{ address }}
            </div>

          </div>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">

              <el-checkbox-group
              v-model="getdata.label"
              @change="changelabel">

                <el-checkbox
                  v-for="item in tagList"
                  :key="item.id"
                  :label="item.name"
                  :value='item.name+"_"+item.id'

                >
                 {{item.name }}
                </el-checkbox>
              </el-checkbox-group>


        </el-form-item>
        <el-form-item label="配套设施" :label-width="formLabelWidth">
          <el-checkbox-group
            v-model="getdata.hasDevice"
            @change="changelabel">

            <el-checkbox
              v-for="item in matchingList"
              :key="item.id"
              :label="item.name"
              :value='item.name+"_"+item.id'

            >
              {{item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>



      </el-form>
      <div slot="footer" class="footer">
        <el-button @click="dialogfv">{{buttonClose}}</el-button>
        <el-button type="primary" @click="dialogcommit">{{buttonCommit}}</el-button>
      </div>
    </div>


    <div class="img"  v-show="show===2">
      <div >
        缩略图【只需要一张】
        <hr>
        <imgUpload></imgUpload>
      </div>
      <div >
        图片资料【最多上传五张】
        <hr>

        <imgUpload></imgUpload>
      </div>
      <div >
        VR全景资料【只需要一张】
        <hr>

        <imgUpload></imgUpload>
      </div>
      <div >
        户型图【只需要一张】
        <hr>

        <imgUpload></imgUpload>
      </div>
    </div>


    <div class="other"  v-show="show===3">
      其他补充信息
      <hr style="margin:10px 0 ">
      <el-input type="textarea" style="height: 400px;font-size: 20px" rows="10" v-model="getdata.otherInformation" ></el-input>
    </div>

  </el-dialog>

</template>

<script>
  import VDistpicker from 'v-distpicker'
  import VueAMap from "vue-amap";
  import imgUpload from "./imgUpload";
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
                id:'',
                label:[],
                hasDevice:[],
                lng: 0,
                lat: 0,
                fix:'',
                direction:'',
                house:'',
                otherInformation:'',
                bedroom:'',
                livingroom:'',
                washroom:''
            },
            dialogFormVisible: '',
            title: '',
            buttonClose:'',
            buttonCommit:''
        },
        components:{
            VDistpicker,
            imgUpload
        },
        computed: {
            dialogif: function () {
                return this.dialogFormVisible
            },

        },
        watch: {
            "dialogFormVisible": function () {
                this.getdata.name = this.data.name
                this.getdata.number = this.data.number
                this.getdata.compose = this.data.compose
                this.getdata.areaName = this.data.areaName
                this.getdata.villageName = this.data.villageName
                this.getdata.areaMeasure = this.data.areaMeasure
                this.getdata.phone = this.data.phone
                this.getdata.is_twoYear = this.data.is_twoYear
                this.getdata.houseUsageName = this.data.houseUsageName
                this.getdata.id = this.data.id
                this.getdata.totalPrice = this.data.totalPrice
            }

        },
        mounted(){
            const axios = require('axios');
            axios.get('http://192.168.1.5:8081/admin/house/selectAllHouseMessage?page=10&size=20')
                .then((response)=> {
                    console.log(response);
                    this.houseUsageList= response.data.data.houseUsageList
                    this.houseOrientationList= response.data.data.houseOrientationList
                    this.houseDecorateList= response.data.data.houseDecorateList
                    this.tagList= response.data.data.tagList
                    this.matchingList= response.data.data.matchingList
                    this.areasList= response.data.data.areasList
                    this.villagesList= response.data.data.villagesList
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
                    id:'',
                    label:[],
                    hasDevice:[],
                    lng: 0,
                    lat: 0,
                    fix:'',
                    direction:'',
                    house:'',
                    otherInformation:''
                },
                formLabelWidth: '120px',
                show:1,
                area:'',
                map:false,
                areasList:[],
                houseUsageList:[],
                houseOrientationList:[],
                houseDecorateList:[],
                tagList:[],
                matchingList:[],
                villagesList :[],


                    zoom: 12,
                amapManager,
                center: [120.152263, 30.255481],
                address: '',
                events: {
                    click(e) {
                        let { lng, lat } = e.lnglat;
                        self.getdata.lng = lng;
                        self.getdata.lat = lat;
                        var geocoder = new AMap.Geocoder({
                            radius: 1000,
                            extensions: "all"
                        });
                        geocoder.getAddress([lng ,lat], function(status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                if (result && result.regeocode) {
                                    self.address = result.regeocode.formattedAddress;
                                    self.$nextTick();
                                }
                            }
                        });

                    }
                },

                fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
            }

        },

        methods: {
            dialogfv() {
                this.$emit('getdialogfv', !this.dialogFormVisible)
                this.getdata = {
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
                    id:'',
                    label:[],
                    hasDevice:[],
                    lng: 0,
                    lat: 0,
                    fix:'',
                    direction:'',
                    house:'',
                    otherInformation:''
                }
            },
            dialogcommit() {
                this.data.name = this.getdata.name
                this.data.number = this.getdata.number
                this.data.compose = this.getdata.compose
                this.data.areaName = this.getdata.areaName
                this.data.villageName = this.getdata.villageName
                this.data.areaMeasure = this.getdata.areaMeasure
                this.data.phone = this.getdata.phone
                this.data.is_twoYear= this.getdata.is_twoYear
                this.data.houseUsageName = this.getdata.houseUsageName
                this.data.id = this.getdata.id
                this.data.totalPrice = this.getdata.totalPrice
                if(this.data.name==='') {
                    this.$message({
                        message: "请填写角色编码",
                        type: "warning",
                        duration: 1000
                    })
                }

                else{
                    this.$emit('dialogcommit', !this.dialogFormVisible, this.data)
                }

            },
            onSelected(data){
                this.area=data.province.value+' '+data.city.value+' '+data.area.value
                // console.log(data.province);

            },
            changelabel(){
                console.log(this.getdata.hasDevice);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        }
    }

</script>

<style scoped>
  .el-input {
    width: 300px;
  }
  .button{
    margin-bottom: 20px;
  }
  .el-form{

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .el-form-item{
    margin-bottom:3px;
  }
  .el-form-item__content{
    margin-left:100px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-input {
    width:180px;
    margin:3px 10px ;
    /*height: 30px;*/
  }
  .el-checkbox{
    margin-left: 10px;
  }
  .device{
    margin-left: 10px;

  }
  .amap-wrapper {
    width: 600px;
    height: 300px;
    padding-bottom: 30px;
  }
.footer{
  display: flex;
  justify-content: center;
}
  .footer > button{
    margin:0 30px;
  }
  hr{
    margin: 5px 0 5px 0;
  }
  .img > div{
    font-size: 21px;
    margin:0 0 ;
  }
  .border > .el-input{
    border-left:none !important;
    border-top:none ;
    border-right:none ;
    outline: none;
  }
</style>
