import { Point } from "./distance";
export enum AnimationType {
    EasyIn,
    EasyOut,
    EasyInOUt,
    QuadraticIn,
    QuadraticOut,
    QuadraticInOut,
    ElasticIn,
    ElasticOut,
    ElasticInOut
}

export function tween<T extends Point | number>(type: AnimationType, from: T, to: T, duration: number) {

    function easyNone(from: number, to: number, elapsed: number) {
        return from + (to - from) * elapsed
    }

    function easyIn(from: number, to: number, elapsed: number) {
        return easyNone(from, to, elapsed)
    }

    function easyOut(from: number, to: number, elapsed: number) {
        return easyNone(from, to, elapsed)
    }

    function easyInOut(from: number, to: number, elapsed: number) {
        return easyNone(from, to, elapsed)
    }
    function quadraticIn(from: number, to: number, elapsed: number) {
        return from + (to - from) * elapsed * elapsed
    }

    function quadraticOut(from: number, to: number, elapsed: number) {
        return from + (to - from) * elapsed * (2 - elapsed)
    }

    function quadraticInOut(from: number, to: number, elapsed: number) {
        let e = 0
        if ((elapsed *= 2) < 1) {
            e = 0.5 * elapsed * elapsed
        } else {
            e = -0.5 * (--elapsed * (elapsed - 2) - 1)
        }
        return from + (to - from) * e
    }

    function elasticIn(from: number, to: number, elapsed: number) {
        let e = 0
        if (elapsed === 0) {
            e = 0
        }

        if (elapsed === 1) {
            e = 1
        }
        e = -Math.pow(2, 10 * (elapsed - 1)) * Math.sin((elapsed - 1.1) * 5 * Math.PI)

        return from + (to - from) * e
    }


    function elasticOut(from: number, to: number, elapsed: number) {
        let e = 0
        if (elapsed === 0) {
            e = 0
        }

        if (elapsed === 1) {
            e = 1
        }
        e = Math.pow(2, -10 * elapsed) * Math.sin((elapsed - 0.1) * 5 * Math.PI) + 1

        return from + (to - from) * e
    }


    function elasticInOut(from: number, to: number, elapsed: number) {
        let e = 0
        if (elapsed === 0) {
            e = 0
        }

        if (elapsed === 1) {
            e = 1
        }

        elapsed *= 2

        if (elapsed < 1) {
            e = -0.5 * Math.pow(2, 10 * (elapsed - 1)) * Math.sin((elapsed - 1.1) * 5 * Math.PI)
        }

        e = 0.5 * Math.pow(2, -10 * (elapsed - 1)) * Math.sin((elapsed - 1.1) * 5 * Math.PI) + 1

        return from + (to - from) * e
    }


    const fnMap = new Map<AnimationType, (from: number, to: number, time: number) => number>()
    fnMap.set(AnimationType.EasyIn, easyIn)
    fnMap.set(AnimationType.EasyOut, easyOut)
    fnMap.set(AnimationType.EasyInOUt, easyInOut)
    fnMap.set(AnimationType.QuadraticIn, quadraticIn)
    fnMap.set(AnimationType.QuadraticOut, quadraticOut)
    fnMap.set(AnimationType.QuadraticInOut, quadraticInOut)
    fnMap.set(AnimationType.ElasticIn, elasticIn)
    fnMap.set(AnimationType.ElasticOut, elasticOut)
    fnMap.set(AnimationType.ElasticInOut, elasticInOut)

    return function animation(time: number) {
        const fn = fnMap.get(type)!
        let elapsed = time / duration
        elapsed = duration === 0 ? 1 : elapsed > 1 ? 1 : elapsed
        if (typeof from === 'number' && typeof to === 'number') {
            return fn(from, to, elapsed) as T
        }
        if (typeof from === 'object' && typeof to === 'object') {
            return {
                x: fn(from.x, to.x, elapsed),
                y: fn(from.y, to.y, elapsed)
            } as T
        }
    }
}