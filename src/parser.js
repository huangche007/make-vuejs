import {assert} from './utils'
/**
 *
 *将html元素用js对象进行表示
 * @export
 * @param {*} dom
 * @returns
 */
export function parseDom(dom){
    assert(dom,`the element ${dom} is required`);
    assert(dom instanceof Node,`the type of ${dom} is Node`);

    if(dom.nodeType === document.ELEMENT_NODE){
        //1.获取标签元素的类型
        const domType = dom.tagName.toLowerCase();
        //2.获取标签元素的属性
        let attrs = {}
        Array.from(dom.attributes).forEach(attr =>{
            attrs[attr.name] = attr.value;
        })
        //3.获取标签元素的子级(children)
        let children = Array.from(dom.childNodes).map(child => parseDom(child)).filter(child=>child!==undefined)
        return {
            type:'element',
            tag:domType,
            attrs,
            children,
            isHtml:dom.constructor!==HTMLUnknownElement && dom.constructor!==HTMLElement,
            el:dom
        }
    }else if(dom.nodeType === document.TEXT_NODE){
        const data = dom.data.trim();
        if(data){
            return {
                type:'text',
                tag:'text',
                data,
                isHtml:true
            }
        }else{
            return undefined;
        }   
       
    }
}
/**
 *
 *根据属性解析指令
 * @export
 * @param {*} attrs
 * @returns
 */
export function parseDirectives(attrs){
    assert(attrs,`${attrs} is not found`);
    assert(attrs.constructor === Object,`${attrs} is not an object`);
    console.log(attrs);
    let directives = [];
    for(let key in attrs){
        let directive = {};
        if(key.startsWith('v-')){ //v-bind:name="banner" v-bind:title="这是banner" v-on:click="xxs" v-if="isShow"
            // 名称：参数
            let [name,arg] = key.split(":");

            directive = {
                name:name.replace(/^v\-/,''),
                arg
            }
        }else if(key.startsWith(':')){ //:showbanner: "showBanner"
            directive = {
                name:'bind',
                arg:key.substring(1)
            }
        }else if(key.startsWith('@')){ //@click: "func(12)"
            directive = {
                name:'on',
                arg:key.substring(1)
            }
        }
        if(directive){
            //:="666" v-bind="888"
            assert(directive.name==="bind" && directive.arg || directive.name!=="bind",`the directive ${key} is invalidate`);
            //v-on="fck"
            assert(directive.name==="on" && directive.arg || directive.name!=="on",`the event ${key} is invalidate`);
            directive.value = attrs[key];
            directives.push(directive);
        }
       
    }
    return directives;

}
/**
 *
 *解析事件
 * @export
 * @param {*} directives
 * @returns
 */
export function parseEvent(directives){
    assert(directives,`${directives} is not found`);
    assert(directives instanceof Array,`the type of ${directives} should is Array`);
    return directives.filter(directive => directive.name === 'on');
}