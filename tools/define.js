const os = require('os')
let type = os.platform();
let fileName = null;
if(type == "win32")
{
    fileName = "E:/gitee/Nodis/Nodis.ini";
}
else
{
    fileName = "/Users/hideyoshi/Desktop/codes/Nodis/Nodis.ini";
}


const errCode = {
    "succ" : {
        code : 0,
        text : "success"
    },
    "auth" : {
        code : 530,
        text : "permission denied"
    },
    "none" : {
        code : 404,
        text : "key not found",
    },
    "exist" : {
        code : 500,
        text : "key already existed"
    },
    "NaN" : {
        code : 200,
        text : "not a number"
    },

}

exports.errCode = errCode;

exports.fileName = fileName;