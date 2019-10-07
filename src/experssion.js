import {assert} from './utils'
const globalKey={
    'new':true,
    'for':true,
    'while':true,
    'class':true
}
export function parseExperssion(str,data){
    const arr = getExperssion(str);
    console.log('arr:',arr);
    const filterArr = arr.map((st) => {
        if(typeof st === 'string'){
            return `'${st}'`;
        }else{
            const mStr = st.express.replace(/.?[\$_a-z][a-z0-9_\$]*/ig,(s) =>{
                if(/[\$_a-z]/i.test(s[0])){
                   return dealGlobal(data,s,`data.${s}`);
                    // return `data.${s}`;
                }else{
                    if(s[0] === '.'){
                        return s;
                    }else{
                        return s[0]+dealGlobal(data,s.substring(1),`data.${s.substring(1)}`);
                        // return `${s[0]}data.${s.substring(1)}`;
                    }
                }

            })
            return mStr;
        }
    })
    const filterStr = filterArr.join('');
    console.log('arr:',filterStr,eval(filterStr));
    eval(filterStr);
}
/**
 *兼容处理内置的一些表达式，如Math.min(12,14)、parseFloat(x)等
 * @param {*} data
 * @param {*} s
 * @param {*} exp
 * @returns
 */
function dealGlobal(data,s,exp){
    if((s in window) || globalKey[s] && !data[s]){
        return s;
    }else{
        return exp;
    }
}

function getExperssion(str){
    let arr = [];
        while(true){
            let n = str.search(/'|"/);
            if(n===-1){
                arr.push({
                    express:str
                })
                break;
            }
            let m = n+1;
            while(true){
                m = str.indexOf(str[n],m);
                if(m==-1){
                    throw new Error('引号没成对出现');
                }
                if(str[m-1] == '\\'){
                    m++;
                    continue;
                }else{
                    break;
                }
            }
            arr.push({
                    express:str.substring(0,n)
            })
            arr.push(str.substring(n+1,m));
            str = str.substring(m+1);
        }
        return arr;
}