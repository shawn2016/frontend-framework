//引入中介者，将订阅者和发布者进行分开
//Event作为一个类似“中介者”的角色，把订阅者和发布者联系起来
var Event = function(){
  this.clientList={};
}
Event.prototype.on=function(key,fn){
  if(!this.clientList[key]){
    this.clientList[key] = []
  }
  this.clientList[key].push(fn)
}
Event.prototype.emit=function(){
  var key = Array.prototype.shift.call(arguments);
  var fns = this.clientList[key];
  if(!fns || fns.length ==0){
     return {
       status:1,
       msg:"无当前的订阅"
     }
  }
  for(var i=0,fn;fn=fns[i++];i<fns.length-1){
    fn.apply(this,arguments);
  }
}
Event.prototype.remove=function(key,fn){
  var fns = this.clientList[key];
  if(!fns) return {
    status:1,
    msg:"当前无该订阅者，无需删除"
  };
  if(!fn){
    fns && (fns.length=0)
  }else{
    for(var i=fns.length-1;i>=0;i--){
      var _fn = fns[i];
      if(_fn ==fn){
        fns.splice(i,1)
      }
    }
  }
}


