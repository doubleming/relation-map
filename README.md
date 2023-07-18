## 社交关系图

## 安装
```sh
# npm 
npm install @zs/relation
# yarn 
yarn add @zs/relation
# pnpm
pnpm add @zs/relation
```

## 使用
```ts
import { Graph } from "@zs/relation";
// element 为canvas元素
const graph = new Graph(element, {
    height: 800,
    width: 1300,
    level: 2,
})

 const nodes = [
    { 'id': 'N1', 'text': '侯亮平', 'color': '#ec6941', 'borderColor': '#ff875e' },
    { 'id': 'N2', 'text': '李达康', 'color': '#ec6941', 'borderColor': '#ff875e' },
  ]
  const lines = [
    { 'from': 'N6', 'to': 'N1', 'text': '师生', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    { 'from': 'N13', 'to': 'N21', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }
]
// 第一个参数为rootId, 
graph.draw('N6', lines, nodes)
```


## Api配置参数
| 选项 | 描述   | 类型   | 默认值  | 
| --- | --- | --- | --- |
| color | 节点颜色  | string   | #fff |
| lineColor | 连线颜色  | string   | #fff |
| borderColor | 节点边框颜色  | string   | #000 |
| height | canvas高  | number   | 500 |
| width | canvas宽  | number   | 500 |
| level | 显示层级，默认3层  | number   | 3|
| startAngle | 开始角度，角度制，比如30，代表30度  | number   | 30 |
| radius | 每一层的半径  | number[]   | [180, 160, 140, 120] |
| defaultRadius | 如果radius，没有设置对应层级的半径，则使用此默认半径  | number   | 40 |
| nodeRadius | 节点半径  | number   | 20 |
| showLineText | 是否显示节点连线的关系文字  | boolean   | true |
| fontSize | 文字大小  | number   | 16 |
| duration | 动画持续时长,单位毫秒  | number   | 2000 |
| arrowLength | 箭头长度  | number   | 10 |