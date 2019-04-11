<template>
  <div>
    <!-- 头部导航 -->
    <header class="header">
      <span class="home_title">会话教学系统</span>
      <div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">
            {{ user.realName }}
            <i><img src="../../assets/用户.png"
                style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"/></i>
          </span>
          <el-dropdown-menu slot="dropdown" :router="true">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <div>
      <router-view class="view"></router-view>
    </div>
  </div>
 </template>
 <script>
 export default {
  computed: {
    user(){
      var user = sessionStorage.getItem('user');
      //var user = sessionStorage.getItem("user");
      return JSON.parse(user);
      //return this.$store.state.user;
      }
    },
  data: function (){
    return {
      active:true
    }
  },
  methods: {
    handleCommand(){
      this.$router.push('/');
    }
  }
 }
 </script>
 <style lang="less">
.header {
    transition: all 0.5s ease;
    background-color: rgb(86, 120, 184);
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 0px;
    height: 40px;
    
  }
  .el-menu-demo{
    padding-left: 0px!important;
    
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
    margin-left: 20px;
  }

  .home-aside {
    background-color: #ECECEC;
  }

  .home-main {
    background-color: #fff;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;;
  }
  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }

</style>