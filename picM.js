var fs = require("fs");
var formidable = require("formidable");
/*
* 上传图片的模块
* req,请求对象
* picName,上传name名字
* cb:回调函数
* 返回结果：
*   cb({
        status:1,//1、上传的是一个空文件  2上传成功啦 3 上传格式错误
        params:params  //表单当中，除了上传文件之外的内容 。
        newName:图片的名字。
        msg:结果的文字说明
    })*/
module.exports.upPic = function (req, picName, cb) {
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = "./upload" //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    form.parse(req, (err, params, file) => {
        if (file[picName].size <= 0) {
            fs.unlink(file[picName].path, (err) => {
                cb({
                    status: 1, //上传的是一个空文件
                    params: params,
                    msg: "请选择上传的图片"
                })
            })
        } else {
            var num = file[picName].path.lastIndexOf(".");
            var extension = file[picName].path.substr(num).toLowerCase();
            //支持图片上传的格式。
            var imgType = ".jpg.jpeg.png.gif";
            //验证上传图片的类型是不是图片格式
            if (imgType.includes(extension)) {
                var newName = (new Date()).getTime() + extension;
                //改变名字（重命名），异步
                fs.rename(file[picName].path, form.uploadDir + "/" + newName, (err) => {
                    cb({
                        status: 2, //上传成功啦
                        params: params,
                        newName: newName,
                        msg: "上传成功"
                    })
                })
            } else {
                fs.unlink(file[picName].path, (err) => {
                    cb({
                        status: 3, //上传格式错误
                        params: params,
                        msg: `请上传${imgType}格式的图片`
                    })
                })
            }
        }
    })
}