//  webapck4 打包后输出的bundle.js

/******/ (function(modules) { // webpackBootstrap
/******/     // 模块缓存作用，已加载的模块可以不用再重新读取，提升性能
/******/     var installedModules = {};
/******/
/******/     // 关键函数，加载模块代码,形式有点像Node的CommonJS模块，但这里是可跑在浏览器上的es5代码
/******/     function __webpack_require__(moduleId) {
/******/
/******/         // 缓存检查，有则直接从缓存中取得
/******/         if(installedModules[moduleId]) {
/******/             return installedModules[moduleId].exports;
/******/         }
/******/         // 先创建一个空模块，塞入缓存中
/******/         var module = installedModules[moduleId] = {
/******/             i: moduleId,
/******/             l: false, // 标记是否已经加载
/******/             exports: {} // 初始模块为空
/******/         };
/******/
/******/         // 把要加载的模块内容，挂载到module.exports上
/******/         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/        module.l = true; // 标记为已加载
/******/         // 返回加载的模块，调用方直接调用即可
/******/         return module.exports;
/******/     }
/******/
/******/     // define getter function for harmony exports
/******/     __webpack_require__.d = function(exports, name, getter) {
/******/         if(!__webpack_require__.o(exports, name)) {
/******/             Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/         }
/******/     };
/******/
/******/     // define __esModule on exports
/******/     __webpack_require__.r = function(exports) {
/******/         if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/             Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/         }
/******/         Object.defineProperty(exports, '__esModule', { value: true });
/******/     };
/******/
/******/     // 启动入口模块index.js
/******/     return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ (
  {

    /***/ "./src/add.js":
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ((a,b)=>{\n    return a+b;\n});\n\n//# sourceURL=webpack:///./src/add.js?");
    /***/ }),

    /***/ "./src/index.js":
    /***/ (function(module, __webpack_exports__, __webpack_require__) { 
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add.js */ \"./src/add.js\");\n/* harmony import */ var _minus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./minus.js */ \"./src/minus.js\");\n\n\n\nconst sum = Object(_add_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1,2);\nconst division = Object(_minus_js__WEBPACK_IMPORTED_MODULE_1__[\"minus\"])(2,1);\n\nconsole.log(sum);\nconsole.log(division);\n\n//# sourceURL=webpack:///./src/index.js?");
    /***/ }),

    /***/ "./src/minus.js":
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"minus\", function() { return minus; });\nconst minus = (a,b)=>{\n    return a-b\n}\n\n//# sourceURL=webpack:///./src/minus.js?");
    /***/ })

    /******/ }
);