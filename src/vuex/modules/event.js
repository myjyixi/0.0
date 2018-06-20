import * as TYPE from '../type.constant'
import API_EVENT from 'src/service/event.service'

const state = {
  eventListData: [], // 测量事件列表
  eventDetailData: { // 测量事件详细数据
    event: [],
    detail: []
  },
  eventDetailData_all: {
    event_id: '',
    data_mjd: [],
    data_g: [],
    data_g_corr: [],
    data_corr_tilt: [],
    data_corr_tide: [],
    data_independ: []
  }
}

const getters = {
  eventListData: state => state.eventListData,
  eventDetailData: state => state.eventDetailData,
  eventDetailData_all: state => state.eventDetailData_all,
}

const actions = {
  // 获取测量事件列表
  getEventListData({ commit }, [startTime, endTime, keyword] = []) {
    return new Promise((resolve, reject) => {
      API_EVENT.getEventListData(startTime, endTime, keyword).then(data => {
        commit(TYPE.GET_EVENT_LIST_DATA, data)
        resolve(data)
      })
    })
  },
  // 删除测量事件
  delEventData({ commit }, [eventId, startTime, endTime, keyword] = []) {
    return new Promise((resolve, reject) => {
      API_EVENT.delEventData(eventId, startTime, endTime, keyword).then(data => {
        commit(TYPE.GET_EVENT_LIST_DATA, data)
        resolve(data)
      })
    })
  },
  // 获取测量事件详细数据（分页）
  getEventDetailData({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      API_EVENT.getEventDetailData(eventId).then(data => {
        commit(TYPE.GET_EVENT_DETAIL_DATA, data)
        resolve(data)
      })
    })
  },
  // 获取测量事件详细数据（全部-绘图）
  getEventDetailAllData({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      API_EVENT.getEventDetailAllData(eventId).then(data => {
        commit(TYPE.GET_EVENT_DETAIL_ALL_DATA, data)
        resolve(data)
      })
    })
  },
  // 上传测量事件
  uploadEventData({ commit }, eventData) {
    return new Promise((resolve, reject) => {
      API_EVENT.uploadEventData(eventData).then(data => {
        resolve(data)
      })
    })
  },
  // 下载文件
  downloadFile({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      API_EVENT.downloadFile(eventId).then(data => {
        resolve(data)
      })
    })
  },
}

const mutations = {
  [TYPE.GET_EVENT_LIST_DATA](state, data) {
    state.eventListData = data
  },
  [TYPE.GET_EVENT_DETAIL_DATA](state, data) {
    state.eventDetailData.event = data.event
    state.eventDetailData.detail = data.detail
  },
  [TYPE.GET_EVENT_DETAIL_ALL_DATA](state, data) {
    // 重置
    state.eventDetailData_all = {
      event_id: '',
      data_mjd: [],
      data_g: [],
      data_g_corr: [],
      data_corr_tilt: [],
      data_corr_tide: [],
      data_independ: []
    }
    // 赋值
    state.eventDetailData_all.event_id = data.event_id
    data.detail.forEach(item => {
      state.eventDetailData_all.data_mjd.push(item.mjd)
      state.eventDetailData_all.data_g.push(item.g)
      state.eventDetailData_all.data_g_corr.push(item.g_corr)
      state.eventDetailData_all.data_corr_tilt.push(item.corr_tilt)
      state.eventDetailData_all.data_corr_tide.push(item.corr_tide)
      state.eventDetailData_all.data_independ.push(item.independ)
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
