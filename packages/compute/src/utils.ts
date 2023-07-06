import { Node } from "@zs/relation";
import { transformAngle } from "@zs/relation-utils";
const { sin, cos, ceil, PI, abs } = Math

export function getNodeMap(nodes: Node[]) {
    const nodeMap = new Map<string | number, Node>()
    nodes.forEach(node => {
        nodeMap.set(node.id, node)
    })
    return nodeMap
}


/**
* 圆周围点坐标公式，设半径为r， 圆心(x, y),
* 则圆上点的位置x', y' 分别为x' = x + r * sin(theta); y' = y - r * cos(theta)
* theta为点与圆心连线，于垂直方向的夹角，顺时针,如下图∠AOB 钝角∠AOC
*                A
*                *       B
*          *     *     *
*        *       *   *   *
*       *        *O       *
*        *     *         *
*          *           *
*         C      *
*/
export function circlePosition({ x, y }: Node, r: number, theta: number) {
    return {
        x: x + r * sin(theta),
        y: y - r * cos(theta)
    }
}


/**
 * 根据父节点和祖节点
 * @param root 父节点
 * @param parentNode 祖节点
 * @param startAngle 开始角度
 * @param avgAngle 平均角度
 * @param index 当前节点数
 * @param len 当前包含兄弟节点共有多少个
 * @returns 当前节点的角度
 * 
 * 如果没有parentNode，则代表是第一个圆，则直接按照偏移算角度
 * 如果有parentNode，则距离中心的偏移如下，n为子节点个数， i代表当前节点的索引号
 * 有一个子节点，则偏移为[0]
 * 两个子节点，则偏移为[-PI/2(n+1), PI/2(n+1)]
 * 三个子节点，则偏移为[-2PI/2(n+1),0，2PI/2(n+1)]
 * 四个子节点，则偏移为[-3PI/2(n+1),-PI/2(n+1)，PI/2(n+1)，3PI/2(n+1)]
 * 五个子节点，则偏移为[-4PI/2(n+1),-2PI/2(n+1),0，2PI/2(n+1)，4PI/2(n+1)]
 * 由此可知，不变式为PI/2(n+1)，i小于中心n-1/2为负数，大于为正数，等于为0，系数为i距离中心n-1/2的二倍
 * 
 */
export function calculateAngle(root: Node, parentNode: Node | null, startAngle: number, avgAngle: number, index: number, len: number) {
    if (parentNode) {
        // 如果有祖父节点，则需要根据根节点和祖父节点的连线计算角度
        // 具体见图/static/calculateAngle.png
        const mid = (len - 1) / 2
        // 距离中心的偏移量
        const centerOffset = index - mid
        const prefix = getPrefix(centerOffset)
        // 不变式
        const invariant = PI / (2 * (len + 1))
        // 不变式前的系数
        const coefficient = abs(mid - index) * 2
        return root.theta + prefix * invariant * coefficient
    } else {
        return transformAngle(startAngle, 'degree') + avgAngle * index
    }
}


function getPrefix(num: number) {
    if (num > 0) return 1
    if (num < 0) return -1
    return 0
}