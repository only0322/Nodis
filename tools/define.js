const os = require('os')
let type = os.platform();
let fileName = null;
if(type == "win32")
{
    fileName = instance.ini.logPathWin;
}
else
{
    fileName = instance.ini.logPathMac;
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
    "unknown" : {
        code : 3,
        text: "unknown command",
    }

}

exports.errCode = errCode;

exports.fileName = fileName;