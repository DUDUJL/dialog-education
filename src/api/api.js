import axios from 'axios';

let host = 'http://localhost:8088';

//登录
export const login = params => {
  return axios.post(`${host}/login`, params)
}


//获取学生列表

export const getStudentList = parmas => { return axios.post(`${host}/student/basic/getStudentList`, parmas)}

//删除学生

export const delStu = stuId => { return axios.delete(`${host}/student/basic/deleteStudent/`+ stuId) }

//添加学生

export const addStu = parmas => { return axios.post(`${host}/student/basic/addStudent`, parmas)}

//添加小组

export const addSqual = parmas => { return axios.post(`${host}/squal/addSqual`, parmas)}

//获取小组列表

export const getSqualList = parmas => { return axios.post(`${host}/squal/getSqualList`, parmas)}

//获取所有小组

export const getAllSqual = parmas => { return axios.post(`${host}/squal/getAllSqual`, parmas)}

//删除小组

export const deleteSqual = squalId => { return axios.delete(`${host}/squal/deleteSqual/` + squalId)}

//获取课程列表

export const getCourseList = params => { return axios.post(`${host}/course/basic/getCourseList`, params)}

//获取所有课程

export const getAllCourse = params => { return axios.post(`${host}/course/basic/getAllCourse`, params)}

//添加课程

export const addCourse = params => {return axios.post(`${host}/course/basic/addCourse`, params)}

//删除课程

export const deleteCourse = courseId => {return axios.delete(`${host}/course/basic/deleteCourse/` + courseId)}

//获取课程介绍

export const getCourseInfo = params => {return axios.post(`${host}/course/courseInfo/getContent`, params)}

//提交修改的课程介绍

export const changeInfo = params => {return axios.post(`${host}/course/courseInfo/changeInfo`, params)}

//获取课程的章节

export const getChapters = params => {return axios.post(`${host}/course/chapter/getChapters`, params)}

//分页获取课程章节

export const getChaptersByPage = params => {return axios.post(`${host}/course/chapter/getChaptersByPage`, params)}

//删除文件

export const deleteFile = name => {return axios.delete(`${host}/file/deleteFile/` + name)}

//获取课程资料byId

export const getCourseMsgById = params => {return axios.post(`${host}/course/getCourseMsgById`, params)}

//开始对话

export const beginChat = params => {return axios.post(`${host}/dialog/beginChat`, params)}
  
//对话

export const sendAndGetMsg = params => {return axios.post(`${host}/dialog/getAndRespMsg`, params)}

//结束对话

export const stopChat = params => {return axios.post(`${host}/dialog/delChatByUser`, params)} 