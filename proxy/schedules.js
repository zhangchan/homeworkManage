var Schedules  = require('../models/Schedules');
var User  = require('../models/User');
var uuid = require('node-uuid');
var co = require("co");

/**
 * 载入作业进度表
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {Function} callback 回调函数
 */
exports.loadData = function(msg) {
	co(function*() {
		var users = yield User.findAll({
		    'where': {
		        'department': msg.department,
		        'type': 1
		    }
		});
		var affectedRows = yield Schedules.destroy({
		    'where': {'uid': [msg.id]}
		});
		var arr = [];
		for (var i = 0; i < users.length; i++) {
			arr[i] = {
				id : uuid.v1(),
				uid : msg.id,
				name : users[i].name,
				account : users[i].account,
				tjstatus : 0,
				xzstatus : 0,
				mark : '--',
				taskurl : '',
			}
		}
		var schedules = yield Schedules.bulkCreate(arr);
	}).catch(function (error) {
		console.log(error);
	});
}

/**
 * 根据msg对象查找列表
 * Callback:
 * - err, 数据库异常
 * @param {Function} callback 回调函数
 */
exports.getSchedulesList = function(msg,callback) {
	co(function*() {
		let list = yield Schedules.findAll({
		    'where': msg
		});
		callback(list);
	}).catch(function (error) {
		console.log(error);
	});
}

/**
 * 根据id更新Schedule
 * Callback:
 * - err, 数据库异常
 * @param {Function} callback 回调函数
 */
exports.updateSchedule = function(msg, callback) {
	co(function*() {
		var user = Schedules.update(msg,{ 
			'where':{'id':msg.id}  
		}); 
		callback({
			status : 1,
			msg : '修改成功'
		}); 

	}).catch(function (error) {
		console.log(error);
	});
}
