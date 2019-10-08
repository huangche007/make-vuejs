import {assert} from './utils'
const globalKey={
    'new':true,
    'for':true,
    'while':true,
    'class':true
}
export function parseExperssion(str,data){
    const arr = getExperssion(str);
    const filterArr = arr.map((st) => {
        if(typeof st === 'string'){
            return "'"+st+"'";
        }else{
            const mStr = st.express.replace(/.?[\$_a-z][a-z0-9_\$]*/ig,(s) =>{
                if(/[\$_a-z]/i.test(s[0])){
                //    return dealGlobal(data,s,`data.${s}`);
                    return "data."+s;
                }else{
                    if(s[0] === '.'){
                        return s;
                    }else{
                        // return s[0]+dealGlobal(data,s.substring(1),`data.${s.substring(1)}`);
                        return s[0]+"data."+s.substring(1);
                    }
                }

            })
            return mStr;
        }
    })

    const filterStr = filterArr.join('');

   return eval(filterStr);
}
/**
 *
 *解析字符串模板
 * @export
 * @param {*} str
 * @param {*} data
 * @returns
 */
export function complieStringTemplate(str,data){
    let start = 0;
    let arr = [];
    let n = 0;
    while((n=str.indexOf("{{",start))!==-1){
        arr.push(str.substring(start,n));

        let m = 2;
        let end;
        for(let i = n+2;i<str.length;i++){
            if(str[i] === "{") m++;
            else if(str[i] === "}") m--;

            if(m ===0){
                end = i;
                break;
            }
        }

        if(m>0){
            assert(false,`{}没有配对`);
        }
        // {{a}}
        const mStr = str.substring(n+2,end-1);
        arr.push(parseExperssion(mStr,data));
        start = end+1;
    }
    arr.push(str.substring(start));
    return arr.join("");
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