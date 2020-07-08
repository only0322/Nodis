const os = require('os')
let type = os.platform();
let fileName = null;
if(type == "win32")
{
    fileName = "E:/gitee/Nodis/Nodis.ini";
}
else
{
    fileName = "/Users/hideyoshi/Desktop/codes/Nodis/Nodis.ini";
}


exports.fileName = fileName;