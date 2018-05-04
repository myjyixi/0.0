<template>
  <div>
    <el-table class="table-list" ref="multipleTable" :data="listData" @sort-change="sortChange" tooltip-effect="dark" stripe>
      <el-table-column label="测量事件名" prop="event_name" align="center" min-width="130">
        <template slot-scope="scope">
          <span class="event-click" @click="goEvent">{{scope.row.event_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地点" prop="site"></el-table-column>
      <el-table-column label="经纬度" prop="location">
        <template slot-scope="scope">
          <span>
            {{scope.row.location.longitude}}&nbsp;&nbsp;
            {{scope.row.location.latitude}}&nbsp;&nbsp;
            {{scope.row.location.height}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="重力值" prop="g"></el-table-column>
      <el-table-column label="仪器" prop="instrument"></el-table-column>
      <el-table-column label="操作员" prop="operator">
        <template slot-scope="scope">
          <span class="event-click" @click="goUser">{{scope.row.operator}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="表格数据" name="tableData">
        <table-list ref="tableList" :listData="userList" @getListData="getUserList">
          <template slot="tableData" slot-scope="scope">
            <el-table class="table-list" ref="multipleTable" :data="scope.listData" @sort-change="sortChange" tooltip-effect="dark" stripe>
              <el-table-column label="MJD" prop="event_name" align="center" min-width="130">
                <template slot-scope="scope">
                  <span class="event-click" @click="goEvent">{{scope.row.event_name}}</span>
                </template>
              </el-table-column>
              <el-table-column label="原始重力值" prop="site"></el-table-column>
              <el-table-column label="模型修正重力值" prop="location">
                <template slot-scope="scope">
                  <span>
                    {{scope.row.location.longitude}}&nbsp;&nbsp;
                    {{scope.row.location.latitude}}&nbsp;&nbsp;
                    {{scope.row.location.height}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="倾斜修正" prop="g"></el-table-column>
              <el-table-column label="潮汐模型修正" prop="instrument"></el-table-column>
              <el-table-column label="系统无关项" prop="operator">
                <template slot-scope="scope">
                  <span class="event-click" @click="goUser">{{scope.row.operator}}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </table-list>
      </el-tab-pane>
      <el-tab-pane label="图示" name="graph">
        <!-- <update-record></update-record> -->
        图表。。
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import pagination from 'src/misc/pagination'
export default {
  data() {
    return {
      pagination: pagination,
      listData: [{
        id: 1,
        event_name: 'April 27 event',
        site: 'Hangzhou',
        location: {longitude: '120E', latitude: '30N', height: '20m'},
        g: 9.8,
        instrument: 'ZAG-01',
        operator: 'xiamu'
      }],
      activeName: 'tableData',
      userList: []
    }
  },
  computed: {
    ...mapGetters([
      'eventListData'
    ])
  },
  mounted () {
    // if (this.userList === []) {
      // }
    this.getEventListData().then(() => {
      this.userList = this.eventListData
    })
  },
  methods: {
    ...mapActions([
      'getEventListData'
    ]),
    getUserList() {},
    sortChange() {},
    goEvent() {
      console.log('--hello')
    },
    goUser() {},
    handleClick() {}
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
