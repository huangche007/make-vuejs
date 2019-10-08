
import HCNode from './hcNode'
import {assert} from './utils';
import {parseDirectives,parseEvent} from './parser';
export default class VNode extends HCNode{
    constructor(options){
        assert(options,`${options} is not found`);
        assert(options.el,`${options.el} is not found`);
        assert(options.tag,`${options.tag} is not found`);
        assert(options.attrs,`${options.attrs} is not found`);
        assert(options.children,`${options.children} is not found`);
        super(options.el);

        this.type = options.tag;
        this.$attrs = options.attrs;
        this.$directives = parseDirectives(this.$attrs);
        this.$listener = parseEvent(this.$directives);
    }
}