import { IOption, IdType } from "../types/types";
import { AnimationGraph } from "./animationGraph";

export class Graph extends AnimationGraph {
    constructor(idOrElement: IdType, options: IOption = {}) {
        super(idOrElement, options)
    }
}