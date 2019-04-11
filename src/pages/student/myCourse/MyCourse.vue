<template>
<div>
  <div style="display: -webkit-box; display: -ms-flexbox; min-height: 700px; border: solid 8px #E9ECF1; background-color: #FCFCFC;">
    <div class="page-data">
      <div class="allActive">
      <el-row class="head" v-model="basicData">
        <el-col :span="18" style="padding:20px 0;background: #33CCCC;border-radius: 4px;">
          <el-col :span="8">
            {{ basicData.totalStudentNum }}<br>
            <span>总数</span>
          </el-col>
          <el-col :span="8">
            {{ basicData.totalSqualNum }}<br>
            <span>总数</span>
          </el-col>
          <el-col :span="8" style="border: none;">
            {{ basicData.totalTeacherNum }}<br>
            <span>总数</span>
          </el-col>
        </el-col>
        <el-col :span="5" :offset="1" style="background:  #3091F2;padding:40px 0;border-radius: 4px;">
          {{ basicData.totalCourseNum }}<br>
          <span>课程总数</span>
        </el-col>
      </el-row>
    </div>
    </div>

    <div class="page-courses">
      <div style="margin-bottom: 5px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/student/myCourse' }">全部课程：</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="4.9" v-for="course in courses" :key="course">
          <div>
            <el-card class="box-card" shadow="always">
              <div slot="header" class="text">{{ course.courseName }}
                <el-button type="primary" class="button" size="mini"
                  @click="studyCourse(course.courseId)" plain round>进入学习</el-button>
              </div>
              <div class="bottom" style="padding: 0px;">
                <div class="description" v-html="course.description">{{ course.description }}</div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="footer">
      <center>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="5"
          layout="prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </center>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import { getCourseList } from '../../../api/api'
export default {
  data: function (){
    return {
      courses: [],
      currentDate: new Date(),
      total: null,
      totalCount: -1,
      currentPage: 1,
      loading: false,

      basicData:{
        totalStudentNum: null,
        totalSqualNum: null,
        totalTeacherNum: null,
        totalCourseNum: null
      }
    }
  },
  mounted: function () {
    this.loadTableData();
    this.loadData();
  },
  methods: {
    loadTableData(){
      var _this = this;
      this.loading = true;
      getCourseList({
        "page": this.currentPage,
        "size": 5
      }).then(response=>{
        console.log(response);
        this.loading = false;
        if (response.status == 200) {
          var data = response.data;
          _this.courses = data.data.rows;
          _this.courseData = data.data.rows;
          _this.totalCount = data.data.total * 5;
          _this.total = data.data.records;
        }
      });
    },
    loadData(){
      var _this = this;
      axios.get('http://localhost:8088/admin/dataShow/getBasicData')
      .then(function(response) {
        console.log(response.data);
        _this.basicData = response.data.data;});
    },
    handleCurrentChange(handleCurrentChange){
      this.currentPage = handleCurrentChange;
      this.loadTableData();
    },
    studyCourse(courseId){
      this.$router.push({ path: '/student/studyCourse', query: { courseId: courseId}});
    }
  }
}
</script>
<style lang="less">
.text {
    font-size: 20px;
  }
  .item {
    padding: 0px 0;
  }
  .box-card {
    border-radius: 26px;    
    width: 280px;
    height: 300px;
    margin-left: 15px;
    margin-top: 13px;
  }
.bottom {
  margin-top: 0px;
  line-height: 23px;
}
 .button {
    
    float: right;
  }
  .description {
    font-size: 10px;
    color: #999;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  
  .clearfix:after {
    clear: both
  }
  .footer {
    position: fixed;
    padding: 10px;
    bottom: 0px; 
    width: 100%;
    height: 30px;
    background-color: #eee;
    z-index: 9999;
  }
.page-courses{float: left; margin-top: 10px; margin-left: 190px; margin-right: 170px;}
.page-data{ margin-left: 170px; margin-top: 50px; margin-right: 170px;}


.allActive > .head > .el-col > .el-col {
  padding: 20px 0;
  border-right: solid 1px #fff;
}

.allActive .head {
  text-align: center;
  color: #fff;
  font-size: 30px;
  margin-bottom: 50px;
}

.allActive .head span {
  font-size: 16px;
}
</style>