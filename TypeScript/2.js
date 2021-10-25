// 枚举
var gender;
(function (gender) {
    gender[gender["BOY"] = 0] = "BOY";
    gender[gender["GIRL"] = 1] = "GIRL";
})(gender || (gender = {}));
console.log(gender.BOY); // 0,枚举的index 是从 0 开始
// as const 将类型变为值类型
var str = 'chenbin';
str = 'cb'; // 此处的str为string类型，所有任何string类型的值都可以为其赋值
var str1 = 'chenbin'; // 此处的str1为chenbin类型，只能赋值为chenbin
str1 = 'cb'; // 不能将类型“"cb"”分配给类型“"chenbin"”。
var str3 = 'chenbin'; // let str3: string,自动推断为string类型
var str4 = 'chenbin'; //let str4: "chenbin",经过as const 之后，变为chenbin类型，为值类型
var array = [123, 'chenbin', true, str]; // let array: (string | number | boolean)[];自动推断类型
var array2 = [123, 'chenbin', true, str]; // let array2: readonly [123, "chenbin", true,string]；数组经过 as const之后，变为对应类型的元组,并且为只读
var array3 = [123, 'chenbin'];
var object = {
    name: 'chenbin'
}; // et object: { name: string;},自动推断属性为string类型
var object2 = {
    name: 'chenbin'
}; // readonly name: "chenbin";  name属性为chenbin类型
function cb() {
    var s = 'chenbin';
    var f = function (x, y) {
        return x + y;
    };
    return [s, f];
}
var _a = cb(), s = _a[0], f = _a[1];
console.log(f(1, 1));
