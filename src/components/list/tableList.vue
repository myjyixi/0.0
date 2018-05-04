<template>
  <div>
    <div class="toolbox_control">
      <slot name="toolbox_search"></slot>
    </div>
    <div v-loading="loading" element-loading-text="数据较多,请耐心等待">
      <slot name="tableData" :listData="listData"></slot>
      <div class="pagination" v-if="!hidePagination">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pagination.pageIndex"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.totalNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from 'src/misc/pagination'
export default {
  data() {
    return {
      pagination: pagination,
      loading: false,
    }
  },
  mounted() {
    // 重置分页数据
    this.pagination.init()
  },
  watch: {
    listData() {
      this.loading = false
    },
  },
  methods: {
    /**
     * 每页条数改变
     * @param val {Number} 每页条数
     */
    handleSizeChange(val) {
      this.pagination.pageSize = val
      // 获取list数据
      this.searchListData()
    },
    /**
     * 当前页改变
     * .sync 可以同步设置到pagination
     */
    handleCurrentChange() {
      // 获取list数据
      this.searchListData()
    },
    /**
     * 获取list数据
     */
    searchListData() {
      this.isLoading()
      // 调用获取数据方法
      this.$emit('getListData')
    },
    isLoading() {
      this.loading = true
    }
  },
  props: [
    'listData',
    'hidePagination',
  ]
}
</script>

<style lang="scss" scoped>
.toolbox_control {
  width: 100%;
  background: #f1f2f3;
  .toolbox_search {
    display: inline-block;
    margin: 9px 20px;
  }
}
.pagination {
  float: right;
  padding: 5px;
  margin-right: 20px;
}
</style>
