// document.addEventListener('touchmove' , function (ev){
// 	ev.preventDefault();
// 	return false;
// } , false)

var cliHeight = document.documentElement.clientHeight;
//$(".wrapper").css("height",cliHeight);
var isclick = false;

var feed = "";
var feedreason = "";
var brands = "";
var result = '';
var index = '';//喂养方式的索引
var month = '';//输入的月龄
$(function(){	
	$(".btn-agree").css({"background":"#eee","color":"#ddd"});
    // 选择喂养方式，记录索引
    $("#ques01 .option1 li").click(function(){
        index = $(this).index() + 1;
        console.log(index);
        console.log("宝宝目前喂养方式："+$(this).text())
    })
        //纯母乳喂养-提交
    $("#ques01 .option1 li:eq(0)").click(function () {
        
        feed1($(this).html());
        //GoPrivacy();
    })
    // 剩余别的喂养方式，回答'不用母乳喂养的原因'题目
    $("#ques01 .option1 li:gt(0)").click(function () {
            feed = $(this).html();
        	$("#ques02").fadeIn(200);
        	$("#ques01").fadeOut(200);
        })
    
    $(".btn-confirm").click(function () {
        result = "";
		if (!$("#ques03").find("li").hasClass("cur")) {
	        alert('请选择原因')
	    } else if(index == 2 || index == 4 || index == 6){
            //继续回答‘停止吃母乳的月龄’问题
            $("#ques02").fadeOut(200);
            $("#ques01").fadeOut(200);
            $('#ques03').fadeOut(200);
            $('#ques04').fadeIn(200);
        } else if(index == 3 || index == 7){
             //继续回答‘奶粉品牌’问题
             var maxIndex = $('.option3 li.cur').length - 1;
		   
		    $('.option3 li.cur').text(function(index, content){
		        result += (index === maxIndex) ? content : content + ','; 
		    });
		    //feed2(result);
	    	console.log("不能纯母乳喂养的原因："+result)
	    	//GoPrivacy();
	    	$("#ques02").fadeIn(200);
			$("#ques03").fadeOut(200);
			isclick = true;
			$(".btn-agree").css({"background":"#ccecfa","color":"#00a1e4"});
        }
	    else {
            var maxIndex = $('.option3 li.cur').length - 1;  
		    $('.option3 li.cur').text(function(index, content){
		        result += (index === maxIndex) ? content : content + ','; 
            });
            console.log("不能纯母乳喂养的原因："+result)
            feed2(result);
            
	    }	
    })
    $('.myAgreeBtn').click(function(){
        if($('#ques04 input').val() == ''){
            alert('请输入月龄');
            return
        } else {
            if(index == 2 || index == 6){
                //继续回答‘奶粉品牌’问题
             var maxIndex = $('.option3 li.cur').length - 1;
		   
             $('.option3 li.cur').text(function(index, content){
                 result += (index === maxIndex) ? content : content + ','; 
             });
             //feed2(result);
             console.log("不能纯母乳喂养的原因："+result)
             //GoPrivacy();
             $("#ques02").fadeIn(200);
             $("#ques03").fadeOut(200);
             $("#ques04").fadeOut(200);
             isclick = true;
             $(".btn-agree").css({"background":"#ccecfa","color":"#00a1e4"});

            } else {
                $("#Success2").show(); 
            }
        }

    });

	// $("#ques01 .option1 li:eq(1)").click(function () {
	//     feed = $(this).html();
	// 	$("#ques02").fadeIn(200);
	// 	$("#ques01").fadeOut(200);
	// })
	// $("#ques01 .option1 li:eq(2)").click(function () {
	//     feed=$(this).html();
	// 	$("#ques02").fadeIn(200);
	// 	$("#ques01").fadeOut(200);
	// })
	
	$("#ques02 .txt").click(function(){
		$("#ques03").fadeIn(200);
		$("#ques02").fadeOut(200);
	})

	$(".icon-questionmark").click(function(){
		var m = $(".icon-questionmark").index(this);
		$("#Mask").fadeIn(200);
		$(".popups").eq(m).fadeIn(200);
	})	
	$(".icon-close").click(function(){
		$("#Mask,.popups,.popup").fadeOut(200);
	})

	$(".option3 li").click(function(){
		$(this).toggleClass("cur")
	})

	$(".btn-agree").click(function(){
		if ( isclick == true ){
			feed2(result);
		}
	})
})

function GoPrivacy(){
	window.location.href='privacy.html'
}

function feed1(title) {
    $.ajax({
        type: "Post",
        url: "data/survay01.aspx?r=" + parseInt(Math.random() * 10000),
        data: {
            "type": "feed1",
            "title": encodeURIComponent(title),
            "mp":mp
        },
        dataType: "json",
        async: false,
        beforeSend: function (XMLHttpRequest) { },
        success: function (data) {
            if (data.errcode > 0) {
                if (iscene >= 19900 && iscene < 20000)
                    window.location.href = "/wnscgi/";
                else if (iscene >= 20000 || (iscene >= 18900 && iscene < 19900))
                {
                    window.location.href = '/index.aspx';
                }
                else 
                $("#Success2").show();
            }
            else
            {
                alert(data.errmsg);
            }
        }
    });
}
function feed2(title) {
    $.ajax({
        type: "Post",
        url: "data/survay01.aspx?r=" + parseInt(Math.random() * 10000),
        data: {
            "type": "feed2",
            "feed":feed,
            "title": encodeURIComponent(title),
            "mp": mp,
            "stopMonth":$('#ques04 input').val()
        },
        dataType: "json",
        async: false,
        beforeSend: function (XMLHttpRequest) { },
        success: function (data) {
            if (data.errcode > 0)
            {
                if(index ==2 || index == 3 || index == 6 || index ==7){
                    
                    window.location.href = "choosemilk.aspx?mp="+mp;
                } else {
                    $("#Success2").show();
                }
            } else {
                alert(data.errmsg);
            }
        }
    });
}
