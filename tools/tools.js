const crypto = require('crypto');

async function getMd5(text) {
    let result = crypto.createHash('md5').update(text).digest("hex");
    return result.toUpperCase();
}

async function DecryptAES(dataStr, key, iv) {
    let cipherChunks = [];
    let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(dataStr, 'base64', 'utf8'));
    cipherChunks.push(decipher.final('utf8'));
    return cipherChunks.join('');
}

async function EncryptAES(dataStr, key, iv) {
    let cipherChunks = [];
    let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(dataStr, 'utf8', 'base64'));
    cipherChunks.push(cipher.final('base64'));
    return cipherChunks.join('');
}

exports.DecryptAES = DecryptAES;
exports.EncryptAES = EncryptAES;
exports.getMd5 = getMd5;