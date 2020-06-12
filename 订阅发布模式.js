// 订阅发布模式（观察者模式）
var DEvent = (function() {
    var clientList = {},
    listen,
    trigger,
    remove;
    listen = function(key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };
    trigger = function() {
        console.log(arguments);
        var key = Array.prototype.shift.call(arguments),
        fns = clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (let index = 0; index < fns.length; index++) {
            const fn = fns[index];
            fn.apply(this, arguments);
            console.log(arguments)
        }
    };
    remove = function(key, fn) {
        var fns = clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var l = fn.length - 1; l > 0 ; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
    };
    return {
        listen,
        trigger,
        remove
    };
})();
DEvent.listen( 'squareMeter88', function( price,aaa ){ // 小红订阅消息
     console.log( '价格= ' + price  + aaa);  // 输出:'价格=2000000'
});
DEvent.trigger( 'squareMeter88', 2000000 ,3000);// 售楼处发布消息
