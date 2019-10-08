
import HCNode from './hcNode'
import {assert} from './utils';
import {complieStringTemplate} from './experssion';
export default class VText extends HCNode{
    constructor(options,cmp){
        assert(options);
        assert(options.el);
        assert(options.data);
        super(options.el,cmp);
        // console.log('options:',options);
        this._strTemplate = options.data;
        this.status = 'init';

    }
    render(){
        // console.log('this._component:',this._component);
        const strExp = complieStringTemplate(this._strTemplate,this._component.data);
        this._el.data = strExp;
        this.status = 'update';
    }
}