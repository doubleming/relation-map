import { Graph } from "@double_ming/relation";
export function setupCounter(element: HTMLCanvasElement) {
  const nodes = [
    { 'id': 'N1', 'text': '侯亮平', 'color': '#ec6941', 'borderColor': '#ff875e' },
    { 'id': 'N2', 'text': '李达康', 'color': '#ec6941', 'borderColor': '#ff875e' },
    { 'id': 'N3', 'text': '祁同伟', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff' },
    { 'id': 'N4', 'text': '陈岩石', 'color': '#ec6941', 'borderColor': '#ff875e' },
    { 'id': 'N5', 'text': '陆亦可', 'color': '#ec6941', 'borderColor': '#ff875e' },
    { 'id': 'N6', 'text': '高育良', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff' },
    { 'id': 'N7', 'text': '沙瑞金', 'color': '#ec6941', 'borderColor': '#ff875e' },
    { 'id': 'N8', 'text': '高小琴', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff' },
    { 'id': 'N9', 'text': '高小凤', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff' },
    { 'id': 'N10', 'text': '赵东来', 'color': '#ec6941', 'borderColor': '#ff875e' },
    { 'id': 'N11', 'text': '程度', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff' },
    { 'id': 'N12', 'text': '吴惠芬', 'color': '#ec6941', 'borderColor': '#ff875e' },
    { 'id': 'N13', 'text': '赵瑞龙', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff' },
    { 'id': 'N14', 'text': '赵立春', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff' },
    { 'id': 'N15', 'text': '陈海', 'color': '#ec6941', 'borderColor': '#ff875e' },
    { 'id': 'N16', 'text': '梁璐', 'color': '#ec6941', 'borderColor': '#ff875e' },
    { 'id': 'N17', 'text': '刘新建', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff' },
    { 'id': 'N18', 'text': '欧阳菁', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff' },
    { 'id': 'N19', 'text': '吴心怡', 'color': '#ec6941', 'borderColor': '#ff875e' },
    { 'id': 'N20', 'text': '蔡成功', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff' },
    { 'id': 'N21', 'text': '丁义珍', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff' }
  ]
  const lines = [{ 'from': 'N6', 'to': 'N1', 'text': '师生', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N6', 'to': 'N3', 'text': '师生', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N14', 'to': 'N6', 'text': '前领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N14', 'to': 'N13', 'text': '父子', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N14', 'to': 'N17', 'text': '前部队下属', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N2', 'to': 'N14', 'text': '前任秘书', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N3', 'to': 'N8', 'text': '情人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N4', 'to': 'N15', 'text': '父子', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N5', 'to': 'N15', 'text': '属下', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N7', 'to': 'N4', 'text': '故人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N3', 'to': 'N15', 'text': '师哥', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N3', 'to': 'N1', 'text': '师哥', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N1', 'to': 'N15', 'text': '同学，生死朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N6', 'to': 'N12', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N15', 'to': 'N10', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N8', 'to': 'N9', 'text': '双胞胎', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N10', 'to': 'N5', 'text': '爱慕', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N3', 'to': 'N11', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N6', 'to': 'N9', 'text': '情人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N13', 'to': 'N3', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N2', 'to': 'N10', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N13', 'to': 'N11', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N7', 'to': 'N2', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N7', 'to': 'N6', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N3', 'to': 'N16', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N12', 'to': 'N16', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N2', 'to': 'N18', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N13', 'to': 'N17', 'text': '洗钱工具', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N13', 'to': 'N8', 'text': '勾结，腐化', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N13', 'to': 'N9', 'text': '腐化', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N19', 'to': 'N5', 'text': '母女', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N19', 'to': 'N12', 'text': '姐妹', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N20', 'to': 'N1', 'text': '发小', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N20', 'to': 'N18', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d' },
  { 'from': 'N18', 'to': 'N17', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d' },
  { 'from': 'N17', 'to': 'N13', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d' },
  { 'from': 'N2', 'to': 'N21', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N8', 'to': 'N21', 'text': '策划出逃', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N3', 'to': 'N21', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
  { 'from': 'N13', 'to': 'N21', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }]

  const graph = new Graph(element, {
    height: 800,
    width: 1200,
    level: 2,
    isDashLine: true,
    isLineFlow: true
  })
  // graph.on('click', (node) => {
  //   alert(`当前点击节点为：${node.origin.text}`)
  // })
  graph.draw('N6', lines, nodes)

  return graph
}
