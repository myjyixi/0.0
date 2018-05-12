<template>
  <div>
    <div id="chartG" class="chart_g"></div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import echarts from 'echarts'
// // 引入 echarts 主模块
// import * as echarts from 'echarts/lib/echarts'
// // 引入折线图
// import 'echarts/lib/chart/line'
// // 引入提示框组件、标题组件、工具箱组件
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/toolbox'

export default {
  data() {
    return {
      dataX: [58161.2682, 58161.2688, 58161.2695, 58161.2701, 58161.2707, 58161.2713, 58161.2719, 58161.2725, 58161.2730, 58161.2735, 58161.2740, 58161.2745, 58161.2750, 58161.2755, 58161.2760, 58161.2765, 58161.2770, 58161.2775, 58161.2780, 58161.2785, 58161.2790, 58161.2795, 58161.2800, 58161.2805],
      data_g: [979341138.5, 979313428.5, 979343428.5, 979344667.5, 979341548.5, 979341478.5, 979341784.5, 979341845.5, 979356738.5, 979387678.5, 979341858.5, 979344338.5, 979341365.5, 979347638.5, 979341858.5, 979341136.5, 979341368.5, 979368548.5, 979344638.5, 979342578.5, 979341458.5, 979348038.5, 979341748.5, 979341188.5],
      data_tide_corr: [-54.7, -51.7, -54.5, -54.2, -54.1, -54.7, -59.5, -54.7, -59.7, -54.0, -54.7, -54.7, -55.7, -52.7, -54.7, -54.5, -54.7, -52.7, -54.5, -54.7, -59.7, -54.8, -54.7, -52.2]
    }
  },
  computed: {
    ...mapGetters([
      // 'eventListData'
    ])
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      // 'getEventListData'
    ]),
    initGraph() {
      this.chartForG = echarts.init(document.getElementById('chartG'))
      this.chartForG.resize()
    },
    drawGraph() {
      let that = this
      this.chartForG.setOption({
      title: {
        text: 'GIS图表',
        x: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false
        }
      },
      // axisPointer: {
      //   link: {xAxisIndex: 'all'}
      // },
      // dataZoom: [
      //   {
      //     show: true,
      //     realtime: true,
      //     start: 30,
      //     end: 70,
      //     xAxisIndex: [0, 1]
      //   },
      //   {
      //     type: 'inside',
      //     realtime: true,
      //     start: 30,
      //     end: 70,
      //     xAxisIndex: [0, 1]
      //   }
      // ],
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: that.dataX
      },
      yAxis: [{
        name: '重力值',
        type: 'value',
        scale: true
      }, {
        name: '潮汐模型修正',
        type: 'value',
        scale: true
      }],
      series: [{
        name: '重力值',
        type: 'line',
        hoverAnimation: false,
        data: that.data_g
      }, {
        name: '潮汐模型修正',
        type: 'line',
        yAxisIndex: 1,
        hoverAnimation: false,
        data: that.data_tide_corr
      }]
    })
    }
  }
}
</script>
<style lang="scss" scoped>
.chart_g {
  width: 80%;
  min-width: 800px;
  height: 500px;
  margin: 0 auto;
}
</style>
