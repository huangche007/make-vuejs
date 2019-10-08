export function assert(exp,msg){
    if(!exp){
        throw new Error(msg || 'some got error');
    }
}
/**
 *获取某个元素
 * @export
 * @param {*} arg
 * @returns
 */
export function getDom(arg){
    assert(arg,`${arg} is not found`);
    if(typeof arg === "string"){
        let el = document.querySelector(arg);
        assert(el,`${el} is invalidate`);
        return el;
    }else if(arg instanceof Node){
        return arg;
    }else{
        assert(false,`${el} is invalidate`)
    }
}