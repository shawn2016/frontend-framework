var p = document.querySelectorAll(".box p")
console.log(p)
p[0].onmouseover = function(){
  this.style.color='red';
  this.style.backgroundColor = 'green'
}
p[0].onmouseout = function(){
  this.style.color='#eee';
  this.style.backgroundColor = 'white'
}

p[1].onmouseover = function(){
  this.style.color='green';
  this.style.backgroundColor = 'red'
}
p[1].onmouseout = function(){
  this.style.color='#eee';
  this.style.backgroundColor = 'white'
}
//桥接模式 更改样式可抽离
function changeColor(dom,color,bg){
  dom.style.color = color;
  dom.style.backgroundColor = bg
}
p[2].onmouseover = function(){
  changeColor(this,'yellow','green')
}
p[2].onmouseout = function(){
  changeColor(this,'blue','puple')
}