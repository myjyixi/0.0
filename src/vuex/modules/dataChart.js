import * as TYPE from '../type.constant'
import g_const from '../../misc/global.constant'
import API_MARKET from '../../service/marketing.service'
import API_DATA_CHART from '../../service/dataChart.service'
import store from '../store'
import moment from 'moment'
import utils from '../../misc/utils'

const state = {
  dataChartData: [], // 左侧栏数据
  dataChartAllData: [], // 全局数据
  levelChartAllData: [], // 全局数据
  rebuyTimeData: [], // 复购时间
  reveivedPaymentsCycleData: [], // 回款周期
}

const getters = {
  dataChartData: state => {
    return state.dataChartData
  },
  dataChartAllData: state => {
    return state.dataChartAllData
  },
  levelChartAllData: state => {
    return state.levelChartAllData
  },
  rebuyTimeData: state => {
    return state.rebuyTimeData
  },
  reveivedPaymentsCycleData: state => {
    return state.reveivedPaymentsCycleData
  }

}

const actions = {
  // 全局数据
  getDataChartAll({ commit }, month) {
    API_DATA_CHART.getDataChartAll(month).then(arrayData => {
      commit(TYPE.GET_DATA_CHART_ALL_DATA, arrayData)
    })
  },
  // 会员等级
  getLevelChartAll({ commit }, month) {
    API_DATA_CHART.getLevelChartAll(month).then(arrayData => {
      commit(TYPE.GET_LEVEL_CHART_ALL_DATA, arrayData)
    })
  },
  // 复购时间
  getRebuyTime({ commit }, [week, type]) {
    API_DATA_CHART.getRebuyTime(week, type).then(data => {
      commit(TYPE.GET_REBUY_TIME_DATA, data)
    })
  },
  // 回款周期
  getReveivedPaymentsCycle({ commit }, [month, type]) {
    API_DATA_CHART.getReveivedPaymentsCycle(month, type).then(data => {
      commit(TYPE.GET_REVEIVED_PAYMENTS_CYCLE_DATA, data)
    })
  },
  // 左侧栏数据
  getDataChartSidebar({ commit }, data) {
    commit(TYPE.GET_DATACHART_SIDEBAR, data)
  }
}

const mutations = {
  [TYPE.GET_DATA_CHART_ALL_DATA](state, arrayData) {
    var _list = config.data_menu_list.map((o, index) => {
      var filer_data = arrayData[0].filter(k => {
        return k.name === o.name
      })
      if (filer_data && filer_data.length > 0) {
        o.value = o.processData ? o.processData(filer_data[0].value) : filer_data[0].value
      }
      o.data = arrayData[index + 1]
      return o
    })
    state.dataChartAllData = _list
  },
  [TYPE.GET_LEVEL_CHART_ALL_DATA](state, arrayData) {
    var _list = config.level_menu_list.map((o, index) => {
      var filer_data = arrayData[0].filter(k => {
        return k.name === o.name
      })
      if (filer_data && filer_data.length > 0) {
        o.value = o.processData ? o.processData(filer_data[0].value) : filer_data[0].value
      }
      o.data = arrayData[index + 1]
      return o
    })
    state.levelChartAllData = _list
  },
  [TYPE.GET_REBUY_TIME_DATA](state, data) {
    state.rebuyTimeData = data
  },
  [TYPE.GET_REVEIVED_PAYMENTS_CYCLE_DATA](state, data) {
    state.reveivedPaymentsCycleData = data
  },
  [TYPE.GET_DATACHART_SIDEBAR](state, data) {
    data = [
      {
        title: 'ROI',
        type: 'ROI_P4P_SYS',
        id: '' // 必须有
      },
      {
        title: '复购人数',
        type: 'FUGOURENSHU_P4P_SYS',
        id: ''
      },
      {
        title: '复购金额',
        type: 'FUGOUJINE_P4P_SYS',
        id: ''
      },
      {
        title: '复购客单价',
        type: 'FUGOUKEDANJIA_P4P_SYS',
        id: ''
      },
      {
        title: '复购客件数',
        type: 'FUGOUKEJIANSHU_P4P_SYS',
        id: ''
      },
      {
        title: '复购客类数',
        type: 'FUGOUKELEISHU_P4P_SYS',
        id: ''
      },
      {
        title: '会员等级',
        type: 'HUIYUANDENGJI_P4P_SYS',
        id: ''
      },
      {
        title: '分布相关',
        type: 'FENBUXIANGGUAN_P4P_SYS',
        id: ''
      },
      {
        title: '密度图',
        type: 'MIDUTU_P4P_SYS',
        id: ''
      },
      {
        title: '汇总',
        type: 'VIP_LEVEL_ALL_P4P_SYS',
        id: ''
      },
      // {
      //   title: '人数',
      //   type: 'VIP_LEVEL_NUM_P4P_SYS',
      //   id: ''
      // },
      {
        title: '累计成交金额',
        type: 'VIP_LEVEL_MONEY_P4P_SYS',
        id: ''
      },
      {
        title: '累计成交次数',
        type: 'VIP_LEVEL_DEAL_NUM_P4P_SYS',
        id: ''
      },
      {
        title: '客单价',
        type: 'VIP_LEVEL_PER_MONEY_P4P_SYS',
        id: ''
      },
      {
        title: '客件数',
        type: 'VIP_LEVEL_PER_NUM_P4P_SYS',
        id: ''
      },
      {
        title: '每人次客类数',
        type: 'VIP_LEVEL_PER_CATEGORY_P4P_SYS',
        id: ''
      },
      {
        title: '复购地域',
        type: 'REBUY_AREA_P4P_SYS',
        id: ''
      },
      {
        title: '复购24小时下单分布',
        type: 'REBUY_24H_ORDER_P4P_SYS',
        id: ''
      },
      {
        title: '复购24小时付款间隔分布',
        type: 'REBUY_24H_BUY_TIME_P4P_SYS',
        id: ''
      },
      {
        title: '复购订单周期性分布',
        type: 'REBUY_ORDER_CYCLE_P4P_SYS',
        id: ''
      },
      {
        title: '客单价分布',
        type: 'PER_PAYMENT_P4P_SYS',
        id: ''
      },
      {
        title: '复购时间',
        type: 'REBUY_TIME_P4P_SYS',
        id: ''
      },
      {
        title: '回款周期',
        type: 'RECEIVED_PAYMENTS_CYCLE_P4P_SYS',
        id: ''
      },
      {
        title: '复购周期',
        type: 'REBUY_CYCLE_P4P_SYS',
        id: ''
      },
      {
        title: '合并订单管理',
        type: 'MERGE_ORDER_P4P_SYS',
        id: ''
      }
    ]
    var ret = []
    ret = API_MARKET.mergeMarketingData(g_const.dataChart, data)
    state.dataChartData = ret
  }
}
// 图表配置（通用）主要处理小数点格式化问题
var getChartOptionFloat = (data, splitNumber, name, unit, s1Name) => {
  return {
    tooltip: {
      trigger: 'axis',
      formatter: function (array) {
        var rebuy = array[0]
        var first_buy = array[1]
        var week = ''
        var date = ''
        var tip = ''
        if (rebuy && first_buy) {
          week = rebuy.name.split('-')[0]
          date = rebuy.name.replace(week + '-', '')
          tip = week + '(' + date + ')' + '</br>' + utils.getLegendHtml(rebuy.color) + rebuy.seriesName + ':' + parseFloat(rebuy.value).toFixed(2) + unit + '</br>' + utils.getLegendHtml(first_buy.color) + first_buy.seriesName + ':' + parseFloat(first_buy.value).toFixed(2) + unit
        } else if (rebuy && !first_buy) {
          week = rebuy.name.split('-')[0]
          date = rebuy.name.replace(week + '-', '')
          tip = week + '(' + date + ')' + '</br>' + utils.getLegendHtml(rebuy.color) + rebuy.seriesName + ':' + parseFloat(rebuy.value).toFixed(2) + unit
        } else if (!rebuy && first_buy) {
          week = first_buy.name.split('-')[1]
          date = first_buy.name.replace(week + '-', '')
          tip = week + '(' + date + ')' + '</br>' + utils.getLegendHtml(first_buy.color) + first_buy.seriesName + ':' + parseFloat(first_buy.value).toFixed(2) + unit
        }
        return tip
      }
    },
    yAxis: {
      name: name,
      axisLabel: {
        formatter: function (param) {
          return parseFloat(param).toFixed(2)
        }
      }
    },
    series: [{
      name: s1Name ? s1Name : '复购'
    }]
  }
}
// 处理roi图表 特殊名称显示
var getChartOptionFloatRoi = (data, splitNumber, name, unit) => {
  return getChartOptionFloat(data, splitNumber, name, unit, 'ROI投入产出比')
}
// 图表配置（会员等级）
var getChartOptionLevel = (obj, splitNumber, name) => {
  var opt = {}
  var series = []
  obj.data.forEach((o, index) => {
    opt = {
      name: o.group_name,
      type: 'line',
      tooltip: {
        trigger: 'axis'
      },
      lineStyle: {
        normal: {
          width: 1,
          borderColor: g_const.common_colors[index]
        }
      },
      symbol: 'none',
      smooth: true,
      itemStyle: {
        normal: {
          color: g_const.common_colors[index]
        }
      },
      areaStyle: undefined,
      data: o.group_values
    }
    series.push(opt)
  })
  return {
    // xAxis: {
    //   axisLabel: {
    //     formatter: this.axisLabelFormat
    //   }
    // },
    tooltip: {
      formatter: undefined
    },
    series: series
  }
}

// 图表配置（会员等级）
var getChartOptionFloatLevel = (obj, splitNumber, name, unit) => {
  var opt = {}
  var series = []
  obj.data.forEach((o, index) => {
    opt = {
      name: o.group_name,
      type: 'line',
      tooltip: {
        trigger: 'axis'
      },
      lineStyle: {
        normal: {
          width: 1
        }
      },
      symbol: 'none',
      smooth: true,
      itemStyle: {
        normal: {
          color: g_const.common_colors[index]
        }
      },
      areaStyle: undefined,
      data: o.group_values
    }
    series.push(opt)
  })
  return {
    tooltip: {
      formatter: undefined
    },
    series: series,
    yAxis: {
      name: name,
      axisLabel: {
        formatter: function (param) {
          return parseFloat(param).toFixed(2)
        }
      }
    },
    // xAxis: {
    //   axisLabel: {
    //     formatter: this.axisLabelFormat
    //   }
    // }
  }
}
var processData = val => {
  if (val || val === 0) {
    return parseFloat(val).toFixed(2)
  } else {
    return '0.00'
  }
}
const config = {
  data_menu_list: [
    {
      title: 'ROI投入产出比',
      _title: 'ROI', // 左侧菜单对应文字
      name: 'ROI',
      img: '',
      unit: '',
      processData: processData,
      getChartOption: getChartOptionFloatRoi
    },
    {
      title: '复购总人数',
      _title: '复购人数',
      name: 'rebuyNum',
      img: '',
      unit: '人',
      getChartOption: ''
    },
    {
      title: '复购累计金额',
      _title: '复购金额',
      name: 'rebuyMoney',
      img: '',
      unit: '￥',
      processData: processData,
      getChartOption: getChartOptionFloat
    },
    {
      title: '复购客单价',
      _title: '复购客单价',
      name: 'rebuyPermoney',
      img: '',
      unit: '￥',
      processData: processData,
      getChartOption: getChartOptionFloat
    },
    {
      title: '复购客件数',
      _title: '复购客件数',
      name: 'rebuyPernum',
      img: '',
      unit: '件',
      getChartOption: ''
    },
    {
      title: '复购每人次客类数',
      _title: '复购客类数',
      name: 'rebuyPercategory',
      img: '',
      unit: '人',
      getChartOption: ''
    }
  ],
  level_menu_list: [
    {
      title: '汇总',
      name: 'summary',
      img: '',
      unit: ''
    },
    // {
    //   title: '人数',
    //   value: '201112',
    //   name: 'peopleNum',
    //   img: '',
    //   unit: '人',
    //   getChartOption: getChartOptionLevel
    // },
    {
      title: '累计成交金额',
      name: 'summaryMoney',
      img: '',
      unit: '￥',
      processData: processData,
      getChartOption: getChartOptionFloatLevel
    },
    {
      title: '累计成交次数',
      name: 'summaryDealNum',
      img: '',
      unit: '次',
      getChartOption: getChartOptionLevel
    },
    {
      title: '客单价',
      name: 'perMoney',
      img: '',
      unit: '￥',
      processData: processData,
      getChartOption: getChartOptionFloatLevel
    },
    {
      title: '客件数',
      name: 'perBuyNum',
      img: '',
      unit: '件',
      getChartOption: getChartOptionLevel
    },
    {
      title: '每人次客类数',
      name: 'perCategoryNum',
      img: '',
      unit: '类',
      getChartOption: getChartOptionLevel
    }
  ]
}

export default {
  state,
  getters,
  actions,
  mutations
}
