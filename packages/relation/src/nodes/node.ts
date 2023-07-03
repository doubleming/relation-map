import { INode } from "../types/types"

export class Node {
    x = 0
    y = 0
    id: string | number 
    origin: INode
    relation: Node[]
    constructor(node: INode) {
        this.origin = node
        this.id = node.id
        this.relation = []
    }
}