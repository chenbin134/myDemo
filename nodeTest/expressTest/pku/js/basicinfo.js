// document.addEventListener('touchmove' , function (ev){
// 	ev.preventDefault();
// 	return false;
// } , false)

var isborn ;

document.getElementById("Babyinfo1").onchange = function(){
    document.getElementById("txtbi").value = $("#Babyinfo1").find("option:selected").text();
	if ( document.getElementById("txtbi").value == '已有宝宝'){
		$("#your_predate").hide();
	}
	else if (document.getElementById("txtbi").value == '正在孕期') {
		$("#your_predate").show();
	}
}

document.getElementById("Edu").onchange = function(){
	document.getElementById("txtedu").value = this.value;
}
document.getElementById("Sex").onchange = function(){
    document.getElementById("txtsex").value = $("#Sex").find("option:selected").text();
}
document.getElementById("national").onchange = function(){
    document.getElementById("nationalTxt").value = $("#national").find("option:selected").text();
}
document.getElementById("datebb").onchange = function(){
    document.getElementById("txtbb").value = this.value;
}
document.getElementById("Btimes").onchange = function(){
    document.getElementById("txttimes").value = $("#Btimes").find("option:selected").text();;
}
document.getElementById("Bornway").onchange = function(){
    document.getElementById("txtbway").value = this.value;
}
document.getElementById("isMany").onchange = function(){
    document.getElementById("isManyTxt").value = this.value;
}
document.getElementById("datepre").onchange = function () {
    document.getElementById("txtpre").value = this.value;
}
document.getElementById('datebir').onchange = function(){
    document.getElementById('txtbir').value = this.value;
}
document.getElementById('other').onchange = function(){
   $('.other').show();
}
document.getElementById('other2').onchange = function(){
    $('.other').hide();
 }

var name = "";//昵称
var mp = "";//手机
var _code = "";//验证码
var age = "";//年龄
var momBir = '';//妈妈出生年月··
var momHeight = '';//妈妈身高··
var currentWeight = '';//妈妈目前体重··
var beWeight = '';//孕前体重··
var incrWeight = '';//怀孕期间增重··
var edu = "";//教育
var hasbaby = 0;//宝宝信息 
var duedate = "";//预产期
var tnb = '';//糖尿病
var gxy = '';//高血压
var ysyc = '';//羊水异常
var qztp = '';//前置胎盘
var px = '';//贫血
var other = '';//其他
var inputOther = '';//输入的其他具体情况
// 宝宝信息
var sex = 0;//宝宝性别
var national = '';//宝宝民族
var birthday = "";//宝宝出生年月
var weight = 0.0;//出生体重
var theweek = "";//分娩胎龄周
var theday = "";//分娩胎龄日
var thenum = 0;//胎次
var how = "";//分娩方式
var isMany = '';//宝宝时单胞胎，双胞胎还是多胞胎。。。
$(function () {
    
    $("#btn-submitinfo").click(function () {
        //妈妈基本信息
        var myreg = /^((13|14|15|16|17|18|19)+\d{9})$/;
        name = $("#Nickname").val();
        mp = $("#Mobile").val();
        _code = $("#code").val();
        age = $("#Age").val();
        momBir = $('#txtbir').val();
        momHeight = $('#height').val();
        currentWeight = $('#currentWeight').val();
        beWeight = $('#beWeight').val();
        incrWeight = $('#increament').val();
        tnb = $('input[name=tnb]:checked').val();
        gxy = $('input[name=gxy]:checked').val();
        ysyc = $('input[name=ysyc]:checked').val();
        qztp =  $('input[name=qztp]:checked').val();
        px = $('input[name=px]:checked').val();
        other = $('input[name=other]:checked').val();
        // inputOther = $('#inputOther').val();
        edu = $("#txtedu").val();
        hasbaby = $("#Babyinfo1").val();
        duedate = $("#txtpre").val();
        if(other == 'no'){
            inputOther = '';
        } else if(other == 'yes'){
            inputOther = $('#inputOther').val();
        }
        var momBirth = new Date(momBir).getTime();
        var today = new Date().getTime();
        console.log(momBirth);
        console.log(today);
        // 孕前体重共和孕期增重，如果不填，则为‘记不清了’
        if(beWeight == ''){
            beWeight = '记不清了'
        }
        if(incrWeight == ''){
            incrWeight = '记不清了'
        }
        // 为空判断
		if ( $("#Nickname").val() == ''){
		    alert('请输入昵称');
		    return false;
		}
		else if ( $("#Mobile").val() == ''){
		    alert('请输入手机号码');
		    return false;
		}
		else if ( !myreg.test($("#Mobile").val()) ){
		    alert('请输入有效的手机号码');
		    return false;
		}
		else if (_code == '') {
		    alert('请输入短信验证码');
		    return false;
		}
		else if ($("#Age").val() == '') {
		    alert('请输入年龄');
		    return false;
		}
		else if (age.length > 0 && isNaN(age)) {
		    alert('请正确输入年龄!');
		    return false;
		}
		else if (age.length > 0 && (age < 14 || age > 60)) {
		    alert('请正确输入年龄!');
		    return false;
        }
        else if(momBir == '') {
            alert('请输入出生日期');
            return false;
        }
        else if(momBirth > today){
            alert ('请输入有效出生日期');
            return false;
        }
        else if(momHeight == '' || isNaN(momHeight)){
            alert('请输入身高');
            return false;
        }
        else if(currentWeight == '' || isNaN(currentWeight)){
            alert('请输入您目前的体重');
            return false;
        }
        // else if(beWeight == ''){
        //     alert('请输入您孕前体重');
        //     return false;
        // }
        // else if(incrWeight == ''){
        //     alert('请输入孕期增重');
        //     return false;
        // }
		else if (edu == '') {
		    alert('请选择教育背景');
		    return false;
		}
		else if ($("#txtbi").val() == '' || $("#txtbi").val() == '请选择') {
		    alert('请选择宝宝信息');
		    return false;
        }
        else if( other == 'yes' && inputOther == ''){
            alert('请输入您在怀宝宝时的其他情况');
            return;
        }
		else if ($("#txtbi").val() == '已有宝宝') {

		    var cm = checkmonthmp(mp);
		    if (cm == 1 )
		    {
		        alert('您已有账号密码，请直接进行绑定！');
		        window.location.href = 'bind.aspx?f=reg&_mp=' + mp
		        return false;
		    } else if (cm == 2  ) {
		        alert('您已有账号密码，请直接进行绑定！');
		        window.location.href = 'bind.aspx?f=reg&_mp=' + mp
		        return false;
		    } else {
		        Submit();
		    }
		}
		else if ($("#txtbi").val() == '正在孕期') {

		    var cm = checkmonthmp(mp);
		    if (cm == 1 ) {
		        alert('您已有账号密码，请直接进行绑定！');
		        window.location.href = 'bind.aspx?f=reg&_mp=' + mp
		        return false;
		    } else if (cm == 2  ) {
		        alert('您已有账号密码，请直接进行绑定！');
		        window.location.href = 'bind.aspx?f=reg&_mp=' + mp
		        return false;
		    }


		    var curDate = new Date();
		    if (duedate == '') {
			    alert('请选择您的预产期');
			    return false;
		    }  
			else
			{
			    Submit();
			}			
		}
	});
    $("#btn-submitinfo2").click(function () {
        //宝宝信息
         sex = $("#Sex").val();
         birthday = $("#txtbb").val();
         national = $('#nationalTxt').val();
         weight = $("#Weight").val();
         theweek = $("#Bweek").val();
         theday = $("#Bday").val();
         thenum = $("#Btimes").val();
         how = $("#txtbway").val(); 
         isMany = $('#isManyTxt').val();
         var curDate = new Date();
         var birthdayDate = new Date(birthday);

        if (sex=="-1" || $("#txtsex").val() == "" || $("#txtsex").val() == "请选择")
        {
		    alert('请选择宝宝性别');
		    return false;
		}
		else if (birthday == "") {
		    alert("请选择出生日期");
		    return false;
		} else if (birthdayDate > curDate) {
		    alert("出生日期不能晚于今天");
		    return false;
        }else if(national == '' || national == '请选择'){
            alert('请选择民族')
            return false;
        }
        else if (weight == '') {
		    alert('请输入出生体重');
		    return false;
		}
		else if (isNaN(weight) || weight < 0.5 || weight > 30) {
		    alert("请正确输入宝宝体重");
		    return false;
		}
		else if (theweek == '') {
		    alert('请正确输入分娩孕周');
		    return false;
		} else if (isNaN(theweek) || theweek < 12 || theweek > 60) {
		    alert("请正确输入分娩孕周");
		    return false;
		} else if (theday == "") {
		    alert("请正确输入分娩孕天");
		    return false;
		} else if (isNaN(theday) || theday < 0 || theday > 6) {
		    alert("请正确输入分娩孕天");
		    return false;
		}
		else if ($("#txttimes").val() == '' || $("#txttimes").val() == "请选择" || thenum=="") {
		    alert('请选择胎次');
		    return false;
		}
		else if (how == '') {
		    alert('请选择分娩方式');
		    return false;
		} else if(isMany == '' || isMany == '请选择'){
            alert('请选择宝宝是单胞胎还是双胞胎');
            return false;
        }
		else {
		    Submit1();
		}
	});
})

function checkmonthmp() {
    var result = 0;
    $.ajax({
        type: "Post",
        url: "data/basicinfo.aspx?r=" + parseInt(Math.random() * 10000),
        data: {
            "type": "checkmp",
            "mp": mp
        },
        dataType: "json",
        async: false,
        beforeSend: function (XMLHttpRequest) { },
        success: function (data) {
            result = data.errcode; 
        }
    });

    return result;
}


function FormatDate(strTime) {
    var date = new Date(strTime);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
function getdaysnum(s1)
{
    s1 = new Date(s1.replace(/-/g, "/"));
    s2 = new Date();

    var days = s2.getTime() - s1.getTime();
    var time = parseInt(days / (1000 * 60 * 60 * 24));
    return time;
}
 
function getmonthnum(s1) {
    var startDate = new Date(s1.replace(/-/g, "/")); 
    var endDate = new Date();

    var number = 0;
    var yearToMonth = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    number += yearToMonth;
    monthToMonth = endDate.getMonth() - startDate.getMonth();
    number += monthToMonth;
    
    return parseInt(number + 1);
}

//注册 妈妈信息
function Submit() {
    
    $.ajax({
        type: "Post",
        url: "data/basicinfo.aspx?r=" + parseInt(Math.random() * 10000),
        data: {
            "type": "reg",
            "mp": mp,
            "code": _code,
            "name": encodeURIComponent(name),
            "age": age,
            "edu": encodeURIComponent(edu),
            "hasbaby": hasbaby,
            "duedate": duedate,
            "sex": sex,
            "scene": scene,
            "sr":sr,
            "momBirth" : momBir,
            "momHeight" :momHeight,
            "currentWeight" : currentWeight,
            "beWeight" : beWeight,
            "incrWeight" : incrWeight,
            "tnb" : tnb,
            "gxy" : gxy,
            "ysyc" : ysyc,
            "qztp" : qztp,
            "px" : px,
            "other" : other,
            "inputOther" : encodeURIComponent(inputOther)
        },
        dataType: "json",
        async: false,
        beforeSend: function (XMLHttpRequest) { },
        success: function (data) {
            if (data.errcode > 0) {
                
                if (hasbaby == 1) {
                    if (scene < 8000000) {
                        $("#Borninfo").show();
                        $("#Basicinfo").hide();
                    }
                    else { //不能入组
                        window.location.href = '/srstop.aspx?code=80001&r=已有小孩';
                    }
                } else {
                    if (f_2018.length > 4)
                    {
                        window.location.href = f_2018;
                        return;
                    }
                    
                  if ( scene>=8000000)
                      window.location.href = '/ToolWeight/index.aspx';

                  else   if (scene >= 20000 || (scene >= 18900 && scene < 19900))
                    {
                        window.location.href = 'index.aspx';

                    }
                    else if (scene >=19900 && scene<20000 )
                        window.location.href = '/wnscgi/index.aspx';
                    
                    else 
                    {
                        $("#Success").show();
                    }
                }
            } else {
               
                if (data.errcode == -21 || data.errcode == -14)
                {// 如果已有手机事情
                    if (scene >= 8000000) //不能入组
                        window.location.href = '/srstop.aspx?code=80001';
                     else 

                    window.location.href='bind.aspx?f=reg&_mp='+mp
                }
                else 

                alert(data.errmsg);
            }
        }
    });
}

//注册 宝宝信息
function Submit1() {
    $.ajax({
        type: "Post",
        url: "data/basicinfo.aspx?r=" + parseInt(Math.random() * 10000),
        data: {
            "type": "reg1",
            "sex": sex,
            "birthday": birthday,
            "weight": weight,
            "theweek": theweek,
            "theday": theday,
            "thenum": thenum,
            "how": encodeURIComponent(how),
            "national" : encodeURIComponent(national),
            "isMany" : encodeURIComponent(isMany)
        },
        dataType: "json",
        async: false,
        beforeSend: function (XMLHttpRequest) { },
        success: function (data) {
            if (data.errcode > 0) {
                if (f_2018.length > 4) {
                    window.location.href = f_2018;
                    return;
                }
                window.location.href = "survay01.aspx?mp=" + mp;
            } else {
                alert(data.errmsg);
            }
        }
    });
}
function getcode()
{
    var myreg = /^((13|14|15|16|17|18|19)+\d{9})$/;
  
    mp = $("#Mobile").val();
  

    if ($("#Mobile").val() == '') {
        alert('请输入手机号码!');
        return false;
    }
    else if (!myreg.test($("#Mobile").val())) {
        alert('请输入有效的手机号码!');
        return false;
    }
    $("#getcode")[0].disabled = true;

    var t = 60;
 
    $.ajax({
        type: "Post",
        url: "data/getpassword.aspx?r=" + parseInt(Math.random() * 10000),
        data: {
            "type": "code",
            "mp": mp
        },
        dataType: "json",
        async: false,
        beforeSend: function (XMLHttpRequest) { },
        success: function (data) {
           var  result = data.errcode;
           if (result == 1)
           {
               alert("短信验证码已发送到您手机!")

           }
           else 
               alert(data.errmsg)
        }
    });

    var t1 = setInterval(function () {
        t = t - 1;
        if (t <= 0) {
            $("#getcode")[0].disabled = false;
            $("#getcode").val("获取验证码");
            clearInterval(t1);
        }
        else {
           
            $("#getcode").val(t+"秒");

        }
    },1000)

}