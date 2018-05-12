/*
 * @Author: xiamu
 * @Date: 2018-05-02 19:36:50
 * @Last Modified by: xiamu
 * @Last Modified time: 2018-05-11 17:13:23
 */
import CommonHttpTransform from './commonHttpTransform.service.js'
export default {
  /**
   * 登录
   * @param {Object} loginData 登录信息
   */
  login(loginData) {
    return new Promise((resolve, reject) => {
      CommonHttpTransform.post('/login', loginData).then(data => {
        resolve(data.data)
      })
    })
  },
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
  /**
   * @api {post} /login 账号登录
   * @apiVersion 1.0.0
   * @apiGroup User
   *
   * @apiDescription 账号登录
   *
   * @apiParam {Object} data 账号信息
   * @apiParam {String} data.user_name 用户名
   * @apiParam {String} data.password 密码
   *
   * @apiSuccess {Object} data
   * @apiSuccess {String} data.token 返回token或空字符串
   * @apiSuccess {String} data.message 登录信息（success or fail）
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    data: {
   *      token: "123456",
   *      message: "success"
   *    }
   *  }
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 401 Not Authenticated
   *  {
   *    data: {
   *      token: "",
   *      message: "fail"
   *    }
   *  }
  */

  /**
   * @api {get} /account 获取用户数据
   * @apiVersion 1.0.0
   * @apiGroup User
   *
   * @apiDescription 获取用户数据
   *
   * @apiParam {String} user_id 用户id
   * @apiParam {String} token
   *
   * @apiSuccess {Object} data
   * @apiSuccess {String} data.user_id 用户id
   * @apiSuccess {String} data.user_name 用户名
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    data: {
   *      user_id: 123456,
   *      user_name: "xiamu"
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
