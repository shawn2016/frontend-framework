
const http = require('http');
const fs   = require('fs'); 

var gobalFile = './file/test.txt'
var info  = fs.statSync(gobalFile);
    console.log({"文件的大小":info.size}) 
//文件流


//fs的文件流
function readStream(){
  //读文件流  
  console.time("readStream")
  var readSteam = fs.createReadStream(gobalFile);  
  var str = '';  
  //读取readSteam  
  readSteam.on('data',(chunk)=>{  
      str+=chunk;  
  })  
  //读取完成  
  readSteam.on('end',(chunk)=>{   
    console.timeEnd("readStream")
  })  
  readSteam.on('error',(error)=>{  
    console.log("读取失败"+error);  
    console.timeEnd("readStream")
  })  
  
}  

//写入流
var txt = '是最可爱的人流才改';
var writeSteam = fs.createWriteStream(gobalFile);
//开始写入
writeSteam.write(txt, 'utf8')
//标记写入完成 触发finish回调 不加end() 导致finish回调不会完成
writeSteam.end()
//写入完成
writeSteam.on('finish',()=>{
  console.log("文件流写入完成")
})
//写入失败
writeSteam.on('error',(err)=>{
  console.log("文件流写入失败")
  console.log(err)
})



//管道流 
function pipe(){
    var pipo = './file/demo.txt'
    // 创建一个可读流
    var readerStreamPipe1 = fs.createReadStream(pipo);
    // 创建一个可写流
    var writerStreamPipe2 = fs.createWriteStream('./file/output.txt');
    // 管道读写操作
    // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
    readerStreamPipe1.pipe(writerStreamPipe2);
    console.log("程序执行完毕");
}
 

//链式流 
//链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。 
function link(){
    var zlib = require('zlib');
    // // 压缩 .txt 文件为 .txt.gz
    fs.createReadStream(pipo)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(pipo+'.gz'));
    console.log("文件压缩完成。");
    
    // //解压  
    // 解压 input.txt.gz 文件为 input.txt
    // fs.createReadStream(pipo+'.gz')
    // .pipe(zlib.createGunzip())
    // .pipe(fs.createWriteStream('./file/1.txt'));
    // console.log("文件解压完成。");

}

// readStream();
// readCommon();

//时间上对比 
function readCommon(){
  console.time("common")
  fs.readFile(gobalFile, {encoding:'utf-8'},(err, data) => {
    if (err) throw err; 
    console.timeEnd("common")
  });
}




