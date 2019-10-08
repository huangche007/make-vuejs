
import HCNode from './hcNode'
import {assert} from './utils';
import {parseDirectives,parseEvent} from './parser';
import directives from './directives';
export default class VNode extends HCNode{
    constructor(options,cmp){
        assert(options,`${options} is not found`);
        assert(options.el,`${options.el} is not found`);
        assert(options.tag,`${options.tag} is not found`);
        assert(options.attrs,`${options.attrs} is not found`);
        assert(options.children,`${options.children} is not found`);
        super(options.el,cmp);
        this.type = options.tag;
        this.$attrs = options.attrs;
        this.$directives = parseDirectives(this.$attrs);
        this.$listener = parseEvent(this.$directives);
        this._renderDirectives('init');
        this.status = 'init';
    }
    render(){
        //渲染自己-指令(属性)
        this._renderDirectives('update');
        this.status = 'update';
        this.$children.forEach(child => child.render());
    }

    _renderDirectives(type){
        this.$directives.forEach(directive => {
            const directiveObj = directives[directive.name];
            assert(directiveObj,`directive ${directive} is not in ${directiveObj}`);
            const directiveFunc = directiveObj[type];
            if(directiveFunc){
                assert(typeof directiveFunc ==='function',`${directiveFunc} is not a function`);
                directiveFunc(this,directive);
            }
           
        })
    }
}