const applyMysql = require('./tools/applyMysql');
const Socket = require('./tcp/socket');
const TcpManager = require('./tcp/TcpManager');
const Nodis = require('./Nodis/Nodis');
async function init() {
    let mysqlInstance = new applyMysql();
    let socket = new Socket();

    let tcpManager = new TcpManager();
    let nodis = new Nodis();
    global.instance = {
        dbHandler : mysqlInstance,
        socketHandler : socket,
        tcpHandler : tcpManager,
        nodis:nodis,
    };
    socket.init("127.0.0.1","13002");
}

async function main() {
    init();



}

main();