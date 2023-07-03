import { IOption, IdType, OptionType } from "../types/types";
import { defaultOption } from "./defaultOptions";

export class BaseGraph {
    options: IOption;
    el: HTMLCanvasElement;
    constructor(idOrElement: IdType, options: OptionType = {}) {
        if (typeof idOrElement === 'string') {
            idOrElement = document.querySelector(idOrElement) as HTMLCanvasElement
        }
        this.el = idOrElement
        if (!this.el?.getContext) {
            console.warn('传入的id不对,或者不是canvas元素')
            throw new Error('传入的id不对,或者不是canvas元素')
        }
        this.options = Object.assign(defaultOption, options)
    }

}