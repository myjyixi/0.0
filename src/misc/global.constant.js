/*
 * @Author: xiamu
 * @Date: 2018-05-01 19:42:44
 * @Last Modified by: xiamu
 * @Last Modified time: 2018-05-02 17:23:40
 */
export default {
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
      icon: 'icon-userSet',
      subItem: [{
        pid: 'userManager',
        label: '短信管理',
        path: '/userManager/smsManager',
        value: 'smsManager',
      }, {
        pid: 'userManager',
        label: '黑白名单',
        path: '/userList',
        value: 'userList',
      }]
    }, {
      label: '用户管理',
      path: '/userManager',
      value: 'userManager',
      icon: 'icon-message',
      subItem: [{
        pid: 'msgManager',
        label: '通知管理',
        path: '/notice',
        value: 'notice',
      }]
    }
  ],
}
