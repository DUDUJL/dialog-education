//引入vue
import Vue from 'vue'
//全局引入vueX
import Vuex from 'vuex';
import { userInfo } from 'os';
/*
import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

*/
//全局注册vueX
Vue.use(Vuex);

// 创建基本状态
const store = new Vuex.Store({
    // 全局变量
    state: {
        user: undefined,
        course: undefined,
        pdfUrl: undefined
    },
/*
    getters: {
        getStoreage: function(state){
            if(!state.user) {
                state.user = localStorage.getItem('user')
            }
            return state.user
        }
    },
    */
    // 修改全局变量必须通过mutations中的方法
    // mutations只能采用同步方法
    mutations: {
        login (state, userInfo) {
            state.user = userInfo
            //localStorage.setItem('user', userInfo)
        },
        logout (state) {
            state.user = undefined
            //localStorage.removeItem('user')
        },
        choseCourse (state, courseName) {
            state.course = courseName
        },
        changePdf (state, pdfUrl) {
            state.pdfUrl = pdfUrl
        }
    },
    // 异步方法用actions
    // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
    actions: {
        login (context, userInfo) {
            context.commit('login', userInfo)
        },
        logout (context) {
            context.commit('logout')
        },
        choseCourse (context, courseName) {
            context.commit('choseCourse', courseName)
        },
        changePdf (context, pdfUrl) {
            context.commit('changePdf', pdfUrl)
        }
    }
})

export default store