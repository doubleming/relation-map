import { Point, pointDistance } from "@zs/relation-utils";
import { Node } from "../nodes";
import { OptionType, IdType, EventType } from "../types/types";
import { DomGraph } from "./domGraph";
import { Graph } from ".";
import { computePosition } from "@zs/relation-compute";
type handleEvent = (node: Node) => void
export class EventGraph extends DomGraph {
    subEvent: Map<EventType, handleEvent[]> = new Map
    constructor(idOrElement: IdType, options: OptionType = {}){
        super(idOrElement, options)

        this.addEvent()
    }

    on(type: EventType, callback: handleEvent) {
        const handle = this.subEvent.get(type)
        if (handle) {
            handle.push(callback)
        } else {
            this.subEvent.set(type, [callback])
        }
    }

    emit(type: EventType, node: Node) {
        const handle = this.subEvent.get(type) || []
        handle.forEach(cb => cb(node))
    }

    addEvent() {
        const canvas = this.el
        canvas.addEventListener('click', this.handleClick.bind(this))
    }

    handleClick(event: MouseEvent) {
        const point = this.getRealPosition(event)
        const target = this.findNode(point)
        const graph = this as unknown as Graph
        if (target) {
            computePosition(graph, target.id)
        }
    }

    findNode(point: Point) {
        return (this as unknown as Graph).nodeList.find(node => {
            const distance = pointDistance(node, point)
            return distance < this.options.nodeRadius
        })
    }

    getRealPosition({x, y}: MouseEvent) {
        const { left, top } = this.el.getBoundingClientRect()
        return {
            x: x - left,
            y: y - top
        }
    }

} 