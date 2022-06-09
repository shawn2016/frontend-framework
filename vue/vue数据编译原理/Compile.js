
/**
 * 编译操作
 * 解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，
 * 并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
 * 实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，
 * 主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。
 */
var Compile=function(el,vm){
  //保存vm对象到compile中
  this.$vm = vm;
  //将el对应的元素对象保存在compile对象中
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  //如果有el元素
  if(this.$el){
    //取出el中的所有的子节点保存到一个framgment对象中
    this.$fragment = this.node2Fragment(this.$el);
    //将编译fragmeng所有的层次子节点
    this.init();
    //将编译好的fragment添加到页面的el元素中
    this.$el.appendChild(this.$fragment)
  }
}
Compile.prototype={
  node2Fragment:function(el){
    //1.创建空的fragment中
    var fragment=document.createDocumentFragment(),child;
    //将el中所有的子节点移到fragmentzhong 
    while(child = el.firstChild){
      fragment.appendChild(child)
    }
    return fragment;
  }, 
  init(){
    //编译指定的元素
    this.compileElement(this.$fragment)
  },
  //编译指定的元素。此时将进行划分
  compileElement(el){
    //取出最外层的所有子节点
    var childNodes = el.childNodes
    //b保存compile到对象
    me =this;
    //遍历所有的子节点
    [].slice.call(childNodes).forEach(function(node){
      //得到节点的文本内容
      var text = node.textContent;
      //创建正则对象
      var reg = /\{\{(.*)\}\}/;

      //判断节点是否是一个元素节点 则进行编译元素节点内部的属性值
      if(me.isElementNode(node)){
        //是元素节点
           me.compile(node);
        //判断节点是否是大括号文本格式的文本节点
      }else if(me.isTextNode(node) && reg.test(text)){
        //编译大括号中表达式的文本节点
        me.compileText(node,RegExp.$1)
      } 
      //如果当前的节点还存在子节点
      if(node.childNodes && node.childNodes.length){
        me.compileElement(node)
      }

    })

  },
  compile(node){
    var nodeAttrs = node.attributes;
    // 遍历所有的属性节点
    [].slice.call(nodeAttrs).forEach((attr)=>{
       //得到属性名字：v-on:click
       var attrName = attr.name;
       if(me.isDirective(attrName)){
         //得到属性值
         var exp=attr.value;
         //从属性命中得到指令
         var dir =attrName.substring(2);
         //是否是事件指令
         if(me.isEventDirective(dir)){
           //解析事件指令
           compileUtils.eventHandler(node,me.$vm,exp,dir);
         }else{
           compileUtils[dir] && compileUtils[dir](node,me.$vm,exp)
         }
         //移除指令属性
         node.removeAttribute(attrName)
       }
   })

  },
  compileText(node,exp){
    compileUtils.text(node,this.$vm,exp)
  },
  isEventDirective:function(attr){
    return attr.indexOf('on') ==0
  },
  isDirective:function(dir){
    return dir.indexOf('v-') ==0

  },
  isElementNode:function(node){
    return node.nodeType ==1
  },
  isTextNode:function(node){
    return node.nodeType ==3
  }

}
var compileUtils={
  text:function(node,vm,exp){
    this.bind(node,vm,exp,'text')
  },
  model:function(node,vm,exp){
    //实现数据初始化显示和创建对应的watcher
    this.bind(node,vm,exp,'model');
    var me =this;
    //得到表达式的值
    var val = this._getVMValue(vm,exp);
    //给给定的节点绑定input的监听
    node.addEventListener('input', function (e) {
      //得到最新输入的值
      var newValue = e.target.value;
      //如果没有变化 直接返回
      if(val === newValue) return;
      //将最新的value保存给表达式对应的属性
      me._setVMValue(vm,exp,newValue);
      val = newValue;  
    })
  },
  html:function(node,vm,exp){
    // 节点node vm exp表达式
    this.bind(node,vm,exp,'html')
  },
  class:function(node,vm,exp){
    this.bind(node,vm,exp,'class')
  },
  bind:function(node,vm,exp,dir){
    //得到更新节点的函数
    var updaterFn = updater[dir+'Updater'];
    //调用函数更新节点
    updaterFn && updaterFn(node,this._getVMValue(vm,exp));
    new Watcher(vm,exp,function(value,oldVal){
       updaterFn && updaterFn(node,value,oldVal)
    })
  },
  //事件处理
  eventHandler:function(node,vm,exp,dir){
    //得到事件类型
    var eventType = dir.split(":")[1];
    //从methods中得到表达式对应的函数（事件会掉函数）
   fn = vm.$options.methods && vm.$options.methods[exp];
    if(eventType && fn){
      node.addEventListener(eventType,fn.bind(vm),false)
    }
    
  },
  //从vm表达式中获取所对应的值
  _getVMValue:function(vm,exp){
    var val = vm._data;
    exp =exp.split("."); //拆分a.b.c类似的值
    exp.forEach(function(k){
      val = val[k];
    })
    return val;
  },
  _setVMValue:function(vm,exp,value){
    var val = vm._data;
    exp =exp.split(".");//拆分a.b.c类似的
    exp.forEach(function(k,i){
      //非最后一个key 更新value的值
      if(i<exp.length-1){
        val =val[key]
      }else{
        val[k] =value
      }
    })
  },
  
}
var updater ={
  //更新节点的textContent
  textUpdater:function(node,value){
    node.textContent = typeof value =='undefined'?'':value;
  },
  htmlUpdater:function(node,value){
    node.innerHtml=typeof  value =='undefined' ? '':value;
  },
  classUpdater:function(node,value,oldVal){
    var className =node.className;
    // className =className.replace(oldVal,'').replace(/\s$/,'');
    var space = className && String(value) ? ' ':'';
    node.className =className+space+value;
  },
  modelUpdater:function(node,value,oldVal){
    node.value = typeof value =='undefined' ?'':value
  }

}