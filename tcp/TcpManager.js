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
        let result = await this.setlock(key);
        if(result.result!=0)
        {
            return result;
        }
        if(instance.nodis.cache[key])   //键值已存在
        {
            resValue.result = NoDefine.errCode["exist"].code;
            resValue.remark = NoDefine.errCode["exist"].text;
            await this.getlock(key);
            return resValue;
        }
        else
        {
            instance.nodis.cache[key] = value;
            resValue.result = NoDefine.errCode["succ"].code;
            resValue.remark = NoDefine.errCode["succ"].text;
            await this.getlock(key);
            console.log("目前缓存内容为 ",instance.nodis.cache);
            return resValue;
        }
    }

    //获取Nodis所有的缓存数据
    async getAll() {
        let res = {};
        if(instance.nodis.lock.length!=0)
        {
            res.result = NoDefine.errCode["timeout"].code;
            res.remark = NoDefine.errCode["timeout"].text;
            return res;
        }

        res.result = NoDefine.errCode["succ"].code;
        res.remark = NoDefine.errCode["succ"].text;
        res.value = instance.nodis.cache;
        
        console.log("getAll res = ",res);
        return res;
    }

    //获取键值
    async getNodis(key) {
        let res = {};
        let result = await this.setlock(key);
        if(result.result!=0)
        {
            return result;
        }
        if(!instance.nodis.cache[key])
        {
            res.result = NoDefine.errCode["none"].code;
            res.remark = NoDefine.errCode["none"].text;
            await this.getlock(key);
            res.value = null;
        }
        else
        {
            res.result = NoDefine.errCode["succ"].code;
            res.remark = NoDefine.errCode["succ"].text;
            
            res.value = instance.nodis.cache[key];
            await this.getlock(key);
        }
        
        console.log("res = ",res);
        return res;
    }


    //判断键值是否存在
    async findNodis(key) {
        let res = {};
        
        let result = await this.setlock(key);
        if(result.result!=0)
        {
            return result;
        }

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
        await this.getlock(key);
        console.log("res = ",res);
        return res;
    }

    //增加某个键值的值
    async raise(key,value) {
        let res = {};
        let result = await this.setlock(key);
        if(result.result!=0)
        {
            return result;
        }
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
        await this.getlock(key);
        return res;
    }

    //减少某个键值的值
    async reduce(key,value) {
        let res = {};
        let result = await this.setlock(key);
        if(result.result!=0)
        {
            return result;
        }
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
        await this.getlock(key);
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
            fs.writeFileSync(fileNameTemp,JSON.stringify(cacheValue));
            fs.renameSync(fileNameTemp,solidFileName + instance.ini.solid.logName);
            console.log("Nodis固化成功");
        }
    }

    //删除某个键值
    async delete(key) {
        let res = {};
        let result = await this.setlock(key);
        if(result.result!=0)
        {
            return result;
        }
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
        await this.getlock(key);
        return res;
    }

    //更新某个键
    async update(key,value) {
        let res = {};
        let result = await this.setlock(key);
        if(result.result!=0)
        {
            return result;
        }
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
        await this.getlock(key);
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
                case "getlock":
                case "setlock":

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
                case "update":
                    result = await this.update(key,value);
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
        let res = {};
        if(!instance.nodis.cache[key])
        {
            res.result = NoDefine.errCode["none"].code;
            res.remark = NoDefine.errCode["none"].text;
        }
        else
        {
            let ms = instance.ini.lock.ms;
            let trys = instance.ini.lock.trys;

            //防止配置文件错误导致无法使用Nodis
            if(!ms)
            {
                ms = 300;
            }
            if(!trys)
            {
                trys = 10;
            }

            for(let i=0;i<trys;i++)
            {
                if(tools.contains(instance.nodis.lock,key))
                {
                    await tools.sleep(ms);
                }
                else
                {
                    instance.nodis.lock.push(key);
                    res.result = NoDefine.errCode["succ"].code;
                    res.remark = NoDefine.errCode["succ"].text;
                    console.log("上锁成功,key = ",key);
                    break;
                }
                if(i == trys - 1)
                {
                    res.result = NoDefine.errCode["timeout"].code;
                    res.remark = NoDefine.errCode["timeout"].text;
                }
            }
        }
        console.log("res = ",res);
        return res;
    }


    //释放锁
    async getlock(key) {
        let res = {};
        if(!tools.contains(instance.nodis.lock,key))
        {
            res.result = NoDefine.errCode["none"].code;
            res.remark = NoDefine.errCode["none"].text;
        }
        else
        {
            for(let i=0;i<instance.nodis.lock.length;i++)
            {
                if(instance.nodis.lock[i] == key)
                {
                    console.log("找到锁");
                    instance.nodis.lock.splice(i,1);
                    res.result = NoDefine.errCode["succ"].code;
                    res.remark = NoDefine.errCode["succ"].text;
                    console.log("解锁成功,key = ",key);
                    break;

                }

            }
        }
        console.log("res = ",res);
        return res;
    }

    //清空锁
    async clearlock() {
        instance.nodis.lock = [];
        let res = {};
        res.result = NoDefine.errCode["succ"].code;
        res.remark = NoDefine.errCode["succ"].text;
        return res;
    }

}




module.exports = TcpManager;

