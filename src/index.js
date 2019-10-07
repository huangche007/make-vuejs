// import {create} from './proxy';
// window.p = create({
//     a:12,
//     b:13,
//     mArr:[1,2,3],
//     mObj:{
//         name:"hc",
//         age:11
//     }
// },function(){
//     console.log('数据变了')
// })
import {parseDom} from './parser'
let res = parseDom(document.getElementById('banner'));
console.log(res);