import { computePosition, computeRelation } from "@zs/relation-compute";
import { ILine, INode, OptionType, IdType } from "../types/types";
import { LeaferEvent } from "leafer-ui";
import { EventGraph } from "./eventGraph";

export class AnimationGraph extends EventGraph {
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
        // 渲染
        this.render(rootId)
    }
    render(rootId: number | string) {
        // 根据lines计算节点直接关系
        computeRelation(this.nodes, this.lines.map(l => l.origin))
        // 把节点和线添加到leafer中
        this.addLeafer()
        // 计算节点位置,不断更新
        this.leafer.on(LeaferEvent.READY, () => {
            computePosition(this, rootId)
            this.update()
        })
    }

}
