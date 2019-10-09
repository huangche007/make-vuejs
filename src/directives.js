
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
            vnode._el[directive.arg] = res;
        },
        destory:null
    },
    'on':{//{name: "on", arg: click, value: "a+b"}
        init(vnode,directive){
            console.log('directive.arg:',directive.arg);
            vnode._el.addEventListener(directive.arg,function(ev){
                //value-->fn
                //value-->fn()、fn(a+b)
                //value-->'a+b'、add(a,b)...
                let str = directive.value;
                if(/^[\$_a-z][a-z0-9_\$]*$/i.test(str)){
                    str+='($event)'
                }
                vnode._component._staticData.$event = ev;
                parseExperssion(str,vnode._component.data);
            },false)
        }
    },
    'model':{
        init(vnode,directive){
            //增加一个v-bind指令
            vnode.$directives.push({name: "bind", arg: 'value', value: directive.value});
            //增加一个事件指令
            vnode.$directives.push({name: "on", arg: 'input', value: `${directive.value}=$event.target.value`});
        }
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