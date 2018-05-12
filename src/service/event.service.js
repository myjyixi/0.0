/*
 * @Author: xiamu
 * @Date: 2018-05-02 19:36:50
 * @Last Modified by: xiamu
 * @Last Modified time: 2018-05-12 14:10:41
 */
import CommonHttpTransform from './commonHttpTransform.service.js'
import pagination from 'src/misc/pagination'
export default {
  // 获取测量事件
  getEventListData(startTime = '', endTime = '', keyword = '') {
    return new Promise((resolve, reject) => {
      CommonHttpTransform.get(
        '/measure_event' +
        '?start_time=' + startTime + // 开始时间
        '&end_time=' + endTime + // 结束时间
        '&search=' + keyword + // 搜索关键字
        '&page=' + pagination.pageIndex + // 当前页码
        '&per_page=' + pagination.pageSize // 每页条数
      ).then(data => {
        if (data.pagination) {
          pagination.totalNum = data.pagination.total
          pagination.pageSize = data.pagination.per_page
          pagination.pageIndex = data.pagination.current_page
        }
        resolve(data.data)
      })
    })
  },
  // 获取测量事件详细数据
  getEventDetailData(eventId) {
    return new Promise((resolve, reject) => {
      // CommonHttpTransform.get(
      //   '/event_detail' +
      //   '?id=' + eventId + // 事件id
      //   '&page=' + pagination.pageIndex + // 当前页码
      //   '&per_page=' + pagination.pageSize // 每页条数
      // )
      console.log('/event_detail?id=' + eventId)
      let _data = {
        data: {
          event: [{
            id: 1,
            event_name: 'April 27 event',
            site: 'Hangzhou',
            longitude: 134.3223,
            latitude: 34.423,
            height: 123.34,
            g: 9.8,
            instrument: 'ZAG-01',
            operator: 'xiamu'
          }],
          detail: [{
            mjd: 58161.2682,
            g: 979341138.5,
            g_corr: 97341083.9,
            corr_tilt: 0.0,
            corr_tide: -54.7,
            independ: 5681.1
          }, {
            mjd: 58161.2688,
            g: 979341100.9,
            g_corr: 97341046.0,
            corr_tilt: 0.0,
            corr_tide: -54.9,
            independ: 5674.4
          }, {
            mjd: 58161.2695,
            g: 979341118.8,
            g_corr: 97341063.7,
            corr_tilt: 0.0,
            corr_tide: -55.1,
            independ: 5658.1
          }]
        },
        pagination: {
          per_page: 10,
          current_page: 1,
          total: 12
        }
      }
      if (_data.pagination) {
        pagination.totalNum = _data.pagination.total
        pagination.pageSize = _data.pagination.per_page
        pagination.pageIndex = _data.pagination.current_page
      }
      resolve(_data.data)
    })
  }

  /**
   * @api {get} /measure_event 获取测量事件
   * @apiVersion 1.0.0
   * @apiGroup Event
   *
   * @apiDescription 获取测量事件
   *
   * @apiParam {String} start_time 开始时间
   * @apiParam {String} end_time 结束时间
   * @apiParam {String} search 搜索关键字
   * @apiParam {String} page 当前页码
   * @apiParam {String} per_page 每页条数
   * @apiParam {String} user_id 用户id
   * @apiParam {String} token
   *
   * @apiSuccess {Object} data
   * @apiSuccess {Array} data.data event信息数组
   * @apiSuccess {Object} data.data.obj event信息
   * @apiSuccess {Number} data.data.obj.id 测量事件id
   * @apiSuccess {String} data.data.obj.event_name 测量事件名
   * @apiSuccess {String} data.data.obj.site 地点
   * @apiSuccess {Number} data.data.obj.longitude 经度
   * @apiSuccess {Number} data.data.obj.latitude 纬度
   * @apiSuccess {Number} data.data.obj.height 高度
   * @apiSuccess {Number} data.data.obj.g 重力值
   * @apiSuccess {String} data.data.obj.instrument 仪器
   * @apiSuccess {String} data.data.obj.operator 操作员
   *
   * @apiSuccess {Object} data.pagination 分页信息
   * @apiSuccess {Number} data.pagination.total 总页数
   * @apiSuccess {Number} data.pagination.per_page 每页条数
   * @apiSuccess {Number} data.pagination.current_page 当前页码
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    data: {
   *      data: [{
   *        id: 1,
   *        event_name: 'April 27 event',
   *        site: 'Hangzhou',
   *        longitude: '120E',
   *        latitude: '30N',
   *        height: '20m',
   *        g: 9.8,
   *        instrument: 'ZAG-01',
   *        operator: 'xiamu'
   *      }],
   *      pagination： {
   *        total: 123,
   *        per_page: 10,
   *        current_page: 1
   *      }
   *    }
   *  }
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 401 Not Authenticated
   *  {
   *    message: "授权失败，请稍后重试",
   *    status_code: 401
   *  }
  */

  /**
   * @api {get} /event_detail 获取测量事件详细数据
   * @apiVersion 1.0.0
   * @apiGroup Event
   *
   * @apiDescription 获取测量事件详细数据
   *
   * @apiParam {String} id 开始时间
   * @apiParam {String} page 当前页码
   * @apiParam {String} per_page 每页条数
   * @apiParam {String} user_id 用户id
   * @apiParam {String} token
   *
   * @apiSuccess {Object} data
   * @apiSuccess {Object} data.data event详细信息
   * @apiSuccess {Array} data.data.event event事件信息数组
   * @apiSuccess {Object} data.data.event.obj event事件信息
   * @apiSuccess {Number} data.data.event.obj.id 测量事件id
   * @apiSuccess {String} data.data.event.obj.event_name 测量事件名
   * @apiSuccess {String} data.data.event.obj.site 地点
   * @apiSuccess {Number} data.data.event.obj.longitude 经度
   * @apiSuccess {Number} data.data.event.obj.latitude 纬度
   * @apiSuccess {Number} data.data.event.obj.height 高度
   * @apiSuccess {Number} data.data.event.obj.g 重力值
   * @apiSuccess {String} data.data.event.obj.instrument 仪器
   * @apiSuccess {String} data.data.event.obj.operator 操作员
   *
   * @apiSuccess {Array} data.data.detail event详细信息数组
   * @apiSuccess {Object} data.data.detail.obj event详细信息
   * @apiSuccess {Number} data.data.detail.obj.mjd 时间
   * @apiSuccess {Number} data.data.detail.obj.g 原始重力值
   * @apiSuccess {Number} data.data.detail.obj.g_corr 模型修正重力值
   * @apiSuccess {Number} data.data.detail.obj.corr_tilt 倾斜修正
   * @apiSuccess {Number} data.data.detail.obj.corr_tide 潮汐模型修正
   * @apiSuccess {Number} data.data.detail.obj.independ 系统无关项
   *
   * @apiSuccess {Object} data.pagination 分页信息
   * @apiSuccess {Number} data.pagination.total 总页数
   * @apiSuccess {Number} data.pagination.per_page 每页条数
   * @apiSuccess {Number} data.pagination.current_page 当前页码
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    data: {
   *      data: {
   *        event: [{
   *          id: 1,
   *          event_name: 'April 27 event',
   *          site: 'Hangzhou',
   *          longitude: '120E',
   *          latitude: '30N',
   *          height: '20m',
   *          g: 9.8,
   *          instrument: 'ZAG-01',
   *          operator: 'xiamu'
   *        }],
   *        detail: [{
   *          mjd: 58161.2682,
   *          g: 979341138.5,
   *          g_corr: 97341083.9,
   *          corr_tilt: 0.0,
   *          corr_tide: -54.7,
   *          independ: 5681.1
   *        },{
   *          mjd: 58161.2688,
   *          g: 979341100.9,
   *          g_corr: 97341046.0,
   *          corr_tilt: 0.0,
   *          corr_tide: -54.9,
   *          independ: 5674.4
   *        }]
   *      },
   *      pagination： {
   *        total: 12,
   *        per_page: 10,
   *        current_page: 1
   *      }
   *    }
   *  }
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 401 Not Authenticated
   *  {
   *    message: "授权失败，请稍后重试",
   *    status_code: 401
   *  }
  */
}
