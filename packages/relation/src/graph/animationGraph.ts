import { computePosition, computeRelation } from "@zs/relation-compute";
import { ILine, INode, OptionType, IdType } from "../types/types";
import { Node } from "../nodes";
import { DrawGraph } from "./drawGraph";

export class AnimationGraph extends DrawGraph {
    rootId: string | number | undefined
    constructor(idOrElement: IdType, options: OptionType = {}) {
        super(idOrElement, options)
    }

    draw(rootId: number | string, lines?: ILine[], nodes?: INode[]) {
        this.rootId = rootId
        if (nodes) {
            this.initNodes(nodes)
        }
        if (lines) {
            this.initLines(lines)
        }
        // 根据lines计算节点直接关系
        computeRelation(this.nodes, this.lines.map(l => l.origin))
        // 第三步初始化canvas
        this.initCanvas()
        // 第四步渲染
        this.render()
    }
    render(rootId?: string | number) {
        const { width, height } = this.options
        const ctx = this.ctx!
        ctx?.clearRect(0, 0, width, height)
        // 计算节点位置
        const nodeList = computePosition(this, rootId)
        const lineList = this.getLines(nodeList)
        ctx.beginPath()
        // 先画线
        this.drawLine(lineList)
        // 在画点
        this.drawNode(nodeList)
    }

    getLines(nodeList: Node[]) {
        return nodeList.flatMap(node => this.lines.filter(line => line.form === node))
    }

}
