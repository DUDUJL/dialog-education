<template>
<div>
<div class="edit_container">
  <quill-editor 
    v-model="content"
    v-loading="loading"  
    class="editer"
    ref="myQuillEditor" 
    :options="editorOption" 
    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
    @change="onEditorChange($event)">
  </quill-editor> 
</div>
<div style="text-align: center">
  <el-button type="primary" @click="changeInfo">提交</el-button>
</div>
</div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import { getContent, getCourseInfo, changeInfo } from '../../../api/api'

    export default{
        data(){
            return {
              content:"",
              editorOption:{},
              loading:false
            }
        },
        methods:{
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            },
            getContent(){
              
            },
            loadCourseInfo(){
              var _this = this;
              var courseName = sessionStorage.getItem('course');
              this.loading = true;
              getCourseInfo({
                "courseName": courseName
              }).then(resp =>{
                _this.loading = false;
                if(resp && resp.status == 200){
                  _this.content = resp.data.data;
                }
              })
              //this.$store.dispatch()
            },
            changeInfo(){
              var _this = this;
              var courseName = sessionStorage.getItem('course');
              this.loading = true;
              changeInfo({
                "courseName": courseName,
                "description": this.content
              }).then(resp =>{
                _this.loading = false;
                if(resp && resp.status == 200){
                  _this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                }else{
                  _this.$message({
                    message: '修改失败',
                    type: 'error'
                  })
                }
              })
            }
        },
        mounted:function () {
          this.loadCourseInfo();
        },
    }
</script>

<style lang="less">
    .edit_container{
		padding: 40px;
		margin-bottom: 40px;
    }
    .editer{
		height: 350px;
	}
</style>


