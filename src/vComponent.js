import VNode from './vNode'
import {assert} from './utils';
export default class VComponent extends VNode{
    constructor(opstions,cmp){
        assert(opstions,`${opstions} is not found`);
        assert(opstions.el,`${opstions.el} must has exit`);
        super(opstions,cmp);
        this.status = 'init';
    }
    render(){
        this.status = 'update';
    }
}