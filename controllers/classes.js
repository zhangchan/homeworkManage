var Classes = require('../proxy/classes');
var tool  = require('../common/tools');


exports.getdepartments = function (req, res, next) {
    Classes.getDepartmentList(function(msg){
    	var list = tool.getArr(msg);
    	var lists = tool.distinct(list);
        res.status(200).send(lists).end();
    });
}
