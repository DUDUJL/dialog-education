<template>
<div>
  <main>
  <!-- 左侧导航 -->
  <div class="main-left">
    <el-menu default-active="/teacher/courseControll/courseList" class="el-menu-vertical-demo" :router="true">
      <el-menu-item index="/teacher/courseControll/courseList" :class="{'isActive': active}"></el-menu-item>
      <el-menu-item index="/teacher/courseControll/addCourse" :class="{'isActive': !active}"></el-menu-item>
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