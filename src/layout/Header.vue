<template>
    <div class="headers">
        <div class="logo">
            <div class="img_logo"></div>
            <div class="img_title"></div>
        </div>
        <div class="header_menu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="home"><a href="/" style="text-decoration:none;">首页</a></el-menu-item>
                <el-menu-item index="dataset_list"><a href="#/dataset_list" style="text-decoration:none;">数据</a></el-menu-item>
                <el-menu-item index="3">统计分析</el-menu-item>
                <el-menu-item index="4">交流互动</el-menu-item>
                <el-menu-item index="5">咨询动态</el-menu-item>
                <el-menu-item index="6"><a href="http://www.bigdata.cetc.com.cn/" target="_blank" style="text-decoration:none;">关于我们</a></el-menu-item>
            </el-menu>
        </div>
        <div class="user">
            <div>
                <el-button round class="login">登录</el-button>
                <el-button round  class="register">注册</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.headers {
    width: 98.95%;
    height: 100%;
    background-color: #2b303b;
    display: flex;
    flex-direction: row;
    justify-items: center;
    padding-left: 20px;
    .logo {
        display: flex;
        flex-direction: row;
        align-items:center;
        .img_logo {
            width: 100px;
            height: 40px;
            margin-left: 10px;
            background-image: url(../assets/header/header_bg.png);
            background-repeat: no-repeat;
            background-size: 100%;
        }
        .img_title {
            width: 180px;
            height: 40px;
            margin-left: 10px;
            background-image: url(../assets/header/header_title.png);
            background-repeat: no-repeat;
            background-size: 100%;
        }
    }
    .header_menu{
        margin-left: 42%;
        padding: 2px 0px 5px 0px;
        .el-menu.el-menu--horizontal {
            border-bottom: solid 0px #e6e6e6;
        }
        .el-menu--horizontal>.el-menu-item.is-active {
            border-bottom: 2px solid #409EFF;
            color: white;
            font-weight: bolder;
            background-color: transparent;
        }
        .el-menu--horizontal>.el-menu-item {
            height: 45px;
        }
        ul{
            height: 100%;
            background-color: transparent;
        }
        ul > li:hover{
            color: white;
            background-color: #2b303b;
        }
        ul > li:visited{
            color: white;
            background-color: transparent;
        }
        
    }
    .user {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 5%;
        .login{
            border-radius: 17px;
            background: #4698ff;
            border: 1px solid white;
            text-align: center;
            color: white;
            font-size: 14px;
            font-weight: bold;
        }
        .register{
            border-radius: 17px;
            background: #FFF;
            border: 1px solid white;
            text-align: center;
            color: #2287ef;
            font-size: 14px;
            font-weight: bold;

        }
        .el-button{
            padding: 8px 20px;
        }
    }

}

</style>

<script>
export default {
    name: 'Header',
    computed: {
       activeIndex() {
            return this.$route.name;
        }
    }
    
}
</script>
