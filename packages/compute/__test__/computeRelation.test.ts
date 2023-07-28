import { ILine, INode, Node } from "@double_ming/relation";
import { computeRelation } from "@double_ming/relation-compute";
import { describe, it, expect } from 'vitest'

describe('computeRelation', () => {
    it('node compute', () => {
        const nodes: INode[] = [
            { 'id': '1', 'text': 'a', 'color': '#ec6941', 'borderColor': '#ff875e' },
            { 'id': '2', 'text': 'b', 'color': '#ec6941', 'borderColor': '#ff875e' },
            { 'id': '3', 'text': 'c', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff' },
           
        ]
        const lines: ILine[] = [
            { 'from': '1', 'to': '2', 'text': 'ab', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
            { 'from': '1', 'to': '3', 'text': 'ac', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
            { 'from': '2', 'to': '3', 'text': 'bc', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
            { 'from': '2', 'to': '1', 'text': 'ba', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }
        ]
        const n = nodes.map(node => new Node(node, {} as any))
        computeRelation(n, lines)
        expect(n.find(({id}) => id === "1")?.toRelation.map(n => n.id)).include('2')
        expect(n.find(({id}) => id === "1")?.toRelation.map(n => n.id)).include('3')
        expect(n.find(({id}) => id === "2")?.toRelation.map(n => n.id)).include('1')
        expect(n.find(({id}) => id === "2")?.toRelation.map(n => n.id)).include('3')
    })
})