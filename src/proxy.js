import {assert} from './utils'
export function createProxy(data,cb){
    assert(data,'data is required');
    assert(cb,'callback is required');
    assert(typeof cb ==='function',`${cb} must be a function`);
    let res;
    if(data instanceof Array){
        res = [];
        for(let i=0;i<data.length;i++){
            if(typeof data[i] ==='object'){
                res[i] = createProxy(data[i],cb);
            }else{
                res[i] = data[i];
            }
        }
    }else{
        res = {};
        for(let key in data){
            if(typeof data[key] ==='object'){
                res[key] = createProxy(data[key],cb);
            }else{
                res[key] = data[key];
            }
        }
    }
    return new Proxy(res,{
        get(data,key){
            return data[key];
        },
        set(data,key,value){
            data[key] = value;
            cb(key);
            return true;
        }
    })
}