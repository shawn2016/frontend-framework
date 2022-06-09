/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-11 09:09:42
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-11 09:09:43
 */
import utils1 from "./module1";
import utils2 from "./module2";
import $ from "jquery";
console.log(utils1, utils2, $);
import(/* webpackChunkName: "asyncModule1" */ "./asyncModule1");