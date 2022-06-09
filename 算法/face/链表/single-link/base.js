/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-01 14:26:53
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-01 14:27:08
 */
const createLink = require("../create-link")
let link= new createLink();

[6,8,2,3,4,5,6,23,3].forEach(element => {
 link.add(element)
});
module.exports = link
