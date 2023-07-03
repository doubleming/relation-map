import { OptionType, IdType } from "../types/types";
import { BaseGraph } from "./baseGraph";

export class DomGraph extends BaseGraph {
    ctx: CanvasRenderingContext2D | undefined
    constructor(idOrElement: IdType, options: OptionType = {}){
        super(idOrElement, options)
    }
    initCanvas() {
        const { height, width } = this.options
        // 设置宽高
        this.el?.setAttribute('height', `${height}`)
        this.el?.setAttribute('width', `${width}`)
        this.ctx = this.el.getContext('2d')!
    }
} 