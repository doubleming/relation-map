import { IdType, OptionType } from "../types/types";
import { Node, Line } from "../nodes";
import { EventGraph } from "./eventGraph";

export class DrawGraph extends EventGraph {
    constructor(idOrElement: IdType, options: OptionType = {}) {
        super(idOrElement, options)
    }

    drawNode(nodeList: Node[]) {
        const { nodeRadius, color } = this.options
        const ctx = this.ctx!
        for (const { x, y, origin: { text } } of nodeList) {
            ctx.fillStyle = color
            ctx.moveTo(x, y)
            ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI)
            // 画文字
            ctx.fill()
            this.drawText(text, x, y)
        }
    }

    drawLine(lineList: Line[]) {
        const ctx = this.ctx!
        const { lineColor } = this.options
        ctx.strokeStyle = lineColor
        for (const line of lineList) {
            const { form, to } = line
            if (form && to) {
                const {x: x1, y: y1} = form
                const {x: x2, y: y2} = to
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
            }
        }
        ctx.stroke()
    }

    drawText(text: string, x: number, y: number) {
        const ctx = this.ctx!
        ctx.beginPath()
        ctx.fillStyle = '#f00'
        const { width, } = ctx.measureText(text)
        
        ctx.fillText(text, x - width / 2, y)
    }

}