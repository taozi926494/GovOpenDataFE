<template>
  <header>
    <img :src="require('../assets/header/header_bg.png')" alt />
    <div class="sysname">政府开放数据中心</div>
    <ul class="header-menu">
      <li :class="{active: ['home'].indexOf($route.name) > -1}">
        <router-link to="/">首页</router-link>
      </li>
      <li :class="{active: ['datasetList', 'datasetInfo'].indexOf($route.name) > -1}">
        <router-link to="/datasetList">数据</router-link>
      </li>
      <li>
        <router-link to="/">统计分析</router-link>
      </li>
      <li :class="{active: ['news'].indexOf($route.name) > -1}">
        <router-link to="/news">咨讯动态</router-link>
      </li>
      <li>
        <a href="http://www.bigdata.cetc.com.cn/" target="_blank">关于我们</a>
      </li>
    </ul>
    <!-- <div class="user">
      <el-button round class="login">登录</el-button>
      <el-button round class="register">注册</el-button>
    </div>-->
  </header>
</template>

<style lang="scss">
.header-menu {
  @include flex(row, flex-end);
  flex: 1;
  font-size: 14px;
  margin-right: 40px;
  background-color: #2b303b;
  color: #e6e6e6;
  li {
    height: 60px;

    line-height: 30px;
    padding: 15px;
    a {
      color: $color-main-white;
    }
    list-style: none;
  }
  li.active {
    border-bottom: 5px solid $color-main-blue;
  }
}
header {
  @include flex();
  height: 60px;
  padding-left: 20px;
  background-color: #2b303b; color: #e6e6e6;
  img {
    height: 22px;
    margin-left: 25px;
  }
  .sysname {
    font-size: 22px;
    font-weight: bolder;
    margin-left: 10px;
    color: $color-main-white;
  }
  .user {
    @include flex(column);
    margin-left: 5%;
    .login {
      border-radius: 17px;
      background: #4698ff;
      border: 1px solid white;
      text-align: center;
      color: white;
      font-size: 14px;
      font-weight: bold;
    }
    .register {
      border-radius: 17px;
      background: #fff;
      border: 1px solid white;
      text-align: center;
      color: #2287ef;
      font-size: 14px;
      font-weight: bold;
    }
    .el-button {
      padding: 8px 20px;
    }
  }
}
</style>

<script>
export default {
  name: "Header"
};
</script>
