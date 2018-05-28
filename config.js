 
var config = {
		database: 'myapp', // 数据库
    username: 'root', // 用户名
    password: '123456', // 口令
    host: 'localhost', // 主机名
    port: 3306, // 端口号，MySQL默认3306
    upload: {
        path: process.cwd() + '/uploads'
    }
}
module.exports = config;