const net = require('net')

class Socket {
    constructor() {
        
    }
    init (ip,port) {
        this.server = new net.createServer();
        this.server.on('connection', async(client) => {

            console.log("收到一个连接 ");
            client.on('data',async function (msg) { //接收client发来的信息

                
                let resValue = JSON.parse(msg)
               // resValue = iconv.decode(msg,'utf8');
                console.log(`客户端发来一个信息：${resValue}`);
                console.log("resValue.type = ",resValue.type);
                let type = parseInt(resValue.type);       //与客户端预先定义接口

                switch (type) {
                    case 1000:
                        //读写Json创建新的连接
                        client.write("hello world!");
                        break;
                    case 1001:
                        client.write("hello world!");
                    default:
                        break;
                }
                

                
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