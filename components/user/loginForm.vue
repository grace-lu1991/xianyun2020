<template>
  <el-form :model="form" :rules="rules" ref="form" class="form">
    <el-form-item prop="username" class="form-item">
      <el-input v-model="form.username" placeholder="用户名/手机" class="inputSet"></el-input>
    </el-form-item>
     <el-form-item prop="password" class="form-item">
      <el-input v-model="form.password" placeholder="密码" type="password" ></el-input>
    </el-form-item>
<el-row>
  <el-button type="primary" class="submit" @click="submitInfo">登录</el-button>
  </el-row>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules:{
          username:[{required: true, message: '请输入用户名', trigger: 'blur'}], 
          password:[{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    };
  },
  methods:{
      submitInfo(){
          this.$refs.form.validate((valid) =>{
              if (valid){
                  this.$store.dispatch('user/login',this.form).then(res=>{
                    //   console.log(res)
                      this.$message('登陆成功')
                      this.$router.push('/')
                  })
              }
          })
      }
  }
};
</script>

<style lang='less'>
 .form{
        padding:25px;
    }
    .form-item{
        margin-bottom:20px;
    }
     .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }
     .submit{
        width:100%;
        margin-top:10px;
    }
</style>