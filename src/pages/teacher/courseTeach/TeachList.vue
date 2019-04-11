<template>
<div>
<el-row v-loading="loading" >
  <el-col v-for="chapter in chapters" :key="chapter">
    <div>
      <el-card class="chapter-card chapter-text" shadow="always">
        {{ chapter.chapterName }}
        <!--multiple 可支持多选文件
            :limit="3" 上传文件个数上限
            list-type="picture" 文件列表类型

            :data="course" 额外的上传数据
            -->
        <div style="float: right;display: inline">
         <!-- 
          <el-upload
            action="http://localhost:8088/file/upload"
            :show-file-list=false
            :data="course"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button
              :loading="uploading" 
              type="primary" size="mini" icon="el-icon-upload" style="padding: 3px 4px 3px 4px;margin: 2px;margin-right: 125px"
              circle>
            </el-button>
          </el-upload>
          -->
          <el-button
            :loading="uploading" 
            type="primary" size="mini" icon="el-icon-upload" style="padding: 3px 4px 3px 4px;margin: 2px;margin-right: 5px"
            @click="showUploadView()"
            circle>
          </el-button>
          <el-button 
            type="danger" size="mini" icon="el-icon-delete" style="padding: 3px 4px 3px 4px;margin: 2px;margin-right: 50px"
            circle>
          </el-button>
        </div>
      </el-card>
    </div>
  </el-col>
</el-row>

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
  <div>
    <el-form :model="files" :rules="rules" ref="addFileForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="60%"
          >
          <el-row>
            <el-col :span="6">
              <el-upload
                ref="upload"
                action="http://localhost:8088/file/uploadFile"
                :show-file-list= true
                :data="course"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-exceed="handleExceed"
                :file-list="fileList"
                :auto-upload="false"
                :limit="3"
                >
                <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
                <el-button
                  :loading="uploading" 
                  type="success" size="mini" @click="submitUpload()">
                  点击上传
                </el-button>
              </el-upload>
              <!--
              <div>
                <el-form-item label="课程名:" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="course.name" size="mini" style="width: 150px"
                            placeholder="请输入课程名"></el-input>
                </el-form-item>
              </div>
              -->
            </el-col>
            
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEdit()">取 消</el-button>
            <el-button size="mini" type="primary" @click="">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
import { getChapters, getChaptersByPage, deleteFile } from '../../../api/api'
export default {
  data() {
    return {
      chapters: [],
      loading: false,
      uploading: false,
      course: {
        "courseName": sessionStorage.getItem("course"),
        
      },
      total: null,
      totalCount: -1,
      currentPage: 1,
      dialogVisible: false,
      files: {

      },
      rules: {
        
      }
    };
  },
  mounted: function () {
    this.loadChapters();
  },
  methods: {
    loadChapters(){
      var _this = this;
      this.loading = true;
      var courseName = sessionStorage.getItem('course');
      getChaptersByPage({
        "str": courseName,
        "page": this.currentPage,
        "size": 5
      }).then(resp =>{
        _this.loading = false;
        if (resp && resp.status == 200) {
          _this.chapters = resp.data.data.rows;
          _this.totalCount = resp.data.data.total * 5;
          _this.total = resp.data.data.records;
        }
      })
    },
    currentChange(currentChange){
      this.currentPage = currentChange;
      this.loadChapters();
    },
    showUploadView(){
      this.dialogTitle = "编辑课件";
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
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList){
      //文件列表移除文件
      console.log(file.name);
      deleteFile(file.name).then(response =>{
        
      });
    },
    handlePreview(){
      //点击文件列表已经上传的文件
    }
  }
}
</script>

<style lang="less">
.chapter-card {
  border-radius: 8px;
  width: 1000px;
  height: 60px;
  margin: 5px;
}
.chapter-text{
  font-size: 15px;
}
</style>