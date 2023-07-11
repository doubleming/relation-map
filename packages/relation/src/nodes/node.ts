import { AnimationType, tween } from "@zs/relation-utils"
import { INode } from "../types/types"

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
    constructor(node: INode) {
        this.origin = node
        this.id = node.id
        this.fromRelation = []
        this.toRelation = []
    }

    update(duration: number) {
        const start = Date.now()
        const startPoint = {x: this.x, y: this.y}
        const endPoint = {x: this.endX, y: this.endY}
        const ani = tween(AnimationType.QuadraticInOut ,startPoint, endPoint, duration)
        const _move = () => {
            const time = Date.now() - start
            const position = ani(time)
            this.x = position.x
            this.y = position.y
            if (time <= duration)
                requestAnimationFrame(_move)
        }
        _move()
    }
}
