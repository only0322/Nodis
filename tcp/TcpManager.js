const moment = require('moment')
const tools = require('../tools/tools');
const NoDefine = require('../tools/define');
const fs = require('fs');
class TcpManager {
    constructor() {
        
    }

    //初始化Nodis
    async init() {
        let solidName = instance.solidName;
        if(!fs.existsSync(solidName+instance.ini.solid.logName))
        {
            return;
        }
        else
        {
            let fileValue = fs.readFileSync(solidName+instance.ini.solid.logName);
            console.log("fileValue = ",fileValue.toString());
            if(fileValue.toString() == null ||fileValue.toString() == "")
            {
                fileValue = "{}";
            }
            // let DeAES = await tools.DecryptAES(fileValue,instance.ini.Nodis.AESKey);
            // console.log("DeAES = ",DeAES);
            
            console.log("固化文件的内容为 ",JSON.parse(fileValue));
            instance.nodis.cache = JSON.parse(fileValue);
        }
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
            res.remark = NoDefine.errCode["auth"].text;
        }
        else
        {
            res.result = NoDefine.errCode["succ"].code;
            res.remark = NoDefine.errCode["succ"].text;
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
            res.remark = NoDefine.errCode["auth"].text;
            res.value = null;
        }
        else
        {
            if(!instance.nodis.cache[key])
            {
                res.result = NoDefine.errCode["none"].code;
                res.remark = NoDefine.errCode["none"].text;
                res.value = null;
            }
            else
            {
                res.result = NoDefine.errCode["succ"].code;
                res.remark = NoDefine.errCode["succ"].text;
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
            res.remark = NoDefine.errCode["auth"].text;
        }
        else
        {
            if(!instance.nodis.cache[key])
            {
                res.result = NoDefine.errCode["none"].code;
                res.remark = NoDefine.errCode["none"].text;

            }
            else
            {
                res.result = NoDefine.errCode["succ"].code;
                res.remark = NoDefine.errCode["succ"].text;

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
            res.remark = NoDefine.errCode["auth"].text;
        }
        else
        {
            let temp = instance.nodis.cache[key];
            if(!temp)
            {
                res.result = NoDefine.errCode["none"].code;
                res.remark = NoDefine.errCode["none"].text;
            }
            else
            {
                if(isNaN(instance.nodis.cache[key]))
                {
                    res.result = NoDefine.errCode["NaN"].code;
                    res.remark = NoDefine.errCode["NaN"].text;
                }
                else
                {
                    instance.nodis.cache[key] = parseFloat(instance.nodis.cache[key]) + parseFloat(value);
                    res.result = NoDefine.errCode["succ"].code;
                    res.remark = NoDefine.errCode["succ"].text;
                }
            }
        }
        return res;
    }

    //减少某个键值的值
    async reduce(key,value,password) {
        let res = {};
        if(!this.checkMd5(password))
        {
            res.result = NoDefine.errCode["auth"].code;
            res.remark = NoDefine.errCode["auth"].text;
        }
        else
        {
            let temp = instance.nodis.cache[key];
            if(!temp)
            {
                res.result = NoDefine.errCode["none"].code;
                res.remark = NoDefine.errCode["none"].text;
            }
            else
            {
                if(isNaN(instance.nodis.cache[key]))
                {
                    res.result = NoDefine.errCode["NaN"].code;
                    res.remark = NoDefine.errCode["NaN"].text;
                }
                else
                {
                    instance.nodis.cache[key] = parseFloat(instance.nodis.cache[key]) - parseFloat(value);
                    res.result = NoDefine.errCode["succ"].code;
                    res.remark = NoDefine.errCode["succ"].text;
                }
            }
        }
        return res;
    }

    //Nodis固化处理
    async solidNodis() {
        console.log("开始处理Nodis固化逻辑");
        let solidFileName = instance.solidName;
        console.log("solidFileName = ",solidFileName);
        if(!solidFileName)
        {
            return ;
        }
        let fileNameTemp;
        if(!instance.ini.solid.logNameTemp)
        {
            fileNameTemp = logName+'.temp';
        }
        else
        {
            fileNameTemp = solidFileName + instance.ini.solid.logNameTemp;
        }
        let value = instance.nodis.cache;
        console.log("value = ",value);
        let cacheValue = instance.nodis.cache
        if(!cacheValue || JSON.stringify(cacheValue) == "{}")
        {
            console.log("没有需要的缓存数据");
            return;
        }
        else
        {
            let time = instance.ini.solid.setTime;
            if(!time)
            {
                time = 0;
            }
            //let AESCode = await tools.EncryptAES(JSON.stringify(cacheValue),instance.ini.Nodis.AESKey);
            fs.writeFileSync(fileNameTemp,cacheValue);
            fs.renameSync(fileNameTemp,solidFileName + instance.ini.solid.logName);
            console.log("Nodis缓存成功");
        }
    }

    //Nodis事务处理
    async trans(commands,password) {
        let res = {};
        if(!this.checkMd5(password))
        {
            res.result = NoDefine.errCode["auth"].code;
            res.remark = NoDefine.errCode["auth"].text;
        }
        else
        {
            
        }
    }
}




module.exports = TcpManager;

