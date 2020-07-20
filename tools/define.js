const os = require('os')


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
    },
    "nothing" : {
        code :4,
        text : "in trans nothing to do",
    }

}

exports.errCode = errCode;

