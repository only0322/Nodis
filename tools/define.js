const os = require('os')


const errCode = {
    "succ" : {
        code : 0,
        text : "success"
    },
    "auth" : {
        code : 1141,
        text : "permission denied"
    },
    "none" : {
        code : 1133,
        text : "key not found",
    },
    "exist" : {
        code : 1146,
        text : "key already existed"
    },
    "NaN" : {
        code : 200,
        text : "not a number"
    },
    "unknown" : {
        code : -1,
        text: "unknown command",
    },
    "nothing" : {
        code :1,
        text : "in trans nothing to do",
    }

}

exports.errCode = errCode;

