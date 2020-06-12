 
var shareData = {
    site_link: "http://pkuwechat.idmed.cn/",
    img_url: "http://pkuwechat.idmed.cn/img/top.jpg",
    messageDesc: "北大妇幼健康服务平台！",
    circleDesc: "北大妇幼健康服务平台！",
    title: "北大妇幼健康服务平台",
    backFun: '',
    cancelFun: ''
}

function successF(_type) {
    if (shareData.backFun != '') {
        setTimeout(shareData.backFun, 1);
    }
	//ggTrack('shareSuccess');
}
function cancelF(_type)
{
	//取消分享 _type: timeline / message
	if(shareData.cancelFun!='')
	{
		setTimeout(shareData.cancelFun,1);
	}
	//ggTrack('shareCancel');
}
function setShareData() {
    //朋友圈
    wx.onMenuShareTimeline(
	{
	    title: shareData.circleDesc,
	    link: shareData.site_link,
	    imgUrl: shareData.img_url,
	    success: function () {
	        successF("timeline")
	    },
	    cancel: function () {
	        cancelF("timeline")
	    }
	});
    //好友
    wx.onMenuShareAppMessage(
	{
	    title: shareData.title,
	    desc: shareData.messageDesc,
	    link: shareData.site_link,
	    imgUrl: shareData.img_url,
	    success: function () {

	        successF("message")
	    },
	    cancel: function () {
	        cancelF("message")
	    }
	});
}

try {
    wx.ready(function () {
        setShareData();

    });
}
catch (ea)
{ }


function closewin() {
    wx.closeWindow();
}
$.ajax({
    type: "post",
    url: 'http://camedecision.idmed.cn/data/mmapi.aspx?r=' + Math.random(),
    dataType: "text",
    data: {
        type: "signature",
        url: window.location.href.split("#")[0],
        weixinidx: 1
    },
    async: false,
    cache: false,
    success: function (result) {
        result = $.parseJSON(result);
        wx.config({
            debug: false,
            appId: result.appid,
            timestamp: result.timestamp,
            nonceStr: result.nonceStr,
            signature: result.signature,
            jsApiList: [
              'checkJsApi',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone',
              'hideMenuItems',
              'showMenuItems',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem',
              'translateVoice',
              'startRecord',
              'stopRecord',
              'onVoiceRecordEnd',
              'playVoice',
              'onVoicePlayEnd',
              'pauseVoice',
              'stopVoice',
              'uploadVoice',
              'downloadVoice',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'getNetworkType',
              'openLocation',
              'getLocation',
              'hideOptionMenu',
              'showOptionMenu',
              'closeWindow',
              'scanQRCode',
              'chooseWXPay',
              'openProductSpecificView',
              'addCard',
              'chooseCard',
              'openCard'
            ]
        });
    },
    fail: function (e) { }
});

 
 

function gotoga(url) {
    ga('send', 'pageview', url);
    return true;
}

function gotogaEvent(url) {
    ga('send', 'event', url);
}
 

 
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?e3290dc1f2ee8ea7470769d3109dd3d0";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
 
