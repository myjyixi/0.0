<template>
  <div>
    <div id="chartG" class="chart_g"></div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
// 引入 echarts 主模块
import * as echarts from 'echarts/lib/echarts'
// 引入折线图
import 'echarts/lib/chart/line'
// 引入提示框组件、标题组件、工具箱组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'eventDetailData_all'
    ]),
    // 获取事件id
    eventId() {
      return this.$router.currentRoute.query.id
    },
    // 图表横坐标
    data_x() {
      return this.eventDetailData_all.data_mjd
    },
    data_g() {
      return this.eventDetailData_all.data_g
    },
    data_g_corr() {
      return this.eventDetailData_all.data_g_corr
    },
    data_corr_tilt() {
      return this.eventDetailData_all.data_corr_tilt
    },
    data_corr_tide() {
      return this.eventDetailData_all.data_corr_tide
    },
    data_independ() {
      return this.eventDetailData_all.data_independ
    },
  },
  mounted () {
    // 获取绘图数据
    this.getEventDetailAllData(this.eventId)
  },
  methods: {
    ...mapActions([
      'getEventDetailAllData'
    ]),
    initGraph() {
      this.chartForG = echarts.init(document.getElementById('chartG'))
      this.chartForG.resize()
    },
    drawGraph() {
      let that = this
      this.chartForG.setOption({
        // 图例组件
        legend: {},
        // 信息提示框
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        // 工具栏
        toolbox: {
          feature: {
            dataZoom: {}, // 放大功能
            restore: {}, // 还原功能
            saveAsImage: {} // 保存图片功能
          }
        },
        axisPointer: {
          link: {xAxisIndex: 'all'}
        },
        // 缩放
        dataZoom: [
          { // 缩放条
            type: 'slider',
            start: 0,
            end: 100,
            xAxisIndex: [0],
            filterMode: 'none'
          }, {
            type: 'slider',
            start: 0,
            end: 100,
            yAxisIndex: [0],
            left: '93%',
            filterMode: 'none'
          }, { // 内部拖动
            type: 'inside',
            start: 0,
            end: 100,
            xAxisIndex: [0],
            filterMode: 'none'
          }, {
            type: 'inside',
            start: 0,
            end: 100,
            yAxisIndex: [0],
            filterMode: 'none'
          }
        ],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: that.data_x
        },
        yAxis: [{
          name: '重力值/修正',
          type: 'value',
          scale: true
        }, {
          name: '潮汐模型修正/系统无关项',
          type: 'value',
          scale: true
        }],
        series: [{
          name: '重力值',
          type: 'line',
          hoverAnimation: false,
          data: that.data_g
        }, {
          name: '模型修正重力值',
          type: 'line',
          hoverAnimation: false,
          data: that.data_g_corr
        }, {
          name: '倾斜修正',
          type: 'line',
          yAxisIndex: 1,
          hoverAnimation: false,
          data: that.data_corr_tilt
        }, {
          name: '潮汐模型修正',
          type: 'line',
          yAxisIndex: 1,
          hoverAnimation: false,
          data: that.data_corr_tide
        }, {
          name: '系统无关项',
          type: 'line',
          yAxisIndex: 1,
          hoverAnimation: false,
          data: that.data_independ
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
