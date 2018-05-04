<template>
  <div>
    <table-list ref="tableList" :listData="userList" @getListData="getUserList">
      <template slot="tableData" slot-scope="scope">
        <el-table class="table-list" ref="multipleTable" :data="scope.listData" @sort-change="sortChange" tooltip-effect="dark" stripe>
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
      </template>
    </table-list>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import pagination from 'src/misc/pagination'
export default {
  data() {
    return {
      pagination: pagination,
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
    goUser() {
      this.$router.push({
        path: '/eventDetail'
      })
    }
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
