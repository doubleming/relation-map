import { Node } from "@zs/relation";

export function getNodeMap(nodes: Node[]) {
    const nodeMap = new Map<string| number, Node>()
    nodes.forEach(node => {
        nodeMap.set(node.id, node)
    })
    return nodeMap
}