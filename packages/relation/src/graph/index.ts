import { IOption, IdType } from "../types/types";
import { baseGraph } from "./baseGraph";

export class Graph extends baseGraph {
    constructor(idOrElement: IdType, options: IOption = {}) {
        idOrElement = typeof idOrElement === 'string' ? document.querySelector(idOrElement) as HTMLCanvasElement : idOrElement
        super(idOrElement, options)
    }
}