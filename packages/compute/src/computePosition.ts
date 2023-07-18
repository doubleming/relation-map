import { Graph, IOption, Line, Node, } from "@zs/relation";
import { calculateAngle, circlePosition } from "./utils";
const { PI } = Math
export function computePosition(graph: Graph, rootId?: string | number) {
    const { nodeMap, rootId: initRootId, options } = graph
    const rootNode = nodeMap.get(rootId || initRootId!)
    const { nodes, lines } = graph
    // 重置节点和线隐藏状态
    nodes.forEach(node => {node.show = false})
    lines.forEach(line => {line.show = false})

    getLines(getNodeList(rootNode, options), lines)
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
    root.show = true
    nodeList.add(root)
    const { startAngle, radius, defaultRadius, level: optionLevel } = options
    const toRelation = root.toRelation.filter(node => !nodeList.has(node))
    const fromRelation = root.fromRelation.filter(node => !nodeList.has(node))
    const relations = [...toRelation, ...fromRelation]
    const length = relations.length
    const avgAngle = parentNode ? PI / (length + 1) : (2 * PI) / length
    relations.forEach((node, idx) => {
        const r = radius[optionLevel - level] ?? defaultRadius
        const theta = calculateAngle(root, parentNode, startAngle, avgAngle, idx, length)
        const { x, y } = circlePosition({ x: root.endX, y: root.endY }, r, theta)
        node = Object.assign(node, { endX: x, endY: y }, { theta })
        if (level > 0) {
            compute(node, root, options, level - 1, nodeList)
        } else {
            node.show = true
            nodeList.add(node)
        }
    })
    return [...nodeList]
}


function getLines(nodeList: Node[], lines: Line[]) {
    const lineList = nodeList.flatMap(node => lines.filter(line => line.from === node))
    lineList.forEach(line => { line.show = true })
    return lineList
}