import { AnimationType, tween } from '../tween'
import { it, describe, expect } from 'vitest'

describe('tween test', () => {
    it('get object 0.5 in 1000s', () => {
        const startPoint = {x: 0, y: 0}
        const endPoint = {x: 1, y: 1}
        const ani = tween(AnimationType.EasyIn, startPoint, endPoint, 2000)
        expect(ani(1000)).toStrictEqual({x: 0.5, y: 0.5})
    })
})