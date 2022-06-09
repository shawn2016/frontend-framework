var fs = require('fs');// 要处理的文件列表
fs.readFile('./test1.txt', function (err, data) {
    if (err) throw err;
    fs.readFile('./test2.txt', function (err, data2) {
        if (err) throw err;
         fs.readFile('./test2.txt', function (err, data3) {
          if (err) throw err;
            // .....
         });
    });
});


var files = ['./test1.txt', './test2.txt'];
var result = [];
function myReadFile(files, callback){
    if(files.length === 0){
        callback(result);
    }else{
        var fileName = files.shift(); 
        fs.readFile(fileName, function(err, data) {
            if (err) throw err;
            else{
                result.push(data);
                myReadFile(files, callback);              
            }        
        });
    }
}
myReadFile(files, function(data){
    for(var i in data){
        console.log(data[i].toString());
    }
});



var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));//promise fs模块

var results = [];
fs.readFileAsync('./test1.txt').then(function(fileData){
    results.push(fileData);
}).then(function(){
    return fs.readFileAsync('./test2.txt');
}).then(function(fileData){
    results.push(fileData);
    console.log(results.toString());
}).catch(function(error){
    console.error(error.stack);
});



var fs = require('fs');// 要处理的文件列表
var async = require('async');
var tasks = [
  function(callback){
    fs.readFile('./test1.txt', function (err, data) {
      if (err) callback(err);
      callback(null, data);
    });
  },
  function(callback){
    fs.readFile('./test2.txt', function (err, data2) {
      if (err) callback(err);
      callback(null, data2);
    });
  }
];
async.parallel(tasks,function(err, results){
  if(err){
      console.error(err);
  }else{
      for(var i in results){
        console.log(results.toString());    
      }
  }
});



async.waterfall([
  myFirstFun,
  mySecondFun,
  myLastFun
],function(err,result) { // result回调函数
  // result 相当于tasks数组中最后一个函数（myLastFun）的返回值done
  console.log(result);  // myLastFun
})
function myFirstFun(callback) {
  callback(null,'one','two');
}
function mySecondFun(arg1,arg2,callback) {
  // arg1 相当于 'one' ,arg2 相当于 'two'
  callback(null,'three');
}
function myLastFun(arg1,callback) {
  // arg1 相当于 'three'
  callback(null,'done');
}