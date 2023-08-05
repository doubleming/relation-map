import './style.css'
import { setupCounter } from './counter.ts'
import { OptionType } from '@double_ming/relation'

const graph = setupCounter(document.querySelector<HTMLCanvasElement>('#canvas')!)

function update(type: string) {
  const options = {} as OptionType
  if (type === 'solid') {
    options.isDashLine = false
  }
  if (type === 'dash') {
    options.isDashLine = true
  }
  if (type === 'static') {
    options.isLineFlow = false
  }
  if (type === 'flow') {
    options.isLineFlow = true
  }
  graph.update(options)
}


(window as any).update = update