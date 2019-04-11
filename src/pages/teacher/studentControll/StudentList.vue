<template>
<div>
  <section class="data_section">
  <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="4"><div class="data_list today_head"><span class="data_num head">学生总人数：</span></div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num">{{total}}</span>人</div></el-col>
	</el-row>
  </section>
    <el-container>  
        <div style="display: inline">
          <el-input
            placeholder="通过学生姓名名搜索学生"
            clearable
            @change="keywordsChange"
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="advanceSearchViewVisible"
            @keyup.enter.native="searchEmp"
            prefix-icon="el-icon-search"
            v-model="keywords">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchStu">搜索
          </el-button>
          <div style="margin-left: 350px;margin-right: 20px;display: inline">
          <el-upload
            :show-file-list="false"
            accept="application/vnd.ms-excel"
            action="/student/basic/importStu"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError" :disabled="fileUploadBtnText=='正在导入'"
            :before-upload="beforeFileUpload" style="display: inline">
            <el-button size="mini" type="success" :loading="fileUploadBtnText=='正在导入'">
            	<i class="el-icon-upload2" style="margin-right: 5px"></i>导入数据
            </el-button>
          </el-upload>
          <el-button type="success" size="mini" @click="exportStu"><i class="el-icon-download"
                                                                       style="margin-right: 5px"></i>导出数据
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddStuView">
            添加学生
          </el-button>
        </div>
        </div>
  </el-container>
<div style="margin:20px 0px 0px 0px">
<el-table
    :data="stus"
    v-loading="studentListLoading"
    @selection-change="handleSelectionChange"
    border
    style="width: 1100px;">
    <el-table-column
      type="selection"
      align="left"
      width="35">
    </el-table-column>
    <el-table-column
      align="left"
      fixed
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      width="80">
    </el-table-column>
	  <el-table-column
      prop="stuId"
      label="学号"
      width="160">
    </el-table-column>
    <el-table-column
      prop="collegeId"
      label="学院"
      width="170">
    </el-table-column>
    <el-table-column
      prop="specialty"
      label="专业"
      width="120">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="160">
    </el-table-column>
    <el-table-column
      prop="groupId"
      label="组号"
      width="80">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="173">
      <template slot-scope="scope">
        <el-button type="primary" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                            @click="">编辑
                </el-button>
        <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                           @click="deleteStu(scope.row)">删除
                </el-button>
      </template>
    </el-table-column>
  </el-table>

  <div style="display: flex;justify-content: space-between;margin: 2px">

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
  <el-form :model="stu" :rules="rules" ref="addStuForm" style="margin: 0px;padding: 0px;">
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
                <el-form-item label="姓名:" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="stu.name" size="mini" style="width: 150px"
                            placeholder="请输入学生姓名"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="性别:" prop="gender">
                  <el-input prefix-icon="el-icon-edit" v-model="stu.gender" size="mini" style="width: 75px"
                            placeholder=""></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="学号:" prop="stuId">
                  <el-input prefix-icon="el-icon-edit" v-model="stu.stuId" size="mini" style="width: 150px"
                            placeholder="请输入学号"></el-input>
                </el-form-item>
              </div>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="学院:" prop="collegeId">
                  <el-input prefix-icon="el-icon-edit" v-model="stu.collegeId" size="mini" style="width: 150px"
                            placeholder="请输入学院Id"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="专业:" prop="specialty">
                  <el-input prefix-icon="el-icon-edit" v-model="stu.specialty" size="mini" style="width: 150px"
                            placeholder="请输入专业"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="邮箱:" prop="email">
                  <el-input prefix-icon="el-icon-edit" v-model="stu.email" size="mini" style="width: 150px"
                            placeholder="请输入邮箱"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="小组号:" prop="groupId">
                  <el-input prefix-icon="el-icon-edit" v-model="stu.groupId" size="mini" style="width: 150px"
                            placeholder="请输入小组号"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEidt">取 消</el-button>
            <el-button size="mini" type="primary" @click="addStu('addStuForm')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
</div>

    
</template>
<script>
import { getStudentList, delStu, addStu} from '../../../api/api'
export default {
  mounted: function () {
      this.loadStu();
    },
	methods: {
      loadStu(){
        var _this = this;
        this.studentListLoading = true;
        getStudentList({
            "page": this.currentPage,
            "size": 5
          }).then((response)=>{
            console.log(response);
            this.studentListLoading = false;
            if (response && response.status == 200) {
              var data = response.data;
              _this.stus = data.data.rows;
              _this.totalCount = data.data.total * 5;
              _this.total = data.data.records;
            }
          });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      currentChange(currentChange){
        this.currentPage = currentChange;
        this.loadStu();
      },
      deleteStu(row){
        this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id);
        }).catch(() => {
        });
      },
      doDelete(ids){
        this.studentListLoading = true;
        var _this = this;
        delStu(ids).then((response)=>{
          _this.studentListLoading = false;
          if (response.status = 200) {
            var data = response.data;
            _this.loadStu();

          }
        });
      },
      exportStu(){
        window.open("/student/basic/exportStu", "_parent");
      },
      fileUploadSuccess(response, file, fileList){
        if (response) {
          this.$message({type: response.status, message: response.msg});
        }
        this.loadStu();
        this.fileUploadBtnText = '导入数据';
      },
      fileUploadError(err, file, fileList){
        this.$message({type: 'error', message: "导入失败!"});
        this.fileUploadBtnText = '导入数据';
      },
      beforeFileUpload(file){
        this.fileUploadBtnText = '正在导入';
      },
      showAddStuView(){
        this.dialogTitle = "添加学生";
        this.dialogVisible = true;
      },
      cancelEidt(){
        this.dialogVisible = false;
        this.emptyStuData();
      },
      emptyStuData(){
        this.stu = {
          name: '',
          gender: '',
          stuId: '',
          college: '',
          specialty: '',
          email: '',
          groupId: ''
        }
      },
      addStu(){
        var _this = this;
        /*
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.stu.id) {
              /*
              //更新
              this.studentListLoading = true;
              
              addStu(this.stu).then(resp=> {
                _this.studentListLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  _this.dialogVisible = false;
                  _this.emptyStuData();
                  _this.loadStu();
                }
              })
            } else {
              */
              //添加
              this.studentListLoading = true;
              addStu(this.stu).then(resp=> {
                _this.studentListLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  _this.dialogVisible = false;
                  _this.emptyStuData();
                  _this.loadStu();
                }
              });
              /*
            }
            
          } else {
            return false;
          }
        });}*/
      }
    
    },
  data() {
    return {
        stus: [],
        keywords: '',
        total: null,
        totalCount: -1,
        currentPage: 1,
        dialogVisible: false,
        tableLoading: false,
        advanceSearchViewVisible: false,
        showOrHidePop: false,
        showOrHidePop2: false,
        tableData: [
        ],
        stu: {
          name: '',
          gender: '', 
          stuId: '',
          collegeId: '',  
          specialty: '',
          email: '',
          groupId: ''
        },
        rules: {
          name: [{required: true, message: '必填:姓名', trigger: 'blur'}],
          gender: [{required: true, message: '必填:性别', trigger: 'blur'}],
          stuId: [{required: true, message: '必填：学号', trigger: 'blur'}],
          collegeId: [{required: true, message: '必填：学院', trigger: 'blur'}],
          specialty: [{required: true, message: '必填:专业', trigger: 'blur'}],
          email: [{required: false, message: '必填:电子邮箱', trigger: 'blur'}, {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }],
          groupId: [{required: false, message: '', trigger: 'blur'}]
        }
      }
    }
  }
</script>
<style lang="less">
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