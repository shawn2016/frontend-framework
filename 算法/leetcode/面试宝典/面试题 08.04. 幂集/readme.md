### 解题思路
  
  幂集 就是所有子集，不包含重复元素；
  以案例为准：
  [1,2,3]的子集；
  包含一个空集[];
  进行一个一个元素遍历，每次增加一个子集，他的新的子集其实就是前面元素的子集进行增加一个当前的元素；
   比如到元素2的是时候，他的子集增加[1,2]、[2];
   元素3的时候，子集增加了[1,3][2,3],[1,2,3][3];
 我们进行记录和遍历子集，进行新元素增加时候内容填充
### 代码

```javascript
var subsets = function(nums) { 
  //先进行查找 一个一个增加子集
  let collection=[];
  for(var i=0;i<nums.length;i++){
      let current = nums[i]; 
      generatorCollection(current,collection)
      collection.push([current]) 
  } 
  collection.push([])
 return collection;
};
//在generator中去找到{nums[0],nums[1]}的集合
function generatorCollection(item,collection){
  //进行循环collection前面的内容
  let recyleList = JSON.parse(JSON.stringify(collection))
  //在集合collection中，已经存在{nums[n-1]}的集合了，在增加一个元素后，无非是在前面的集合中再次增加寻找子集；
  for(var i=0;i<recyleList.length;i++){
      //获取当前collection的项目值
      let curr =JSON.parse(JSON.stringify( collection[i]));
      curr.push(item)
      collection.push(curr)
  } 
}
```