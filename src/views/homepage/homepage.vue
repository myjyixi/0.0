<template>
  <div>
    <table-list ref="tableList" :listData="eventList" @getListData="getEventList">
      <template slot="toolbox">
        <div class="search-time">
          <el-date-picker v-model="searchTime" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss" @change="getEventList()">
          </el-date-picker>
        </div>
        <div class="search-keyword" @keydown.enter="getEventList()">
          <el-input v-model="searchWord" clearable placeholder="地点/仪器/操作员">
            <el-button slot="append" @click="getEventList()">搜索</el-button>
          </el-input>
        </div>
      </template>
      <template slot="tableData" slot-scope="scope">
        <el-table class="table-list" ref="multipleTable" :data="scope.listData" tooltip-effect="dark" stripe>
          <el-table-column label="上传时间" prop="update_time" align="center">
            <template slot-scope="scope">
              <span class="click-link" @click="goEvent(scope.row.id)">
                <p>{{utils.format_date(scope.row.update_time)}}</p>
                <p>{{utils.format_time(scope.row.update_time)}}</p>
              </span>
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
                {{scope.row.g ? scope.row.g.toFixed(1) : ''}}
                {{scope.row.uncertainty ? ('(' + scope.row.uncertainty + ')') : ''}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="仪器" prop="instrument" align="center"></el-table-column>
          <el-table-column label="操作员" prop="operator" align="center">
            <template slot-scope="scope">
              <span class="click-link" @click="goUser">{{scope.row.operator}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="props">
              <!-- <span @click="editData(props.row.id)" class="click-link">编辑</span>&nbsp;&nbsp; -->
              <span @click="delEvent(props.row.id)" class="click-link" style="color: #409EFF">删除</span>
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
      searchTime: ['', ''],
      searchWord: ''
    }
  },
  computed: {
    ...mapGetters([
      'eventListData'
    ])
  },
  mounted() {
    // 获取列表数据
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
      'getEventDetailData',
      'delEventData'
    ]),
    // 获取事件列表
    getEventList() {
      this.getEventListData([...(this.searchTime === null ? ['', ''] : this.searchTime), this.searchWord])
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
    // 删除历史记录
    delEvent(eventId) {
      let that = this
      this.$confirm('确定删除该条记录?', '提示', {dangerouslyUseHTMLString: true}, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除事件请求
        that.delEventData([eventId, ...(this.searchTime === null ? ['', ''] : this.searchTime), this.searchWord]).then(data => {
          if (data) {
            utils.showSuccessMsg(that, '已成功删除')
          } else {
            utils.showErrorMsg(that, '删除失败')
          }
        })
      }).catch(() => {
        utils.showInfoMsg(that, '已取消删除')
      })
    },
    goUser() {
    }
  }
}
</script>
<style lang="scss" scoped>
.table-list {
  width: 100%;
  .click-link {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
