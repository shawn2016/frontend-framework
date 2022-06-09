/**
 * 文件夹和文件之间的关系，非常适合用组合模式来描述。文件夹里既可以包含文件，又可以包含其他文件夹，最终可能组合成一棵树，组合模式在文件夹的应用中有以下两层好处
　　1、组合模式让Ctrl+V、Ctrl+C成为了一个统一的操作。例如，在移动硬盘里找到了一些电子书，
      想把它们复制到F盘中的学习资料文件夹。在复制这些电子书的时候，并不需要考虑这批文件的类型，不管它们是单独的电子书还是被放在了文件夹中
　　2、用杀毒软件扫描该文件夹时，往往不会关心里面有多少文件和子文件夹，组合模式使得只需要操作最外层的文件夹进行扫描
　　现在来编写代码，首先分别定义好文件夹Folder和文件File这两个类。见如下代码：
 */
//扫描文件夹
var Folder  = function(name){
  this.name = name;
  this.parents= null;//增加this.parent属性，表示父级元素
  this.files = [];
}
Folder.prototype.add=function(file){
  file.parents = this;
  this.files.push(file)
}
Folder.prototype.scan=function(){
  console.log("扫描文件夹"+this.name)
  for(var i=0;i<this.files.length;i++){
     this.files[i].scan()
  }
}
Folder.prototype.remove=function(){
   if(!this.parents) return ;//根节点或者树外面的游离节点
   //如果存在父元素
   for(var files = this.parents.files,i=files.length-1;i>=0;i--){
     var file = files[i];
    //  如果this.parent不为null，则说明该文件夹有父节点存在，此时遍历父节点中保存的子节点列表，删除想要删除的子节点
     if(file == this){ 
         file.parents = null//变成游离的节点
         files.splice(i,1)
     }
   }
}

var File = function(name){
  this.name = name;
  this.parents = null;//文件夹的父级元素

}
File.prototype.add=function(){
  console.log("文件无法添加文件")
}
File.prototype.scan=function(){
  console.log("开始扫描文件："+this.name)
}
File.prototype.remove=function(){
  if(!this.parents) return ;//根文件或者游离的文件
 
  for(var files = this.parents.files,i=file.length-1;i>=0;i--){
    var file = files[i];
    if(file ==this){
      files.splice(i,1)
    }
  }
}

//使用扫描
var folder = new Folder("parent")
var folder1 = new Folder('children1')
var folder2 = new Folder('children2')
var file = new File("parent-file")
var file1 = new File("children1-file")
var file2 = new File("children2-file");
folder1.add(file1)
folder2.add(file2)
folder.add(file)
folder.add(folder1)
folder.add(folder2)

folder.scan(); 
console.log(folder2)
folder2.remove(); 
console.log(folder2)