### 解题思路
 根据题目能够分析得到想要层次遍历当前的二叉树；
 层次遍历需要借助队列，首先将二叉树入队；
 然后遍历当前队列中的节点；在遍历的过程中，判断当前节点的左子树和右子树是否存在，如果存在则进行插入结构
以：
![image.png](https://pic.leetcode-cn.com/1606033583-FnQIeW-image.png)

### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {TreeNode} tree
 * @return {ListNode[]}
 */
var listOfDepth = function(tree) {
   //深度遍历获取当前树的深度
   //层次的结构
   let queue = [tree];//初始化一个队列 用来存储当前结构
   let result =[]
   while(queue.length){
        let length = queue.length ;
        let nowLnegth = queue.length;
        let head = new ListNode(null) // 每行新建一个链表，初始化链表头 head
        //遍历每一行 
        while(length){
            let node =queue.shift();
          //如果是第一个节点则将节点作为头节点押入
           if (length === nowLnegth) { 
               // 将每一层的第一个节点当作哦第一个插入result中
                head = new ListNode(node.val)
                result.push(head)
            } else {
                head.val = node.val
            }
            //如果当前queue的列表不是最后一个，则head需要指向下一个
            if(length > 1){ 
                head.next = new ListNode(node.val) 
                head = head.next
            } 
            node.left && queue.push(node.left);
            node.right && queue.push(node.right)
            length --;
        }
   }
   return result;
};
```