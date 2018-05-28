const Sequelize = require('sequelize');
var BaseModel = require("./baseModel");
var config = require("../config");


var sequelize = new Sequelize(
    config.database, 
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
var Task = sequelize.define('task', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    title: Sequelize.STRING(100), //
    from: Sequelize.STRING(10), //
    start: Sequelize.STRING(20), // 
    end: Sequelize.STRING(20), //
    path: Sequelize.STRING(50), //
    department: Sequelize.STRING(100), // 专业
    major: Sequelize.STRING(100), // 学科
    exercises: Sequelize.STRING(100) // 学科
    // createdAt: Sequelize.BIGINT, 
    // updatedAt: Sequelize.BIGINT
}, {
    timestamps: false
});
module.exports = Task;