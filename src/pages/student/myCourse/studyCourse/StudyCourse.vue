<template>
  <div>
    <main>

      <!--资料部分-->
      <div class="side-left">
        <el-breadcrumb separator-class="el-icon-arrow-left" style="margin-bottom: 20px">
          <el-breadcrumb-item :to="{ path: '/student/myCourse' }">返回</el-breadcrumb-item>
          <el-breadcrumb-item>{{ this.courseName }}</el-breadcrumb-item>
        </el-breadcrumb>
        <pdf ref="pdf" :src="pdfUrl" 
          style="height:450px; width:450px; margin-left:90px; border-top:1px solid #542">
        </pdf>
      </div>

      <!--对话部分-->
      <div class="side-right">
        <div>
          <div class="title" style="border-radius: 4px;">
			      <center>
			        <h3 class="mui-title title-color">Chatting</h3>
			      </center>
		      </div>
          <div class="mui-content" style="overflow: auto;height: 475px; background-color: #eaeaea;
		      	border-radius: 4px;" v-loading="loading">
			      <div v-for="msg in MyMsgList" :key="msg" v-html="msg"></div>
		      </div>
		      <div style="border-top: solid 1px #bbb; border-bottom: solid 1px #bbb;">
		        <el-row>
			        <el-col :span="25">
				        <el-input
  				        type="textarea"
  				        :rows="2"
				          style="width: 630px; margin-top: 5px;"
  				        placeholder="请输入内容"
  				        v-model="textarea"></el-input>
			        </el-col>
			        <el-col :span="1">
				        <el-button type="primary" size="small" style="height: 65px; width: 60px" :loading="loading"
				          @click="sendMsg()">发送</el-button>
			        </el-col>
		        </el-row>
          </div>
	        <el-button @click="beginChat()">开始对话</el-button>
	        <el-button @click="stopChat()">结束对话</el-button>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import axios from 'axios'
import { sendAndGetMsg,beginChat,stopChat,getCourseMsgById } from "../../../../api/api"
export default {
  name: 'StudyCourse',
  components: {
    pdf    
  },
  computed: {
    user(){
      var user = sessionStorage.getItem('user');
      //var user = sessionStorage.getItem("user");
      return JSON.parse(user);
      //return this.$store.state.user;
    }
  },
  data: function (){
    return {
      courseId: this.$route.query.courseId,
      courseName: null,
      pdfUrl: '../../../../../../../static/1.1.pdf',
      textarea: null,
			MyMsgList: [],
			respMsg: '',
			loading: false,
    }
  },
  mounted: function () {
    this.getCourseById();
    this.beginChat();
    this.$store.dispatch("changePdf", );
  },
  methods: {
    getCourseById(){
      var _this = this;
      getCourseMsgById({
        "courseId": this.courseId
        }).then(response => {
        console.log(response);
        if (response.status == 200) {
          var data = response.data.data;
          _this.courseName = data.courseName;
          
        }
      });
    },
    beginChat(){
			var _this = this;
			beginChat({
				"user": this.user.realName,
				"msg": ""
			}).then(resp => {
				var respMsg = resp.data.data
					_this.speak(respMsg)
					var _respMsg = '<div class="friend_lists">' +
												   '<div class="header_img">' +
															'<img src="../../../../../../static/head/teacher.jpg" width="40px" height="40px" />' + 
													 '</div>' +
													 '<div class="msg-wrapper right">' +
													   '<p class="msg-left-white">' + respMsg + '</p>' +
													 '</div>' +
												 '</div>';
					_this.MyMsgList.push(_respMsg)
			})
		},
		sendMsg(){
			var _this = this;
			var textarea = this.textarea;
			this.loading = true;
			if (textarea == null||''){
				this.$notify.error({
          title: '错误',
					message: '输入不能为空',
					offset: 500
        });
			}else if(textarea != null||''){
				sendAndGetMsg({
					"user": this.user.realName,
					"msg": this.textarea
				}).then(resp => {
					if (resp.status == 200) {
						var _msg = this.msg = '<div class="me_lists">' + 
																		'<div class="header_img">' +
																			'<img src="../../../../../../static/head/student.jpg" width="40px" height="40px" />'+ 
																		'</div>' + 
																		'<div class="msg-wrapper left">'+ 
																			'<p class="msg-right-green">' + this.textarea + '</p>'+ 
																		'</div>' + 
																	'</div>';
						_this.MyMsgList.push(_msg);
						var respMsg = resp.data.data
						_this.speak(respMsg)
						if (respMsg == "准备好了再告诉我"){
							stopChat({
								"user": this.user.realName
							}).then(resp =>{
							});
							_this.beginChat();
            }
            //_this.pdfUrl = '../../../../../../../static/1.2.pdf'
						if (respMsg == "多元智能理论的提出者加德纳曾说：“每一个孩子都是一个潜在的天才儿童，只是经常表现为不同的形式。” 加德纳提出的多元智能理论将人的能力分为八个方面。 请同学们阅读理论的相关内容，根据理论内容并结合自身实际，谈谈该理论有哪些优点，又有哪些不足之处？"){
              _this.pdfUrl = '../../../../../../../static/1.2.pdf'
            }
            if (respMsg == "左边的资料里有一些运用") {
              _this.pdfUrl = '../../../../../../../static/1.3.pdf'
            }
						var _respMsg =  '<div class="friend_lists">' +
												  		'<div class="header_img">' +
																'<img src="../../../../../../static/head/teacher.jpg" width="40px" height="40px" />' + 
													 		'</div>' +
													  	'<div class="msg-wrapper right">' +
													   		'<p class="msg-left-white">' + respMsg + '</p>' +
													 		'</div>' +
												 		'</div>' ;
						_this.MyMsgList.push(_respMsg)
						_this.textarea = null;
						_this.loading = false;
					}
				})
			}
		},
		stopChat(){
			var _this = this;
			stopChat({
				"user": this.user.realName
			}).then(resp =>{
				_this.MyMsgList = []
			});
		},
		speak(text){
			var synth = window.speechSynthesis;
			if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    	}
			if (text !== '') {
        var utterThis = new SpeechSynthesisUtterance(text);
        utterThis.onend = function (event) {
            console.log('SpeechSynthesisUtterance.onend');
        }
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        utterThis.pitch = 2;
        utterThis.rate = 1.1;
        synth.speak(utterThis);
    }
		},
  }
}
</script>

<style lang="less">
    .side-left{width: 50%;float: left;  margin-top: 20px; margin-left: 30px }
    .side-right{-webkit-box-flex: 1; -ms-flex: 1; flex: 1; padding: 15px 15px 15px; }
    .userfaceImg {
    width: 37px;
    height: 37px;
    border-radius: 30px;
    margin-right: 10px;
  }

  .friendListDiv {
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    box-sizing: border-box;
    align-items: center;
    width: 160px;
    height: 40px;
    border-color: #20a0ff;
    border-left-style: solid;
    border-top-style: solid;
    border-right-style: solid;
    border-width: 1px;
    cursor: pointer
  }

  .chatDiv {
    border-color: #20a0ff;
    border-style: solid;
    border-radius: 5px;
    border-width: 1px;
    box-sizing: border-box;
    width: 700px;
    height: 450px;
    overflow-y: auto;
    padding-bottom: 50px;
  }

  .sendBtn {
    padding-left: 25px;
    padding-right: 25px
  }

  .currentChatFriend {
    background-color: #dcdfe6;
  }



  .userfaceImg {
  width: 37px;
  height: 37px;
  border-radius: 30px;
  margin-right: 10px;
}

.chatDiv {
  border-color: #20a0ff;
  border-style: solid;
  border-radius: 5px;
  border-width: 1px;
  box-sizing: border-box;
  width: 700px;
  height: 450px;
  overflow-y: auto;
  padding-bottom: 50px;
}

.sendBtn {
  padding-left: 25px;
  padding-right: 25px
}

.currentChatFriend {
  background-color: #dcdfe6;
}


/*图片气泡*/
.friend_lists {
	margin: 0 50px 0px 10px;
	position: relative;
}

.friend_lists .header_img {
	position: absolute;
	top: 5px;
}

.me_lists {
	position: relative;
	margin: 0 10px 0px 50px;
}

.me_lists .msg {
	float: right;
	margin-right: 73px;
}

.me_lists .header_img {
	position: absolute;
	top: 5px;
	right: 0px;
}


/*背景气泡*/
.msg-left-white {
	background-color: #FFFFFF;
	font-size: 16px;
}

.msg-right-green {
	background-color: #a0e759;
	font-size: 16px;
}

.msg-wrapper p {
	color: black;
	display: inline-block;
	padding: 12px;
	margin: 10px;
	position: relative;
	border-radius: 5px;
}

.msg-wrapper.right p {
	margin-left: 60px;
}

.msg-wrapper.right p:before {
	width: 0;
	position: absolute;
	top: 15px;
	border-style: solid;
	content: "";
}

.msg-wrapper.right p:before {
	left: -12px;
	border-color: transparent #FFFFFF;
	border-width: 0 12px 12px 0;
}

.msg-wrapper.left p:before {
	width: 0;
	position: absolute;
	top: 15px;
	border-style: solid;
	content: "";
}

.msg-wrapper.left p {
	margin-right: 60px;
}

.msg-wrapper.left {
	text-align: right;
}

.text-left {
	text-align: left;
}

.msg-wrapper.left p:before {
	right: -12px;
	border-color: transparent #a0e759;
	border-width: 0 0 12px 12px;
}

.cur_time {
	text-align: center;
	width: 100%;
	margin-top: 10px;
}

.cur_time span {
	width: auto;
	display: inline-block;
	padding: 2px 10px;
	font-size: 14px;
	border-radius: 3px;
	background: #CECECE;
	color: white;
}

footer {
	
	width:630px;

	border-top: solid 1px #bbb;
	
	bottom: 0px;
	
	padding: 0px 65px 0 0px;

}



.footer-right {
	

	
	
}

.footer-center {
	
}

#msg {
	height: 100%;
	overflow: auto;
}


.title {
	background-color: #c9394a;
}

.title-color {
	color: white;
}

.mui-bar-tab .mui-tab-item.mui-active {
	color: #c9394a;
}
</style>

