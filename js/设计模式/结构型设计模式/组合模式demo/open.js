//开关电视机

/**
 * 相关命令
 * 1.开门
 * 2.打开电脑
 * 3.登录QQ
 */

var closeDoorCommond={
  excute:()=>{
    console.log("关门")
  }
}
var openPcCommond={
  excute:()=>{
    console.log("开电脑")
  }
}
var openQQCommond={
  excute:()=>{
    console.log("登录QQ")
  }
}

var MacroCommand=function(){
  return{
   commandsList:[],
   add:function(command){
     this.commandsList.push(command)
   },
   excute:function(){
     for(var i=0,command;command=this.commandsList[i++];){
          command.excute();
     }
   }
  }
}
//添加命令
var macroCommand = MacroCommand();
macroCommand.add( closeDoorCommond );
macroCommand.add( openQQCommond );
macroCommand.add( openQQCommond );
console.log(macroCommand)
macroCommand.excute();


//新增加一个打开空调的命令
var openAcCommand = {
  excute: function(){
      console.log( '打开空调' );
  }
};
//打开电视和印象
var openTvCommand = {
  excute: function(){
      console.log( '打开电视' );
  }
};
var openSoundCommand = {
  excute: function(){
      console.log( '打开音响' );
  },
  add:function(){
    console.log("基本对象不能添加子节点")
  }
};
var macroCommand1 = MacroCommand();
macroCommand1.add( openTvCommand );
macroCommand1.add( openSoundCommand );

//关门，开电脑登录QQ
var macroCommand2 = MacroCommand();
macroCommand2.add( closeDoorCommond );
macroCommand2.add( openQQCommond );
macroCommand2.add( openQQCommond );

/*********现在把所有的命令组合成一个“超级命令”**********/
var macroCommand = MacroCommand();
macroCommand.add( openAcCommand );
macroCommand.add( macroCommand1 );
macroCommand.add( macroCommand2 );
/*********最后给遥控器绑定“超级命令”**********/
var setCommand = (function( command ){
    document.getElementById( 'button' ).onclick = function(){
        command.excute();
    }
})( macroCommand );