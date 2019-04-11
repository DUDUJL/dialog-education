<template>
  <div>
    <div class="title" style="border-radius: 4px;">
			<center>
			<h3 class="mui-title title-color">Chatting</h3>
			</center>
		</div>

    <div class="mui-content" style="overflow: auto;height: 475px; background-color: #eaeaea;
			border-radius: 4px;" >
			<div v-for="msg in MyMsgList" :key="msg" v-html="msg"></div>

			<!--
				<div>
				<div class="friend_lists">
					<div class="header_img">
						<img src="image/face-default-cat.png" width="40px" height="40px" />
					</div>
					<div class="msg-wrapper right">
						<p class="msg-left-white">晚上过来吃饭？</p>
					</div>
				</div>

				<div class="me_lists">
					<div class="header_img">
						<img src="image/face-default-cat.png" width="40px" height="40px" />
					</div>
					<div class="msg-wrapper left">
						<p class="msg-right-green">好的，没问题！时间地点？</p>
					</div>
				</div>
				</div>
				-->
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
</template>

<script>
import md5 from 'js-md5'
let Base64 = require('js-base64').Base64
import axios from 'axios'
import { sendAndGetMsg,beginChat,stopChat } from "../../../../../api/api"

export default {
	name: 'dialog',
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
			textarea: null,
			MyMsgList: [],
			respMsg: '',
			loading: false
    }
	},
	mounted: function () {
    this.beginChat();
  },
	methods: {
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
        utterThis.pitch = 1;
        utterThis.rate = 1;
        synth.speak(utterThis);
    }
		},
		
		voiceDemo(){
			var appId = "5c8b4d15"
			var param = Base64.encode({
					"auf": "audio/L16;rate=16000",
    			"aue": "raw",
    			"voice_name": "xiaoyan",
    			"speed": "50",
    			"volume": "50",
  				"pitch": "50",
					"engine_type": "intp65",
					"text_type": "text"
				}).toString()
			var curtime = ((new Date()).getTime()).toString()
			console.log(appId + "," + param + "," + curtime + "," + md5(appId + curtime + param));
			axios({
				method: 'post',
				url: 'http://api.xfyun.cn/v1/service/v1/tts',
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"X-Appid": appId,
					"X-CurTime": curtime,
					"X-Param": param,
					"X-CheckSum": md5(appId + curtime + param)
				},
				data: {
					"text":"接口调用成功"
				}
			})
		}
	},
}
</script>

<style lang="less">

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
