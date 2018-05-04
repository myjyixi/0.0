import * as TYPE from '../type.constant'
import API_EVENT from 'src/service/event.service'

const state = {
  eventListData: [] // 测量事件列表
}

const getters = {
  eventListData: state => state.eventListData,
}

const actions = {
  // 获取测量事件
  getEventListData({ commit }) {
    return new Promise((resolve, reject) => {
      API_EVENT.getEventListData().then(data => {
        commit(TYPE.GET_EVENT_DATA, data.data)
        resolve(data.data)
      })
    })
  }
}

const mutations = {
  [TYPE.GET_EVENT_DATA](state, data) {
    state.eventListData = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
