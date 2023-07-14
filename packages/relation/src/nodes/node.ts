import { AnimationType, tween } from "@zs/relation-utils"
import { INode } from "../types/types"
import { DragEvent, Ellipse, Group, Text } from 'leafer-ui'
import { Graph } from "../graph"

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
    constructor(node: INode, public graph: Graph) {
        this.origin = node
        this.id = node.id
        this.fromRelation = []
        this.toRelation = []
        this.ellipseObj = new Ellipse({ x: this.x, y: this.y, draggable: true })
        this.textObj = new Text({
            text: node.text || '',
            fill: '#f00',
            textAlign: 'center',
            verticalAlign: 'middle'
        })
        this.group.add(this.ellipseObj)
        this.group.add(this.textObj)

        this.group.on(DragEvent.DRAG, this.handleDrag)

    }

    handleDrag = (e: DragEvent) => {
        const {x, y} = e
        this.endX = this.x = x
        this.endY = this.y = y
        this.update(0)
        this.graph?.updateLines(0)
    }

    update(duration: number) {
        const { group, show } = this
        group.visible = show

        const start = Date.now()
        const startPoint = { x: this.x, y: this.y }
        const endPoint = { x: this.endX, y: this.endY }
        const ani = tween(AnimationType.QuadraticInOut, startPoint, endPoint, duration)
        const _move = () => {
            const time = Date.now() - start
            const { x, y } = ani(time)!
            this.updateEllipse(x, y)
            this.updateText()
            if (duration > 0 && time <= duration)
                requestAnimationFrame(_move)
        }
        _move()
    }


    updateEllipse(x: number, y: number) {
        const { nodeRadius } = this.graph!.options
        this.x = x
        this.y = y
        this.ellipseObj.set({
            width: nodeRadius * 2,
            height: nodeRadius * 2,
            fill: '#fff',
            x: x,
            y: y
        })
    }

    updateText() {
        const { x, y, graph } = this
        const { nodeRadius } = graph!.options
        const { width, height } = this.textObj.getBounds("content")
        this.textObj.set({
            x: x - width / 2 + nodeRadius,
            y: y - height / 2 + nodeRadius
        })
    }

    addLeafer() {
        const { leafer } = this.graph
        leafer.add(this.group)
    }
}
