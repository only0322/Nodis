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
        if(instance.ini.Nodis.usePassword ==  false) 
        {
            resValue.result = NoDefine.errCode["succ"].code;
            resValue.remark = NoDefine.errCode["succ"].text;
            return resValue;
        }
        if(text == undefined)
        {
            resValue.result = NoDefine.errCode["auth"].code;
            resValue.remark = NoDefine.errCode["auth"].text;
            return resValue;
        }
        let res = await tools.getMd5(text);
        if(res == instance.ini.Nodis.password)
        {
            resValue.result = NoDefine.errCode["succ"].code;
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
    async addNodis(key,value) {
        let resValue = {};
        
        if(instance.nodis.cache[key])   //键值已存在
        {
            resValue.result = NoDefine.errCode["exist"].code;
            resValue.remark = NoDefine.errCode["exist"].text;
            return resValue;
        }
        else
        {
            instance.nodis.cache[key] = value;
            resValue.result = NoDefine.errCode["succ"].code;
            resValue.remark = NoDefine.errCode["succ"].text;
            console.log("目前缓存内容为 ",instance.nodis.cache);
            return resValue;
        }
    }

    //获取Nodis所有的缓存数据
    async getAll() {
        let res = {};
        

        res.result = NoDefine.errCode["succ"].code;
        res.remark = NoDefine.errCode["succ"].text;
        res.value = instance.nodis.cache;
        
        console.log("getAll res = ",res);
        return res;
    }

    //获取键值
    async getNodis(key) {
        let res = {};

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
        
        console.log("res = ",res);
        return res;
    }


    //判断键值是否存在
    async findNodis(key) {
        let res = {};

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
        
        console.log("res = ",res);
        return res;
    }

    //增加某个键值的值
    async raise(key,value) {
        let res = {};

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
        
        return res;
    }

    //减少某个键值的值
    async reduce(key,value) {
        let res = {};

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

    //删除某个键值
    async delete(key) {
        let res = {};
        if(!instance.nodis.cache[key])
        {
            res.result = NoDefine.errCode["none"].code;
            res.remark = NoDefine.errCode["none"].text;
        }
        else
        {
            delete instance.nodis.cache[key];
            res.result = NoDefine.errCode["succ"].code;
            res.remark = NoDefine.errCode["succ"].text;
        }
        return res;
    }

    //更新某个键
    async update(key,value) {
        let res = {};
        if(!instance.nodis.cache[key])
        {
            res.result = NoDefine.errCode["add"].code;
            res.remark = NoDefine.errCode["add"].text;
            instance.nodis.cache[key] = value;
        }
        else
        {
            instance.nodis.cache[key] = value;
            res.result = NoDefine.errCode["succ"].code;
            res.remark = NoDefine.errCode["succ"].text;
        }
        
        return res;
    }

    //Nodis事务处理
    async trans(commands) {
        let res = {};

        commands = JSON.parse(commands);
        let breakFlag = 0;      //是否立即结束事务 并且进行回滚
        let temp = instance.nodis.cache;

        let result = null;
        console.log("commands = ",commands);
        for(let i=0;i<commands.length;i++)
        {
            console.log("commands[i]",commands[i]);
            let command = commands[i].type.toLowerCase();
            let value = commands[i].value;
            let key = commands[i].key;
            if(breakFlag == 1)
            {
                break;
            }
            switch (command) {
                case "ping":
                case "getall":
                case "getkey":
                case "findkey":
                case "check":

                    continue;
                case "addkey":
                    result = await this.addNodis(key,value);
                    if(result.value !=0)
                    {
                        breakFlag = 1;
                        res.result = result.result;
                        res.remark = result.remark;
                    }
                    break;
                case "raise":
                    result = await this.raise(key,value);
                    if(result.value !=0)
                    {
                        breakFlag = 1;
                        res.result = result.result;
                        res.remark = result.remark;
                    }
                    break;
                case "reduce":
                    result = await this.reduce(key,value);
                    if(result.value !=0)
                    {
                        breakFlag = 1;
                        res.result = result.result;
                        res.remark = result.remark;
                    }
                    break;
                case "delete":
                    result = await this.delete(key);
                    if(result.value !=0)
                    {
                        breakFlag = 1;
                        res.result = result.result;
                        res.remark = result.remark;
                    }
                    break;
                default:
                    res.result = NoDefine.errCode["unknown"].code;
                    res.remark = NoDefine.errCode["unknown"].text;
                    breakFlag = 1;
                    break;
            }
        }
        console.log("res first = ",res);
        //成功即结束 失败需要回滚
        if(breakFlag == 0)
        {
            res.result = NoDefine.errCode["succ"].code;
            res.remark = NoDefine.errCode["succ"].text;
        }
        else
        {
            instance.nodis.cache = temp;
        }
        
        if(res.result!==0 && !res.result)
        {
            res.result = NoDefine.errCode["nothing"].code;
            res.remark = NoDefine.errCode["nothing"].text;
        }
        console.log("res = ",res);
        return res;
    }

    //上锁
    async setlock(key) {
        
    }


}




module.exports = TcpManager;

