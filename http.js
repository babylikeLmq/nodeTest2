//服务器模块
var http = require('http');

var server = http.createServer();

//加载路由对象 进行不同请求地址的判断
var router = require('./router');
router.start(server);

server.listen('8888',function(){
    console.log('服务器启动成功,请访问：http://127.0.0.1:8888');
})

