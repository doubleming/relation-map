import { ILine, Node } from "@zs/relation";
import { getNodeMap } from "./utils";

export function computeRelation(nodes: Node[], lines: ILine[]) {
    const nodeMap = getNodeMap(nodes)
    for (const line of lines) {
        const { from, to } = line
        const source = nodeMap.get(from)
        const target = nodeMap.get(to)
        source && target && source.relation.push(target)
    }
}


