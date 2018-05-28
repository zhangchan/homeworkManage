var Task = require('../proxy/task');
var Schedules = require('../proxy/schedules');
var uuid = require('node-uuid');
var fs = require('fs');

exports.pageList = function (req, res, next) {
    res.render('html/list', {});
}

exports.pageEditTask = function (req, res, next) {
    res.render('html/edittask', {});
}

exports.pageStask = function (req, res, next) {
    res.render('html/stask', {});
}


exports.getTaskList = function (req, res, next) {
    Task.getTaskList(req.query,function(msg){
        res.status(200).send(msg).end();
    })
}

exports.getTaskinfo = function (req, res, next) {
    Task.getTaskList(req.query,function(msg){
        res.status(200).send(msg[0]).end();
    })
}
exports.delTask = function (req, res, next) {
    Task.delTask(req.body,function(msg){
        res.status(200).send(msg).end();
    })
}

exports.editTask = function (req, res, next) {
	if (req.body.id) {
		Task.editTask(req.body,function(msg){
	        res.status(200).send(msg).end();
	        Schedules.loadData(req.body);
	    })
	}else{
		req.body.id = uuid.v1();
		Task.addTask(req.body,function(msg){
	        res.status(200).send(msg).end();
	        Schedules.loadData(req.body);
	    })
	}
	fs.mkdir('./uploads/'+req.body.path+'/',function(err){
	   if (err) {
	       return console.error(err);
	   }
	});


}


