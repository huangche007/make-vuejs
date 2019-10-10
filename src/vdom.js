import VNode from './vNode';
import VText from './vText';
import VComponent from './vComponent';
import HCVue from './hcVue'
import {assert} from './utils';
/**
 *
 *根据元素节点创建对应的虚拟DOM
 * @export
 * @param {*} node
 * @returns
 */
export function createVDOM(node,cmp,parent){
    assert(node,`${node} is not found`);
    assert(node._vue);
    assert(node.type === "element" || node.type === "text");
    assert(node.el,`${node.el} is not found`);
    assert(cmp,`${cmp} is not a component`);
    assert(cmp instanceof VComponent ||cmp instanceof VNode || cmp instanceof HCVue,`${cmp} is not exntends VComponent`);
    if(node.type==="element"){
        let parent;
        if(node.isHtml){ //VNode
            parent = new VNode(node,cmp);
        }else{
            //VComponent
            parent = new VComponent(node,cmp);           
        }
        parent.$children = node.children.map(child => {
            return createVDOM(child,cmp,parent);
        });
        
        return parent;
    }else{
        //VText
        return new VText(node,parent);
    }
}