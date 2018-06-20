<template>
  <table-list ref="tableList" :listData="eventDetail" @getListData="getDetailList">
    <template slot="tableData" slot-scope="scope">
      <el-table class="table-list" ref="multipleTable" :data="scope.listData" tooltip-effect="dark" stripe>
        <el-table-column label="MJD" prop="mjd" align="center"></el-table-column>
        <el-table-column label="原始重力值(μGal)" prop="g" align="center"></el-table-column>
        <el-table-column label="模型修正重力值(μGal)" prop="g_corr" align="center"></el-table-column>
        <el-table-column label="倾斜修正(μGal)" prop="corr_tilt" align="center"></el-table-column>
        <el-table-column label="潮汐模型修正(μGal)" prop="corr_tide" align="center"></el-table-column>
        <el-table-column label="系统无关项(μGal)" prop="independ" align="center"></el-table-column>
      </el-table>
    </template>
  </table-list>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      // 'eventListData'
    ]),
    eventDetail() {
      return this.listData
    }
  },
  methods: {
    ...mapActions([
      'getEventDetailData'
    ]),
    // 获取列表数据（用于分页获取）
    getDetailList() {
      this.getEventDetailData(this.getEventId())
    },
    // 获取事件id
    getEventId() {
      return this.$router.currentRoute.query.id
    },
  },
  props: [
    'listData'
  ]
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
