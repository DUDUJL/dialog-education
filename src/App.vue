<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{margin: 0;}
 #app {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
 }
 /* 头部导航 
 header{z-index: 1000;min-width: 1200px;transition: all 0.5s ease; border-top: solid 3px #3091F2; background-color: #fff; box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04); }
 header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
 header .el-menu-demo{padding-left: 300px!important;}*/
 /* 主内容区 */
  main{ display: -webkit-box; display: -ms-flexbox; display: flex; min-height: 800px; border: solid 5px #E9ECF1; background-color: #FCFCFC; }
  main .main-left{text-align: center;width: 200px;float: left; background-color: #EBEEF5 }
  main .main-right{-webkit-box-flex: 1; -ms-flex: 1; flex: 1; background-color: #fff; padding: 50px 70px; }
  main .el-menu{background-color: transparent!important;}
 /* 图表 */
   .Chart {
  background: #fff;
  margin:  25px 0;
  width: 400px;
  height: 400px;
}
.Chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color:  rgba(255, 0,0, 0.5);
  border-bottom: 1px solid #323d54;
}

/*改header颜色*/
.home-header {
    transition: all 0.5s ease;
    border-top: solid 3px #3091F2; 
    background-color: #fff;
    
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 0px;
  }
  .el-menu-demo{padding-left: 100px!important;}
  .home-aside {
    background-color: #ECECEC;
  }

  .home-main {
    background-color: #fff;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;;
  }

  .home_title {
    color: #;
    font-size: 22px;
    display: inline;
    margin-left: 8px;
  }

  .home_userinfo {
    color: #3091F2;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }


.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
