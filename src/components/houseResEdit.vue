<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="780px":before-close='dialogfv'   >
    <div class="button">
      <el-button @click="show=1">基本信息</el-button>
      <el-button @click="show=2">图片信息</el-button>
      <el-button @click="show=3">其他</el-button>
    </div>

    <div class="basic" v-if="show===1">
      <el-form :model="getdata" style="margin: 0 auto" >
        <el-form-item label="房源编号*" :label-width="formLabelWidth">
          <el-input v-model="getdata.deptName" auto-complete="off"></el-input>
          房东姓名* <el-input v-model="getdata.parentDeptName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="房东手机号码" :label-width="formLabelWidth">
          <el-input v-model="getdata.areaName" auto-complete="off" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="getdata.deptLeaderName" auto-complete="off" style="width: 550px;"></el-input>
        </el-form-item>
        <el-form-item label="小区名称" :label-width="formLabelWidth">
          <el-select v-model="getdata.areaName"  filterable placeholder="请选择"  style="width: 315px;padding-left: 20px">
          <el-option
            v-for="item in village"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          >
            <span style="float: left">{{ item.name }}</span>
          </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地区" :label-width="formLabelWidth">
          <v-distpicker class="area" style="padding-left: 20px"  @selected="onSelected"> </v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="getdata.status" auto-complete="off"style="width: 550px;"></el-input>
        </el-form-item>
        <el-form-item label="门牌号" :label-width="formLabelWidth">
          <el-input v-model="getdata.status" auto-complete="off" style="width: 50px;"></el-input>幢
          <el-input v-model="getdata.status" auto-complete="off" style="width: 50px;"></el-input>单元
          <el-input v-model="getdata.status" auto-complete="off" style="width: 50px;"></el-input>室
        </el-form-item>
        <el-form-item label="建筑面积" :label-width="formLabelWidth">
          <el-input v-model="getdata.status" auto-complete="off"></el-input>平米
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          期望总价<el-input v-model="getdata.status" auto-complete="off"></el-input>万
        </el-form-item>

        <el-form-item label="户型" :label-width="formLabelWidth">
          <el-input v-model="getdata.status" auto-complete="off" style="width: 50px;"></el-input>幢
          <el-input v-model="getdata.status" auto-complete="off" style="width: 50px;"></el-input>厅
          <el-input v-model="getdata.status" auto-complete="off" style="width: 50px;"></el-input>卫
          <el-input v-model="getdata.status" auto-complete="off" style="width: 50px;"></el-input>阳台
        </el-form-item>
        <el-form-item label="楼层" :label-width="formLabelWidth">
          <el-input v-model="getdata.status" auto-complete="off" style="width: 50px;"></el-input>层
          &nbsp;&nbsp; &nbsp;
          共<el-input v-model="getdata.status" auto-complete="off" style="width: 50px;"></el-input>层
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          物业类型   <el-select v-model="getdata.areaName"  filterable placeholder="请选择"  style="width: 205px;padding-left: 20px">
          <el-option
            v-for="item in typehouse"
            :key="item"
            :label="item"
            :value="item"
          >
            <span style="float: left">{{ item }}</span>
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="朝向" :label-width="formLabelWidth">
          <el-select v-model="getdata.areaName"  filterable placeholder="请选择"  style="width: 205px;padding-left: 20px">
            <el-option
              v-for="item in direction"
              :key="item"
              :label="item"
              :value="item"
            >
              <span style="float: left">{{ item }}</span>
            </el-option>
          </el-select>
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          装修程度
          <el-select v-model="getdata.areaName"  filterable placeholder="请选择"  style="width: 205px;padding-left: 20px">
            <el-option
              v-for="item in fixtures"
              :key="item"
              :label="item"
              :value="item"
            >
              <span style="float: left">{{ item }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否满两年" :label-width="formLabelWidth">
          <el-radio v-model="getdata.sex" style="padding-left: 20px" label="是" value="1"></el-radio>
          <el-radio v-model="getdata.sex" label="否" value="0"></el-radio>
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;


          建造年代
          <el-input v-model="getdata.status" auto-complete="off"></el-input>年
        </el-form-item>

        <el-form-item label="位置" :label-width="formLabelWidth">
          <div style="padding-left: 20px">
            经度
            <el-input v-model="lng" auto-complete="off"style="width: 130px"></el-input>
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;

            纬度
            <el-input v-model="lat" auto-complete="off"style="width: 130px"></el-input>
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


          </div>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">

              <el-checkbox-group
              v-model="label"
              @change="changelabel">

                <el-checkbox
                  v-for="property in properties"
                  :label="property"
                  :key="property"
                  :value="property"
                >
                  {{property}}
                </el-checkbox>
              </el-checkbox-group>


        </el-form-item>
        <el-form-item label="配套设施" :label-width="formLabelWidth">
          <el-checkbox-group
            v-model="hasDevice"
            @change="changelabel">

            <el-checkbox
              v-for="device in devices"
              :label="device"
              :key="device"
              :value="device"
              class="device"
            >
              {{device}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>



      </el-form>
      <div slot="footer" class="footer">
        <el-button @click="dialogfv">取 消</el-button>
        <el-button type="primary" @click="dialogcommit">确 定</el-button>
      </div>
    </div>
    <div class="img"  v-if="show===2">
      上传
    </div>
    <div class="other"  v-if="show===3">
      其他补充信息
      <hr style="margin:10px 0 ">
      <el-input type="textarea" style="height: 400px" rows="10"></el-input>
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
                id:'',
            },
            dialogFormVisible: '',
            title: ''
        },
        components:{
            VDistpicker
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
            }

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
                },
                formLabelWidth: '120px',
                show:1,
                area:'',
                map:false,
                village:[
                    {
                        name:'雅仕苑'
                    }
                ],
                typehouse:[
                    '普通住宅',
                    '住宅公寓',
                    '写字楼',
                    '别墅',
                    '非住宅公寓',
                    '商铺',
                    '其他',
                ],
                direction:[
                    '东',
                    '南',
                    '西',
                    '北',
                    '东南',
                    '东北',
                    '西南',
                    '西北',
                ],
                fixtures:[
                    '毛坯',
                    '普通装修',
                    '精装修',
                    '豪华装修',
                ],
                properties:[
                    '学区房',
                    '地铁房',
                    '新上房源',
                    '热门房源',
                    '电梯房',
                    'VR房源',
                ],
                label:[],
                devices:[
                    '水',
                    '电',
                    '天然气',
                    '供暖',
                    '车位',
                    '空调',
                    '有线电视',
                    '宽带',
                    '电梯',
                    '储存室',
                ],
                hasDevice:[],
                zoom: 12,
                amapManager,
                center: [120.152263, 30.255481],
                address: '',
                events: {
                    click(e) {
                        let { lng, lat } = e.lnglat;
                        self.lng = lng;
                        self.lat = lat;
                        // 这里通过高德 SDK 完成。
                        // var geocoder = new AMap.Geocoder({
                        //     radius: 1000,
                        //     extensions: "all"
                        // });
                        // geocoder.getAddress([lng ,lat], function(status, result) {
                        //     if (status === 'complete' && result.info === 'OK') {
                        //         if (result && result.regeocode) {
                        //             self.address = result.regeocode.formattedAddress;
                        //             self.$nextTick();
                        //         }
                        //     }
                        // });
                    }
                },
                lng: 0,
                lat: 0



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

            },
            changelabel(){
                // console.log(this.hasDevice);
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
    margin:5px 20px ;
  }
  .area::-webkit-scrollbar {
    width: 5px;
  }
  .area::-webkit-scrollbar-thumb {
    background-color: rgba(230, 230, 230, 0.85);
    border-radius: 3px;
  }
  .el-checkbox{
    margin-left: 20px;
  }
  .device{
    margin-left: 20px;

  }
  .amap-wrapper {
    width: 500px;
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
</style>
