<template>
<div>
  <main>
  <!-- 左侧导航 -->
  <div class="main-left">
    <el-menu default-active="/teacher/mainPageControll/teachInfo" class="el-menu-vertical-demo" :router="true">
      <el-menu-item index="/teacher/mainPageControll/teachInfo" :class="{'isActive': active}"><i class="el-icon-info"></i>教学信息</el-menu-item>
      <el-menu-item index="/teacher/mainPageControll/courseList" :class="{'isActive': !active}"><i class="el-icon-document"></i>课程管理</el-menu-item>
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