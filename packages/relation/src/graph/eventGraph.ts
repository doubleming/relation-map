import { Node } from "../nodes";
import { OptionType, IdType, EventType } from "../types/types";
import { DomGraph } from "./domGraph";
type handleEvent = (node: Node) => void
export class EventGraph extends DomGraph {
    subEvent: Map<EventType, handleEvent[]> = new Map
    constructor(idOrElement: IdType, options: OptionType = {}){
        super(idOrElement, options)
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

} 