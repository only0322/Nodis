const moment = require('moment')
const tools = require('../tools/tools');
const NoDefine = require('../tools/define');
class TcpManager {
    constructor() {
        
    }

    async checkMd5(text) {
        let resValue = {}
        if(text == undefined)
        {
            resValue.value = NoDefine.errCode["auth"].code;
            resValue.remark = NoDefine.errCode["auth"].text;
        }
        let res = await tools.getMd5(text);
        if(res == instance.ini.Nodis.password)
        {
            resValue.value = NoDefine.errCode["succ"].code;
            resValue.remark = NoDefine.errCode["succ"].text;
        }
        else
        {
            resValue.value = NoDefine.errCode["auth"].code;
            resValue.remark = NoDefine.errCode["auth"].text;
        }
        return resValue;
    }

    //存入新的缓存，但前缀key已存在则会返回false
    async addNodis(key,value,password) {
        let resValue = {};
        if(!this.checkMd5(password))
        {
            resValue.value = NoDefine.errCode["auth"].code;
            resValue.remark = NoDefine.errCode["auth"].text;
            return resValue;
        }
        if(instance.nodis.cache[key])   //键值已存在
        {
            resValue.value = NoDefine.errCode["exist"].code;
            resValue.remark = NoDefine.errCode["exist"].text;
            return resValue;
        }
        else
        {
            instance.nodis.cache[key] = value;
            resValue.value = NoDefine.errCode["succ"].code;
            resValue.remark = NoDefine.errCode["succ"].text;
            console.log("目前缓存内容为 ",instance.nodis.cache);
            return resValue;
        }
    }

    //获取Nodis所有的缓存数据
    async getAll(password) {
        let res = {};
        
        if(!this.checkMd5(password))
        {
            res.result = NoDefine.errCode["auth"].code;
            res.remark = NoDefine.errCode["auth"].code;
        }
        else
        {
            res.result = NoDefine.errCode["succ"].code;
            res.remark = NoDefine.errCode["succ"].code;
            res.value = instance.nodis.cache;
        }
        console.log("res = ",res);
        return res;
    }

    //获取键值
    async getNodis(key,password) {
        let res = {};
        if(!this.checkMd5(password))
        {
            res.result = NoDefine.errCode["auth"].code;
            res.remark = NoDefine.errCode["auth"].code;
            res.value = null;
        }
        else
        {
            if(!instance.nodis.cache[key])
            {
                res.result = NoDefine.errCode["none"].code;
                res.remark = NoDefine.errCode["none"].code;
                res.value = null;
            }
            else
            {
                res.result = NoDefine.errCode["succ"].code;
                res.remark = NoDefine.errCode["succ"].code;
                res.value = instance.nodis.cache[key];
            }
        }
        console.log("res = ",res);
        return res;
    }


    //判断键值是否存在
    async findNodis(key,password) {
        let res = {};
        if(!this.checkMd5(password))
        {
            res.result = NoDefine.errCode["auth"].code;
            res.remark = NoDefine.errCode["auth"].code;
        }
        else
        {
            if(!instance.nodis.cache[key])
            {
                res.result = NoDefine.errCode["none"].code;
                res.remark = NoDefine.errCode["none"].code;

            }
            else
            {
                res.result = NoDefine.errCode["succ"].code;
                res.remark = NoDefine.errCode["succ"].code;

            }
        }
        console.log("res = ",res);
        return res;
    }

    //增加某个键值的值
    async raise(key,value,password) {
        let res = {};
        if(!this.checkMd5(password))
        {
            res.result = NoDefine.errCode["auth"].code;
            res.remark = NoDefine.errCode["auth"].remark;
        }
        else
        {
            let temp = instance.nodis.cache[key];
            if(!temp)
            {
                res.result = NoDefine.errCode["none"].code;
                res.remark = NoDefine.errCode["none"].remark;
            }
            else
            {
                if(isNaN(instance.nodis.cache[key]))
                {
                    res.result = NoDefine.errCode["NaN"].code;
                    res.remark = NoDefine.errCode["NaN"].remark;
                }
                else
                {
                    instance.nodis.cache[key] += value;
                    res.result = NoDefine.errCode["succ"].code;
                    res.remark = NoDefine.errCode["succ"].remark;
                }
            }
        }
        return res;
    }
}

module.exports = TcpManager;

