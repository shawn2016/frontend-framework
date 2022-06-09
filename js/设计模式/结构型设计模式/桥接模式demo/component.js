/**
 * 采用中介者模式进行操作 
 * player只是用于创建
 * Player构造函数和player对象的原型方法，在player对象的这些原型方法中，
 * 不再负责具体的执行逻辑，而是把操作转交给中介者对象，把中介者对象命名为playerDirector：
 */
//创建成员角色 只保存和保留基本操作每当存在新的操作时候，交给中介者进行处理
var Player = function(name,teamColor){
  this.name = name; //名字
  this.teamColor = teamColor; //队伍颜色
  this.state = 'live'
}
Player.prototype.win =function(){
  this.state = 'win'
  console.log(this.name +"比赛赢了")
}
Player.prototype.lose =function(){
  this.state = 'lose'
  console.log(this.name +"比赛输了")
}
Player.prototype.die =function(){ 
  this.state = 'dead'
  playerDirector.reciveMessage( 'playerDead', this ); // 给中介者发送消息，玩家死亡
}
//移除玩家
Player.prototype.remove =function(){
  playerDirector.reciveMessage( 'removePlayer', this ); // 给中介者发送消息，玩家被移除
}
//队伍转化
Player.prototype.changeTeam =function(teamColor){
  playerDirector.reciveMessage('changeTeam',this,teamColor ); // 给中介者发送更换队伍的消息 包含所更换的队伍的颜色
}
var playerDirector =(function(){
  //基本操作
  var players ={} ,//保存所有玩家
      operations={}; //中介者可以执行的操作

  //新增一个玩家 palyer 当前新增的基本信息
  operations.addPlayer=function(player){
    var teamColor = player.teamColor;
    //无队伍则创建队伍，有队伍则进行压入
    players[ teamColor ] =   players[ teamColor ] || [];
    players[ teamColor ].push(player); 
  }

  //移除队员事件
  operations.removePlayer=function(player){
    var teamColor = player.teamColor,
    teamPlayers = players[ teamColor ] || []; // 该队伍所有成员 
    // 找到该成员并进行删除
     for(var i=0;i<teamPlayers.length;i++){
       if(teamPlayers[i] ==player){
        teamPlayers.splice(i,1)
       }
     }
  }
  //更换队伍 传入新的队伍的颜色 
  operations.changeTeam = function(player,newTeamColor){ 
    //删除当前所在的队伍
    operations.removePlayer(player)
    player.teamColor = newTeamColor; // 改变队伍颜色
    operations.addPlayer(player);  //增加到新的队伍中 
  }
  //获取比赛成员列表
  operations.getPlayers = function(teamColor){ 
    return players[teamColor]
  }
  //比赛存在队员死亡
  operations.playerDead =function(player){
    var teamColor = player.teamColor;
    var teamplayer = players[teamColor] //当前玩家所在的队伍
    var allDead = true; //当前玩家所在队伍的状态
    for(var i =0;i<teamplayer.length;i++){
      if(teamplayer[i].state!=='dead'){
        allDead =false;
      }
    }
    //如果全队的人全部死亡
    if(allDead){
      //所有的玩家都输掉比赛
      teamplayer.forEach((item,index)=>{
        item.lose();
      })
      //其他的队伍玩家成功
      for(var key in players){
        if(key !==teamColor){
          players[key].forEach(item=>{
            item.win();
          })
        }
      }
    }
  }
  //进行操作调用时候 实际调用函数为reciveMessage 
  var reciveMessage = function(){
    var message = Array.prototype.shift.call( arguments ); // arguments 的第一个参数为消息名称
    var result =  operations[ message ].apply( this, arguments );
    return result ;
  };
 return {
  reciveMessage: reciveMessage
 }
})();
function playerFactory(name,teamColor){
  var newPlayer = new Player(name,teamColor);
  playerDirector.reciveMessage('addPlayer',newPlayer)
  return newPlayer;
}
var player1 = playerFactory("ma",'blue')
var player2 = playerFactory("yan",'blue')
var player3 = playerFactory("feng",'blue')
var player4 = playerFactory("ma",'red')
var player5 = playerFactory("yan",'red')
var player6 = playerFactory("feng",'red')
var player7 = playerFactory("r",'red')  
console.log("新创建的红色队员的列表") 
console.log(playerDirector.reciveMessage('getPlayers','red'))
console.log("player6被移除后的红色队员列表")
player6.remove();
var data1 = playerDirector.reciveMessage('getPlayers','red')
console.log(data1) 
console.log("player7更换队伍后的列表")
player7.changeTeam('yellow')
console.log(playerDirector.reciveMessage('getPlayers','yellow'))
player7.die()
// console.log(teamPlayers)
