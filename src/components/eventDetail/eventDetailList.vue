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
      // eventDetail: []
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
  mounted () {
    // this.eventDetail = this.listData
  },
  watch: {
    // listData() {
    //   this.eventDetail = this.listData
    // }
  },
  methods: {
    ...mapActions([
      // 'getEventListData'
    ]),
    // 获取列表数据
    getDetailList() {},
  },
  props: [
    'listData'
  ]
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
