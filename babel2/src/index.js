import { getRandom } from './index2.js'
const num = getRandom(100,200);
console.log(num);

const boxGroup = document.getElementsByTagName('div')
const arr = [1,2,3,4,5];
const arr2 = [...arr,...boxGroup];
console.log(arr2);