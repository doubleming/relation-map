import { Graph } from ".";
import { Line, Node } from "../nodes";
import { ILine, INode, IOption, IdType, OptionType } from "../types/types";
import { defaultOption } from "./defaultOptions";
export class BaseGraph {
    options: IOption;
    el: HTMLCanvasElement;
    nodes: Node[] = []
    lines: Line[] = []
    nodeMap: Map<string | number, Node> = new Map()
 
    constructor(idOrElement: IdType, options: OptionType = {}, lines:ILine[] = [], nodes: INode[] = []) {
        if (typeof idOrElement === 'string') {
            idOrElement = document.querySelector(idOrElement) as HTMLCanvasElement
        }
        this.el = idOrElement
        if (!this.el?.getContext) {
            console.warn('传入的id不对,或者不是canvas元素')
            throw new Error('传入的id不对,或者不是canvas元素')
        }
        this.options = Object.assign(defaultOption, options)
        this.initData(lines, nodes)
        
    }

    initLines(lines: ILine[]) {
        lines.forEach(line => {
            this.lines.push(new Line(line, this as unknown as Graph))
        })
    }

    initNodes(nodes: INode[]) {
        nodes.forEach(node => {
            const n = new Node(node, this as unknown as Graph)
            this.nodes.push(n)
            this.nodeMap.set(node.id, n)
        })
    }

    initData(lines:ILine[], nodes: INode[]) {
        this.initNodes(nodes)
        this.initLines(lines)
    }
}