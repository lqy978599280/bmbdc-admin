<template>
  <el-dialog
    title="确认"
    :visible.sync="dialogif"
    width="30%"
    :before-close="handleClose">
    <div v-for="item in roleList">
      <el-radio v-model="roles" :label=item.name  ></el-radio>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="dialogcommit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
    export default {
        props: {
            dialogVisible: '',
            role:{
                realName: '',
                roleName: '',
                sex: '',
                userName: '',
                password: '',
                status: '',
                deptName: '',
                email: '',
                phone: '',
                id: ''}
        },

        watch:{
            "dialogif":function () {
                this.roles = this.role.roleName
            }
        },
        computed: {
            dialogif:function () {
                return this.dialogVisible
            },

        },data(){
            return{
                roleList:[],
                selectRole:'',
                roles:''
            }
        },
        mounted(){
            const  axios = require('axios')
            axios.get('http://192.168.1.5:8081/admin/roles/selectAllRoles?page=10&size=20')
                .then((response)=> {
                    // console.log(response);
                    this.roleList = response.data.data.rolesList;
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        methods: {

            handleClose() {
                this.$emit('getdialogfv', !this.dialogif)

                this.roles = ''
            },
            dialogcommit() {
                this.role.roleName = this.roles
                this.$emit('commitcasting', !this.dialogif,this.role.roleName)

            }
        }
    }
</script>

<style scoped>

</style>
