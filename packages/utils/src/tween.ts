import { Point } from "./distance";
export enum AnimationType {
    EasyIn,
    EasyOut,
    EasyInOUt,
    QuadraticIn,
    QuadraticOut,
    QuadraticInOut,
}

export function tween(type: AnimationType, from: Point, to: Point,  duration: number) {

    function easyNone(from: number, to: number, elapsed: number){
        return  from + (to - from) * elapsed
    }

    function easyIn (from: number, to: number, elapsed: number){
        return  easyNone(from, to, elapsed)
    }

    function easyOut (from: number, to: number, elapsed: number){
        return  easyNone(from, to, elapsed)
    }

    function easyInOut (from: number, to: number, elapsed: number){
        return  easyNone(from, to, elapsed)
    }
    function quadraticIn (from: number, to: number, elapsed: number){
        return  from + (to - from) * elapsed  * elapsed
    }

    function quadraticOut(from: number, to: number, elapsed: number) {
        return from + (to - from) * elapsed * (2 - elapsed)
    }

    function quadraticInOut(from: number, to: number, elapsed: number) {
        let e =  0
        if ((elapsed *= 2) < 1) {
            e = 0.5 * elapsed * elapsed
        } else {
            e = -0.5 * (--elapsed * (elapsed - 2) - 1)
        }
        return from + (to - from) * e
    }

    const fnMap = new Map<AnimationType, (from: number, to: number, time: number)=> number >()
    fnMap.set(AnimationType.EasyIn, easyIn)
    fnMap.set(AnimationType.EasyOut, easyOut)
    fnMap.set(AnimationType.EasyInOUt, easyInOut)
    fnMap.set(AnimationType.QuadraticIn, quadraticIn)
    fnMap.set(AnimationType.QuadraticOut, quadraticOut)
    fnMap.set(AnimationType.QuadraticInOut, quadraticInOut)

    return function animation(time: number) {
        const fn = fnMap.get(type)!
        let elapsed = time / duration
        elapsed = duration === 0 ? 1 : elapsed  > 1 ? 1 : elapsed
        return {
            x: fn(from.x, to.x, elapsed),
            y: fn(from.y, to.y, elapsed)
        } 
    }
}