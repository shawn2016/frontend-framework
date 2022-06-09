
const fs   = require("fs"); 
/**
 * 删除文件目录以及下面的文件模块
 * 删除文件时候
 * 如果当前文件是一个目录 需要检测当前目录下是否还有文件
 * 如果还存在文件则
 */

var basePath = './file'
function deleteDir(path){
  if(!fs.existsSync(path)){
    console.log("路径不存在");
    return "路径不存在";
  }
  var info=fs.statSync(path);
  if(info.isDirectory()){
    var files = fs.readdirSync(path);
    if(files.length>0){ 
      files.forEach((item,index)=>{ 
         deleteDir(path+'/'+item);
         if(index==files.length-1){ //删了目录里的内容就删掉这个目录  
            deleteDir(path);
         }
      })
    }else{
      fs.rmdirSync(path);
    }
  }else{
    fs.unlinkSync(path);//删除文件
  } 
}
deleteDir(basePath);



//
var basePath = './file/delete'
/**
 * 删除文件 
 * 1.判断所给的文件目录是否存在 不存在则进行返回 存在则进行判断 existsSync
 * 2.判断是否是文件目录 statSync   isDirectory   如果是文件目录则转3 不是则转4
 * 3.获取文件目录的子文件/文件夹内容readdirSync 进行遍历 当前的文件内内容为空 则删除该文件夹rmdirSync  否则执行5
 * 4.删除当前的文件 unlinkSync
 * 5.遍历当前文件夹内容 如果有文件夹则执行1-5 
 */ 
//进行文件操作时候，使用同步的方法
 function deleteFolder(path){
   //判断当前文件夹是否存在 不存在则进行返回 
   if(!fs.existsSync(path)){
    console.log("文件夹不存在，请仔细检车")
    return;
   }
   //获取当前的文件属性
   var fileStat = fs.statSync(path);
   if(fileStat.isDirectory()){

   }else{
     //当前检测到的是文件 则进行删除
     fs.unlinkSync(path)
   }
 }
