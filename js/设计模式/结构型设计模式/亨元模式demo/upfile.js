/**
 * 内部状态：uploadType
 * upload对象必须依赖uploadType属性才能工作，
 * 因为插件上传、Flash上传、表单上传的实际工作原理有很大的区别，它们各自调用的接口也是完全不一样的，必须在对象创建之初就明确它是什么类型的插件，
 *  才可以在程序的运行过程中，让它们分别调用各自的start、pause、cancel、del等方法
 */
  /*
  * 一旦明确了uploadType，无论使用什么方式上传，这个上传对象都是可以被任何文件共用的。而fileName和fileSize是根据场景而变化的，每个文件的fileName和fileSize都不一样，fileName和fileSize没有办法被共享，它们只能被划分为外部状态
  **/　　

var Upload = function(uploadType){
  this.uploadType =uploadType;
}
Upload.prototype.delFile = function(id){
  //更新文件管理器的内容 方法给共享对象设置正确的fileSize  将该文件的内部信息进行存储
  //此时的this只包含uploadType一个数据，因此需要获取其更加详细的内容
  uploadManager.setExternalState(id,this);  
  if(this.fileSize < 3000){
    return this.dom.parentNode.removeChild(this.dom);
  }
  if(window.confirm("确认删除该文件吗？"+this.fileName)){
     return this.dom.parentNode.removeChild(this.dom);
  }
}
/* 
 * 删除文件之前而文件的实际大小被储存在外部管理器uploadManager中，所以在这里需要通过uploadManager.setExternalState方法给共享对象设置正确的fileSize，上段代码中的(1)处表示把当前id对应的对象的外部状态都组装到共享对象中
*/
//文件工厂 负责创建函数对象 
var UploadFactory = (function(){
  var createdFlyWeightObjs ={};
  return{
    create:function(uploadType){
      //如果当前上传类型的对象存在
      if(createdFlyWeightObjs[uploadType]){
        return createdFlyWeightObjs[uploadType]
      }
      //如果当前的上传对象不存在则进行创建对象
      return createdFlyWeightObjs [ uploadType] = new Upload( uploadType);
    }
  }
})();

// uploadManager 上传文件管理器
var uploadManager = (function(){
  var uploadDatabase = {};
  return{
    add:function(id,uploadType,fileName,fileSize){
      //进行对象构建
      var flyWeightObj = UploadFactory.create(uploadType);
      var dom = document.createElement('div');
      dom.id = 'f'+id;
      dom.innerHTML = '<span>文件名称'+fileName+',文件大小'+fileSize+'</span>'+
                      '<button class="delFile">删除</button>';
     
      //添加dom
      document.body.appendChild(dom);
      uploadDatabase[id]={
        fileName:fileName,
        fileSize:fileSize,
        dom:dom
      }
       //绑定删除事件
      document.querySelector('#f'+id +' button').onclick=function(){
        flyWeightObj.delFile(id) //删除当前的文件
     }
      return flyWeightObj;

    },
    setExternalState:function(id,flyWeightObj){
      var uploadData = uploadDatabase[id]; 
      for(var i in uploadData){
        flyWeightObj[i]=uploadData[i];
      } 
    }
  }
})();

//进行测试
var id = 0;
window.startUpload = function( uploadType, files ){
    for ( var i = 0, file; file = files[ i++ ]; ){
        var uploadObj = uploadManager.add( ++id, uploadType, file.fileName, file.fileSize );
    }
};

startUpload( 'plugin', [
  {
      fileName: '1.txt',
      fileSize: 1000
  },
  {
      fileName: '2.html',
      fileSize: 3000
  },
  {
      fileName: '3.txt',
      fileSize: 5000
  }
  ]);
  startUpload( 'flash', [
  {
      fileName: '4.txt',
      fileSize: 1000
  },
  {
      fileName: '5.html',
      fileSize: 3000
  },
  {
      fileName: '6.txt',
  
      fileSize: 5000
  }
  ]);