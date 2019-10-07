import {assert} from './utils'
export function create(data,cb){
    assert(data,'data is required');
    assert(cb,'callback is required');
    assert(typeof cb ==='function',`${cb} must be a function`);
    let res;
    if(data instanceof Array){
        res = [];
        for(let i=0;i<data.length;i++){
            if(typeof data[i] ==='object'){
                res[i] = create(data[i],cb);
            }else{
                res[i] = data[i];
            }
        }
    }else{
        res = {};
        for(let key in data){
            if(typeof data[key] ==='object'){
                res[key] = create(data[key],cb);
            }else{
                res[key] = data[key];
            }
        }
    }
    return new Proxy(res,{
        get(data,key){
            assert(key in data,`in ${data},the key "${key}" is not found`); 
            return data[key];
        },
        set(data,key,value){
            data[key] = value;
            cb(key);
            return true;
        }
    })
}