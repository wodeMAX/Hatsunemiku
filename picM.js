/**
 * Created by tydte on 2017/12/1.
 * 0成功
 * 1请选择您要上传的图片（未上传图片）
 * 2请选择正确的图片格式（gif,png,jpg）格式不对。
 */
//负责上传图片

var fs=require("fs");
var formidable=require("formidable");
//req,接收的前端页面传值信息
//picName:上传图片的名字
//callback:回调传值
exports.addPic=function(req,picName,callback){
    var form = formidable.IncomingForm();//生成表单对象
    form.keepExtensions = true;//保留后缀名（扩展名）
    form.maxFieldsSize = 2*1024*1024;//2M
    form.encoding = "utf-8";//编码格式
    form.uploadDir = "../upload";
    form.parse(req,function(err,params,file){
        if(file[picName].size==0){
            fs.unlink(file[picName].path, function (err) {
                callback({
                    code:1,
                    params:params,
                    msg:"请选择您要上传的图片"
                });//1请选择您要上传的图片（未上传图片）
            })
        }else{
            //验证文件的类型。
            var num = file[picName].path.lastIndexOf(".");
            var extension = file[picName].path.substr(num + 1).toLowerCase();
            if (extension == "jpg" || extension == "png" || extension == "gif") {
                var newName = (new Date()).getTime() + "." + extension;
                fs.rename(file[picName].path, "../upload/" + newName, function (err) {
                    callback({
                        code:0,
                        params:params,
                        newName:newName,
                        msg:"成功"
                    });//0成功
                });
            } else {
                fs.unlink(file[picName].path, function (err) {
                    callback({
                        code:2,
                        msg:"请选择正确的图片格式（gif,png,jpg）"
                    });//2请选择正确的图片格式（gif,png,jpg）
                })
            }
        }
    })
}