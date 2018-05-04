/*
 * @Author: xiamu
 * @Date: 2018-05-02 19:36:50
 * @Last Modified by: xiamu
 * @Last Modified time: 2018-05-04 14:32:11
 */
import CommonHttpTransform from './commonHttpTransform.service.js'
export default {
  // 获取用户数据
  getUserData(token) {
    var param = ''
    if (token) {
      param = '?token=' + token
    }
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/account' + param)
        .then(function (data) {
          resolve(data.data)
        })
    })
  },
  // 获取测量事件
  getEventListData() {
    return new Promise((resolve, reject) => {
      // CommonHttpTransform.get('/measure_event').then()
      let _data = {
        data: [{
          id: 1,
          event_name: 'April 27 event',
          site: 'Hangzhou',
          location: {longitude: '120E', latitude: '30N', height: '20m'},
          g: 9.8,
          instrument: 'ZAG-01',
          operator: 'xiamu'
        }],
        pagination: {
          pageSizes: [10, 15, 30, 50, 100],
          pageSize: 10,
          pageIndex: 1,
          totalNum: 0
        }
      }
      resolve(_data)
    })
  }
}
