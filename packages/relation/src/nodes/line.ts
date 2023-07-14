import { ILine } from "../types/types"
import { Node } from "../nodes";
import { Group, Line as LLine, Path, Text } from 'leafer-ui'
import { Graph } from "../graph";
import { AnimationType, tween } from "@zs/relation-utils"
import { getArrowPath, getRoundPoint } from '@zs/relation-compute'

export class Line {
    origin: ILine
    from: Node | undefined
    to: Node | undefined
    lineObj: LLine
    show = false
    group: Group = new Group()
    textObj: Text
    arrowObj: Path
    opacity = 0
    constructor(line: ILine, public graph: Graph) {
        const { nodeMap } = graph
        this.origin = line
        const { to, from } = line
        this.from = nodeMap.get(from)
        this.to = nodeMap.get(to)
        this.lineObj = new LLine({ strokeWidth: 1, opacity: this.opacity })
        this.textObj = new Text({
            text: line.text || '',
            fill: '#fff',
            textAlign: 'center',
            verticalAlign: 'middle'
        })
        this.arrowObj = new Path({
            fill: '#fff',
        })
        this.group.add(this.lineObj)
        this.group.add(this.textObj)
        this.group.add(this.arrowObj)
    }

    update(duration: number) {
        const { graph } = this
        const { nodeRadius } = graph!.options
        const show = this.from?.show && this.to?.show
        const endOpacity = !show ? 0 : 1
        const start = Date.now()
        const ani = tween(AnimationType.QuadraticInOut, this.opacity, endOpacity, duration)
        const _move = () => {
            const time = Date.now() - start
            const opacity = ani(time)
            const { fx, fy, tx, ty } = getRoundPoint(this, nodeRadius)
            const [x1, y1, x2, y2] = [fx, fy, tx, ty].map(x => x + nodeRadius)
            this.updateLine(x1, y1, x2, y2, opacity || 0)
            this.updateText(x1, y1, x2, y2)
            this.updateArrow(x1, y1, x2, y2)
            if (time <= duration)
                requestAnimationFrame(_move)
        }
        _move()
    }

    updateLine(x1: number, y1: number, x2: number, y2: number, opacity: number) {
        this.lineObj.set({
            toPoint: { x: x2 - x1, y: y2 - y1 },
            x: x1,
            y: y1,
            stroke: '#fff',
            opacity
        })
    }

    updateText(x1: number, y1: number, x2: number, y2: number) {
        const { width, height } = this.textObj.getBounds("content")
        this.textObj.set({
            x: (x1 + x2 - width) / 2,
            y: (y1 + y2 - height) / 2
        })
    }

    updateArrow(x1: number, y1: number, x2: number, y2: number) {
        const path = getArrowPath(x1, y1, x2, y2, 6)
        this.arrowObj.set({
            path
        })
    }

    arrowPath() {
        const { from, to } = this
        if (from && to) {
            return getArrowPath(from.x, from.y, to.x, to.y, 6)
        }
        return ``
    }

    addLeader() {
        const { leafer } = this.graph
        leafer.add(this.group)
    }
}
