/*
 * @Author: xiamu
 * @Date: 2018-05-01 19:42:44
 * @Last Modified by: xiamu
 * @Last Modified time: 2018-05-06 23:15:47
 */
export default {
  // 侧边菜单
  sidebarList: [
    {
      label: '首页',
      path: '/homepage',
      value: 'homepage',
      icon: 'icon-shouye1'
    }, {
      label: '事件管理',
      value: 'eventManager',
      path: '/eventManager',
      icon: 'icon-iconwenjian'
    }, {
      label: '用户管理',
      path: '/userManager',
      value: 'userManager',
      icon: 'icon-userSet',
    }
  ],
  // 头部标题
  contentHeaderList: [
    {
      label: '首页',
      path: '/homepage'
    }, {
      label: '测量事件',
      path: '/eventDetail'
    }, {
      label: '事件管理',
      path: '/eventManager'
    }, {
      label: '用户管理',
      path: '/userManager'
    }
  ],
}
