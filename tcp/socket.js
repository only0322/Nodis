const net = require('net')
const crypto = require('crypto');
const tools = require('../tools/tools');
const { readv } = require('fs');
class Socket {
    constructor() {
        
    }
    init () {
        let ip = instance.ini.main.ip;
        let port = instance.ini.main.port;
        this.server = new net.createServer();
        this.server.on('connection', async(client) => {

            console.log("收到一个连接 ");
            client.on('data',async function (msg) { //接收client发来的信息

                
                let resValue = JSON.parse(msg)
               // resValue = iconv.decode(msg,'utf8');
                console.log(`客户端发来一个信息：${resValue}`);
                console.log("resValue.type = ",resValue.type);
                let type = resValue.type.toString();       //与客户端预先定义接口
                let res = {};
                res.type = type;
                type = type.toLowerCase();  //直接转成小写 不管客户端发送是否有问题
                let result = null;
                switch (type) {
                    case "ping":
                        //版本查询
                        res.value = "Nodis "+instance.ini.Nodis.version;
                        console.log("返回值为",res);
                        
                        break;
                    case "check":
                        console.log("resValue.password = ",resValue.password);
                        result = await instance.tcpHandler.checkMd5(resValue.password);
                        res.value = result;
                        break;
                    case "addkey":
                        result = await instance.tcpHandler.addNodis(resValue.key,resValue.value,resValue.password);
                        res.value  = result.value;
                        res.remark = result.remark;
                        break;

                    case "getkey":
                        result = await instance.tcpHandler.getNodis(resValue.key,resValue.password);
                        res.result = result.result;
                        res.value = result.value;
                        res.remark = result.remark;
                        break;

                    case "findkey":
                        result = await instance.tcpHandler.findNodis(resValue.key,resValue.password);
                        res.result = result.result;
                        res.remark = result.remark;

                        break;
                    
                    case "getall":
                        result = await instance.tcpHandler.getAll(resValue.password);
                        res.result = result.result;
                        res.value = result.value;
                        break;
                    case "raise":
                        result = await instance.tcpHandler.raise(resValue.key,resValue.value,resValue.password);
                        res.result = result.result;
                        res.remark = result.remark;
                    default:
                        res.result = false;
                        res.remark = "unknown command";

                        break;
                }
                client.write(JSON.stringify(res));

                
            });

            client.on('error', function (e) { //监听客户端异常
                console.log('client error' + e);
                client.end();
            });

            client.on('close', function () {

                console.log(`客户端下线了`);
            });

        });
        this.server.listen( port,ip,function () {
            console.log(`Tcp服务器运行在：http://${ip}:${port}`);
          });

    }

    
    
}

module.exports = Socket;