<template>
<div>
  <section class="data_section">
	  <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="4"><div class="data_list today_head"><span class="data_num head">开设课程：</span></div></el-col>
      <el-col :span="4"><div class="data_list">您正在教授<span class="data_num">{{total}}</span> 门课程</div></el-col>
	  </el-row>
  </section>
  <el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddCourseView()">添加课程
  </el-button>
  <div style="margin-top: 10px;">
  <el-table
    v-loading="loading"
    :data="courseData"
    size=""
    stripe
    border
    @selection-change="handleSelectionChange"
    style="width: 80%">
      <el-table-column
        type="selection"
        width="55"
        align="left">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名"
        width="150"
        align="left">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="500"
        align="left">
      </el-table-column>
      <el-table-column label="操作" align="left">
        <template slot-scope="scope">
          <el-button
            style="padding: 3px 4px 3px 4px;margin: 2px"
            size="mini"
            type="primary"
            @click="editCourse(scope.row)">编辑课程
          </el-button>
          <el-button
            style="padding: 3px 4px 3px 4px;margin: 2px"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: left;margin-top: 10px">
  	<!--
    <el-button type="danger" size="mini" v-if="squalData.length>0" :disabled="multipleSelection.length==0"
               @click="deleteMany">批量删除
    </el-button>
-->
    <el-pagination
      background
      :page-size="5"
      :current-page="currentPage"
      @current-change="currentChange"
      layout="prev, pager, next"
      :total="totalCount">
    </el-pagination>
    </div>
  </div>

  <el-form :model="course" :rules="rules" ref="addCourseForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="60%">
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="课程名:" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="course.name" size="mini" style="width: 150px"
                            placeholder="请输入课程名"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEdit">取 消</el-button>
            <el-button size="mini" type="primary" @click="addCourse('addCourseForm')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
</div>
</template>

<script>
import { getCourseList, addCourse, deleteCourse } from '../../../api/api'
export default {
  mounted: function () {
    this.loadTableData();
  },
  methods: {
    editCourse(row){
      
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDelete(index, row){
      var _this = this;
      this.$confirm('删除课程[' + row.courseName + '], 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(() => {
          _this.doDelete(row.courseId);
        }).catch(() => {
      });
    },
    doDelete(id){
      var _this = this;
      _this.loading = true;
      deleteCourse(id).then(response =>{
      _this.loading = false;
      if (response.status = 200) {
      var data = response.data;
      _this.loadTableData();
      }
      });
    },
    loadTableData(){
      var _this = this;
      this.loading = true;
      getCourseList({
        "page": this.currentPage,
        "size": 5
      }).then((response)=>{
        console.log(response);
        this.loading = false;
        if (response.status == 200) {
          var data = response.data;
          _this.courseData = data.data.rows;
          _this.totalCount = data.data.total * 5;
          _this.total = data.data.records;
        }
      });
    },
    currentChange(currentChange){
      this.currentPage = currentChange;
      this.loadTableData();
    },
    showAddCourseView(){
      this.dialogTitle = "添加课程";
      this.dialogVisible = true;
    },
    cancelEdit(){
      this.dialogVisible = false;
      this.emptyCourseData();
    },
    emptyCourseData(){
      this.course = {
        name: ''
      }
    },
    addCourse(){
      var _this = this;
      this.loading = true;
      addCourse({
        "courseName": this.course.name,
        "description": "" 
      }).then(resp=> {
        _this.loading = false;
        if (resp && resp.status == 200) {
          var data = resp.data;
          _this.dialogVisible = false;
          _this.emptyCourseData();
          _this.loadTableData();
        }
      });
    }
  },
  data(){
      return {
          courseData: [
          ],
          loading: false,
          total: null,
      	  totalCount: -1,
          currentPage: 1,
          dialogVisible: false,
          course: {
            name: ''
          },
          rules: {
          name: [{required: true, message: '必填:姓名', trigger: 'blur'}]
          }
      }
  }
}
</script>

<style lang="less">
  .data_section{
		padding: 0px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 15px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 30px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
    }
  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>


