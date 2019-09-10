<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="房源编号/房东姓名/联系方式/小区名称"  v-model="search"></el-input>
      <el-button class="search bgc" >搜 索</el-button>
      <el-button class="add bgc" @click="dialogadd=true">添 加</el-button>
      <houseResEdit :data="form" :dialogFormVisible="dialogadd" @dialogcommit="dialogcommit" @getdialogfv="getdialogfv" :title="title[0]"></houseResEdit>
      <houseResEdit :data="filterHouseResData[index]" :dialogFormVisible="dialogedit" @dialogcommit="dialogeditcommit" @getdialogfv="getdialogfv" :title="title[1]"></houseResEdit>
      <dialogdel :dialogVisible="dialogdel" :del_id="del_id" @getdialogfv="getdialogfv" @commitdel="commitdel"></dialogdel>
    </div>
    <el-table
      class="bgc"
      :data="filterHouseResData"
    >
            <div v-for="data in columntype" >
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
            @click="authority(scope.$index, scope.row)">审 核
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删 除
          </el-button>
        </template>


      </el-table-column>

    </el-table>
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
                searching:'',
                search:'',
                index:0,
                title:["添加房源","编辑房源"],
                columntype:[
                    { label: '房源性质',
                        width: '100',
                        type: 'houseUsageName',
                    },
                    {
                        label: '房源编号',
                        width: '110',
                        type: 'number',
                    },
                    { label: '房东姓名',
                        width: '80',
                        type: 'name',
                    },
                    { label: '房东手机号码',
                        width: '120',
                        type: 'phone',
                    },
                    { label: '所在区域',
                        width: '120',
                        type: 'areaName',
                    },
                    { label: '小区名称',
                        width: '100',
                        type: 'villageName',
                    },
                    { label: '户型',
                        width: '100',
                        type: 'compose',
                    },
                    { label: '面积(m²)',
                        width: '80',
                        type: 'areaMeasure',
                    },
                    { label: '总价(万)',
                        width: '80',
                        type: 'totalPrice',
                    },
                    { label: '是否满两年',
                        width: '90',
                        type: 'is_twoYear',
                    }
                ],
                houseResData: [
                    {
                        name: '余林',
                        number: 'FY80000001',
                        compose: '2室1厅1卫',
                        phone: '123456789',
                        areaName: '浙江省杭州市西湖区',
                        villageName: '雅仕苑',
                        areaMeasure: '88',
                        totalPrice: '440',
                        is_twoYear: '是',
                        houseUsageName: '普通住宅',
                        id:'',
                    }, {
                        name: 'lqy',
                        number: 'FY80000001',
                        compose: '2室1厅1卫',
                        phone: '123456789',
                        areaName: '浙江省杭州市西湖区',
                        villageName: '雅仕苑',
                        areaMeasure: '88',
                        totalPrice: '440',
                        is_twoYear: '是',
                        houseUsageName: '普通住宅',
                        id:'',
                    }, {
                        name: '余林',
                        number: 'FY80000001',
                        compose: '2室1厅1卫',
                        phone: '123456789',
                        areaName: '浙江省杭州市西湖区',
                        villageName: '雅仕苑',
                        areaMeasure: '88',
                        totalPrice: '440',
                        is_twoYear: '是',
                        houseUsageName: '普通住宅',
                        id:'',
                    }, {
                        name: '余林',
                        number: 'FY80000001',
                        compose: '2室1厅1卫',
                        phone: '123456789',
                        areaName: '浙江省杭州市西湖区',
                        villageName: '雅仕苑',
                        areaMeasure: '88',
                        totalPrice: '440',
                        is_twoYear: '是',
                        houseUsageName: '普通住宅',
                        id:'',
                    }, {
                        name: '余林',
                        number: 'FY80000001',
                        compose: '2室1厅1卫',
                        phone: '123456789',
                        areaName: '浙江省杭州市西湖区',
                        villageName: '雅仕苑',
                        areaMeasure: '88',
                        totalPrice: '440',
                        is_twoYear: '是',
                        houseUsageName: '普通住宅',
                        id:'',
                    }, {
                        name: '余林',
                        number: 'FY80000001',
                        compose: '2室1厅1卫',
                        phone: '123456789',
                        areaName: '浙江省杭州市西湖区',
                        villageName: '雅仕苑',
                        areaMeasure: '88',
                        totalPrice: '440',
                        is_twoYear: '是',
                        houseUsageName: '普通住宅',
                        id:'',
                    }, {
                        name: '余林',
                        number: 'FY80000001',
                        compose: '2室1厅1卫',
                        phone: '123456789',
                        areaName: '浙江省杭州市西湖区',
                        villageName: '雅仕苑',
                        areaMeasure: '88',
                        totalPrice: '440',
                        is_twoYear: '是',
                        houseUsageName: '普通住宅',
                        id:'',
                    },
                ],

                dialogadd: false,
                dialogedit: false,
                dialogdel:false,
                del_id:'',
                form: {
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
            }
        },
        computed:{
            filterHouseResData:function (){
                return     this.houseResData.filter( (data) => {
                    return data.name.match(this.search) || data.number.match(this.search)|| data.phone.match(this.search)|| data.villageName.match(this.search)
                })
            }
        },

        // created(){
        //     const axios = require('axios');
        //     axios.get('http://192.168.1.5:8081/admin/roles/selectAllRoles?page=10&size=20')
        //         .then((response)=> {
        //             console.log(response);
        //             this.rolesData = response.data.data.rolesList;
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });
        //
        //
        // },
        methods:{
            handleEdit(index) {
                this.index=index
                this.dialogedit=true;
            },
            handleDelete(index,row) {
                this.dialogdel =true
                this.del_id=row.id
            },
            getdialogfv(val){
                this.dialogedit=val;
                this.dialogadd=val;
                this.dialogdel=val;
            },
            dialogcommit(val,data){
                const axios = require('axios');
                this.dialogedit=val;
                this.dialogadd=val;
                // this.tableData.push(data)
                this.form= {
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
                axios.post('http://192.168.1.5:8081/admin/roles/insertRole',data)
                    .then( (response) =>{
                        this.message(response)

                        this.rolesData = response.data.data.result;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            dialogeditcommit(val,data){
                const axios = require('axios');
                this.dialogedit=val;
                this.dialogadd=val;
                console.log(data);
                this.rolesData[this.index]=data;
                axios.post('http://192.168.1.5:8081/admin/roles/updateRole',data)
                    .then( (response)=> {
                        this.message(response)

                        this.message(response)
                        this.rolesData = response.data.data.result;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            commitdel(val,id){
                this.dialogdel=val;
                const axios = require('axios');
                // console.log( row.id instanceof Integer )
                axios.get('http://192.168.1.5:8081/admin/roles/deleteRole', {params: {id: id}})
                    .then((response) => {
                        this.message(response)

                        this.rolesData = response.data.data.result;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            message(response){
                let type = false;
                if (response.data.code === 0) {
                    type = "success"
                }
                else type = "warning"
                this.$message({
                    message: response.data.message,
                    type: type,
                    duration: 1000
                })
            },
            authority(){

            }
        }
    }
</script>

<style scoped>
  @import "../../assets/maincss.css";

</style>
