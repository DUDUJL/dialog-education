<template>
  <div id="teacher">
    <!-- 头部导航 -->
    <header class="home-header">
      <el-row>
        <el-col :span="24">
          <el-menu default-active="/teacher/mainPageControll" class="el-menu-demo" mode="horizontal" 
            :router="true"
            background-color="#fff">
            <!--text-color="#fff"
            active-text-color="#ffd04b"-->
            <el-menu-item index="/teacher/mainPageControll" :class="{'isActive': active}">首页</el-menu-item>
            <el-menu-item index="/teacher/courseTeachControll" :class="{'isActive': !active}">课程编辑</el-menu-item>
            <el-menu-item index="/teacher/studentControll" :class="{'isActive': !active}">学生管理</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">
            {{ user.realName }}
            <i><img src="../../assets/我的-24.png"
                style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"/></i>
          </span>
          <el-dropdown-menu slot="dropdown" :router="true" split-button=true>
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
 <style>

</style>