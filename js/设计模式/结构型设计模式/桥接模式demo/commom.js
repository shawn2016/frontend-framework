/**
 * 泡泡堂游戏
 * 使每个玩家对象都增加一些属性，分别是队友列表、敌人列表、玩家当前状态、角色名字以及玩家所在的队伍颜色：
 * 包含 赢、输、退出队伍事件
 */
function Player( name, teamColor ){
  this.partners = []; // 队友列表
  this.enemies = []; // 敌人列表
  this.state = 'live'; // 玩家状态
  this.name = name; // 角色名字
  this.teamColor = teamColor; // 队伍颜色
};
Player.prototype.win=function(){
  console.log(this.name+"游戏赢了")
}
Player.prototype.lose=function(){
  console.log(this.name+"游戏输掉")
}
//死亡时候操作
Player.prototype.die = function(){
  this.state = 'die' //设置当前玩家状态为死亡
  var all_die = true;//查看和验证当前玩家所在队伍是否有人存活
  for(var i=0;i<this.partners;i++){
    if(this.partners[i].state !='die'){
      all_die =false;
      break;
    }
  }
  //如果队友全部死亡 则表示当前队伍失败，则对手队伍成功
  if(all_die){
    this.lose();
    for ( var i = 0, partner; partner = this.partners[ i++ ]; ){ // 通知所有队友玩家游戏失败
      partner.lose();
   }
   for ( var i = 0, enemy; enemy = this.enemies[ i++ ]; ){ // 通知所有敌人游戏胜利
      enemy.win();
   }
  }
}
var players =[]
var playerFactory =function(name,teamColor){
  var newPlayer = new Player(name,teamColor);//创建玩家 
  for(var i=0;i<players.length;i++){
    var player = players[i]; 
    if(player.teamColor == teamColor){ //找到当前新创建成员的队伍
      player.partners.push(newPlayer) //当前队伍的成员的同伴增加新成员
      newPlayer.partners.push( player ); //新创建的成员的同伴增加已有的队伍成员
    }else{
      player.enemies.push(newPlayer)  //敌人的队伍增加当前新创建的人
      newPlayer.enemies.push( player ); //新创建成元增加敌人列表，
    }
  }
  players.push( newPlayer );
  return newPlayer;
}
var player1 = playerFactory("ma",'blue')
var player2 = playerFactory("yan",'blue')
var player3 = playerFactory("feng",'blue')
var player4 = playerFactory("ma",'red')
var player5 = playerFactory("yan",'red')
var player6 = playerFactory("feng",'red')
var player7 = playerFactory("r",'red')

player1.die();
player2.die();
player3.die();
console.log(players)