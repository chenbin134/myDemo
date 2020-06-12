var echarts = require('echarts');
import { even,fun2 } from './demo'
even();
fun2();
const myChart = echarts.init(document.getElementById('box'));
// 绘制图表
myChart.setOption({
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
    },
    {
        name: '销量',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
    }
]
});