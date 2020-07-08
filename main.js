const applyMysql = require('./tools/applyMysql');
const Socket = require('./tcp/socket');
const TcpManager = require('./tcp/TcpManager');
const Nodis = require('./Nodis/Nodis');
const fs = require('fs');
const ini = require('ini');
const { fileName } = require('./tools/define');
async function init() {
    let mysqlInstance = new applyMysql();
    let socket = new Socket();

    let tcpManager = new TcpManager();
    let nodis = new Nodis();
    let ini = await readIni();
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

async function main() {
    init();



}

main();