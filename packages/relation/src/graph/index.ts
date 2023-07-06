import { OptionType, IdType } from "../types/types";
import { AnimationGraph } from "./animationGraph";

export class Graph extends AnimationGraph {
    constructor(idOrElement: IdType, options: OptionType = {}) {
        super(idOrElement, options)
    }
}