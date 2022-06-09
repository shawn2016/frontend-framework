### 解题思路
相邻字符统计
1.定义count、i、current;
2.while遍历字符串，
3.如果current和当前的S[i]不相等，则表示current的字符统计完毕，继续下一个字符统计，重置count和将curent的个数以及字符赋给rs
4.继续进行遍历即可

### 注意循环结束条件 最后一项也要加入到rs中

### 代码

```javascript
/**
* @param {string} S
* @return {string}
*/
var compressString = function (S) {
	if (!S) return S;
	//进行逐个统计和验证
	let i = 1;
	let current = S[0];
	let rs = '',count=1;
	while (i <= S.length) {
		//当前的元素如果不等于S[i]则表示此时开启新的元素，重新计算
		if (current != S[i]) { 
			rs += current+''+count;
			count=0
			current = S[i];
		}
		count++;
		i++;
	}  
	return rs.length >= S.length ? S:rs
};
```