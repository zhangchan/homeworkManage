var User = require('../proxy/user');
var fs = require('fs');

//界面显示 
exports.pageLogin = function (req, res, next) {
    res.render('admin/login', {});
}
exports.bPageList = function (req, res, next) {
    res.render('admin/list', {});
}
exports.bPageSys = function (req, res, next) {
    res.render('admin/sys', {});
}
exports.BPageUserinfo = function (req, res, next) {
    res.render('admin/userinfo', {});
}
exports.pageEditpw = function (req, res, next) {
    res.render('html/editpw', {});
}
exports.pageUserinfo = function (req, res, next) {
    res.render('html/userinfo', {});
}


//功能接口

//用户登录
exports.userLogin = function (req, res, next) {
    User.getUserByActAndPw(req.body,function(user){
        res.status(200).send(user).end();
    });
}


exports.getUserList = function (req, res, next) {
    User.getUserList(function(list){
        res.status(200).send(list).end();
    });
}

exports.addUser = function (req, res, next) {
    User.addUser(req.body,function(msg){
        res.status(200).send(msg).end();
        if (req.body.type ==2) {
            fs.mkdir('./uploads/'+req.body.name+'/',function(err){
               if (err) {
                   return console.error(err);
               }
            });
        }
    });
}

exports.editUser = function (req, res, next) {
    User.editUser(req.body,function(msg){
        res.status(200).send(msg).end();
    });
}
exports.getUserinfo = function (req, res, next) {
    User.getUserinfo(req.query,function(msg){
        res.status(200).send(msg).end();
    });
}

exports.delUser = function (req, res, next) {
    User.delUser(req.body,function(msg){
        res.status(200).send(msg).end();
    });
}
