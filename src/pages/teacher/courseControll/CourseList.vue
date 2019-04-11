<template>
  <div style="margin-top: 10px">
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
</template>

<script>
import { getCourseList } from '../../../api/api'
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
          _this.doDelete(row.id);
        }).catch(() => {
      });
    },
    doDelete(ids){
      var _this = this;
      _this.loading = true;
      deleteSqual(ids).then(response =>{
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
        }
      });
    },
    currentChange(currentChange){
      this.currentPage = currentChange;
      this.loadTableData();
    }
  },
  data(){
      return {
          courseData: [
          ],
          loading: false,
      	  totalCount: null,
          currentPage: 1
      }
  }
}
</script>

<style>

</style>


