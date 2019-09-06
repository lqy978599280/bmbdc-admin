<template>
  <div>
    <div class="main-top">
      <el-input class="bgc" type="text" placeholder="菜单名称/请求地址"  v-model="search"></el-input>
      <el-button class="search bgc" >搜 索</el-button>
      <el-button class="add bgc" @click="dialogadd=true">添 加</el-button>
      <!--      <menuEdit :data="form" :dialogFormVisible="dialogadd" @dialogcommit="dialogcommit" @getdialogfv="getdialogfv" :title="title[0]"></menuEdit>-->
      <!--      <menuEdit :data="filetrtableData[index]" :dialogFormVisible="dialogedit" @dialogcommit="dialogeditcommit" @getdialogfv="getdialogfv" :title="title[1]"></menuEdit>-->
      <!--      <dialogdel :dialogVisible="dialogdel" :del_id="del_id" @getdialogfv="getdialogfv" @commitdel="commitdel"></dialogdel>-->
    </div>
    <el-table
      class="bgc"
      :data="rolesdata"
    >
            <div v-for="data in columntype" >
              <singleMenu :coltype="data"></singleMenu>
            </div>

<!--      <singleMenu  :coltype="this.columntype[0]"></singleMenu>-->
<!--      <singleMenu  :coltype="this.columntype[1]"></singleMenu>-->



      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)">编 辑
          </el-button>

          <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)">分配角色
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
    import menuEdit from "../../components/menuEdit";
    import dialogdel from "../../components/del"
    export default {
        components: {
            singleMenu,
            menuEdit,
            dialogdel
        },
        data() {
            return {
                searching:'',
                search:'',
                index:0,
                title:["添加菜单","编辑菜单"],
                columntype:[
                    { label: '角色名称',
                        width: '100',
                        type: 'rolename',
                    },
                    {
                        label: '登录账号',
                        width: '80',
                        type: 'account',
                    },
                    { label: '登录密码',
                        width: '80',
                        type: 'password',
                    },
                    { label: '姓名',
                        width: '80',
                        type: 'name',
                    },
                    { label: '所属部门名称',
                        width: '100',
                        type: 'dept',
                    },
                    { label: '手机号码',
                        width: '100',
                        type: 'phone',
                    },
                    { label: '状态',
                        width: '60',
                        type: 'status',
                    },
                    { label: '邮箱',
                        width: '150',
                        type: 'email',
                    },
                    { label: '性别',
                        width: '50',
                        type: 'sex',
                    }
                ],
                rolesdata: [
                    {
                        name:"李青云",
                        rolename:"系统管理员",
                        sex:"男",
                        account:"lqy",
                        password:"123456",
                        dept:"技术部门",
                        status:"启用",
                        phone:"17757552613",
                        email:"978599280@qq.com"
                    }

                ],

                dialogadd: false,
                dialogedit: false,
                dialogdel:false,
                del_id:'',
                form: {
                    name: '',
                    code: '',
                    parentid: '',
                    url: '',
                    isMenu: '',
                    status: '',
                    icon:'',
                    id:'',
                }
            }
        },
    }
</script>

<style scoped>
  @import "../../assets/maincss.css";

</style>
