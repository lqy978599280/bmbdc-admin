<template>
  <el-upload
    class="upload-demo"
    action='http://192.168.1.6:8081/admin/house/uploadImg'
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="success"
    :file-list="fileList2"
    list-type="picture"
    :disabled="disabled"
    :limit="limit"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
    export default {
        name: "imgUpload",
        props:{
          disabled:'',
            limit:{
              type:Number,
                default:1
            },
        },

        data(){
            return{
                fileList2: [

                    ],

            }

        },methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                window.open(file.url,"_blank")
            },
            success(response,file){
                console.log(response);
                console.log(file);
            }

        }
    }
</script>

<style scoped>
.el-table{
  width: 100%;
  margin:5px 0;
  /*width: 15px;*/
}
table{
  height: 50px!important;
}
</style>
