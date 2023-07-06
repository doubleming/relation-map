export type Point = {
    x: number,
    y: number
}
const { sqrt } = Math
export function pointDistance(point1: Point, point2: Point) {
    const {x: x1, y: y1} = point1
    const {x: x2, y: y2} = point2
    return sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}