<template>
	<div>
	<div class="page-header">
    <h1 style="display:inline;" ><center>会话教学系统</center></h1>
	</div>
	<el-form :rules="fromRules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">欢迎登陆</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked"
                 label-position="left">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
    </el-form-item>
    <!--
    <el-form-item style="width: 100%">
      <el-button type="danger" style="width: 100%" @click="registClick">第一次登陆？请注册</el-button>
    </el-form-item>
    -->
	</el-form>
	</div>
</template>

<script>
//import cookie from '../store/utils/cookie';
import { login } from '../api/api'
export default{
    mounted: function () {
      //移除登录信息
      sessionStorage.removeItem("user");
      this.$store.dispatch("logout");
      sessionStorage.removeItem("course");
    },
    data(){
      return {
        fromRules: {
          username: [{required: false, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: false, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: '222015321062122',
          password: '62122'
        },
        loading: false,
        userToken: ''
      }
    },
    methods: {
      login(){
      	var _this = this;
      	this.loading = true;
        login({
          username: this.loginForm.username, //当前页码
          password: this.loginForm.password
          }).then((response)=> {
          _this.loading = false;
          console.log(response);
          if(response.data.msg == "用户名密码不能为空"){
          	this.$message({
          		message: response.data.msg,
          		type: 'warning'
        	});
          }else if(response.data.msg == "用户名或密码不正确，请重试..."){
          	this.$message({
          		message: response.data.msg,
          		type: 'warning'
        	});
          }else if(response.data.msg == "OK"){
            //存储用户信息
            this.$store.dispatch("login", response.data.data);
            sessionStorage.setItem("user", JSON.stringify(response.data.data));
            //this.$store.dispatch('login');
          	//_this.userToken = response.data.data.userToken;
          	// 将用户token保存到vuex中
          //_this.changeLogin({ Authorization: _this.userToken });
          //跳转到首页页面
          if(response.data.data.roleId == 1){
          	this.$router.push('/teacher');
          	this.$message({
          		message: '登录成功',
          		type: 'success'
        	  });
          }else if(response.data.data.roleId == 2){
            this.$router.push('/student');
            this.$message({
          		message: '已登陆',
          		type: 'success'
        	  });
          }else if(response.data.data.roleId == 0){
            this.$router.push('/admin');
            this.$message({
              message: '登录成功',
              type: 'success'
            })
          }else{
            this.$router.push('/');
            this.$message({
              message: '账号没有分配角色',
              type: 'error'
            })
          }
          }
        }).catch(function (error) {
          _this.loading = false;
          consloe.log("登录失败");
        });
        },
      registClick() {
  		  this.$router.push('/regist')
      }
    }
  }
</script>

<style>
 .login-container {
    border-radius: 30px;
    background-clip: padding-box;
    margin: 80px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 5px 5px 25px #cac6c6;
  }
 .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
  .page-header{
	margin:60px 20px;
	}
</style>