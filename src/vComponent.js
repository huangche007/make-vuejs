import VNode from './vNode'
import {assert} from './utils';
export default class VComponent extends VNode{
    constructor(opstions){
        assert(opstions,`${opstions} is not found`);
        assert(opstions.el,`${opstions.el} must has exit`);
        super(opstions);
    }
}