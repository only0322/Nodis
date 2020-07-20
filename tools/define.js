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
    "add" : {
        code : 100,
        text: "[update] not found and add the key",
    },
    "exist" : {
        code : 1146,
        text : "key already existed"
    },
    "NaN" : {
        code : 200,
        text : "value is not a number"
    },
    "unknown" : {
        code : -1,
        text: "unknown command",
    },
    "nothing" : {
        code :1,
        text : "in transaction nothing to do",
    },
    "lock" : {
        code :1065,
        text: "the operation has been locked",
    }

}

exports.errCode = errCode;

