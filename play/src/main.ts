import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <canvas id="canvas"></canvas>
  </div>
`

setupCounter(document.querySelector<HTMLCanvasElement>('#canvas')!)
