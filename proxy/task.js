var Task  = require('../models/Task');
var co = require("co");

/**
 * 根据msg对象查找作业列表
 * Callback:
 * - err, 数据库异常
 * @param {Function} callback 回调函数
 */
exports.getTaskList = function(msg,callback) {
	co(function*() {
		let list = yield Task.findAll({
		    'where': msg
		});
		callback(list);
	}).catch(function (error) {
		console.log(error);
	});
}


/**
 * 更新作业
 * Callback:
 * - err, 数据库异常
 * @param {Function} callback 回调函数
 */
exports.editTask = function(msg,callback) {
	co(function*() {
		var user = Task.update(msg,{ 
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


exports.addTask = function(msg,callback) {
	co(function*() {
		var task = Task.build(msg);
		task = yield task.save();
		callback({
			status : 1,
			data : msg
		});
	}).catch(function (error) {
		console.log(error);
	});
}


/**
 * 根据id删除作业
 * id
 * Callback:
 * @param {Function} callback 回调函数
 */
exports.delTask = function(msg, callback) {
	co(function*() {
		var affectedRows = yield Task.destroy({
		    'where': {'id': [msg.id]}
		});
		callback({
			status : 1
		});
	}).catch(function (error) {
		console.log(error);
	});
}