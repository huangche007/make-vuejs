import VComponent from './vComponent';
import {assert,getDom} from './utils'
import {parseDom, parseDirectives} from './parser';
import {createVDOM} from './vdom';
import {createProxy} from './proxy'
export default class HCVue{
    constructor(options){
        assert(options,`${options} must be have`);
        assert(options.el,`${options.el} is not an element`);
        const el = getDom(options.el);
        const treeDOM = parseDom(el);
        const vTreeDOM = createVDOM(treeDOM,this);
        this.root = vTreeDOM;
        this.data = createProxy({...options.data,...options.methods},() =>{
            this.render();
        })
        this.status = 'init';
        this.render();
    }
    render(){
        //渲染自己
        this.root.render();
        this.status='update';
        //渲染子级
        this.root.$children.forEach(child => {
            child.render();
        });

    }
}