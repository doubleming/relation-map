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
        ctx.beginPath()
        for (const { x, y, origin: { text } } of nodeList) {
            ctx.fillStyle = color
            ctx.moveTo(x, y)
            ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI)
            // 画文字
            ctx.fill()
            ctx.rotate(0)
            this.drawText(text, x, y)
        }
    }

    drawLine(lineList: Line[]) {
        const ctx = this.ctx!
        const { lineColor, showLineText } = this.options
        ctx.strokeStyle = lineColor
        ctx.beginPath()
        for (const line of lineList) {
            const { form, to } = line
            if (form && to) {
                const {x: x1, y: y1} = form
                const {x: x2, y: y2} = to
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
                ctx.stroke()
                // 画之间关系的文字
                showLineText && this.drawLineText(line)
            }
        }
    }

    drawText(text: string, x: number, y: number) {
        const ctx = this.ctx!
        ctx.beginPath()
        ctx.fillStyle = '#f00'
        ctx.fillText(text, x , y)
    }

    drawLineText(line: Line) {
        const ctx = this.ctx!
        const { form, to, origin: { text } } = line
        if (text) {
            ctx.beginPath()
            const {x: x1, y: y1} = form!
            const {x: x2, y: y2} = to!
            const x = (x1 + x2) / 2
            const y = (y1 + y2) / 2
            ctx.fillStyle = '#fff'
            ctx.fillText(text, x, y)
        }
    }

}