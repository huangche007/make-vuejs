
import HCNode from './hcNode'
import {assert} from './utils';
import {parseDirectives,parseEvent} from './parser';
import directives from './directives';
// import directives from './directives';
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
        this.$listeners = parseEvent(this.$directives);
        this._renderDirectives('init');
        this.status = 'init';
    }
    render(){
        //渲染自己-指令(属性)
        this._renderDirectives('update');
        this.$children.forEach(child => child.render());
        this.status = 'update';
    }
    /**
     *
     *指令的解析渲染
     * @param {*} type
     * @memberof VNode
     */
    _renderDirectives(type){
        //由于事件指令是在初始化时进行了处理，故优先处理model指令
        this._handleDiffTypeDirectives(this.$directives.filter(directive => directive.name==='model'),type);
        this._handleDiffTypeDirectives(this.$directives.filter(directive => directive.name!=='model'),type);
    }
    /**
     *
     *处理不同状态下的指令
     * @param {*} arr
     * @param {*} type
     * @memberof VNode
     */
    _handleDiffTypeDirectives(arr,type){
        arr.forEach(directive => {
            // const directiveObj = directives[directive.name];
            const directiveObj = this._component._directives[directive.name];//新增了自定义指令
            assert(directiveObj,`directive ${directive} is not in ${directiveObj}`);
            const directiveFunc = directiveObj[type];
            if(directiveFunc){
                assert(typeof directiveFunc ==='function',`${directiveFunc} is not a function`);
                directiveFunc(this,directive);
            }
           
        })
    }
}