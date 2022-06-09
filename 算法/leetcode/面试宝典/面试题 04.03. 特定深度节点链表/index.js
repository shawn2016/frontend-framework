 /**
  * 给定一棵二叉树，设计一个算法，创建含有某一深度上所有节点的链表（比如，若一棵树的深度为 D，则会创建出 D 个链表）。返回一个包含所有深度的链表的数组。
  */


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
                //当前的节点val的值等于node节点val的值
                head.val = node.val
            }
            //如果当前queue的列表不是最后一个，则head需要指向下一个
            if(length > 1){ 
                head.next = new ListNode(node.val) 
                head = head.next
            } 
            //查看当前左子树
            node.left && queue.push(node.left);
            //压入当前右子树
            node.right && queue.push(node.right)
            //遍历完成一个 减去1
            length --;
        }
   }
   return result;
};