import { IdType, OptionType } from "../types/types";
import { Line } from "../nodes";
import { EventGraph } from "./eventGraph";
import { Line as LLine, Ellipse, Text } from 'leafer-ui'

export class DrawGraph extends EventGraph {
    constructor(idOrElement: IdType, options: OptionType = {}) {
        super(idOrElement, options)
    }

    drawNode() {
        const { nodeRadius, color } = this.options
        const nodeList = this.nodes.filter(node => node.show)
        for (const { x, y, origin: { text } } of nodeList) {
            const ellipse = new Ellipse({x, y, width: nodeRadius, height:nodeRadius, fill: color})
            this.leafer.add(ellipse)
            this.drawText(text, x, y)
        }
    }

    drawLine() {
        const { lineColor, showLineText } = this.options
        const lineList = this.lines.filter(line => line.show)
        for (const line of lineList) {
            const { from, to } = line
            if (from && to) {
                const {x: x1, y: y1} = from
                const {x: x2, y: y2} = to
                const lineObj = new LLine({x: x1, y: y1, stroke: lineColor})
                lineObj.toPoint = { x: x2, y: y2 }
                this.leafer.add(lineObj)
                // 画之间关系的文字
                showLineText && this.drawLineText(line)
            }
        }
    }

    drawText(text: string, x: number, y: number) {
        const textObj = new Text({text, x, y, fill: '#ff'})
        this.leafer.add(textObj)
    }

    drawLineText(line: Line) {
        const { from, to, origin: { text } } = line
        if (text) {
            const {x: x1, y: y1} = from!
            const {x: x2, y: y2} = to!
            const x = (x1 + x2) / 2
            const y = (y1 + y2) / 2
            const textObj = new Text({text, x, y, fill: '#fff'})
            this.leafer.add(textObj)
        }
    }

}