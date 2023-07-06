import { computePosition, computeRelation } from "@zs/relation-compute";
import { EventGraph } from "./eventGraph";
import { ILine, INode, OptionType, IdType } from "../types/types";
import { Node } from "../nodes";

export class AnimationGraph extends EventGraph {
    nodes: Node[] = []
    rootId: string | number | undefined
    nodeMap: Map<string | number, Node> = new Map()
    constructor(idOrElement: IdType, options: OptionType = {}) {
        super(idOrElement, options)
    }

    draw(nodes: INode[], lines: ILine[], rootId: number | string) {
        this.rootId = rootId
        // 第一步，初始化节点,
        this.initNodes(nodes)
        // 根据lines计算节点直接关系
        computeRelation(this.nodes, lines)
        // 第三步初始化canvas
        this.initCanvas()
        // 第四步渲染
        this.render()
    }

    initNodes(nodes: INode[]) {
        nodes.forEach(node => {
            const n = new Node(node)
            this.nodes.push(n)
            this.nodeMap.set(node.id, n)
        })
    }

    render(rootId?:string) {
        const { width, height, nodeRadius, color } = this.options
        const ctx = this.ctx!
        ctx?.clearRect(0, 0, width, height)
        // 计算节点位置
        const nodeList = computePosition(this, rootId)
        ctx.beginPath()
        for (const {x, y, origin: { text }} of nodeList) {
            ctx.fillStyle = color
            ctx.moveTo(x, y)
            ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI)
            // 画文字
            ctx.fill()
            ctx.beginPath()
            ctx.fillStyle = '#f00'
            ctx.fillText(text, x - 10, y)

        }
        // 先画线
        // 在画点
    }

}
