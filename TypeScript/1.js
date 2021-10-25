function add(a, b) {
    return a + b;
}
// add('aa',2)
add(2, 3);
var name1 = 'chenbin'; // 自动推断类型为string
name1 = 123;
var name2 = 123;
name2 = 'chenbin';
var arr = [1, 2, 3, 4, '55'];
arr.push('666', true, 123, 'bbb');
var arr2;
var obj = {
    name: 'chenbin',
    age: 20,
    hobby: ['study', 'sleep']
};
var age = obj.age; // 自动推断类型为number
age = 'strging';
var obj2 = {
    name: 'chenbin',
    age: '12',
    gender: 1
};
var obj3 = {};
obj3 = 123;
obj3 = {
    name: 'chenbin'
};
