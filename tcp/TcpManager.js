const moment = require('moment')
const tools = require('../tools/tools');
class TcpManager {
    constructor() {
        
    }

    async checkMd5(text) {
        let res = await tools.getMd5(text);
        if(res == instance.ini.Nodis.password)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

module.exports = TcpManager;

