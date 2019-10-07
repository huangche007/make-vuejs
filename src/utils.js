export function assert(exp,msg){
    if(!exp){
        throw new Error(msg || 'some got error');
    }
}