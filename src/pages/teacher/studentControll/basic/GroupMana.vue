<template>
<div>
  <div style="text-align: left">
    <el-input
      placeholder="小组名称..."
      size="mini"
      @keyup.enter.native="addSqual"
      style="width: 300px;"
      prefix-icon="el-icon-plus"
      v-model="SqualNum">
    </el-input>
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="addSqual">添加</el-button>
  </div>
  <div style="margin-top: 10px">
    <el-table
      v-loading="loading"
      :data="squalData"
      size="mini"
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
        prop="squalNum"
        label="组号"
        width="300"
        align="left">
      </el-table-column>
      <el-table-column label="操作" align="left">
        <template slot-scope="scope">
          <el-button
            style="padding: 3px 4px 3px 4px;margin: 2px"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
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
import { addSqual, getSqualList, deleteSqual } from '../../../../api/api'
export default{
    mounted: function () {
      this.loadTableData();
    },
    methods: {
      deleteMany(){
        var _this = this;
        this.$confirm('删除' + this.multipleSelection.length + '条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var multipleSelection = _this.multipleSelection;
          var ids = '';
          multipleSelection.forEach(row=> {
            ids = ids + row.id + ',';
          })
          _this.doDelete(ids);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      addSqual(){
        if (this.SqualNum == null) {
          this.$message.warning('小组号不能为空');
          return;
        }
        var _this = this;
        this.loading = true;
        addSqual({
        	squalNum: this.SqualNum
        }).then((response)=>{
            console.log(response);
            this.loading = false;
            if (response && response.status == 200) {
            	_this.loadTableData;
            }
          });
        /*
        this.postRequest(this.state == 'position' ? "/system/basic/position" : "/system/basic/joblevel", {
          name: this.positionName,
          titleLevel: this.titleLevel
        }).then(resp=> {
          _this.loading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _
            _this.loadTableData();
            _this.positionName = '';
            _this.titleLevel = '';
          }
        });*/
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDelete(index, row){
        var _this = this;
        this.$confirm('删除小组[' + row.squalNum + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.doDelete(row.id);
        }).catch(() => {
          /*
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          */
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
        /*
        var url = this.state == 'position' ? '/system/basic/position/' : '/system/basic/joblevel/';
        this.deleteRequest(url + ids).then(resp=> {
          _this.loading = false;
          if (resp && resp.status == 200) {
            _this.loadTableData();
          }
        })
        */
      },
      loadTableData(){
        var _this = this;
        this.loading = true;
        getSqualList({
            "page": this.currentPage,
            "size": 5
          }).then((response)=>{
            console.log(response);
            this.loading = false;
            if (response.status == 200) {
              var data = response.data;
              _this.squalData = data.data.rows;
              _this.totalCount = data.data.total * 5;
            }
          });
        /*
        this.getRequest(this.state == 'position' ? "/system/basic/positions" : "/system/basic/joblevels").then(resp=> {
          _this.loading = false;
          if (resp && resp.status == 200) {
            _this.posData = resp.data;
          }
        })*/
      },
       currentChange(currentChange){
        this.currentPage = currentChange;
        this.loadTableData();
      }

    },
    data(){
      return {
      	squalData: [],
      	loading: false,
      	totalCount: -1,
        currentPage: 1
      }
    }
  }
</script>


<style>
	
</style>