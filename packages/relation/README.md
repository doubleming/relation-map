<h2 style="text-align: center;"> 社交关系图 </h2>

![alt relation](./relation.gif)

## 安装
```sh
# npm 
npm install @double_ming/relation
# yarn 
yarn add @double_ming/relation
# pnpm
pnpm add @double_ming/relation
```

## 使用
```ts
import { Graph } from "@double_ming/relation";
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
// 第一个参数rootId代表canvas中心显示得节点id，nodes和lines分别为节点和连线
graph.draw('N6', lines, nodes)

// 重新增量更新配置
graph.update(options)
```

> 事件监听
```ts
// 目前仅完成click事件的触发
// 订阅click事件，当click触发时，会自动调用回调函数，同一事件可以订阅多个事件
graph.on('click', (node) => {
  alert(`当前点击节点为：${node.origin.text}`)
})
// 订阅第二个事件
graph.on('click', (node) => {
  alert('graph被点击了')
})
```

## 更新动态
- 2023/8/5 新增加graph 更新功能
- 2023/8/5 新增加连线是否为虚线，以及是否线条流动
- 2023/8/4 简了包体积
- 2023/7/31 修复了缩放时文字错位问题

## options配置参数
| 属性 | 描述   | 类型   | 默认值  | 
| --- | --- | --- | --- |
| color | 节点颜色  | string   | #65a30d |
| nodeTextColor | 节点文本颜色  | string   | #fff |
| lineColor | 连线颜色  | string   | #16a34a |
| lineFontColor | 连线字体颜色  | string   | #16a34a |
| lineWidth | 连线线宽，默认为1  | number   | 1 |
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
| isDashLine | 是否是虚线，默认不是  | boolean   | false |
| dashPattern | 虚线的模式，默认为[10, 10]  | number[]   | [10, 10] |
| isLineFlow | 线条是否流动，默认不流动  | boolean   | false |

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