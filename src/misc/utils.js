/*
 * 工具类函数
 * @Author: xiamu
 * @Date: 2018-05-03 01:36:37
 * @Last Modified by: xiamu
 * @Last Modified time: 2018-06-20 22:27:53
 */
import vue from 'vue'
import global from './global.constant'

export default {
  ///////////////localStore 过期时间函数//////////////////
  setLocalStore(key, value) {
    if (value.data) {
      value = value.data
    }
    var curTime = new Date().getTime();
    window.localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }));
  },
  getLocalStore(data) {
    var dataObj = data
    if (new Date().getTime() - dataObj.time > 1000 * 60 * 60) {
      return {
        timeout: true,
        data: dataObj.data
      }
    } else {
      return {
        timeout: false,
        data: dataObj.data
      }
    }
  },
  ///////////////// 消息提醒 /////////////////
  showSuccessMsg(t, msg, cb) {
    t.$message({
      message: msg,
      type: 'success',
      customClass: 'message_position',
      onClose: () => {
        if (cb) {
          cb()
        }
      }
    })
  },
  showInfoMsg(t, msg, cb) {
    t.$message({
      message: msg,
      type: 'info',
      customClass: 'message_position',
      onClose: () => {
        if (cb) {
          cb()
        }
      }
    })
  },
  showWarningMsg(t, msg, cb) {
    t.$message({
      message: msg,
      type: 'warning',
      customClass: 'message_position',
      onClose: () => {
        if (cb) {
          cb()
        }
      }
    })
  },
  showErrorMsg(t, msg, cb) {
    t.$message({
      message: msg,
      type: 'error',
      customClass: 'message_position',
      onClose: () => {
        if (cb) {
          cb()
        }
      }
    })
  },
  // 格式化日期（用于表格）
  format_date(val) {
    if (!val) {
      return '/'
    } else {
      let time = val.split(' ')
      return time[0]
    }
  },
  // 格式化时间（用于表格）
  format_time(val) {
    if (!val) {
      return '/'
    } else {
      let time = val.split(' ')
      return time[1]
    }
  },
  // 获取当前时间(yy-MM-DD HH:mm:SS)
  getNowTime() {
    let nowDate = new Date()
    let year = nowDate.getFullYear()
    let month = nowDate.getMonth() + 1
    let date = nowDate.getDate()
    let hours = nowDate.getHours()
    let minute = nowDate.getMinutes()
    let second = nowDate.getSeconds()

    let nowTime = year + '-' + this.formatTime(month) + '-' + this.formatTime(date) + ' ' +
        this.formatTime(hours) + ':' + this.formatTime(minute) + ':' + this.formatTime(second)
    return nowTime
  },
  // 日期补零
  formatTime(val) {
    if (val > 9) {
      return val
    } else {
      return '0' + val
    }
  },
  // 经度格式
  formatLon(val) {
    if (val > 0) {
      return Math.abs(val).toFixed(7) + ' E'
    } else {
      return Math.abs(val).toFixed(7) + ' W'
    }
  },
  // 纬度格式
  formatLat(val) {
    if (val > 0) {
      return Math.abs(val).toFixed(7) + ' N'
    } else {
      return Math.abs(val).toFixed(7) + ' S'
    }
  },
}
