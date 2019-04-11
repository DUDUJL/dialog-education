<template>
  <div id="teacher">
    <!-- 头部导航 -->
    <header class="home-header">
      <el-row>
        <el-col :span="24">
          <el-menu default-active="/admin/dataControll" class="el-menu-demo" mode="horizontal" 
            :router="true"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="/admin/dataControll" :class="{'isActive': active}">数据展示</el-menu-item>
            <el-menu-item index="/admin/teacherControll" :class="{'isActive': !active}">教师管理</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <div>
      <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">
        {{ user.realName }}
        <i><img src="../../assets/我的.png"
                style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"/></i>
      </span>
      <el-dropdown-menu slot="dropdown" :router="true">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item><router-link to="/">注销</router-link></el-dropdown-item>
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
  }
 }
 </script>
 <style>

</style>