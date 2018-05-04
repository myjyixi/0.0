<template>
  <div class="siderbar">
    <div class="logo">
      <img class="config_bg" src="../../assets/images/logo.jpg"/>
    </div>
    <div class="siderbar_main">
      <el-menu class="fix_width" :default-active="curMenu">
        <template v-for="(item, index) in sidebarListData">
          <el-submenu v-if="item.subItem" :index="getIndex(item)" :key="index">
            <template slot="title">
              <div @click="go(item)" :style="getIndex(item) === curMenu ? {color: '#0BB8F8'} : ''">
                <span class="iconfont" :class="item.icon">
                </span>
                {{ item.label }}
              </div>
            </template>
            <el-menu-item v-for="(subItem, subIndex) in item.subItem" @click="go(subItem)" :index="getIndex(subItem)" :key="subIndex">
              <span slot="title">{{ subItem.label }}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else @select="go(item)" @click="go(item)" :index="getIndex(item)" :key="item.value">
            <span class="iconfont" :class="item.icon"></span>
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import g_const from '../../misc/global.constant'
export default {
  data() {
    return {
      curMenu: '/homepage',
      sidebarListData: [],
    }
  },
  mounted() {
    this.sidebarListData = g_const.sidebarList
    this.curMenu = this.$route.path
  },
  watch: {
    $route(val) {
      this.curMenu = val.path
    }
  },
  methods: {
    go(item) {
      this.$router.push({
        path: item.path,
        query: {}
      })
    },
    getIndex(item) {
      // return (item.pid ? '/' + item.pid : '') + item.path
      return item.path
    }
  }
}

</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
// 齿轮动画
// @import '../../style/gear.css';

.siderbar {
  overflow: auto;
  height: 99%;
  div:not(.gearbox.gear) {
    height: auto;
  }
  .logo {
    height: 120px;
    width: 179px;
    position: fixed;
    overflow: hidden;
    z-index: 100;
    background: #fff;
    border-right: 1px solid #2c303c;
    .config_bg {
      display: block;
      margin: 0 auto;
      width: 125px;
    }
  }
  .node {
    padding: 5px 5px;
  }
  .sub_node {
    padding: 5px 0 5px 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .active {
    position: relative;
    .sub_node {
      color: $primary;
    }
    &:after {
      content: '';
      position: absolute;
      top: 7px;
      left: -15px;
      width: 3px;
      height: 15px;
      background-color: $primary;
      z-index: 10;
    }
  }
  .siderbar_main {
    margin-top: 120px;
    .fix_width {
      border-right: 1px solid #2c303b;
    }
  }
  .finish_state {
    color: #009933
  }
  .finish_state_n {
    margin-left: 3px;
    color: #858585;
  }
  .finish_state_r {
    margin-left: 3px;
    color: #0BB8F8;
  }
  .notAllowed {
    &:hover {
      cursor: not-allowed;
    }
  }
}
</style>
