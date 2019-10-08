
import {assert} from './utils';
export default class HCNode{
    constructor(el,cmp){
        assert(el,`${el} is not found`);
        assert(el instanceof Node,`the type of ${el} is a Node`);
        this.status = '';//标记是初始化、更新、消耗的状态
        this._el = el;
        this._component = cmp;
    }
    render(){
        assert(false,'the method render must be rewrite');
    }
}