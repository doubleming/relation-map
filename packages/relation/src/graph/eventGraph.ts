import { OptionType, IdType } from "../types/types";
import { DomGraph } from "./domGraph";

export class EventGraph extends DomGraph {
    constructor(idOrElement: IdType, options: OptionType = {}){
        super(idOrElement, options)

        this.addEvent()
    }

    addEvent() {
        console.log('addEvent')
    }
} 