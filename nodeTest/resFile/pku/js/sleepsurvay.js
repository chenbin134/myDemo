document.addEventListener('touchmove' , function (ev){
	ev.preventDefault();
	return false;
} , false)

var cliHeight = document.documentElement.clientHeight;
var cliWidth = document.documentElement.clientWidth;
var isclick = false;


var j = $(".ques").length;//题目总数
alert('题目数量：'+ j);
var k = 1;//当前题目序号
$("#totalnum").html(j);
$("#curnum").html(k);
$(".progress .line span").css("width",k/j*100+"%");
$(".progress .numrate .num").css("left",k/j*100+"%");
var type = 0; //0为单选，1为填空

var q1 = "", q2 = "", q3 = "", q4 = "", q5 = "", q6 = "", q7 = "", q8 = "", q91 = "",q92 = "", q10 = "";
var sleeptime = 0;
$(function(){	
	$("#SurvaySleep").css({"width":cliWidth+"px","height":cliHeight+"px"});
	//var t1 = cliHeight - 100;
	//$(".footernav").css({"top":t1+"px"});

	// 创建分钟选择的options
for(var i=0;i<=60;i++){
	var index = i>=10 ? i : '0'+i;
	// $('#ques09 select:eq(1)').append(`<option value=${index}>${index}</option>`);
	$('#ques09 select:eq(1)').append($('<option value=' + index + '>'+ index+'</option>'));
}

	$(".options li").click(function(){//单选
	    $(this).parent("").find("li").removeClass("cur");
	    $(this).addClass("cur");
	    var pclass=$(this).parent("ul").attr("class");
	    if (pclass == 'options option1') {
	        q1 = $(this).html();
	    }
	    if (pclass == 'options option2') {
	        q2 = $(this).html();
	    }
	    if (pclass == 'options option8') {
	        q8 = $(this).html();
	    }
	    if (pclass == 'options option10') {
	        q10 = $(this).html();
	    }
		NextQues();
	})

	$(".btn-prev").click(function(){//上一题
		PrevQues();
	})
	var regint = /^[0-9]*[1-9][0-9]*$/;
	$(".btn-next").click(function () {//下一题
	    var pclass = "";
		//console.log('题目'+k)
		if ( type == 0 ){//单选判断是否已选择
			if ( !$(".ques").eq(k-1).find("li").hasClass("cur") ){
				$("#Mask,#popuptip").fadeIn(200);
				$("#popuptip h1").html("请选择");
			}
			else{
				NextQues();
			}		
		}
		else if ( type == 1 ){//输入判断是否输入为空
			var inputnum=0;
			$(".ques").eq(k - 1).find("select").each(function (i) {
			  
				console.log($(this).val());
			    if ($(this).val() == "" ) {
			        $("#Mask,#popuptip").fadeIn(200);
			        $("#popuptip h1").html("请输入");
			        inputnum++;
			    }
			    // if (parseFloat($(this).val()) < 0) {
			    //     $("#Mask,#popuptip").fadeIn(200);
			    //     $("#popuptip h1").html("请输入正确的数字");
			    //     inputnum++;
				// }

			    pclass = $(this).parents(".ques").attr("id");
			  
			    if (pclass == "ques03") {
			        if (parseFloat($(this).val()) > 12) {
			            $("#Mask,#popuptip").fadeIn(200);
			            $("#popuptip h1").html("请输入正确的小时数");
			            inputnum++;
			        }
			        q3 = $(this).val();
			    }
			    if (pclass == "ques04") {
			        if (parseFloat($(this).val()) > 12) {
			            $("#Mask,#popuptip").fadeIn(200);
			            $("#popuptip h1").html("请输入正确的小时数");
			            inputnum++;
			        }
			        q4 = $(this).val();
			        sleeptime = parseFloat(q3) + parseFloat(q4);
			    }
			    if (pclass == "ques05") {
			        q5 = $(this).val();
			    }
			    if (pclass == "ques06") {
			        if (parseFloat($(this).val()) > 8) {
			            $("#Mask,#popuptip").fadeIn(200);
			            $("#popuptip h1").html("请输入正确的小时数");
			            inputnum++;
			        }
			        q6 = $(this).val();
			    }
			    if (pclass == "ques07") {
			        if (parseFloat($(this).val()) > 12) {
			            $("#Mask,#popuptip").fadeIn(200);
			            $("#popuptip h1").html("请输入正确的小时数");
			            inputnum++;
			        }
			        q7 = $(this).val();
			    }
			    if (pclass == "ques09") {
			        if (i == 0)
			        {
			            if (!regint.test($(this).val()))
			            {
			                $("#Mask,#popuptip").fadeIn(200);
			                $("#popuptip h1").html("请输入正确的时间点");
			                inputnum++;
			            }
			            if (parseInt($(this).val())>23) {
			                $("#Mask,#popuptip").fadeIn(200);
			                $("#popuptip h1").html("请输入正确的时间点");
			                inputnum++;
			            }
			            q91 = $(this).val();
			        }
			        if (i == 1) {
			            if (  parseInt( $(this).val())!=0 &&  !regint.test($(this).val())) {
			                $("#Mask,#popuptip").fadeIn(200);
			                $("#popuptip h1").html("请输入正确的时间分.");
			                inputnum++;
			            }
			            if (parseInt($(this).val()) > 59) {
			                $("#Mask,#popuptip").fadeIn(200);
			                $("#popuptip h1").html("请输入正确的时间分!");
			                inputnum++;
			            }
			            q92 = $(this).val();
			        }
			    }
            })
            if ( inputnum <= 0 ){
            	NextQues();
            }
		}
	})

	$(".btn-qx,.icon-close2").click(function(){
		$("#Mask,#popupresult").fadeOut(200);
	})
	$(".icon-close3").click(function(){
		$("#Mask,#popuptip").fadeOut(200);
	})


	$(".btn-qr").click(function () {
	    submitsleep();
	});
})

function CheckType(){
	if ( $(".ques").eq(k-1).find("select").length > 0 ){
		type = 1;
		console.log("填空题")
	}
	else{
		type = 0;
		console.log("单选题")
	}
}

function NextQues(){
	if ( k == 10 ){
		$("#Mask,#popupresult").fadeIn(200);
	}
	if ( k+1 <= j ){
		$(".ques").eq(k-1).fadeOut(200);
	    $(".ques").eq(k).fadeIn(200);
	    k++;
	    $("#curnum").html(k);
	    $(".progress .line span").css("width",1+k/j*100+"%");
	    CheckType();
	}
	if ( k == j ){
		$(".progress .numrate .num").css("left","96%");	
	}
	else{
		$(".progress .numrate .num").css("left",1+k/j*100+"%");	
	}
}

function PrevQues(){
	if ( k-1 >= 1 ){
	    $(".ques").eq(k-2).fadeIn(200);
	    $(".ques").eq(k-1).fadeOut(200);
	    k--;
	    $("#curnum").html(k);
	    $(".progress .line span").css("width",1+k/j*100+"%");
	    $(".progress .numrate .num").css("left",1+k/j*100+"%");		
	    CheckType();
	}
}
function submitsleep()
{
    $.ajax({
        type: "Post",
        url: "data/sleep.aspx?r=" + parseInt(Math.random() * 10000),
        data: {
            "type": "addsurvay",
            "q1": encodeURIComponent(q1),
            "q2": encodeURIComponent(q2),
            "q3": encodeURIComponent(q3),
            "q4": encodeURIComponent(q4),
            "q5": encodeURIComponent(q5),
            "q6": encodeURIComponent(q6),
            "q7": encodeURIComponent(q7),
            "q8": encodeURIComponent(q8),
            "q91": encodeURIComponent(q91),
            "q92": encodeURIComponent(q92),
            "q10": encodeURIComponent(q10)
        },
        dataType: "json",
        async: false,
        beforeSend: function (XMLHttpRequest) { },
        success: function (data) {
            if (data.errcode > 0) {
                window.location.href = "sleepsurvayresult.aspx?id=" + data.errcode;
            } else {
                alert(data.errmsg);
            }
        }
    });
}
