<template>
  <div class="box">
    <div class="login">
      <div class="imgbox">
        <img src="../../assets/logo.png" alt="logo">

      </div>
      <el-form   label-width="100px" class="demo-ruleForm">
        <el-form-item label="帐号" >
          <el-input type="text" placeholder="请输入帐号"  v-model="account"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input type="password"placeholder="请输入密码" v-model="password" ></el-input>
        </el-form-item>
        <el-form-item label="验证码"  >
          <div class="codeBox">
            <el-input type="text" placeholder="请输入验证码" v-model="code" class="code"></el-input>
            <label  @click="change">{{random}}</label>
          </div>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登 录</el-button>
          <el-button @click="resetForm()">忘记密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>


</template>
<script>
    export default {
        data() {

            return {
                account:"Admin",
                password:'123456',
                random:Math.round(Math.random()*899999+100000),
                code:''
            };
        },
        methods:{
            submitForm(e){
                if(this.account == "Admin"&&this.password =="123456"&&this.code==this.random)
                this.$router.push('/index')
            },
            change:function () {
                this.random=Math.round(Math.random()*899999+100000)
            },
            resetForm(){
                this.$router.push('/passwordforget')

            }
        }
    }
</script>
<style scoped lang="stylus">
  @import url("//unpkg.com/element-ui@2.0.11/lib/theme-chalk/index.css");
  .box
    width 100%
    display flex
    align-items center
    height 100vh

    .login
      width 400px
      margin 0 auto
      padding-right: 40px;
      border 1px solid gainsboro
      padding-bottom 20px
      background-color: #f2f2f2
      .imgbox
        display flex
        justify-content center
        margin 60px 0 40px 0
      .codeBox
        display flex
        justify-content space-between
        .code
          width: 70%
        label
          display inline-block
          width: 28%
          border 1px solid #dcdfe6
          height: 40px
          line-height: 40px
          padding 0 15px
          color #606266
          border-radius 4px
          box-sizing border-box
          letter-spacing 1.5px
          user-select none


</style>
