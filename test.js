const net = require('net');

const fs = require('fs');
const ini = require('ini');
const os = require('os');


async function readIni() {
    let type = os.platform();
    console.log('type = ',type);
    let fileName;
    if(type == "darwin")
    {
        fileName = "/Users/hideyoshi/Desktop/codes/Nodis/Nodis.ini";

    }
    else if(type == "win32")
    {
        fileName = "E:/gitee/Nodis/Nodis.ini";

    }
    else
    {
        fileName = "./Nodis.ini"

    }
    let file = fs.readFileSync(fileName);
    var Info = ini.parse(file.toString());
    return Info;
}

async function init() {

    var client = new net.Socket();
    client.setEncoding('utf8');
    client.connect(instance.ini.main.port, instance.ini.main.ip, function () {
        console.log('已连接到服务器');
        let send = {
            type:"getall",
            password:"123456",
            key:"name",
            value:"10.64"
        }
        client.write(JSON.stringify(send));
        
    });

    client.on('data', function (data) {
        data = JSON.parse(JSON.stringify(data))
        console.log('已接受服务器端发送的数据：' + data);
    });

    //监听与服务端连接的错误事件
    client.on('error', function (err) {
        console.log('在于服务器连接或通信过程中发生了一个错误，错误代码为%s', err.code);
        //当发生错误时，用destroy方法销毁该socket端口。确保不会再被利用
        client.destroy();
    })

}
async function main() {
    let ini = await readIni();
    global.instance = {
        ini: ini,
    }
    await init();
}

main();