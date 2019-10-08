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
export function createVDOM(node,cmp){
    assert(node,`${node} is not found`);
    assert(node._vue);
    assert(node.type === "element" || node.type === "text");
    assert(node.el,`${node.el} is not found`);
    assert(cmp,`${cmp} is not a component`);
    assert(cmp instanceof VComponent || cmp instanceof HCVue,`${cmp} is not exntends VComponent`);
    if(node.type==="element"){
        let instance;
        if(node.isHtml){ //VNode
            instance = new VNode(node,cmp);
        }else{
            //VComponent
            instance = new VComponent(node,cmp);           
        }
        instance.$children = node.children.map(child => {
            return createVDOM(child,cmp);
        });
        
        return instance;
    }else{
        //VText
        return new VText(node,cmp);
    }
}