const applyMysql = require('./tools/applyMysql');
const Socket = require('./tcp/socket');
const TcpManager = require('./tcp/TcpManager');
const Nodis = require('./Nodis/Nodis');

const os = require('os');

const fs = require('fs');
const ini = require('ini');



async function init() {
    let mysqlInstance = new applyMysql();
    let socket = new Socket();  

    let tcpManager = new TcpManager();  
    let nodis = new Nodis();

    let file = await giveFileName();
    let ini = await readIni(file);
    

    mysqlInstance.init(ini.mysql);

    global.instance = {
        dbHandler : mysqlInstance,
        socketHandler : socket,
        tcpHandler : tcpManager,
        nodis:nodis,
        ini:ini,
        fileName:file,

        
    };
    
    let log = await getSolidName();
    //为固化文件路径赋值
    global.instance.solidName = log;
    await instance.tcpHandler.init();
    socket.init();
}

async function readIni(fileName) {
    let file = fs.readFileSync(fileName);
    var Info = ini.parse(file.toString());
    return Info;
}

async function giveFileName() {
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
    return fileName;
}

async function getSolidName() {
    let type = os.platform();
    console.log('type = ',type);
    let logName = null;
    if(type == "darwin")
    {
        logName = instance.ini.solid.logPathMac;
    }
    else if(type == "win32")
    {
        logName = instance.ini.solid.logPathWin;
    }
    else
    {
        logName = instance.ini.solid.logPathDef;
    }
    return logName;
}

async function main() {
    init();



}

main();