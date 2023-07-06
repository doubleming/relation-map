import { ILine } from "../types/types"
import { Node } from "../nodes";

export class Line {
    origin: ILine
    form: Node | undefined
    to: Node | undefined
    constructor(line:ILine, nodeMap: Map<string | number, Node>) {
        this.origin = line
        const { to, from } = line
        this.form = nodeMap.get(from)
        this.to = nodeMap.get(to)
    }
}
