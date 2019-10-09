import {assert} from './utils'
/**
 *
 *数据监听
 * @export
 * @param {*} data:待监听的数据对象
 * @param {*} staticData:不需要监听的数据对象(如事件对象event,HCVue中的methods等)
 * @param {*} cb:回调
 * @returns
 */
export function createProxy(data,staticData,cb){
    console.log('data:',data);
    assert(data,'data is required');
    assert(cb,'callback is required');
    assert(typeof cb ==='function',`${cb} must be a function`);
    let res;
    if(data instanceof Array){
        res = [];
        for(let i=0;i<data.length;i++){
            if(typeof data[i] ==='object'){
                res[i] = createProxy(data[i],staticData,cb);
            }else{
                res[i] = data[i];
            }
        }
    }else{
        res = {};
        for(let key in data){
            assert(!key.startsWith('$'),`variable name is not start with $`);
            if(typeof data[key] ==='object'){
                res[key] = createProxy(data[key],staticData,cb);
            }else{
                res[key] = data[key];
            }
        }
    }
    return new Proxy(res,{
        get(data,key){
            if(staticData[key]){
                return staticData[key];
            }
            return data[key];
        },
        set(data,key,value){
            if(typeof value === 'object'){
                data[key] = createProxy(value,staticData,cb);
            }else{
                data[key] = value;
            }

            cb(key);
            return true;
        }
    })
}