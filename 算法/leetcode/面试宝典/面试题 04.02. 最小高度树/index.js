/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-22 14:45:46
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-22 15:08:13
 */
/**给定一个有序整数数组，元素各不相同且按升序排列，编写一个算法，创建一棵高度最小的二叉搜索树。
 * 
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  if(!nums.length ){
       return null
  }
  //最小高度就是两边的节点数量差不多相同
    let mid =parseInt(nums.length /2) 
    let root = new TreeNode(nums[mid] )
    root.left = sortedArrayToBST( nums.slice(0, mid) )
    root.right = sortedArrayToBST( nums.slice(mid + 1) ) 
    return root;
  
};
