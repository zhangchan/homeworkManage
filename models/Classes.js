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
var Classes = sequelize.define('classes', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    department: Sequelize.STRING(100), // 专业
    major: Sequelize.STRING(100) // 学科
    // createdAt: Sequelize.BIGINT, 
    // updatedAt: Sequelize.BIGINT
}, {
    timestamps: false
});

module.exports = Classes;
