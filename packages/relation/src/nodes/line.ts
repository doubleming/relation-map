import { ILine } from "../types/types"
import { Node } from "../nodes";
import { Group, Line as LLine, Path, Text } from 'leafer-ui'
import { Graph } from "../graph";
import { AnimationType, tween } from "@double_ming/relation-utils"
import { getArrowPath, getRoundPoint } from '@double_ming/relation-compute'

export class Line {
    origin: ILine
    from: Node | undefined
    to: Node | undefined
    lineObj: LLine
    show = false
    group: Group = new Group()
    textObj: Text
    arrowObj: Path
    dashPattern: number[] = []
    dashOffset = 16
    opacity = 0
    dashUpdateId = 0
    moveUpdateId = 0
    constructor(line: ILine, public graph: Graph) {
        const { nodeMap, options } = graph
        const { lineColor, isDashLine, dashPattern, isLineFlow, lineWidth } = options
        this.origin = line
        const { to, from } = line
        this.from = nodeMap.get(from)
        this.to = nodeMap.get(to)
        this.dashPattern = dashPattern
        const lineStyle = {
            stroke: line.color || lineColor,
            strokeWidth: lineWidth,
            opacity: this.opacity,
        }
        this.lineObj = new LLine(lineStyle)
        this.textObj = new Text({
            text: line.text || '',
            fill: line.fontColor || lineColor,
            textAlign: 'center',
            verticalAlign: 'middle'
        })
        this.arrowObj = new Path({
            fill: lineColor,
        })
        this.group.add(this.lineObj)
        this.group.add(this.textObj)
        this.group.add(this.arrowObj)
    }

    update(duration: number) {
        const { graph } = this
        const { nodeRadius, isDashLine, isLineFlow } = graph!.options
        const show = this.from?.show && this.to?.show
        this.group.visible = show || false
        const endOpacity = !show ? 0 : 1
        if (!show) {
            this.opacity = endOpacity
            return
        }
        const start = Date.now()
        const ani = tween(AnimationType.QuadraticInOut, this.opacity, endOpacity, duration)
        const _move = () => {
            const time = Date.now() - start
            const opacity = ani(time)
            const { fx, fy, tx, ty } = getRoundPoint(this, nodeRadius)
            const [x1, y1, x2, y2] = [fx, fy, tx, ty].map(x => x + nodeRadius)
            this.updateLine(x1, y1, x2, y2, opacity || 0)
            this.updateText(x1, y1, x2, y2, opacity || 0)
            this.updateArrow(x1, y1, x2, y2, opacity || 0)
            this.opacity = endOpacity
            if (time <= duration)
                this.moveUpdateId = requestAnimationFrame(_move)
        }
        cancelAnimationFrame(this.moveUpdateId)
        cancelAnimationFrame(this.dashUpdateId)
        _move()
         // 如果isLineFlow为true，则开启线条动画
         if (isLineFlow && isDashLine) {
            this.updateLineDashOffset()
        }
    }

    updateLine(x1: number, y1: number, x2: number, y2: number, opacity: number) {
        const { lineColor, isDashLine, dashPattern, isLineFlow, lineWidth } = this.graph.options
        const { origin: { color } } = this
        this.lineObj.set({
            toPoint: { x: x2 - x1, y: y2 - y1 },
            x: x1,
            y: y1,
            opacity,
            stroke: color || lineColor,
            strokeWidth: lineWidth,
            ...(isDashLine ? { dashPattern } : {dashPattern: []}),
            ...(isLineFlow ? { dashOffset: this.dashOffset } : {})
        })
    }

    updateText(x1: number, y1: number, x2: number, y2: number, opacity: number) {
        const { width, height } = this.textObj.getBounds("content")
        const { leafer: { scaleX, scaleY }, options: { lineColor } } = this.graph!
        const { origin: { fontColor } } = this
        this.textObj.set({
            x: (x1 + x2 - (width / scaleX)) / 2,
            y: (y1 + y2 - height / scaleY) / 2,
            opacity,
            fill: fontColor || lineColor,
        })
    }

    updateArrow(x1: number, y1: number, x2: number, y2: number, opacity: number) {
        const { arrowLength, lineColor } = this.graph.options
        const path = getArrowPath(x1, y1, x2, y2, arrowLength)
        const { origin: { color } } = this
        this.arrowObj.set({
            path,
            opacity,
            fill: color || lineColor,
        })
    }

    arrowPath() {
        const { from, to } = this
        if (from && to) {
            const { arrowLength } = this.graph.options
            return getArrowPath(from.x, from.y, to.x, to.y, arrowLength)
        }
        return ``
    }

    updateLineDashOffset() {
        const _update = () => {
            if (this.dashOffset === 0) {
                this.dashOffset = 16
            }
            this.lineObj.set({
                dashOffset: this.dashOffset
            })
            this.dashOffset--
            this.dashUpdateId = requestAnimationFrame(_update)
        }
        _update()
    }

    addLeader() {
        const { leafer } = this.graph
        leafer.add(this.group)
    }
}
