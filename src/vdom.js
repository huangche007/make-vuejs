import VNode from './vNode';
import VText from './vText';
import VComponent from './vComponent';
import {assert} from './utils';
/**
 *
 *根据元素节点创建对应的虚拟DOM
 * @export
 * @param {*} node
 * @returns
 */
export function createVDOM(node){
    assert(node,`${node} is not found`);
    assert(node._vue);
    assert(node.type === "element" || node.type === "text");
    assert(node.el,`${node.el} is not found`);
    if(node.type==="element"){
        let instance;
        if(node.isHtml){ //VNode
            instance = new VNode(node);
        }else{
            //VComponent
            instance = new VComponent(node);           
        }
        instance.$children = node.children.map(child => {
            return createVDOM(child);
        });
        return instance;
    }else{
        //VText
        return new VText(node);
    }
}