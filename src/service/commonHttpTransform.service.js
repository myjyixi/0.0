/*
 * @Author: xiamu
 * @Date: 2018-05-02 19:26:15
 * @Last Modified by: xiamu
 * @Last Modified time: 2018-05-03 12:51:36
 */
import axios from 'axios'
import config from '../misc/config'
// import router from '../router/index'
import utils from '../misc/utils'
// import user from '../store/modules/user'
// 添加头部标识
// axios.defaults.headers.common['Accept'] = 'application/vnd.aicrm.v1+json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const userId = '132456'
// 添加请求拦截器
axios.interceptors.request.use(req => {
  // let userId = user.state.userData.user_id
  let token = ''
  // 存储localStorage上的token
  token = JSON.parse(window.localStorage.getItem(userId)) ? JSON.parse(window.localStorage.getItem(userId)).data : ''
  if (token) { // localStorage上有token
    // 将token存入本地
    utils.setLocalStore(userId, token)
  }
  // 将token放入header
  req.headers.common['Authorization'] = 'Bearer ' + token
  return req
}, error => {
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(res => {
  return res
}, error => {
  // let userId = user.state.userData.user_id
  if (error.response.data && error.response.data.status_code) {
    let res = error.response.data
    switch (res.status_code) {
      case 401:
        if (window) {
          window.localStorage.removeItem(userId)
          window.location.href = '/login.html?message=未授权登录！'
        }
        break
    }
  }
  return Promise.reject(error)
})
export default {
  /**
   * 处理get请求
   * @param {String} -path 路径
   * @returns {Promise.<Object>}
   */
  get(path) {
    return new Promise(function (resolve, reject) {
      axios.get(config.SERVER_URL + path)
        .then(function (res) {
          resolve(res.data)
        })
        .catch(function (error) {
          console.error(error)
          reject(error)
        })
    })
  },
  /**
   * 处理post请求
   * @param {String} - path 路径
   * @param {Object} - reqBody 请求体
   * @returns {Promise.<Object>}
   */
  post(path, reqBody) {
    return new Promise(function (resolve, reject) {
      axios.post(config.SERVER_URL + path, reqBody)
        .then(function (res) {
          resolve(res.data)
        })
        .catch(function (error) {
          reject(error.response.data)
        })
    })
  },
  postUpload(path, reqBody) {
    return new Promise(function (resolve, reject) {
      axios.post(config.SERVER_URL + path, reqBody, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(function (res) {
          resolve(res.data)
        })
        .catch(function (error) {
          console.error(error)
          reject(error)
        })
    })
  },

  put(path, reqBody) {
    return new Promise(function (resolve, reject) {
      if (!reqBody) reqBody = {}
      reqBody._method = 'PUT'
      axios.put(config.SERVER_URL + path, reqBody)
        .then(function (res) {
          resolve(res.data)
        })
        .catch(function (error) {
          console.error(error)
          reject(error)
        })
    })
  },
  delete(path, reqBody) {
    return new Promise(function (resolve, reject) {
      axios.delete(config.SERVER_URL + path, reqBody)
        .then(function (res) {
          resolve(res.data)
        })
        .catch(function (error) {
          console.error(error)
          reject(error)
        })
    })
  }
}
