const applyMysql = require('./tools/applyMysql');
const Socket = require('./tcp/socket');
const TcpManager = require('./tcp/TcpManager');
const Nodis = require('./Nodis/Nodis');

const os = require('os');

const fs = require('fs');
const ini = require('ini');
let { fileName } = require('./tools/define');
async function init() {
    let mysqlInstance = new applyMysql();
    let socket = new Socket();  

    let tcpManager = new TcpManager();  
    let nodis = new Nodis();
    await giveFileName();
    let ini = await readIni();

    mysqlInstance.init(ini.mysql);
    console.log("配置文件的内容为",ini);
    global.instance = {
        dbHandler : mysqlInstance,
        socketHandler : socket,
        tcpHandler : tcpManager,
        nodis:nodis,
        ini:ini,
        
    };
    
    socket.init();
}

async function readIni() {
    let file = fs.readFileSync(fileName);
    var Info = ini.parse(file.toString());
    return Info;
}

async function giveFileName() {
    let type = os.platform();
    console.log('type = ',type);
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
}

async function main() {
    init();



}

main();