import * as TYPE from '../type.constant'
import API_USER from 'src/service/user.service'

const state = {
  tokenState: '',
  userData: {},
}

const getters = {
  tokenState: state => state.tokenState,
  userData: state => state.userData
}

const actions = {
  // 用户登录
  login({ commit }, loginData) {
    return new Promise((resolve, reject) => {
      API_USER.login(loginData).then(data => {
        commit(TYPE.GET_TOKEN, data.token)
        resolve(data)
      })
    })
  },
  // 获取token
  getToken({ commit }, code) {
    // return new Promise((resolve, reject) => {
      commit(TYPE.GET_TOKEN, code)
    //   resolve(data)
    // })
  },
  // 获取用户数据
  getUserData({ commit }, token) {
    return new Promise((resolve, reject) => {
      API_USER.getUserData(token ? token : state.tokenState).then(data => {
        commit(TYPE.GET_USER_DATA, data)
        resolve(data)
      })
    })
  },
}

const mutations = {
  [TYPE.GET_TOKEN](state, data) {
    state.tokenState = data
  },
  [TYPE.GET_USER_DATA](state, data) {
    state.userData = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
