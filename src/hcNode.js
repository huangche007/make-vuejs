
import {assert} from './utils';
export default class HCNode{
    constructor(el){
        assert(el,`${el} is not found`);
        assert(el instanceof Node,`the type of ${el} is a Node`);
        this._el = el;
    }
}