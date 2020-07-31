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
    var args = process.argv.splice(1);
    console.log("args = ",args);
    var client = new net.Socket();
    let send = {};
    switch (args[1]) {
        case 'ping':
            send = {
                type:"ping",
                password:"123456",
            }
            break;
        case 'check':
            send = {
                type:"check",
                password:"123456",
            }
            break;
        case 'add':
            send = {
                type:"add",
                password:"123456",
                key:"A接拉起",
                value:"404",
            }
            break;
        case 'get':
            send = {
                type:"get",
                password:"123456",
                key:"A接拉起",
                value:"404",
            }
            break;
        case 'find':
            send = {
                type:"find",
                password:"123456",
                key:"A接拉起",
                value:"404",
            }
            break;
        case 'getall':
            send = {
                type:"getall",
                password:"123456",
                key:"A接拉起",
                value:"404",
            }
            break;
        case 'raise':
            send = {
                type:"raise",
                password:"123456",
                key:"A接拉起",
                value:"200",
            }
            break;
        case 'reduce':
            send = {
                type:"reduce",
                password:"123456",
                key:"A接拉起",
                value:"200",
            }
            break;
        case 'delete':
            send = {
                type:"delete",
                password:"123456",
                key:"A接拉起",
                value:"200",
            }
            break;
        case 'update':
            send = {
                type:"update",
                password:"123456",
                key:"A接拉起",
                value:"900",
            }
            break;
        case 'setlock':
            send = {
                type:"setlock",
                password:"123456",
                key:"A接拉起",
                value:"900",
            }
            break;
        case 'getlock':
            send = {
                type:"getlock",
                password:"123456",
                key:"A接拉起",
                value:"900",
            }
            break;
        case 'clearlock':
            send = {
                type:"clearlock",
                password:"123456",
                key:"A接拉起",
                value:"900",
            }
            break;
        case 'trans':
            send = {
                type:"trans",
                password:"123456",
                key:"name",
                //value:"100",
                
                value:`[{"type":"ping"},{"type":"addkey","key":"day","value":"123"},{"type":"raise","key":"day","value":"100"}]`
            };
            break;
        default:
            break;
    }
    client.setEncoding('utf8');
    client.connect(instance.ini.main.port, instance.ini.main.ip, function () {
        console.log('已连接到服务器');
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