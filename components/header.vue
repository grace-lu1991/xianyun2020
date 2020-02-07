<template>
  <div class="header">
    <el-row type="flex" justify="space-between;" class="main">
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <div class="nav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </div>
      <div class="user">
        <div class="msg">
          <i class="el-icon-bell"></i>
          <span>消息</span>
        </div>
        <div>
          <nuxt-link to="/user/login">登录/注册</nuxt-link>
        </div>
      </div>
      <el-dropdown>
  <span class="el-dropdown-link">
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>个人中心</el-dropdown-item>
    <el-dropdown-item>退出</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.header {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 3px 0 #f5f5f5;
  .main {
    width: 1000px;
    margin: 0 auto;
  }
  /deep/.el-row {
    height: 60px;
  }
  .logo {
    height: 60px;
    line-height: 60px;
    img {
      width: 156px;
      height: 60px;
    }
  }
  .nav {
    display: flex;
    flex: 1;
    a {
      display: block;
      box-sizing: border-box;
      padding: 0 20px;
      height: 60px;
      line-height: 60px;
    }
  }
  .user {
    display: flex;
    .msg{
      padding:0 10px;
    }
  }
}
</style>