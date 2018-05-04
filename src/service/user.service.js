/*
 * @Author: xiamu
 * @Date: 2018-05-02 19:36:50
 * @Last Modified by: xiamu
 * @Last Modified time: 2018-05-03 22:30:04
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
      CommonHttpTransform.get('/account' + param).then(function (data) {
        resolve(data.data)
      })
    })
  },
  // 获取token
  getToken(code) {
    return new Promise(function (resolve, reject) {
      CommonHttpTransform.get('/auth/login?code=' + code).then(function (data) {
        resolve(data.token)
      })
    })
  },
}
