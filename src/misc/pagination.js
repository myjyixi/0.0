var Pagination = function () {
  // 分页
  this.pageSizes = [10, 15, 30, 50, 100]
  this.pageSize = 10
  this.pageIndex = 1
  this.totalNum = 0
  this.doPage = function (data) {
    var ret = []
    if (data.length <= 0) return { totalNum: 0, data: [] }
    this.totalNum = data.length
    ret = data.filter((o, index) => {
      return (index + 1) > (this.pageIndex - 1) * this.pageSize && (index + 1) <= (this.pageIndex) * this.pageSize
    })
    return { totalNum: this.totalNum, curPageData: ret, filterData: data }
  }
  this.init = function () {
    this.pageSize = 10
    this.pageIndex = 1
  }
}
export default new Pagination()
