import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <div style="margin-bottom: 10px">操作提示：鼠标中间拖动画布、ctrl+滚轮缩放、 点击节点则以该节点为中心，动画转移画布</div>
  <canvas id="canvas"></canvas>
  </div>
`

setupCounter(document.querySelector<HTMLCanvasElement>('#canvas')!)
