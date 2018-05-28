var Schedules = require('../proxy/schedules');
var fs = require('fs');

exports.pageProcess = function (req, res, next) {
    res.render('html/process', {});
}
exports.pageMarkTask = function (req, res, next) {
    res.render('html/marktask', {});
}

exports.getSchedulesList = function (req, res, next) {
    Schedules.getSchedulesList(req.query,function(msg){
        res.status(200).send(msg).end();
    })
}
exports.getSchedulesinfo = function (req, res, next) {
    Schedules.getSchedulesList(req.query,function(msg){
        res.status(200).send(msg[0]).end();
    })
}

exports.updateSchedule = function (req, res, next) {
    Schedules.updateSchedule(req.body,function(msg){
        res.status(200).send(msg).end();
    })
}


exports.fileupload =function (req, res, next) {
    if (req.file) {
        let mimetype = /\.[^\.]+$/.exec(req.file.originalname)[0];
        let path = './uploads/';
        var newurl = req.body.path +'/'+ req.body.name + mimetype;
        fs.rename(path+req.file.originalname,path+newurl, function(err){
            if(err){
                throw err;
            }
        })
        res.status(200).send({
            status : 1,
            filename:req.file.originalname,
            url : '/uploads/'+newurl
        }).end();
    }else{
        res.status(200).send({
            status : 0,
            msg : '文件上传失败'
        }).end();
    }
}




