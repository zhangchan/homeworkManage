var User  = require('../models/User');
var co = require("co");

/**
 * 根据账户和密码查找用户
 * Callback:
 * @param {Function} callback 回调函数
 */
exports.getUserByActAndPw = function(msg,callback) {
	co(function*() {
		var user = yield User.findAll({
		    'where': {
		        'account': msg.account,
		        'password': msg.password
		    }
		});
		callback(user);
	}).catch(function (error) {
		console.log(error);
	});
}

/**
 * 根据传参查找用户
 * Callback:
 * @param {Function} callback 回调函数
 */
exports.getUserinfo = function(msg,callback) {
	co(function*() {
		var user = yield User.findAll({
		    'where': msg
		});
		callback(user[0]);
	}).catch(function (error) {
		console.log(error);
	});
}

/**
 * 查找用户列表
 * Callback:
 * @param {Function} callback 回调函数
 */
exports.getUserList = function(callback) {
	co(function*() {
		let list = yield User.findAll()
		callback(list);
	}).catch(function (error) {
		console.log(error);
	});
}

/**
 * 新增用户
 * Callback:
 * @param {Function} callback 回调函数
 */
exports.addUser = function(msg,callback) {
	co(function*() {
		var users = yield User.findAll({
		    'where': {
		        'account': msg.account
		    }
		});
		if (users.length) {
			callback({
				status : 0,
				msg :'账户已存在'
			});
			return;
		}
		var user = User.build(msg);
		user = yield user.save();
		callback({
			status : 1,
			data : msg
		});
	}).catch(function (error) {
		console.log(error);
	});
}

/**
 * 根据account更新用户信息
 * Callback:
 * @param {Function} callback 回调函数
 */
exports.editUser = function(msg, callback) {
	co(function*() {
		var user = User.update(msg,{ 
			'where':{'account':msg.account}  
		}); 
		callback({
			status : 1,
			msg : '修改成功'
		}); 

	}).catch(function (error) {
		console.log(error);
	});
}

/**
 * 根据参数删除用户
 * Callback:
 * @param {Function} callback 回调函数
 */
exports.delUser = function(msg, callback) {
	co(function*() {
		var affectedRows = yield User.destroy({
		    'where': msg
		});
		callback({});
	}).catch(function (error) {
		console.log(error);
	});
}

