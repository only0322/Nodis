const crypto = require('crypto');
const { resolve } = require('path');

async function getMd5(text) {
    let result = crypto.createHash('md5').update(text).digest("hex");
    return result.toUpperCase();
}

//暂时不加密
async function DecryptAES(dataStr, key) {
    let cipherChunks = [];
    let decipher = crypto.createDecipheriv('aes-128-ecb', key);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(dataStr, 'base64', 'utf8'));
    cipherChunks.push(decipher.final('utf8'));
    return cipherChunks.join('');
}

async function EncryptAES(dataStr, key) {
    let cipherChunks = [];
    let cipher = crypto.createCipheriv('aes-128-ecb', key);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(dataStr, 'utf8', 'base64'));
    cipherChunks.push(cipher.final('base64'));
    return cipherChunks.join('');
}

async function sleep(time) {
    let promise = new Promise(function(resolve,reject) {
        setTimeout(() => {
            resolve();
        }, time);
    }) 
    return promise;
}


//判断obj在不在数组arr中
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        
        if (arr[i] === obj||arr[i]===obj.toUpperCase()) {
            return true;
        }
    }
    
    return false;
}

exports.DecryptAES = DecryptAES;
exports.EncryptAES = EncryptAES;
exports.getMd5 = getMd5;
exports.sleep = sleep;
exports.contains = contains;