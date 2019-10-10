
import {assert} from './utils';
export default class HCNode{
    constructor(el,cmp){
        assert(el,`${el} is not found`);
        assert(el instanceof Node,`the type of ${el} is a Node`);
        this.status = '';//标记是初始化、更新、消耗的状态
        this._el = el;//真实的dom元素结构
        this._component = cmp;//所属组件
    }
    render(){
        assert(false,'the method render must be rewrite');
    }
    clone(){
        return new HCNode(this._el.cloneNode(true),this._component);
    }
}