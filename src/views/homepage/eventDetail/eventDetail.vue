<template>
  <div>
    <!-- 事件信息 -->
    <el-table class="table-list" ref="multipleTable" :data="eventData">
      <el-table-column label="上传时间" prop="update_time" align="center">
        <template slot-scope="scope">
          <p>{{utils.format_date(scope.row.update_time)}}</p>
          <p>{{utils.format_time(scope.row.update_time)}}</p>
        </template>
      </el-table-column>
      <el-table-column label="测量时间" prop="measure_time" align="center">
        <template slot-scope="scope">
          <p>{{utils.format_date(scope.row.measure_time)}}</p>
          <p>{{utils.format_time(scope.row.measure_time)}}</p>
        </template>
      </el-table-column>
      <el-table-column label="地点" prop="site" align="center"></el-table-column>
      <el-table-column label="经纬度" prop="location" align="center">
        <template slot-scope="scope">
          <span>
            <p>{{utils.formatLon(scope.row.longitude)}}</p>
            <p>{{utils.formatLat(scope.row.latitude)}}</p>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="高度(m)" prop="height" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.height.toFixed(7)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="重力值(μGal)" prop="g" align="center">
        <template slot-scope="scope">
          <span>
            {{scope.row.g ? scope.row.g.toFixed(7) : '/'}}
            {{scope.row.uncertainty ? ('(' + scope.row.uncertainty + ')') : ''}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="仪器" prop="instrument" align="center"></el-table-column>
      <el-table-column label="操作员" prop="operator" align="center">
        <template slot-scope="scope">
          <span class="event-click" @click="goUser">{{scope.row.operator}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="list-wrapper">
      <!-- 详细数据 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="表格数据" name="tableData">
          <event-detail-list :listData="detailData"></event-detail-list>
        </el-tab-pane>
        <el-tab-pane label="图示" name="graph">
          <event-detail-graph ref="graph"></event-detail-graph>
        </el-tab-pane>
      </el-tabs>
      <el-button size="mini" class="download" @click="download">下载</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from 'src/misc/utils'
import eventDetailList from 'components/eventDetail/eventDetailList'
import eventDetailGraph from 'components/eventDetail/eventDetailGraph'
export default {
  data() {
    return {
      utils: utils,
      activeName: 'tableData',
    }
  },
  computed: {
    ...mapGetters([
      'eventDetailData'
    ]),
    // 事件信息
    eventData() {
      return this.eventDetailData.event
    },
    // 事件详情
    detailData() {
      return this.eventDetailData.detail
    },
    // 获取事件id
    eventId() {
      return this.$router.currentRoute.query.id
    },
  },
  mounted () {
    // 如果数据为空，获取测量事件详细数据（用于刷新）
    if (JSON.stringify(this.eventData) === '[]' || JSON.stringify(this.detailData) === '[]') {
      this.getEventDetailData(this.eventId)
    }
  },
  methods: {
    ...mapActions([
      'getEventDetailData',
      'downloadFile'
    ]),
    goUser() {},
    handleClick(val) {
      if (val.name === 'graph') {
        this.$nextTick(() => {
          // 绘制图表
          this.$refs.graph.initGraph()
          this.$refs.graph.drawGraph()
        })
      }
    },
    // 下载文件
    download() {
      // 获取下载文件数据
      this.downloadFile(this.eventId).then(data => {
        let csvData = data
        let a = document.createElement('a')
        // 转码、下载
        a.href = 'data:text/txt;charset=utf-8,\ufeff' + encodeURIComponent(csvData)
        a.download = `h5_detail_${this.eventId}.csv`
        a.click()
      })
    }
  },
  components: {
    eventDetailList,
    eventDetailGraph
  }
}
</script>
<style lang="scss" scoped>
.table-list {
  width: 100%;
  .event-click {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
.list-wrapper {
  position: relative;
  .download {
    position: absolute;
    top: 5px;
    right: 50px;
  }
}
</style>
