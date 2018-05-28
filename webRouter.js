
/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();

var user = require('./controllers/user');
var task = require('./controllers/task');
var classes = require('./controllers/classes');
var schedules = require('./controllers/schedules');
var config = require('./config')
var upload = require('./middlewares/fileuploads');
var router = express.Router();

//用户管理
router.use('/login', user.pageLogin) //
router.get('/', user.pageLogin) //
router.post('/userlogin', user.userLogin)
router.post('/adduser', user.addUser)
router.post('/edituser', user.editUser)
router.get('/getuserinfo', user.getUserinfo)
router.post('/deluser', user.delUser)
router.use('/admin/list', user.bPageList)
router.get('/admin/getuserlist', user.getUserList)
//获取专业列表
router.get('/getdepartments', classes.getdepartments)
router.use('/admin/sys', user.bPageSys)
router.use('/admin/userinfo', user.BPageUserinfo)
//作业进度
router.use('/process', schedules.pageProcess)
router.get('/getscheduleslist', schedules.getSchedulesList)
router.use('/marktask', schedules.pageMarkTask)
router.get('/getschedulesinfo', schedules.getSchedulesinfo)
router.post('/updateschedule', schedules.updateSchedule)
//修改密码
router.use('/editpw', user.pageEditpw)
//用户资料
router.use('/userinfo', user.pageUserinfo)
//作业列表
router.use('/list', task.pageList)
router.get('/tasklist', task.getTaskList)
//编辑作业
router.use('/taskinfo', task.pageEditTask)
router.get('/gettaskinfo', task.getTaskinfo)
router.post('/edittask', task.editTask)
router.post('/deltask', task.delTask)
//文件上传服务
router.post('/upload', upload.single('word'), schedules.fileupload);

module.exports = router;
