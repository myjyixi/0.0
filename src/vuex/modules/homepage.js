import * as TYPE from '../type.constant'
import g_const from '../../misc/global.constant'
import API_MARKET from '../../service/marketing.service'
import store from '../store'
import moment from 'moment'

const state = {
  homePageSidebarData: [],
  headerConstant: [],
  allHomeData: [],
  lossPreventionData: [],
  careData: []
}

const getters = {
  homePageSidebarData: state => {
    return state.homePageSidebarData
  },
  headerConstant: state => {
    return state.headerConstant
  },
  allHomeData: state => {
    return state.allHomeData
  },
  lossPreventionData: state => {
    return state.lossPreventionData
  },
  careData: state => {
    return state.careData
  }
}

const actions = {
  getHomePageSidebar({ commit }) {
    var mj = store.state.marketJob
    // 未加载营销列表，则加载
    if (!mj || !mj.length) {
      API_MARKET.getMarketingJob().then(data => {
        commit(TYPE.GET_HOMEPAGE_SIDEBAR, data)
      })
    } else {
      commit(TYPE.GET_HOMEPAGE_SIDEBAR, mj)
    }
  },
  getHeaderConstant({ commit }) {
    // var _getAct = store._actions
    // _getAct.getActivateCustomerSidebar[0]()
    // _getAct.getCareSidebar[0]()
    // _getAct.getFirstBuySidebar[0]()
    // _getAct.getHomePageSidebar[0]()
    // _getAct.getLossPreventionSidebar[0]()
    // _getAct.getMaintenanceSidebar[0]()
    // _getAct.getSaveCustomerSidebar[0]()
    store.dispatch('getCareSidebar')
    store.dispatch('getLossPreventionSidebar')
    commit(TYPE.GET_HEADER_CONSTANT)
  }
}

const mutations = {
  [TYPE.GET_HOMEPAGE_SIDEBAR](state, data) {
    var ret = []
    ret = API_MARKET.mergeMarketingData(g_const.HomepageSidebar, data)
    state.homePageSidebarData = ret
  },
  [TYPE.GET_HEADER_CONSTANT](state, data) {
    var _allData = g_const
    // 整理执行一览表展示内容
    state.allHomeData = tools.getOverViewData(_allData.allMarket)
    state.careData = tools.getOverViewData(_allData.Care)
    state.lossPreventionData = tools.getOverViewData(_allData.LossPrevention)
    var _data = [
      {
        icon: 'icon-shouye',
        name: '首页',
        state: '/homepage',
        fooState: 'homepage'
      }
    ]
    var _getters = store.getters
    // if (_getters.activateCustomerSidebarData.length > 0) {
    //   _data.push({
    //     icon: 'icon-activateCustomer',
    //     name: '激活',
    //     state: '/activateCustomer',
    //     fooState: 'activateCustomer',
    //   })
    // }
    if (_getters.lossPreventionSidebarData.length > 0) {
      _data.push({
        icon: 'icon-lossPrevention',
        name: '流失防御',
        state: '/lossPrevention',
        fooState: 'defense'
      })
    }
    if (_getters.careSidebarData.length > 0) {
      _data.push({
        icon: 'icon-aixin',
        name: '关怀',
        state: '/care',
        fooState: 'care'
      })
    }
    // if (_getters.firstBuySidebarData.length > 0) {
    //   _data.push({
    //     icon: 'icon-firstBuy',
    //     name: '处女购',
    //     state: '/firstBuy',
    //     fooState: 'firstBuy',
    //   })
    // }
    // if (_getters.maintenanceSidebarData.length > 0) {
    //   _data.push({
    //     icon: 'icon-users',
    //     name: '维护',
    //     state: '/maintenance',
    //     fooState: 'maintenance'
    //   })
    // }
    // if (_getters.saveCustomerSidebarData.length > 0) {
    //   _data.push({
    //     icon: 'icon-care',
    //     name: '挽回',
    //     state: '/saveCustomer',
    //     fooState: 'saveCustomer',
    //   })
    // }
    _data.push(
      {
        icon: 'icon-crown',
        name: '会员管理',
        state: '/memberManage/home',
        fooState: 'memberManage'
      }, {
        icon: 'icon-iconwenjian',
        name: '执行一览表',
        state: '/tasklist/home',
        fooState: 'tasklist'
      }, {
        icon: 'icon-care',
        name: '扩展场景',
        state: 'buyMarketingJob',
        fooState: 'buyMarketingJob',
      }
    )
    state.headerConstant = _data
  }
}

const tools = {
  // 整理总览页数据
  getOverViewData(data) {
    var _homeData = []
    if (data[0].hasOwnProperty('mainData')) {
      for (var i in data) {
        var _list = API_MARKET.taskListMarketingData(data[i].mainData, store.state.marketJob)
        if (_list.length > 0) {
          _homeData.push({
            name: data[i].name,
            icon: data[i].icon,
            isShow: data[i].isShow,
            mainData: _list
          })
        }
      }
    } else {
      _homeData = API_MARKET.taskListMarketingData(data, store.state.marketJob)
    }
    return _homeData
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
