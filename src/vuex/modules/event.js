import * as TYPE from '../type.constant'
import API_EVENT from 'src/service/event.service'

const state = {
  eventListData: [], // 测量事件列表
  eventDetailData: { // 测量事件详细数据
    event: [],
    detail: []
  }
}

const getters = {
  eventListData: state => state.eventListData,
  eventDetailData: state => state.eventDetailData,
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
  // 获取测量事件详细数据
  getEventDetailData({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      API_EVENT.getEventDetailData(eventId).then(data => {
        commit(TYPE.GET_EVENT_DETAIL_DATA, data)
        resolve(data)
      })
    })
  }
}

const mutations = {
  [TYPE.GET_EVENT_LIST_DATA](state, data) {
    state.eventListData = data
  },
  [TYPE.GET_EVENT_DETAIL_DATA](state, data) {
    // state.eventListData.forEach(item => {
    //   if (item.id === pid) {
    //     state.eventDetailData.event = [item]
    //   }
    // })
    state.eventDetailData.event = data.event
    state.eventDetailData.detail = data.detail
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
