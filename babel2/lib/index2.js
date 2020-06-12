'use strict';

var _index = require('./index.js');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var num = (0, _index.getRandom)(100, 200);
console.log(num);

var boxGroup = document.getElementsByTagName('div');
var arr = [1, 2, 3, 4, 5];
var arr2 = [].concat(arr, _toConsumableArray(boxGroup));
console.log(arr2);