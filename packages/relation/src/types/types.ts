export type IdType = 'string' | HTMLCanvasElement

export interface IOption {
    color: string
    borderColor: string 
    height: number
    width: number
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