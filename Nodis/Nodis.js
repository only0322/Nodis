const moment = require('moment')

class Nodis{
    constructor() {
        this.cache = {};    //缓存
        this.lock = [];     //锁
    }
}

module.exports = Nodis;