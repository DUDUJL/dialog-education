<template>
<div>
<main>
  <!-- 左侧导航 -->
  <div class="main-left">
    <h6>--选择要编辑的课程--</h6>
    <el-select v-model="courseName" filterable placeholder="请选择" clearable
      @change="choseCourse">
      <el-option
        v-for="item in courses"
        :key="item.courseName"
        :label="item.courseName"
        :value="item.courseName">
      </el-option>
    </el-select>
    <el-menu default-active="/teacher/courseTeachControll/courseInfo" class="el-menu-vertical-demo" :router="true">
      <el-menu-item index="/teacher/courseTeachControll/courseInfo" :class="{'isActive': active}"><i class="el-icon-info"></i>课程信息</el-menu-item>
      <el-menu-item index="/teacher/courseTeachControll/teachList" :class="{'isActive': !active}"><i class="el-icon-menu"></i>教学大纲</el-menu-item>
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
import { getAllCourse } from '../../../api/api'
export default {
  data(){
    return {
      courseName: sessionStorage.getItem('course'),
      courses: []
    }
  },
  mounted:function () {
    this.loadCourses();
  },
  methods:{
    loadCourses(){
      var _this = this;
      getAllCourse().then(resp =>{
        if(resp && resp.status == 200){
          _this.courses = resp.data.data;
        }
      });
    },
    choseCourse(choseCourse){
      console.log('课程名：' + choseCourse);
      this.$store.dispatch('choseCourse', choseCourse);
      sessionStorage.setItem('course', choseCourse);
      //sessionStorage.getItem('course', )
    }
  }
}
</script>
