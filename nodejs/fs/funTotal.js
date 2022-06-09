//所有文件的基本类调用时候使用
var fun = require("./fileMethod");
  // stat: [Function], 文件基本类
  // mkdir: [Function],
  // mkdtemp: [Function], 
  // open: [Function],
  // read: [Function],
  // readdir: [Function],
  // readFile: [Function],
  // write: [Function],
  // writeFile: [Function],
  // appendFile: [Function],
  // rename: [Function],
  // rmdir: [Function],
  // unlink: [Function],
  // watch: [Function],
  // watchFile: [Function] 
 
function exec(funName){
  fun[funName]();
}

exec('watch')

