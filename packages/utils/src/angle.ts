const { PI } = Math
export function transfromAngle(angle: number, type: 'radian' | 'degree') {
    if (type === 'degree') {
        return (angle * PI) / 180
    } else {
        return (angle * 180) / PI
    }
}