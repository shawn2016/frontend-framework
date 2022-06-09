
    let col=0;
    let row = 0
    let path=[]
var pathWithObstacles = function(obstacleGrid) {
   //如果本身不是一个数组 则返回空
   if(!Array.isArray(obstacleGrid) && obstacleGrid.length==0) return[]; 
 
   //行的长度
   col = obstacleGrid.length;
   //列的长度
   row = obstacleGrid[0].length;
//    如果最后i个的上和左都是障碍物 可能不需要进行递归遍历了哈哈哈
   if(obstacleGrid[col-1][row-1]==1){
       return []
   }

   //初始化visited
  let visited = []
  for(var i=0;i<=col-1;i++){
      visited[i]=[]
     for(var j=0;j<=row-1;j++){
         visited[i][j]=0
     }
  }

    vistitedPath(obstacleGrid,0,0,visited) 
    return path;
};
    /**
     * 1.如果元素被访问过，则无法进行访问；
     * 2.如果元素是障碍物，则不能访问
     * 3.超过界限不能访问
     */
    function vistitedPath(obstacleGrid,c,r,visited){  
        //当存在条件的时候    //进行遍历每一个元素 确定元素不可访问的条件；
        if(c>=col || r>=row || obstacleGrid[c][r]==1|| visited[c][r] ==true){ 
            return false;
        } 
        //当前节点不符合封闭条件，可以进行访问 
        visited[c][r] =true;//标记当前节点已经被访问过  
          path.push([c,r])
        //如果这个是最后一个了 则可以直接出去了呀
        if (c == col-1  && r == row-1 ) { 
            return true;
        }
        //判断当前节点是否能够欧进行通路，只需要判断向下或者向右能够进行通行就行；
        let downNode = vistitedPath(obstacleGrid,c,r+1,visited);
        let rightNode = vistitedPath(obstacleGrid,c+1,r,visited); 
        //如果又一个通行则可以通行
        if(downNode || rightNode){
            return true;
        } 
        path.splice(path.length-1)
        return false;  
    }

  console.log(pathWithObstacles([[0,0,0,0],[0,1,0,0],[0,0,0,0],[0,0,1,0],[0,0,0,0]]))