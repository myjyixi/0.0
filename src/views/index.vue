<template>
  <div class='container'>
    <div class="left">
      <sider-bar></sider-bar>
    </div>
    <div class="mainContent">
      <div class="header_wraper">
        <header-bar class="fixed"></header-bar>
      </div>
      <div class="content">
        <content-header :name="headerTitle"></content-header>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import g_const from 'src/misc/global.constant'
import siderBar from 'components/header/siderBar.vue'
import headerBar from 'components/header/headerBar.vue'
import contentHeader from 'components/header/contentHeader.vue'
export default {
  name: 'App',
  computed: {
    headerTitle() {
      var _p = this.$route.path
      var _title = this.getTitle(_p)
      return _title
    }
  },
  methods: {
    getTitle(_path) {
      var ret = g_const.contentHeaderList.filter(o => {
        return o.path.toLocaleLowerCase() === _path.toLocaleLowerCase()
      })
      if (ret.length > 0) {
        return ret[0].label
      } else {
        var _ret = []
        g_const.contentHeaderList.forEach(k => {
          if (k.subItem && k.subItem instanceof Array) {
            k.subItem.forEach(item => {
              _ret.push(item)
            })
          }
        })
        ret = _ret.filter(t => {
          return t.path.toLocaleLowerCase() === _path.toLocaleLowerCase()
        })
        if (ret.length > 0) {
          return ret[0].label
        }
      }
      return ''
    }
  },
  components: {
    siderBar,
    headerBar,
    contentHeader
  }
}
</script>

<style lang="scss">
@import '../style/index.scss';

/*整体框架布局*/

.container {
  height: 100%;
  overflow: auto;
  *zoom: 1;
}

.mainContent {
  /*左侧栏宽度*/
  margin-left: $siderbar-width;
  /*页面最小宽度*/
  min-width: $container-min-width;
  height: 100%;
  /*主内容区边距*/
  .content {
    margin: ($moduleMargin) $moduleMargin 0 $moduleMargin;
    box-shadow: 0px 0px 1px 0 #D1D1D1;
    padding-bottom: 0 !important;
    margin-bottom: 10px !important;
    min-height: 85%;
  }
  .content>div {
    height: 100%;
    overflow: hidden;
  }
}

.el-select-dropdown.chartSel {
  border: 0;
  .el-scrollbar {
    background-color: $chart-bg;
  }
  .el-select-dropdown__item {
    color: $white;
    &.selected {
      background-color: $chart-bg;
      color: $primary;
    }
    background-color: $chart-bg;
    &:hover {
      color: $primary;
    }
  }
}

.left {
  z-index: 800;
  position: fixed;
  height: 100%;
  width: $siderbar-width;
  float: left;
  background-color: $siderbar-bg;
}

.header_wraper {
  position: relative;
  height: 30px;
}
// 头部冻结样式
.fixed {
  z-index: 800;
  position: fixed;
  left: $siderbar-width;
  right: 0;
  min-width: $container-min-width;
}
</style>
