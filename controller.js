//处理业务模块 
var fs = require('fs');
var template =require('art-template');  
//读取文件每次都是要绝对路径 太繁琐了 所以:
template.defaults.root='./';
module.exports = {
    //接受请求地址和响应对象
    other:function(urls,res){
        //根据请求地址获取相应的资源
        fs.readFile('.'+urls,function(err,data){
            //响应资源数据
            if(!err){
                res.end(data);
            }else{
                res.end('');   
            }
        })
    },
    //把页面资源加载出来
    index:function(res){
        
        
            fs.readFile('./role.json','utf8',function(err,data){
                // console.log(data);
                var json_arr = JSON.parse(data);
                // var htmls= template('D:\\node\\hzw项目\\index.html',{data:json_arr});
                // {data:json_arr} 的意思是 json这个数组 交给了 data

                // index.html页面与读取role.json文件整合返回输出   第二个要以这种格式写{data:json_arr}
                var htmls= template('index.html',{data:json_arr});
                res.end(htmls);
                
            })
            
            // res.end(strHtml);
        
        
    },
    //查看
    getone(req,res,id){
        fs.readFile('./role.json','utf8',function(err,data){
            var arr = JSON.parse(data);
            var userinfo = ''
            for(let i =0 ;i<arr.length;i++){
                if(arr[i].id ==id){
                    userinfo = arr[i];
                }

            }
            // console.log(userinfo);
            // var htmls= template('D:\\node\\hzw项目\\user.html',{data:userinfo});
            
            var htmls= template('user.html',{data:userinfo});
            //
            // console.log(htmls);
            res.end(htmls);
            

        })
    },
    // 修改
    change(req,res,id){
        fs.readFile('./role.json','utf8',function(alter_err,alter_data){
            // console.log(alter_data);
            
            var arr_data = JSON.parse(alter_data);
            var userinfo = ''
            for(let i =0 ;i<arr_data.length;i++){
                if(arr_data[i].id ==id){
                    userinfo = arr_data[i];
                }

            }
            var htmls= template('form.html',{data:userinfo});
            res.end(htmls);
        })
    },
    //更改信息:
    add:function(req,res,id){
        // ===================
        var fd = require ('formidable');
        var form = new  fd.IncomingForm();
        form.parse(req,function(err,filds,files){
            // console.log(filds);
            // console.log(files);
            //filds 文本文件  files上传文件
            //移动图片路径
            //rename第一:旧的路径 第二:新的路径
            fs.rename(files.img.path,'/img/'+files.img.name,function(err){
                //读取json文件
                fs.readFile('./role.json','utf8',function(err,read_data){
                        var read_arr =JSON.parse(read_data);
                        for(let i=0;i<read_arr.length;i++){
                            if(read_arr[i].id == id){
                                //因为图片上传回到页面显示 所以一定要匹配到id
                                //提交文件也是在文件修改的款款里面
                                read_arr[i].name = filds.name;
                                read_arr[i].nengli = filds.nengli;
                                read_arr[i].jituan = filds.jitaun;
                                read_arr[i].img = '/img/'+files.img.name;
 
                            }
                                
                            fs.writeFile('./role.json',JSON.stringify(read_arr),function(err){
                                res.setHeader('Content-type','text/html;charset=utf-8');
                                if(!err){
                                    res.end('<script>alert("修改成功");location.href="/"</script>'); 
                                }else{
                                    res.end('<script>alert("修改失败");location.href="/"</script>')  ;
                                }
                            })

                    }
                })
            })
            
            
        })
    },
//=========================================


    //     var postdata ='';
    //     req.on('data',function(d){
    //         postdata += d;
    //     });
    //     req.on('end',function(){
    //         console.log(postdata);
    //         // name=%E4%B9%94%E5%B7%B4&nengli=%E5%8A%A8%E7%89%A9%E7%B3%BB%E4%BA%BA%E4%BA%BA%E6%9E%9C%E5%AE%9E&tuanti=%E8%8D%89%E5%B8%BD%E6%B5%B7%E8%B4%BC%E5%9B%A2
    //         var qus = require('querystring');
    //         var obj = qus.parse(postdata);
    //         //变成对象了
    //         // console.log(obj);
    //         //你输入的值是  对象的属性值  而属性是name id  nengli jituan  他们就是input 中的name

    //         fs.readFile('./role.json','utf8',function(err,json_add_data){
    //             var json_add_arr = JSON.parse(json_add_data);
    //             // for
    //             for(let i=0;i<json_add_arr.length;i++){
    //                 if(json_add_arr[i].id == id){
    //                     json_add_arr[i].name = obj.name;
    //                     json_add_arr[i].nengli = obj.nengli;
    //                     json_add_arr[i].jituan = obj.jituan;
                        
    //                 }
    //                 // console.log(json_add_arr);
    //             }
              
    //             fs.writeFile('./role.json',JSON.stringify(json_add_arr),function(err){
    //                 res.setHeader('Content-type','text/html;charset=utf-8');
    //                 if(!err){
    //                     // res.end('<script>alert("修改成功");localtion.href="/"</script>')  ;
    //                     res.end('<script>alert("修改成功");location.href="/"</script>'); 
    //                 }else{
    //                     res.end('<script>alert("修改失败");location.href="/"</script>')  ;
    //                 }
    //             })

    //         })            
    //     })
    // },
    // 删除角色:
    deluser:function(req,res,id){
        //第一步:读取json文件
        fs.readFile('./role.json','utf8',function(err,del_data){
            var del_arr = JSON.parse(del_data);
            var newArr = [];
            for(let i = 0;i<del_arr.length;i++){
                if(del_arr[i].id != id){
                    //不等于id的留下来
                    newArr.push(del_arr[i]);
                }
            }
            //没有
            console.log(newArr);
            
            fs.writeFile('./role.json',JSON.stringify(newArr),function(err){
                if(!err){
                    res.end('<script>alert("删除成功");location.href="/"</script>'); 
                    // res.end('<script>alert("删除成功");location.href="/"</script>');
                }else{
                    // res.end('<script>alert("删除失败");location.href="/"</script>')
                }
            })
        })

    }

    // deluser:function(req,res,id){
    //     console.log('123')
    //     fs.readFile('./role.json','utf8',function(err,json_str){
    //         var json_arr = JSON.parse(json_str);
    //         var arr = [];
    //         for(let i=0;i<json_arr.length;i++){
    //             if(json_arr[i].id !=id){
    //                 arr.push(json_arr[i])
    //             }
    //         }
    //         console.log(arr);
            
    //         fs.writeFile('./db.json',JSON.stringify(arr),function(err){
    //             res.setHeader('Content-type','text/html;charset=utf-8');
    //             if(!err){
    //                 res.end('<script>alert("删除成功");location.href="/"</script>');
    //             }else{
    //                 res.end('<script>alert("删除失败");location.href="/"</script>');

    //             }
    //         })
    //     })
    // }
   
   

}


