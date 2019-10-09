import VComponent from './vComponent';
import {assert,getDom} from './utils'
import {parseDom, parseDirectives} from './parser';
import {createVDOM} from './vdom';
import {createProxy} from './proxy'
import directives from './directives';
export default class HCVue{
    constructor(options){
        assert(options,`${options} must be have`);
        assert(options.el,`${options.el} is not an element`);
        this._directives = {
            ...directives,
            ...options.directives
        }
        const el = getDom(options.el);
        const treeDOM = parseDom(el);
        const vTreeDOM = createVDOM(treeDOM,this);
        this.created = options.created;
        this.updated = options.updated;
        this.root = vTreeDOM;
        this._staticData = {
            ...options.methods
        }

        this.data = createProxy(options.data,this._staticData,() =>{
            this.render();
        })
        this.status = 'init';
        this.created && this.created(this.data);
        this.render();
    }
    render(){
        //渲染自己
        this.root.render();
        //渲染子级
        this.root.$children.forEach(child => {
            child.render();
        });
        this.status='update';
        this.updated && this.updated(this.data);
    }
}