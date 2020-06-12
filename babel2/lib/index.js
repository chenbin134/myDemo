"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// 返回start 和end 之间的随机数
var getRandom = exports.getRandom = function getRandom(start, end) {
    return parseInt(Math.random() * (end - start) + start);
};