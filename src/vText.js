
import HCNode from './hcNode'
import {assert} from './utils';
export default class VText extends HCNode{
    constructor(options){
        assert(options);
        assert(options.el);
        assert(options.data);
        super(options.el);
        this._data = options.data;
    }
}