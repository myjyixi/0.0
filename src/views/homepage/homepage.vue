<template>
  <div>
    <table-list ref="tableList" :listData="eventList" @getListData="getEventList">
      <template slot="toolbox">
        <div class="search-time">
          <el-date-picker v-model="searchTime" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss" @change="getEventList()">
          </el-date-picker>
        </div>
        <div class="search-keyword" @keydown.enter="getEventList()">
          <el-input v-model="searchWord" clearable placeholder="测量事件名/地点/仪器/操作员">
            <el-button slot="append" @click="getEventList()">搜索</el-button>
          </el-input>
        </div>
      </template>
      <template slot="tableData" slot-scope="scope">
        <el-table class="table-list" ref="multipleTable" :data="scope.listData" tooltip-effect="dark" stripe>
          <el-table-column label="测量事件名" prop="event_name" align="center">
            <template slot-scope="scope">
              <span class="event-click" @click="goEvent(scope.row.id)">{{scope.row.event_name}}</span>
            </template>
          </el-table-column>
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
              <span>
                {{scope.row.g.toFixed(7)}}
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
      </template>
    </table-list>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from 'src/misc/utils'
export default {
  data() {
    return {
      utils: utils,
      eventList: [],
      searchTime: [],
      searchWord: ''
    }
  },
  computed: {
    ...mapGetters([
      'eventListData'
    ])
  },
  mounted() {
    this.getEventListData().then(() => {
      this.eventList = this.eventListData
    })
  },
  watch: {
    eventListData() {
      this.eventList = this.eventListData
    }
  },
  methods: {
    ...mapActions([
      'getEventListData',
      'getEventDetailData'
    ]),
    // 获取事件列表
    getEventList() {
      this.getEventListData([...this.searchTime, this.searchWord])
      // console.log(this.searchTime)
    },
    /**
     * 跳转至事件详细数据
     * @param pid {Number} 导入数据id
     */
    goEvent(pid) {
      this.$router.push({
        path: '/eventDetail?id=' + pid
      })
      // 获取测量事件详细数据
      this.getEventDetailData(pid)
    },
    goUser() {
    }
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
</style>
