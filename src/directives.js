
import {parseExperssion} from './experssion'
import {assert} from './utils';
import VNode from './vNode';
export default {
    'bind':{
        init:null,
        update(vnode,directive){//{name: "bind", arg: "title", value: "a+b"}
            assert(vnode);
            assert(vnode instanceof VNode);
            assert(directive);
            assert(directive.arg);
            assert(directive.value);
            let res = parseExperssion(directive.value,vnode._component.data);
            vnode._el.setAttribute(directive.arg,res);
        },
        destory:null
    },
    'on'(){

    },
    'show':{
        init:null,
        update(vnode,directive){//{name: "bind", arg: undefined, value: "isShow"}
            assert(vnode);
            assert(vnode instanceof VNode);
            assert(directive);
            assert(directive.value);
            let res = parseExperssion(directive.value,vnode._component.data);
            if(res){
                vnode._el.style.display = '';
            }else{
                vnode._el.style.display = 'none';
            }
        },
        destory:null
    },
    'if'(){

    },
    'else-if'(){

    },
    'else'(){

    },
    'html':{
        init:null,
        update(vnode,directive){//{name: "bind", arg: undefined, value: "<p>这是渲染的p标签元素</p>"}
            assert(vnode);
            assert(vnode instanceof VNode);
            assert(directive);
            assert(directive.value);
            let res = parseExperssion(directive.value,vnode._component.data);
            vnode._el.innerHTML = res;
        },
        destory:null
    },
    'text':{
        init:null,
        update(vnode,directive){//{name: "bind", arg: undefined, value: "<p>这是渲染的p标签元素</p>"}
            assert(vnode);
            assert(vnode instanceof VNode);
            assert(directive);
            assert(directive.value);
            let txt = parseExperssion(directive.value,vnode._component.data);
            const textDom = document.createTextNode(txt);
            vnode._el.innerHTML = '';
            vnode._el.appendChild(textDom);
        },
        destory:null
    }
}