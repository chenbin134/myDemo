document.addEventListener('touchmove' , function (ev){
	ev.preventDefault();
	return false;
} , false)

// document.getElementById("Province").onchange = function(){
// 	document.getElementById("txtpro").value = this.value;
// }
// document.getElementById("City").onchange = function(){
// 	document.getElementById("txtcit").value = this.value;
// }

// document.getElementById("Area").onchange = function () {
//     document.getElementById("txtare").value = this.value;
// }

AreaSelector().init();// 初始化地区选择器
var gid;
var skuid;
var myFlag = false;//是否获取到了gid和skuid
getProductId();

var name = "", mp = "", pro = "", cit = "", are = "", addr = "";
var select1 = '';
var select2 = '';
var select3 = '';
$(function () {

    $("#Province").change(function () {
       select1 = $("#Province option:selected").val();
       pro = _ds_data[select1].name;
       $('#txtpro').val(pro);

        $("#txtcit").val(""); 
        $("#txtare").val("");
    });
    $("#City").change(function () {
        select2 = $("#City option:selected").val();
        cit = _ds_data[select1].city[select2-1].name
        $('#txtcit').val(cit);
        $("#txtare").val("");
    });
    $("#Area").change(function () {
        select3 = $("#Area option:selected").val();
        for(let i=0;i<_ds_data[select1].city[select2-1].area.length;i++){
            if(_ds_data[select1].city[select2-1].area[i].id == select3){
                console.log(_ds_data[select1].city[select2-1].area[i].name)
                are = _ds_data[select1].city[select2-1].area[i].name
                $('#txtare').val(are);
                break;
            }

        }
        // are = _ds_data[select1].city[select2].name
       
    });
    
    $("#btn-submit").click(function () {
        if(myFlag){
            alert('请重新扫码');
            return;
        }
        var myreg = /^((13|14|15|16|17|18|19)+\d{9})$/;

        name = $("#Name").val();
        mp = $("#Phone").val();
        pro = $("#txtpro").val();
        cit = $("#txtcit").val();
        are = $("#txtare").val();
        addr = $("#Addr").val();
     
        if (name == '') {
			alert('请输入姓名')
		}
        else if (mp == '') {
            alert($("#Phone").attr("placeholder"))
		}
        else if (!myreg.test(mp)) {
            alert("请输入正确格式的手机")
        }
       
        else if (pro == '') {
            alert('请选择省份')
        }
        else if (cit == '') {
            alert('请选择城市')
        }
        else if (are == '') {
            alert('请选择地区')
        }
        else if (addr== '') {
            alert('请输入您的详细地址')
        }
        else {
            saveExpress();
        }
	});
})
// function saveExpress() {
//     console.log(name + mp + pro+ cit + are + addr );
//     if (are == "无")
//         are="";
//     $.ajax({
//         type: "Post",
//         url: "http://pkuwechat.idmed.cn/registtestFromma.aspx?r=" + parseInt(Math.random() * 10000),
//         // contentType : 'application/json',
//         data: {
//             "type": "saveExpress",
//             "name": encodeURIComponent(name),
//             "mp": mp,
//             "province": encodeURIComponent(pro),
//             "city": encodeURIComponent(cit),
//             "area": encodeURIComponent(are),
//             "addr": encodeURIComponent(addr),
//         },
//         dataType: "json",
//         async: false,
//         beforeSend: function (XMLHttpRequest) { },
//         success: function (data) {
//             console.log(data);
//             if (data.isOk == 0) {
//                 $("#Result").show();
//                 $("#Write").hide();
//             } else {
//                 //错误信息
//                 alert(data.errmsg);
//             }
//         }
//     });
// }
function saveExpress() {
    console.log(name + mp + pro+ cit + are + addr );
    var obj = {
        "sellorder_warename": "", 
        "sellorder_belong":"1",
        "sellorder_receiver": name,
        "sellorder_receivetel": mp,
        "sellorder_receivecell":mp,
        "sellorder_receiveprov": pro,
        "sellorder_receivecity": cit,
        "sellorder_receivecounty": are,
        "sellorder_receiveaddr": addr,
        "sellorder_receivepost":null,
        "sellorder_receiveemail":null,
        "sellorder_remarks":null,
        "sellorder_deliverytime":null,
        "sellorder_custmodno":gid,//gid
        "goods_list":[{"product_id":skuid,"product_num":1}]//skuid
    }
    var params = JSON.stringify(obj);
    // var list = 
    if (are == "无")
        are="";
    $.ajax({
        type: "Post",
        url: "http://pkuwechat.idmed.cn/registtestFromma.aspx?r=" + parseInt(Math.random() * 10000),
        data: {info : params},
        dataType: "json",
        async: false,
        beforeSend: function (XMLHttpRequest) { },
        success: function (data) {
            console.log(data);
            if (data.success == 1) {
                $("#Result").show();
                $("#Write").hide();
            } else {
                //错误信息
                alert(data.result_code);
            }
        }
    });
}
// 获取product_id和customdno
function getProductId(){
    $.ajax({
        url:'http://pkuwechat.idmed.cn/YlWlGetGidAndSkucode.ashx',
        success:function(res){
            console.log(res);
            if(res.status == 0){
                var msgArr = res.message.split(',');
                // console.log(msgArr)
                gid = msgArr[0];
                skuid = msgArr[1];
            } else {
                myFlag = true;
            }

        },
        error:function(){
            myFlag = true;
        }
    });
}