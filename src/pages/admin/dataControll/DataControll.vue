<template>
<div>
  <main>
  <!-- 左侧导航 -->
  <div class="main-left">
    <el-menu default-active="/admin/dataControll/dataBasic" class="el-menu-vertical-demo" :router="true">
      <el-menu-item index="/admin/dataControll/dataBasic" :class="{'isActive': active}">基础数据</el-menu-item>
      <el-menu-item index="/admin/dataControll/dataMore" :class="{'isActive': !active}">高级数据</el-menu-item>
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