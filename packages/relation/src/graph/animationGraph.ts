import { computePosition, computeRelation } from "@zs/relation-compute";
import { ILine, INode, OptionType, IdType } from "../types/types";
import { Line, Node } from "../nodes";
import { DrawGraph } from "./drawGraph";

export class AnimationGraph extends DrawGraph {
    rootId: string | number | undefined
    nodeList: Node[] = []
    lineList: Line[] = []
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
        // 计算节点位置
        computePosition(this, rootId)
        // 第三步初始化canvas
        this.initCanvas()
        // 第四步渲染
        this.render()
    }
    render() {
        const _render = () => {
            const { width, height } = this.options
            const ctx = this.ctx!
            ctx?.clearRect(0, 0, width, height)
            ctx.beginPath()
            // 先画线
            this.drawLine(this.lineList)
            // 在画点
            this.drawNode(this.nodeList)
            requestAnimationFrame(_render.bind(this))
        }
        _render()
    }

}
