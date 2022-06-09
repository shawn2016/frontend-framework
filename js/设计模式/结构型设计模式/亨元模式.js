/**
 * 假设有个内衣工厂，目前的产品有50种男式内衣和50种女士内衣，为了推销产品
 * 工厂决定生产一些塑料模特来穿上他们的内衣拍成广告照片。正常情况下需要50个男模特和50个女模特，
 * 然后让他们每人分别穿上一件内衣来拍照。不使用享元模式的情况下，在程序里也许会这样写：
 */
var Model = function(sex,underwear){
  this.sex = sex;
  this.underwear = underwear
}
Model.prototype.takePhoto=function(){
  console.log("sex=" + this.sex +"underwear=" +this.underwear)
}

//50件衣服
for(var i=0;i<50;i++){
  var model = new Model('male','underwear'+i)
  model.takePhoto();
}
for(var i=0;i<50;i++){
  var model = new Model('female','underwear'+i)
  model.takePhoto();
}

var Model1 = function(sex){
  this.sex = sex; 
}
Model1.prototype.takePhoto = function(){
  console.log( 'sex= ' + this.sex + ' underwear=' + this.underwear);
};
var  maleModel = new Model1('male'),
femaleModel = new Model1('female');
//50件衣服
for(var i=0;i<50;i++){
  maleModel.underwear = 'underwear'+i;
  maleModel.takePhoto();
}
for(var i=0;i<50;i++){
  femaleModel.underwear = 'underwear'+i;
  femaleModel.takePhoto();
}
var modelFactory = (function(){
  var modelDir = null;
  return function(sex){
    if(!modelDir){ 
       modelDir = new Model1(sex) 
    }  
    modelDir.takePhoto() 
  }
})()
for(var i=0;i<10;i++){
  femaleModel.underwear = 'underwear'+i;
  modelFactory('male');
} 
for(var i=0;i<10;i++){
  femaleModel.underwear = 'underwear'+i;
  modelFactory('female');
}

var modelFactory=function(sex,underwear){
  var obj = {}; //创建一个空对象
  obj.sex = sex;
  obj.underwear =underwear ;
  obj.takePhoto =function() { 
    console.log("进行操作一些事情")
  }
  
}
