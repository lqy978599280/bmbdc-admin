<template lang="html">
    <div class="editor">
      <div ref="toolbar" class="toolbar"></div>
      <div ref="editor" class="text"></div>
    </div>
</template>

<script>
  import E from 'wangeditor'
    export default {
        name: "WangEditor",
        data(){
            return{
                editor:null,
                info_: null
            }
        },
        model:{
            prop:'value',
            event:'change'
        },
        props:{
            value:{
                type : String,
                default:''
            },
            isClear:{
                type:Boolean,
                default: false
            }
        },
        watch:{
            isClear(val){
                if(val){
                    this.editor.txt.clear()
                    this.info_ = null
                }

            },
            value(val){
                this.editor.txt.html(val)
            }
        },
        mounted() {
            this.setEditor()
        },
        methods:{
            setEditor(){
                this.editor = new E(this.$refs.toolbar,this.$refs.editor)
                this.editor.customConfig.zIndex = 999

                this.editor.customConfig.debug = true;
                this.editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0
                // this.editor.customConfig.uploadImgShowBase64 = false   // 使用 base64 保存图片
                this.editor.customConfig.uploadImgServer = 'http://192.168.1.7:8081/admin/house/uploadImg'  // 上传图片到服务器
                this.editor.customConfig.showLinkImg = false
                this.editor.customConfig.uploadImgHeaders = {'Accept': 'text/x-json'}  // 自定义header
                this.editor.customConfig.uploadFileName = 'img'  // 后端接受上传文件的参数名
                this.editor.customConfig.uploadImgMaxSize = 2*1024*1024  // 将图片大小限制为2M
                this.editor.customConfig.uploadImgMaxLength = 6  // 限制一次最多上传图片数
                this.editor.customConfig.uploadImgTimeout = 12*1000  // 设置超时时间
                this.editor.customConfig.menus=    [
                    'head',  // 标题
                        'bold',  // 粗体
                        'fontSize',  // 字号
                        'fontName',  // 字体
                        'italic',  // 斜体
                        'underline',  // 下划线
                        'strikeThrough',  // 删除线
                        'foreColor',  // 文字颜色
                        'backColor',  // 背景颜色
                        'link',  // 插入链接
                        'list',  // 列表
                        'justify',  // 对齐方式
                        'quote',  // 引用
                        'emoticon',  // 表情
                        'image',  // 插入图片
                        'table',  // 表格
                        'video',  // 插入视频
                        'code',  // 插入代码
                        'undo',  // 撤销
                        'redo'  // 重复
                    ]
                this.editor.customConfig.uploadImgHooks={
                    fail:(xhr,editor,result)=>{
                        console.log('fail');
                    },
                    success:(xhr,editor,result)=>{
                        console.log('success');
                    },
                    timeout:(xhr,editor)=>{

                    },
                    error:(xhr,editor)=>{
                        console.log('error');
                    },
                    customInsert:(insertImg,editor,result)=>{
                        let url = result.url
                        insertImg(url)

                    }
                }
                this.editor.customConfig.onchange = (html)=>{
                    this.info_ = html
                    this.$emit('change',this.info_)
                }
                this.editor.customConfig.customAlert = function (info) {
                    // info 是需要提示的内容
                    alert('自定义提示：' + info)
                }
                this.editor.create()

            }
        }
    }
</script>

<style scoped>

.editor{
  width: 100%;
  margin:0 auto;
  line-height: 20px;

}
  .toolbar{
    border:1px solid #ccc;
  }
  .text{
    border: 1px solid #ccc;
    height: 300px;
  }
</style>










;;;
