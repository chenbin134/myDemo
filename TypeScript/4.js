"use strict";
// 装饰器 decorator
// decorator 是实验功能，需要将ts配置文件中的decorator相关的配置放开
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var messageDecotor = function (target) {
    target.prototype.message = function (content) {
        console.log(content);
    };
};
var cls = /** @class */ (function () {
    function cls() {
    }
    cls = __decorate([
        messageDecotor
    ], cls);
    return cls;
}());
var o = new cls();
o.message('bbbbb');
