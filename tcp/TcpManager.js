const moment = require('moment')
const tools = require('../tools/tools');
const NoDefine = require('../tools/define');
class TcpManager {
    constructor() {
        
    }

    async checkMd5(text) {
        if(text == undefined)
        {
            return false;
        }
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

    //存入新的缓存，但前缀key已存在则会返回false
    async addNodis(key,value,password) {
        let resValue = {};
        if(!this.checkMd5(password))
        {
            resValue.value = false;
            resValue.remark = "permission denied";
            return resValue;
        }
        if(instance.nodis.cache[key])   //键值已存在
        {
            resValue.value = false;
            resValue.remark = "the key is already exist";
            return resValue;
        }
        else
        {
            instance.nodis.cache[key] = value;
            resValue.value = true;
            resValue.remark = "success";
            console.log("目前缓存内容为 ",instance.nodis.cache);
            return resValue;
        }
    }

    //获取Nodis所有的缓存数据
    async getAll(password) {
        let res = {};
        
        if(!this.checkMd5(password))
        {
            res.result = false;
        }
        else
        {
            res.result = true;
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
            res.result = false;
            res.remark = "permission denied";
            res.value = null;
        }
        else
        {
            if(!instance.nodis.cache[key])
            {
                res.result = false;
                res.remark = "key not found";
                res.value = null;
            }
            else
            {
                res.result = true;
                res.remark = "success";
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
            res.result = false;
            res.remark = "permission denied";
        }
        else
        {
            if(!instance.nodis.cache[key])
            {
                res.result = false;
                res.remark = "key not found";

            }
            else
            {
                res.result = true;
                res.remark = "success";

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
            res.result = false;
            res.remark = "permission denied";
        }
        else
        {
            let temp = instance.nodis.cache[key];
            if(!temp)
            {
                res.result = false;
                res.remark = "key not found";
            }
            else
            {
                
            }
        }
    }
}

module.exports = TcpManager;

