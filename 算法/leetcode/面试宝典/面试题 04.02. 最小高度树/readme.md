<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-11-22 15:11:04
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-22 15:11:04
-->
### 解题思路
  最小高度树无非是根节点的左右两侧的子节点是大概相同的数量，因为我们可以根据此进行划分节点的左子树和右子树；
  根据二分查找方法：进行查找根节点，然后<mid的在左边，>mid的在右侧

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

```