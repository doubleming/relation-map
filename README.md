<h2 style="text-align: center;"> 社交关系图 </h2>

![alt relation](./relation.gif)

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

## 操作
- 鼠标中键平移画布
- alt + 鼠标滚轴 缩放

## Graph 类方法

> new 方法
```ts
// element 为canvas元素或者canvas的id
// options配置参数如下
const graph = new Graph(elementOrId, options)
```

> draw 方法
```ts
// 第一个参数为rootId, 显示到中心的节点，lines喝nodes为节点和连线
graph.draw('N6', lines, nodes)
```

## options配置参数
| 属性 | 描述   | 类型   | 默认值  | 
| --- | --- | --- | --- |
| color | 节点颜色  | string   | #65a30d |
| nodeTextColor | 节点文本颜色  | string   | #fff |
| lineColor | 连线颜色  | string   | #16a34a |
| borderColor | 节点边框颜色  | string   | #000 |
| height | canvas高  | number   | 500 |
| width | canvas宽  | number   | 500 |
| maxScale | 最小缩放  | number   | 4 |
| minScale | 最大缩放  | number   | 0.5 |
| level | 显示层级，默认3层  | number   | 3|
| startAngle | 开始角度，角度制，比如30，代表30度  | number   | 30 |
| radius | 每一层的半径  | number[]   | [180, 160, 140, 120] |
| defaultRadius | 如果radius，没有设置对应层级的半径，则使用此默认半径  | number   | 40 |
| nodeRadius | 节点半径  | number   | 20 |
| showLineText | 是否显示节点连线的关系文字  | boolean   | true |
| fontSize | 文字大小  | number   | 16 |
| duration | 动画持续时长,单位毫秒  | number   | 2000 |
| arrowLength | 箭头长度  | number   | 10 |

## nodes属性
| 属性 | 描述 | 类型 |
| --- | --- | --- |
| id | 节点id  | string \| number |
| text | 节点显示文字  | string |
| color | 节点颜色，如果配置，则替换options中配置，优先级高于options配置  | string |
| borderColor | 节点边框颜色，如果配置，则替换options中配置，优先级高于options配置  | string |

## lines属性
| 属性 | 描述 | 类型 |
| --- | --- | --- |
| from | 线起始点节点id  | string \| number |
| to | 线起终点节点id  | string \| number |
| text | 节点直接关系文字  | string |
| color | 线颜色，如果配置，则替换options中配置，优先级高于options配置  | string |