// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueQuillEditor)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
/*
router.beforeEach((to, from, next) => {
  if(to.path === '/'){
    sessionStorage.removeItem('user')
    //this.$store.dispatch('logout')
  }
})*/
