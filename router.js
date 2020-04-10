// 路由模块 解析不同的请求
// server在http 所以要导入 通过方法传参
//导入url模块
var url = require('url');
var controller = require('./controller');

module.exports = {
    //监听请求事件
  start:function(server){
        //判断请求地址
        server.on('request',function(req,res){
              //获取请求地址:
        // var urls = req.url;
        var urls = url.parse(req.url,true);
        // console.log(urls);
    
        // 这样获取到的是url后面的端口号后面的所有内容
            
            // res.write('1');
            // res.end();
            // 或者res.end(1);
            // var urls =req.url;
            // console.log(urls);
            

            if(urls.pathname == '/'){
            //做判断把页面的资源显示出来
               
                controller.index(res);

            }else if(urls.pathname == '/getone'){
                //调用业务模块进业务处理
                
                controller.getone(req,res,urls.query.id);
                //传入响应对象
               
                
                
            }else if(urls.pathname == '/change'){
                
                controller.change(req,res,urls.query.id);

            }else if(urls.pathname == '/add'){
                controller.add(req,res,urls.query.id);


            }else if(urls.pathname == '/deluser'){
                // controller.deluser(req,res,urls.query.id);
                controller.deluser(req,res,urls.query.id);    
            }else{
                //调用业务模块的方法处理

                controller.other(urls.pathname,res);

            }

        })
    }
}


