<template>
<div>
  <main>
  <!-- 左侧导航 -->
  <div class="main-left">
    <el-menu default-active="/teacher/studentControll/studentList" class="el-menu-vertical-demo" :router="true">
      <el-menu-item index="/teacher/studentControll/studentList" :class="{'isActive': active}"><i class="el-icon-document"></i>学生管理</el-menu-item>
      <el-menu-item index="/teacher/studentControll/groupList" :class="{'isActive': !active}"><i class="el-icon-setting"></i>分组设置</el-menu-item>
    </el-menu>
  </div>
  <!-- 右侧主内容区 -->
  <div class="main-right" >
    <router-view class="view"></router-view>
  </div>
  </main>
</div>
</template>

<script>
 export default {
  data: function (){
  return {
   active:true
  }
  }
 }
 </script>
 <style>
</style>