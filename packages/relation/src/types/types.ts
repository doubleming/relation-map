export type IdType = string | HTMLCanvasElement

export interface IOption {
    color: string // 节点颜色
    nodeTextColor: string // 节点文字颜色
    lineColor: string // 连线颜色
    lineFontColor: string // 连线字体颜色
    lineWidth: number // 线宽， 默认为1
    borderColor: string  // 节点边框
    height: number // canvas高
    width: number // canvas宽
    minScale: number // 最小缩放
    maxScale: number // 最大缩放
    level: number // 显示层级，默认3层
    startAngle: number // 开始角度，角度制，比如30，代表30度
    radius: number[]  // 每一层的半径
    defaultRadius: number // 如果raduis，没有设置对应层级的半径，则使用此默认半径
    nodeRadius: number // 节点半径
    showLineText: boolean // 是否显示节点连线的关系文字
    fontSize: number // 文字大小
    duration: number // 动画持续时长
    arrowLength: number // 箭头长度
    isDashLine: boolean // 是否是虚线，默认不是
    dashPattern: number[] // 虚线的模式，默认为[10, 10]
    isLineFlow: boolean // 线条是否流动，默认不流动
}


export type OptionType = Partial<IOption>

export interface INode {
    id: string | number,
    text: string,
    color?: string,
    borderColor?: string
}

export interface ILine {
    from: string | number,
    to: string | number,
    text?: string,
    color?: string,
    fontColor?: string
}


export type EventType = 'click' | 'dbclick' | 'mousedown' | 'mousemove' | 'mouseup' | 'wheel'