<template>
  <el-upload
    class="upload-demo"
    action='http://192.168.1.9:8081/admin/house/uploadImg'
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="success"
    :file-list="myFileList"
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
        props: {
            disabled: '',
            limit: {
                type: Number,
                default: 1
            },
            if_upload: false,
            myFileList: {
                type: Array,
                default() {
                    return []
                }
            },
        },
        // watch:{
        //   "if_upload" : function () {
        //       this.$refs.upload.submit()
        //       this.if_upload = false
        //   }
        // },
        data() {
            return {
                imgList: this.myFileList
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.imgList = fileList
                console.log(fileList);

                this.$emit('sub', this.imgList)
            },
            handlePreview(file) {
                window.open(file.url, "_blank")

            },
            success(response, file, fileList) {
                file.url = "http://image.bmbdc.com/" + response.data.imgUrl
                this.imgList = fileList
                this.$emit('sub', this.imgList)
                console.log(fileList);
                fileList = []
                console.log(this.imgList);
                console.log(response);

            }

        }
    }
</script>

<style scoped>
  .el-table {
    width: 100%;
    margin: 5px 0;
    /*width: 15px;*/
  }

  table {
    height: 50px !important;
  }
</style>
