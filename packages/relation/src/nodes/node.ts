import { AnimationType, tween } from "@double_ming/relation-utils"
import { INode } from "../types/types"
import { DragEvent, Ellipse, Group, Text, PointerEvent } from 'leafer-ui'
import { Graph } from "../graph"
import { computePosition } from "@double_ming/relation-compute"

export class Node {
    x = 0
    y = 0
    id: string | number
    origin: INode
    fromRelation: Node[]
    toRelation: Node[]
    theta = 0
    endX = 0
    endY = 0
    ellipseObj: Ellipse
    show = false
    group: Group = new Group()
    textObj: Text
    opacity = 0
    moveUpdateId = 0
    color: string
    constructor(node: INode, public graph: Graph) {
        this.origin = node
        this.id = node.id
        this.fromRelation = []
        this.toRelation = []
        const { options: { color, nodeTextColor } } = graph
        this.color = color
        this.ellipseObj = new Ellipse({ x: this.x, y: this.y, fill: node.color || color })
        this.textObj = new Text({
            text: node.text || '',
            fill: nodeTextColor,
            textAlign: 'center',
            verticalAlign: 'middle'
        })
        this.group.add(this.ellipseObj)
        this.group.add(this.textObj)
        this.group.opacity = this.opacity

        // this.group.on(DragEvent.DRAG, this.handleDrag)

        this.group.on(PointerEvent.CLICK, this.handleClick)

    }

    handleClick = () => {
        const rootId = this.graph.rootId
        if (rootId === this.id) return  // 如果点击的是根节点，则不做任何处理
        this.graph.emit('click', this)
        this.graph.rootId = this.id
        computePosition(this.graph, this.id)
        setTimeout(() => {
            this.graph.updateAnimation()
        }, 0);
    }

    handleDrag = (e: DragEvent) => {
        // console.log(e, 'handleDrag')
        const { x, y } = e
        this.endX = this.x = x
        this.endY = this.y = y
        // this.update(0)
        this.updateEllipse(x, y)
        this.updateText()
        this.graph?.updateLines(0)
    }

    update(duration: number) {
        const { group, show } = this
        const endOpacity = !show ? 0 : 1
        group.visible = show
        const start = Date.now()
        const startPoint = { x: this.x, y: this.y }
        const endPoint = { x: this.endX, y: this.endY }
        const ani = tween(AnimationType.QuadraticInOut, startPoint, endPoint, duration)
        const aniOpt = tween(AnimationType.QuadraticInOut, this.opacity, endOpacity, duration)
        const _move = () => {
            const time = Date.now() - start
            const { x, y } = ani(time)!
            const opacity = aniOpt(time)!
            this.updateEllipse(x, y)
            this.updateText()
            this.group.opacity = opacity
            this.opacity = opacity
            if (duration > 0 && time <= duration)
                this.moveUpdateId = requestAnimationFrame(_move)
        }
        cancelAnimationFrame(this.moveUpdateId)
        _move()
    }


    updateEllipse(x: number, y: number) {
        const { nodeRadius } = this.graph!.options
        const { color, origin: { color: oColor } } = this
        this.x = x
        this.y = y
        this.ellipseObj.set({
            width: nodeRadius * 2,
            height: nodeRadius * 2,
            x: x,
            y: y,
            fill: oColor || color
        })
    }

    updateText() {
        const { x, y, graph } = this
        const { leafer: { scaleX, scaleY } } = graph
        const { nodeRadius, nodeTextColor } = graph!.options
        const { width, height } = this.textObj.getBounds("content")
        this.textObj.set({
            x: x - width / (2 * scaleX) + nodeRadius,
            y: y - height / (2 * scaleY) + nodeRadius,
            fill: nodeTextColor
        })
    }

    addLeafer() {
        const { leafer } = this.graph
        leafer.add(this.group)
    }
}
