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
        code : 1,
        text : "permission denied"
    },
    "none" : {
        code : 500,
        text : "key not found",
    },
    "exist" : {
        code : 504,
        text : "key already existed"
    },
    "NaN" : {
        code : 2,
        text : "not a number"
    },

}

exports.errCode = errCode;

exports.fileName = fileName;