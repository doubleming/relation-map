import { Graph, IOption, Line, Node, } from "@zs/relation";
import { calculateAngle, circlePosition } from "./utils";
const { PI } = Math
export function computePosition(graph: Graph, rootId?: string | number) {
    const { nodeMap, rootId: initRootId, options } = graph
    const rootNode = nodeMap.get(rootId || initRootId!)
    graph.nodeList = getNodeList(rootNode, options)
    graph.lineList = getLines(graph.nodeList, graph.lines)
    // node 自己更新节点
    graph.nodeList.forEach(node => node.update(2000))
}

function getNodeList(rootNode: Node | undefined, options: IOption) {
    const { width, height, level } = options
    if (rootNode) {
        // 初始化rootNode为原点
        rootNode.endX = width / 2
        rootNode.endY = height / 2
        return compute(rootNode, null, options, level)
    }
    return []
}

function compute(root: Node, parentNode: Node | null, options: IOption, level: number, nodeList: Set<Node> = new Set()) {
    nodeList.add(root)
    const { startAngle, radius, defaultRadius, level: optionLevel } = options
    const toRelation = root.toRelation.filter(node => !nodeList.has(node))
    const fromRelation = root.fromRelation.filter(node => !nodeList.has(node))
    const relations = [...toRelation, ...fromRelation]
    const length = relations.length
    const avgAngle = parentNode ? PI / (length + 1) : (2 * PI) / length
    relations.forEach((node, idx) => {
        const r = level > radius.length ? defaultRadius : radius[optionLevel - level]
        const theta = calculateAngle(root, parentNode, startAngle, avgAngle, idx, length)
        const { x, y } = circlePosition({ x: root.endX, y: root.endY }, r, theta)
        node = Object.assign(node, { endX: x, endY: y }, { theta })
        if (level > 0) {
            compute(node, root, options, level - 1, nodeList)
        } else {
            nodeList.add(node)
        }
    })
    return [...nodeList]
}


function getLines(nodeList: Node[], lines: Line[]) {
    return nodeList.flatMap(node => lines.filter(line => line.form === node))
}