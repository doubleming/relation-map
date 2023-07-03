import { IOption, IdType } from "../types/types";
import { defaultOption } from "./defaultOptions";

export class baseGraph {
    options: IOption;
    el: HTMLCanvasElement
    constructor(idOrElement: IdType, options: IOption = {}) {
        if (typeof idOrElement === 'string') {
            idOrElement = document.querySelector(idOrElement) as HTMLCanvasElement
            if (!idOrElement || !idOrElement.getContext) {
                console.warn('传入的id不对')
                throw new Error('传入的id不对')
            }

        }
        this.el = idOrElement
        this.options = Object.assign(defaultOption, options)
    }

}