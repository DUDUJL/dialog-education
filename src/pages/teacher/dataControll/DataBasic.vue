<template>
  <div class="allActive">
    <el-row class="head" v-model="basicData">
      <el-col :span="18" style="padding:20px 0;background: #33CCCC;">
        <el-col :span="8">
          {{ basicData.totalStudentNum }}<br>
          <span>学生总数</span>
        </el-col>
        <el-col :span="8">
          {{ basicData.totalSqualNum }}<br>
          <span>小组总数</span>
        </el-col>
        <el-col :span="8" style="border: none;">
          {{ basicData.totalTeacherNum }}<br>
          <span>教师总数</span>
        </el-col>
      </el-col>

      <el-col :span="5" :offset="1" style="background:  #3091F2;padding:40px 0;">
        {{ basicData.totalCourseNum }}<br>
        <span>课程总数</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
import { getBasicData } from '../../../api/api'
  export default {
    components:{
    },
    mounted: function () {
    this.loadData();
    },
    data: function () {
      return {
        basicData:{
          totalStudentNum: null,
          totalSqualNum: null,
          totalTeacherNum: null,
          totalCourseNum: null
        }
      }
    },
    methods: {
      loadData(){
        var _this = this;
        axios.get('http://localhost:8088/admin/dataShow/getBasicData')
        .then(function(response) {
          console.log(response.data);
          _this.basicData = response.data.data;
          });
        }
    }
      
  }
</script>
<style>
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
/*
  .Chart {
  background: #212733;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin:  25px 0;
}

.Chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color:  rgba(255, 0,0, 0.5);
  border-bottom: 1px solid #323d54;
}
*/
</style>
