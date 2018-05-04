import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import plugins from './plugins'
// import * as TYPE from './type.constant'
import user from './modules/user'
import event from './modules/event'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
  },
  getters,
  mutations,
  actions,
  plugins,
  modules: {
    user,
    event
  }
})
