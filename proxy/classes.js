var Classes  = require('../models/Classes');
var co = require("co");


/**
 * 查询专业列表
 * Callback:
 * @param {Function} callback 回调函数
 */
exports.getDepartmentList = function(callback) {
	co(function*() {
		var dpts = yield Classes.findAll({
		    'attributes': ['department']
		});
		callback(dpts);
	}).catch(function (error) {
		console.log(error);
	});
}