const crypto = require('crypto');

async function getMd5(text) {
    let result = crypto.createHash('md5').update(text).digest("hex");
    return result.toUpperCase();
}



exports.getMd5 = getMd5;