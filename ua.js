// https://www.cnblogs.com/nangezi/p/9342619.html
const browser = {
    ua: function() {
        var u = navigator.userAgent;
        var u2 = navigator.userAgent.toLowerCase();

        var isChrome = u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/);
        var isAndroid = u.match(/(Android);?[\s\/]+([\d.]+)?/);
        var iosVersion = function() {
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
            }
        }();
        var chromeVersion = function() {
            var chrome = (navigator.userAgent).match(/Chrome\/(\d+)\./);
            if (chrome) {
                return parseInt(chrome[1], 10);
            }
        }();
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u2.match(/MicroMessenger/i) == "micromessenger", //是否微信
            UC: u.indexOf('UCBrowser'),
            chrome: u.indexOf('Chrome') > -1,
            windowsPhone: u.indexOf('Windows Phone') > -1,
            samsung: u.indexOf('Samsung') > -1,
            QQ: u.match(/\sQQ/i) != null ? u.match(/\sQQ/i).toLowerCase() == "qq" : false,
            isChrome: isChrome,
            isAndroid: isAndroid,
            iosVersion: iosVersion,
            chromeVersion: chromeVersion

        };
    }()
}