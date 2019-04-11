import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'

//老师页
import Teacher from '@/pages/teacher/Teacher'

  //首页
import MainPageControll from '@/pages/teacher/mainPage/MainPageControll'

import TeachInfo from '@/pages/teacher/mainPage/TeachInfo'
import CourseList from '@/pages/teacher/mainPage/CourseList'

  //课程教学
import CourseTeachControll from '@/pages/teacher/courseTeach/CourseTeachControll'

import CourseInfo from '@/pages/teacher/courseTeach/CourseInfo'
import TeachList from '@/pages/teacher/courseTeach/TeachList'
  //学生管理
import StudentControll from '@/pages/teacher/studentControll/StudentControll'

import StudentList from '@/pages/teacher/studentControll/StudentList'
import GroupList from '@/pages/teacher/studentControll/GroupList'

import Chat from '@/pages/student/Chat'

  //公告发布
import NoticeControll from '@/pages/teacher/noticeControll/NoticeControll'

//学生页
import Student from '@/pages/student/Student'

  //我的课程
import MyCourse from '@/pages/student/myCourse/MyCourse'
    //学习课程页
import StudyCourse from '@/pages/student/myCourse/studyCourse/StudyCourse'

  //我的数据
import MyData from '@/pages/student/myData/MyData'

//管理员页
import Admin from '@/pages/admin/Admin'

  //数据展示
import DataControll from '@/pages/admin/dataControll/DataControll'

import DataBasic from '@/pages/admin/dataControll/DataBasic'
import DataMore from '@/pages/admin/dataControll/DataMore'


import Dialog from '@/pages/student/myCourse/studyCourse/dialog/dialog'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      component: Login
    },
    {
      path: '/teacher',
      name: '老师页',
      component: Teacher,
      redirect: '/teacher/mainPageControll/teachInfo',
      children: [
        {
          path: 'mainPageControll',
          component: MainPageControll,
          redirect: '/teacher/mainPageControll/teachInfo',
          children: [
            {
              path: 'teachInfo',
              component: TeachInfo
            },
            {
              path: 'courseList',
              component: CourseList
            }
          ]
        },
        {
          path: 'courseTeachControll',
          component: CourseTeachControll,
          redirect: '/teacher/courseTeachControll/courseInfo',
          children: [
            {
              path: 'courseInfo',
              component: CourseInfo
            },
            {
              path: 'teachList',
              component: TeachList
            }
          ]
        },
        {
          path: 'studentControll',
          component: StudentControll,
          redirect: '/teacher/studentControll/studentList',
          children: [
            {
              path: 'studentList',
              component: StudentList
            },
            {
              path: 'groupList',
              component: GroupList
            }
          ]
        },
        {
          path: 'noticeControll',
          component: NoticeControll
        }

      ]
    },
    {
      path: '/student',
      component: Student,
      redirect: '/student/myCourse',
      children: [
        {
          path: 'myCourse',
          component: MyCourse
        },
        {
          path: 'studyCourse',
          component: StudyCourse
        },
        {
          path: 'myData',
          component: MyData
        }
      ]
    },
    {
      path: '/admin',
      component: Admin,
      redirect: '/admin/dataControll',
      children: [
        {
          path: 'dataControll',
          component: DataControll,
          redirect: '/admin/dataControll/dataBasic',
          children: [
            {
            path: 'dataBasic',
            component: DataBasic
            },
            {
              path: 'datamore',
              component: DataMore
            }
          ]
        }
        
      ]
    },
    {
      path: '/chat',
      component: Chat
    },
    {
      path: '/dialog',
      component: Dialog
    }
  ]
})
