<template>
  <div>
    <!-- 事件信息 -->
    <el-table class="table-list" ref="multipleTable" :data="eventData">
      <el-table-column label="测量事件名" prop="event_name" align="center"></el-table-column>
      <el-table-column label="地点" prop="site" align="center"></el-table-column>
      <el-table-column label="经纬度" prop="location" align="center">
        <template slot-scope="scope">
          <span>
            {{utils.formatLon(scope.row.longitude)}}&nbsp;&nbsp;
            {{utils.formatLat(scope.row.latitude)}}
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
          <span>{{scope.row.g.toFixed(7)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="仪器" prop="instrument" align="center"></el-table-column>
      <el-table-column label="操作员" prop="operator" align="center">
        <template slot-scope="scope">
          <span class="event-click" @click="goUser">{{scope.row.operator}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 详细数据 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="表格数据" name="tableData">
        <event-detail-list :listData="detailData"></event-detail-list>
      </el-tab-pane>
      <el-tab-pane label="图示" name="graph">
        <event-detail-graph ref="graph"></event-detail-graph>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from 'src/misc/utils'
// import pagination from 'src/misc/pagination'
import eventDetailList from 'components/eventDetail/eventDetailList'
import eventDetailGraph from 'components/eventDetail/eventDetailGraph'
export default {
  data() {
    return {
      utils: utils,
      // pagination: pagination,
      activeName: 'tableData',
    }
  },
  computed: {
    ...mapGetters([
      'eventDetailData'
    ]),
    eventData() {
      return this.eventDetailData.event
    },
    detailData() {
      return this.eventDetailData.detail
    }
  },
  mounted () {
    // 如果数据为空，获取测量事件详细数据
    if (JSON.stringify(this.eventData) === '[]' || JSON.stringify(this.detailData) === '[]') {
      this.getEventDetailData(this.getEventId())
    }
  },
  methods: {
    ...mapActions([
      'getEventDetailData'
    ]),
    // 获取事件id
    getEventId() {
      return this.$router.currentRoute.query.id
    },
    goUser() {},
    handleClick(val) {
      if (val.name === 'graph') {
        this.$nextTick(() => {
          // 绘制图表
          this.$refs.graph.initGraph()
          this.$refs.graph.drawGraph()
        })
      }
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
  // padding: 0;
  .event-click {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
