<template>
<div>
  <main>
  <!-- 左侧导航 -->
  <div class="main-left">
    <el-menu default-active="/admin/teacherControll/teacherList" class="el-menu-vertical-demo" :router="true">
      <el-menu-item index="/admin/teacherControll/teacherList" :class="{'isActive': active}">教师列表</el-menu-item>
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
    
}
</script>

<style>

</style>


