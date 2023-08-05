import { OptionType, IdType } from "../types/types";
import { BaseGraph } from "./baseGraph";
import { Leafer } from 'leafer-ui'
export class DomGraph extends BaseGraph {
    leafer: Leafer
    constructor(idOrElement: IdType, options: OptionType = {}) {
        super(idOrElement, options)
        const { width, height, maxScale, minScale } = this.options
        this.leafer = new Leafer({ view: this.el, width, height, start: true, zoom: { max: maxScale, min: minScale } })
    }

    addLeafer() {
        this.nodes.forEach(node => node.addLeafer())
        this.lines.forEach(line => line.addLeader())
    }

    updateAnimation(duration?: number) {
        // node 自己更新节点
        const { duration: defaultDuration } = this.options
        this.updateNodes(duration ?? defaultDuration)
        this.updateLines(duration ?? defaultDuration)
    }

    updateNodes(duration: number) {
        this.nodes.forEach(node => node.update(duration))
    }

    updateLines(duration: number) {
        this.lines.forEach(line => line.update(duration))
    }
} 