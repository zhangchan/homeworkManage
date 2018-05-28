const Sequelize = require('sequelize');
var BaseModel = require("./baseModel");
var config = require("../config");


var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
var Schedules = sequelize.define('schedules', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    uid: Sequelize.STRING(50), //
    name: Sequelize.STRING(100), //
    account: Sequelize.STRING(20), // 
    tjstatus: Sequelize.BOOLEAN, //
    xzstatus: Sequelize.BOOLEAN, // 
    mark: Sequelize.STRING(20), // 
    taskurl: Sequelize.STRING(100) // 
    // createdAt: Sequelize.BIGINT, 
    // updatedAt: Sequelize.BIGINT
}, {
    timestamps: false
});
module.exports = Schedules;