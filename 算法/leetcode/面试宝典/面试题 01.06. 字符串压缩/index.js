/**
 * 字符串压缩。利用字符重复出现的次数，
 * 编写一种方法，实现基本的字符串压缩功能。
 * 比如，字符串aabcccccaaa会变为a2b1c5a3。若“压缩”后的字符串没有变短，
 * 则返回原先的字符串。你可以假设字符串中只包含大小写英文字母（a至z）。
 * 
 */

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
console.log(compressString('aabcccccaaa'))
console.log(compressString('abbccd'))
