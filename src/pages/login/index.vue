<template>
  <div class="box">
    <div class="login">
      <img src="" alt="">
      <el-form   label-width="100px" class="demo-ruleForm">
        <el-form-item label="帐号" >
          <el-input type="text" placeholder="请输入帐号"  v-model="account"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input type="password"placeholder="请输入密码" v-model="password" ></el-input>
        </el-form-item>
        <el-form-item label="验证码"  >
          <div class="codeBox">
            <el-input type="text" placeholder="请输入帐验证码" v-model="code" class="code"></el-input>
            <label>{{random}}</label>
          </div>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">忘记密码</el-button>
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
                random:Math.round(Math.random()*1000000),
                code:''
            };
        },
        methods:{
            submitForm(e){
                this.$router.push('/index')
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


</style>
