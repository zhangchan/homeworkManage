const Sequelize = require('sequelize');
var BaseModel = require("./baseModel");
var config = require("../config");
var sequelize = new Sequelize(config.database, 
    config.username, 
    config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
var User = sequelize.define('users', {
    account: {
        type : Sequelize.STRING(20),
        primaryKey: true
    }, //账户
    name: Sequelize.STRING(100), //姓名
    password: Sequelize.STRING(20), // 密码
    gender: Sequelize.BOOLEAN, //性别
    tel: Sequelize.STRING(20), // 电话
    type: Sequelize.BIGINT,    // 职业 0 学生 | 1 教师
    email: Sequelize.STRING(50), // 邮箱
    department: Sequelize.STRING(100), // 专业(学生)
    major: Sequelize.STRING(100) // 学科 (教师)
}, {
    timestamps: false
});

module.exports = User;
