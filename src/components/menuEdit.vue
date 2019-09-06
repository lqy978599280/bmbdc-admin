<template>
  <el-dialog :title="title" :visible.sync="dialogif" :before-close='dialogfv'>
    <el-form :model="getdata">
      <el-form-item label="菜单名称*" :label-width="formLabelWidth">
        <el-input v-model="getdata.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单编码*" :label-width="formLabelWidth">
        <el-input v-model="getdata.code" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="父级菜单编码*" :label-width="formLabelWidth">
        <el-input
          v-model="getdata.parentid"
          auto-complete="off"

        ></el-input>
      </el-form-item>
      <el-dialog title="选择父级菜单编码" :visible.sync="showparent" :modal-append-to-body='false'>
        <!--        <el-tree-->
        <!--          :props="treedata"-->
        <!--          :load="loadNode"-->
        <!--          lazy-->
        <!--          show-checkbox-->
        <!--          @check-change="handleCheckChange">-->
        <!--        </el-tree>-->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogfv">取 消</el-button>
          <el-button type="primary" @click="dialogcommit">确 定</el-button>
        </div>
      </el-dialog>
      <el-form-item label="请求地址*" :label-width="formLabelWidth">
        <el-input v-model="getdata.url" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="是否菜单*" :label-width="formLabelWidth">
        <el-select v-model="getdata.isMenu" placeholder="请选择是否菜单">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图标地址" :label-width="formLabelWidth">
        <el-select v-model="getdata.icon" placeholder="请选择状态">
          <el-option label="启用" value="启用"></el-option>
          <el-option label="未启用" value="未启用"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogfv">取 消</el-button>
      <el-button type="primary" @click="dialogcommit">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
    export default {
        name: "menuEdit",
        props: {
            data: {
                name: '',
                code: '',
                parentid: '',
                url: '',
                isMenu: '',
                status: '',
                icon: '',
                id: '',
            },
            dialogFormVisible: '',
            title: ''
        },
        computed: {
            dialogif: function () {
                return this.dialogFormVisible
            },
            // editdata:function () {
            //     return this.data
            // }
        },
        watch: {
            "dialogFormVisible": function () {
                this.getdata.name = this.data.name
                this.getdata.code = this.data.code
                this.getdata.parentid = this.data.parentid
                this.getdata.url = this.data.url
                this.getdata.isMenu = this.data.isMenu
                this.getdata.icon = this.data.icon
            }

        },
        data() {
            return {
                getdata: {
                    name: '',
                    code: '',
                    parentid: '',
                    url: '',
                    isMenu: '',
                    status: '',
                    icon:'',
                    data:'',
                },
                formLabelWidth: '120px',
                showparent: false,
                // treedata: {
                //     label: 'name',
                //     children: 'zones'
                // },
                // count: 1
            }
        },
        methods: {
            dialogfv() {
                this.$emit('getdialogfv', !this.dialogif)
            },
            dialogcommit() {
                this.data.name = this.getdata.name
                this.data.code = this.getdata.code
                this.data.parentid = this.getdata.parentid
                this.data.url = this.getdata.url
                this.data.isMenu = this.getdata.isMenu
                this.data.icon = this.getdata.icon
                if(this.data.code||this.data.name||this.data.parentid||this.data.url||this.data.isM)
                this.$emit('dialogcommit', !this.dialogif, this.data)
            },
            // handleCheckChange(data, checked, indeterminate) {
            //     console.log(data, checked, indeterminate);
            // },
            // handleNodeClick(data) {
            //     console.log(data);
            // }
            // loadNode(node, resolve) {
            //     if (node.level === 0) {
            //         return resolve([{ name: 'region1' }, { name: 'region2' }]);
            //     }
            //     if (node.level > 3) return resolve([]);
            //
            //     var hasChild;
            //     if (node.data.name === 'region1') {
            //         hasChild = true;
            //     } else if (node.data.name === 'region2') {
            //         hasChild = false;
            //     } else {
            //         hasChild = Math.random() > 0.5;
            //     }
            //
            //     setTimeout(() => {
            //         var data;
            //         if (hasChild) {
            //             data = [{
            //                 name: 'zone' + this.count++
            //             }, {
            //                 name: 'zone' + this.count++
            //             }];
            //         } else {
            //             data = [];
            //         }
            //
            //         resolve(data);
            //     }, 500);
            // }
        }
    }

</script>

<style scoped>
  .el-input {
    width: 300px;
  }
</style>
