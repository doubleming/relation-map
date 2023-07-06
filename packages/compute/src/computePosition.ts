import { Graph, IOption, Node, } from "@zs/relation";
import { calculateAngle, circlePosition } from "./utils";
const {PI} = Math
export function computePosition(graph: Graph, rootId?: string | number) {
    const { nodeMap, rootId: initRootId, options } = graph
    const { width, height, level } = options
    const rootNode = nodeMap.get(rootId || initRootId!)
    if (rootNode) {
        // 初始化rootNode为原点
        rootNode.x = width / 2
        rootNode.y = height / 2
        return compute(rootNode, null, options, level)
    }
    return []
}

function compute(root: Node, parentNode: Node | null, options: IOption, level: number, nodeList: Set<Node> = new Set()) {
    nodeList.add(root)
    const { startAngle, radius, defaultRadius, level: optionLevel } = options
    const toRelation = root.toRelation.filter(node => !nodeList.has(node))
    const length = toRelation.length
    const avgAngle = parentNode ?  PI / ( length + 1 ) : (2 * PI) / length
    toRelation.forEach((node, idx) => {
        const r = level > radius.length ? defaultRadius : radius[optionLevel - level]
        const theta = calculateAngle(root, parentNode, startAngle, avgAngle, idx, length)
        node = Object.assign(node, circlePosition(root, r, theta), { theta })
        if (level > 0) {
            compute(node, root, options, level - 1, nodeList)
        }
    })
    return [...nodeList]
}
