import { INode } from "../types/types"

export class Node {
    x = 0
    y = 0
    id: string | number
    origin: INode
    fromRelation: Node[]
    toRelation: Node[]
    theta = 0
    constructor(node: INode) {
        this.origin = node
        this.id = node.id
        this.fromRelation = []
        this.toRelation = []
    }
}
