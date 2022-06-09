const http = require('http');
const fs   = require('fs');
var path = require('path')

http.createServer((req,res)=>{
  res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});  
  //异步和同步
  res.end("文件操作系统启动了")
}).listen(8888)
  
var obj = {}
 
obj.stat=function (){
 //fs.Stats  检测是文件还是目录
 fs.stat('./file/demo.txt',function(err, stats){  
  if (err) {  
      console.log(err);  
  }else{  
      console.log(stats); 
      var str =  stats;
      str= {
        '文件 stats.isFile()':stats.isFile(), 
        '目录：stats.isDirectory()':stats.isDirectory(),
        '如果 fs.Stats 对象描述块设备:':stats.isBlockDevice(), //如果 fs.Stats 对象描述字符设备，则返回 true。
        'stats.isCharacterDevice():':stats.isCharacterDevice(),
        'stats.isFIFO():':stats.isFIFO(),
        //如果 fs.Stats 对象描述套接字，则返回 true。
        'stats.isSocket() 对象描述套接字':stats.isSocket(),
        // stats.dev 对文件的数字标识符
        'stats.dev: 对文件的数字标识符':stats.dev, 
        // 文件系统特定的文件索引节点编号。
        " stats.ino 文件系统特定的文件索引节点编号:":stats.ino,
        //描述文件类型和模式的位字段。
        'stats.mode  描述文件类型和模式的位字段:':stats.mode,
        //文件存在的硬链接数。
        'stats.nlink 硬链接数。 :' :stats.nlink,
        //拥有该文件（POSIX）的用户的数字型用户标识符
        'stats.uid: 拥有该文件（POSIX）的用户的数字型用户标识符':stats.uid,
        "stats.size 文件大小":stats.size,
        "stats.blksize 用于 I/O 操作的文件系统块的大小":stats.blksize,
        "stats.blocks 为此文件分配的块数。":stats.blocks,
        "stats.mtime 表明上次修改此文件的时间戳。":stats.mtime,
        " stats.birthtime文件创建的时间戳":stats.birthtime, 
      }  
      console.log(str)
    }  
 }); 
} 



obj.mkdir =function(){
  /**  
   * fs.mkdir 创建目录  mkdirSync 
   * path 创建的目录路径  
   * mode 目录权限  
   * callback 回调 传递的异常参数（err)   
   */ 
  fs.mkdir('./file/1111', { recursive: true },function(err,folder){  
    if(err){  
      console.log(err)  
    }else{  
      console.log("目录创建成功") 
      console.log(folder) 
    }  
  }) 
}
        


//fs.mkdtemp 创建一个唯一的临时目录。 mkdtempSync
 /**
  * prefix <string>  六位随机字符，以创建唯一的临时目录
    options <string> | <Object>
       encoding <string> 默认值: 'utf8'。
    callback <Function>
        err <Error>
        folder <string>
  */
obj.mkdtemp=function(){
     fs.mkdtemp('444444',{encoding:'utf-8'}, function(err,folder){
        if(err){  
          console.log(err)  
        }else{  
          console.log(folder)   //444444BRE6IY
        }  
    })
}

//fs.open 打开文件 fs.open(path[, flags[, mode]], callback)

/**
 * path <string> | <Buffer> | <URL>
 * flags <string> | <number> 参阅支持的文件系统标志。默认值: 'r'。
 * mode <string> | <integer> 默认值: 0o666（可读写）。
 * callback <Function>
 */
obj.open =function(){
  fs.open('./file/demo.txt',function(err,fd){
    if(err){
      console.log(err) 
    }else{ 
      console.log('fs.open成功');
      console.log(fd) //24 文件代表标志符号 
    }
  })
}
  


//fs.opendir
/**
 * path <string> | <Buffer> | <URL>
 * options <Object>
   *  encoding <string> | <null> 默认值: 'utf8'。
   *  bufferSize <number> 当从目录读取时在内部缓冲的目录条目数。值越高，则性能越好，但内存占用更高。默认值: 32。
 *  callback <Function>
   *  err <Error>
   * dir <fs.Dir>
 */
// fs.opendir('./file',{encoding:'utf-8'},function(err,dir){
//   if(err){
//     console.log(err)
//   }else{
//     console.log(dir)
//   }
// })


//fs.read(fd, buffer, offset, length, position, callback)
/**
 * fd <integer> 指定的文件中读取数据
  buffer <Buffer> | <TypedArray> | <DataView>  是数据将写入的缓冲区
  offset <integer> buffer 中开始写入的偏移量。
  length <integer>  是一个整数，指定要读取的字节数
  position <integer> position 参数指定从文件中开始读取的位置。 如果 position 为 null，则从当前文件位置读取数据，并更新文件位置。 如果 position 是整数，则文件位置将保持不变。
  callback <Function>
      err <Error>
      bytesRead <integer> 读出文件的字节长度
      buffer <Buffer> 内容
 */
obj.read =function(){
  var buffer = new Buffer(24444),
      offset =1,
      length=33,
      position =1; 
    fs.open('./file/demo.txt',function(err,fd){
        if(err){
          console.log(err) 
        }else{  
          fs.read(fd,buffer,offset,length,position,function(err,bytesRead,buffer){
            if(err){
              console.log(err)
            }else{
              console.log(bytesRead)
              console.log(buffer);
            }
          })
        }
      })
}

//fs.readdir fs.readdirSync fs.readdir(path, options, callback)
/**
 * path <string> | <Buffer> | <URL>
 * options <string> | <Object>
    encoding <string> 默认值: 'utf8'。
    withFileTypes <boolean> 默认值: false。
 * callback <Function>
   err <Error>
   files <string[]> | <Buffer[]> | <fs.Dirent[]> files 是目录中的文件名的数组（不包括 '.' 和 '..'）。
 */
obj.readdir=function(){

 fs.readdir('./file',function(err,files){
   if(err){
     console.log(err)
   }else{
     console.log(files) //[ 'demo.txt' ]
   }
 })
  
}

 
//fs.readFile  fs.readFile(path, options,callback)
/**
 * path <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
 * options <Object> | <string>
    encoding <string> | <null> 默认值: null。
    flag <string> 参阅支持的文件系统标志。默认值: 'r'。
 * callback <Function>
    err <Error>
    data <string> | <Buffer>
 */
obj.readFile=function(){
  fs.readFile('./file/demo.txt', {encoding:'utf-8'},(err, data) => {
    if (err) throw err;
    console.log(data);
  });  

}


//读的是文件目录 fs.readFile() 与 fs.readFileSync() 的行为是特定于平台的。 在 macOS、Linux 和 Windows 上，将返回错误。
// fs.readFile('./file',(err, data) => {
//   if (err){
//     console.log(err)
//   };
//   console.log(data);
// });

//写文件
//fs.write(fd, buffer, offset,length, position, callback)
//fs.write(fd, string, position,encoding, callback)
/**
 * fd <integer>
  buffer <Buffer> | <TypedArray> | <DataView>
  offset <integer>
  length <integer>
  position <integer>
  callback <Function>
    err <Error>
    bytesWritten <integer>
    buffer <Buffer> | <TypedArray> | <DataView>
 */
obj.write=function(){
  var offset =1,length=0,position =1; 
  fs.open('./file/demo.txt','a',function(err,fd){
    if(err){
      console.log(err) 
    }else{ 
      console.log(fd)
      var buffer = new Buffer('写入文件数据内容');
      fs.write(fd,buffer,3,9,12,function(err,bytesWritten,buffer){
         console.log("fs.write")
        if(err){
          console.log(err)
        }else{
          console.log(bytesWritten);
          console.log(buffer)
        }
      })
    }
  })

}



//fs.writeFile(file, data, options,callback)
/**
 * 
 * file <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
   data <string> | <Buffer> | <TypedArray> | <DataView>
   options <Object> | <string>
      encoding <string> | <null> 默认值: 'utf8'。
      mode <integer> 默认值: 0o666。
      flag <string> 参阅支持的文件系统标志。默认值: 'w'。
   callback <Function>
    err <Error>
 */
obj.writeFile=function(){
  const data = new Uint8Array(Buffer.from('nodejs无敌哈哈哈'));
    fs.writeFile('./file/demo.txt', data, (err) => {
      if (err) throw err;
      console.log('文件已被保存');
    });

}


//fs.appendFile 追加写入文件的内容
//fs.appendFile(path, data,options,callback)  
/**
 * 
 */
obj.appendFile=function(){
  fs.appendFile('./file/demo.txt','嗯嗯嗯嗯',function(err){  
    if(err){  
      console.log(err)  
    }else{  
      console.log("追加写入成功")  
    }  
  })

}
   
  

//fs.rename(oldPath, newPath, callback)
/**
 * oldPath <string> | <Buffer> | <URL>
 * newPath <string> | <Buffer> | <URL>
 * callback <Function>
   err <Error>
 */
obj.rename=function(){
  fs.rename('css', 'yyy', (err) => {
    if (err){
      console.log(err) ;
    }else{
      console.log('重命名完成');
    }
  });

}
 

//删除文件 fs.rmdir(path, options,callback)
  //* 如果目录中存在文件 则先进行判断 在进行删除 
   /**
   * 1.判断目录是否为空
   * 2.目录不为空 存在目录则进行步骤1 存在文件直接删除
   * 3.目录中不存在文件或者目录时删除
   * demo详见 deleteFileOrfolder.js
   * 
   * */  
obj.rmdir=function(){
  fs.rmdir('./file/delete',function(err){
    console.log("删除目录")  
    if(err){  
      console.log(err)  
    }else{  
      console.log("删除目录成功")  
    }  
  }) 

}

obj.unlink=function(){
  fs.unlink('./file/1.txt',function(err){  
    if(err){  
      console.log(err)  
    }else{  
      console.log("删除文件成功")  
    }  
  })  

}
  //删除文件  fs.unlink(path, callback)
  
  

  obj.watch=function(){
  
  //watch 
  fs.watch('file', (eventType, filename) => {
    console.log(`事件类型是: ${eventType}`);
    if (filename) {
      console.log(`提供的文件名: ${filename}`);
    } else {
      console.log('文名未提供');
      /**
       * 事件类型是: change
         提供的文件名: demo.txt
         事件类型是: change
         提供的文件名: demo.txt
       */
    }
  });
    
}
obj.watchFile=function(){
  fs.watchFile('file/demo.txt', (curr, prev) => {
    console.log(`当前的最近修改时间是: ${curr.mtime}`);
    console.log(`之前的最近修改时间是: ${prev.mtime}`);
  });

}
//将所有文件操作api进行打包 然后在funTotal进行调用
module.exports  =obj;
