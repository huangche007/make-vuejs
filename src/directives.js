
import {parseExperssion} from './experssion'
import {assert} from './utils';
import VNode from './vNode';
import {createVDOM} from './vdom';
import {parseFor} from './parser';
export default {
    'bind':{
        init:null,
        update(vnode,directive){//{name: "bind", arg: "title", value: "a+b"}
            assert(vnode);
            assert(vnode instanceof VNode);
            assert(directive);
            assert(directive.arg);
            assert(directive.value);
            let res = parseExperssion(directive.value,vnode.data);
            vnode._el.setAttribute(directive.arg,res);
            vnode._el[directive.arg] = res;
        },
        destory:null
    },
    'on':{//{name: "on", arg: click, value: "a+b"}
        init(vnode,directive){
            vnode._el.addEventListener(directive.arg,function(ev){
                //value-->fn
                //value-->fn()、fn(a+b)
                //value-->'a+b'、add(a,b)...
                let str = directive.value;
                if(/^[\$_a-z][a-z0-9_\$]*$/i.test(str)){
                    str+='($event)'
                }
                vnode._component._staticData.$event = ev;
                // console.log('vnode.data:',vnode.data,vnode._component.data);---这里有问题
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
    'cloak':{
        update(vnode){
            vnode._el.removeAttribute('v-cloak');
        }
    },
    'show':{
        init:null,
        update(vnode,directive){//{name: "bind", arg: undefined, value: "isShow"}
            assert(vnode);
            assert(vnode instanceof VNode);
            assert(directive);
            assert(directive.value);
            let res = parseExperssion(directive.value,vnode.data);
            if(res){
                vnode._el.style.display = '';
            }else{
                vnode._el.style.display = 'none';
            }
        },
        destory:null
    },
    'if':{
        init(vnode,directive){
            // vnode.__parentNode = vnode._el.parentNode;
            const tempHolder = document.createComment('');
            vnode.__tempHolder = tempHolder;
            vnode.__el = vnode._el;
        },
        update(vnode,directive){
            const res = parseExperssion(directive.value,vnode.data);
            if(res){
                // if(vnode.__tempHolder.parentNode){
                //     vnode.__parentNode.replaceChild(
                //         vnode.__el,
                //         vnode.__tempHolder
                //     )
                // }
                vnode.__tempHolder.replaceWith(vnode.__el);
            }else{
                vnode.__el.replaceWith(vnode.__tempHolder);
            }
        },
        destory(vnode,directive){}
    },
    'else-if':{
        init(vnode,directive){
            // vnode.__parentNode = vnode._el.parentNode;
            const tempHolder = document.createComment('');
            vnode.__tempHolder = tempHolder;
            vnode.__el = vnode._el;
        },
        update(vnode,directive){
            const res = parseExperssion(directive.value,vnode.data);
            if(res){
                // if(vnode.__tempHolder.parentNode){
                //     vnode.__parentNode.replaceChild(
                //         vnode.__el,
                //         vnode.__tempHolder
                //     )
                // }
                vnode.__tempHolder.replaceWith(vnode.__el);
            }else{
                vnode.__el.replaceWith(vnode.__tempHolder);
            }
        },
    },
    'else':{
        init(vnode,directive){},
        update(vnode,directive){},
        destory(vnode,directive){}
    },
    'for':{
        init(vnode,directive){
          directive.meta.template = vnode;
          let hodler = directive.meta.hodler = document.createComment('');
          let parentNode = directive.meta.parentNode = vnode._el.parentNode;
          directive.meta.nodes = [];
          parentNode.replaceChild(hodler,directive.meta.template._el);
        },
        update(vnode,directive){
           const template = directive.meta.template;
           const holder = directive.meta.hodler;
           const parentNode = directive.meta.parentNode;
           const nodes = directive.meta.nodes;
           const {value,key,data} = parseFor(directive.value);
           const mDatas = parseExperssion(data,template.data);
           for(let mKey in mDatas){
                const mEl = directive.meta.template.clone();
                nodes.push(mEl);
                key && (mEl.data[key] = mKey);
                mEl.data[value] = mDatas[mKey];
                parentNode.insertBefore(mEl._el,holder);
           }
           let _render = vnode.render;
           vnode.render = function(){
               nodes.forEach((node) =>{
                   node.render();
               })
           }
        }
    },
    'html':{
        init:null,
        update(vnode,directive){//{name: "bind", arg: undefined, value: "<p>这是渲染的p标签元素</p>"}
            assert(vnode);
            assert(vnode instanceof VNode);
            assert(directive);
            assert(directive.value);
            let res = parseExperssion(directive.value,vnode.data);
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
            let txt = parseExperssion(directive.value,vnode.data);
            const textDom = document.createTextNode(txt);
            vnode._el.innerHTML = '';
            vnode._el.appendChild(textDom);
        },
        destory:null
    }
}