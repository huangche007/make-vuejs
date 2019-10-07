import {assert} from './utils'
export function parser(dom){
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
        let children = Array.from(dom.childNodes).map(child => parser(child)).filter(child=>child!==undefined)
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