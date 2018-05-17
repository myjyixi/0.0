<template>
  <div class="allTop">
    <div class="topTool">
      <div class="over_hidden">
        <span class="iconfont icon-message primary"></span>
        <span class="primary link">了解详情</span>
      </div>
      <ul class="list-menu over_header">
        <li class="link">
          <span class="iconfont icon-userSet">
          </span> 欢迎&nbsp;
          <el-dropdown trigger="click" @command="otherSettingClick">
            <span class="el-dropdown-link user">
              <span class="num">{{userData.user_name}}</span>
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix dropList" command="userLogout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
// import g_const from '../../misc/global.constant'
export default {
  data() {
    return {
      // headerData: [],
      // g_const: g_const,
      // user_nick: 'xiamu'
    }
  },
  mounted() {
    if (JSON.stringify(this.userData) === '{}') {
      this.getUserData()
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ]),
    // user() {
    //   return this.userInfo
    // }
  },
  methods: {
    ...mapActions([
      'getUserData'
    ]),
    otherSettingClick(code) {
      // 退出登录
      if (code === 'userLogout') {
        // if (window) {
        //   window.localStorage.removeItem(this.$store.state.user.userData.user_id)
        //   window.location.href = '/login.html'
        // }
        console.log('--logout')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
.allTop {
  /*头部背景色*/
  background-color: #fafafa; // background-image: linear-gradient(-180deg, #ffffff 0%, #f1f2f3 100%);
  box-shadow: 0px 0px 1px 0 #D1D1D1;
  font-size: $menuFontSize;
  /*顶部工具栏*/
  .topTool {
    color: #585858;
    line-height: 30px;
    height: 30px;
    margin: 0 6px;
    padding-left: $moduleMargin;
    position: relative;
    .num {
      color: $primary;
    }
    .iconfont {
      font-size: 13px;
    }
    li {
      padding: 0 4px;
    }
  }
  .headerMenu {
    border-top: 1px solid $line-color;
    border-bottom: 1px solid $line-color;
    height: 90px;
    padding-left: ($moduleMargin + 16);
    color: $menuColor;
    .iconfont {
      height: 40px;
      font-size: 40px;
    }
    li {
      margin: 15px 25px;
      float: left;
      span {
        display: block;
        text-align: center;
        margin-bottom: 5px;
      }
      &:hover {
        cursor: pointer;
        color: $primary;
      }
      a {
        &:hover {
          color: $primary;
        }
      }
    }
    .disabeldMenu {
      &:hover {
        color: $menuColor;
        cursor: default;
      }
    }
  }
}

.el-dropdown-menu {
  background-color: $yin;
}

.user {
  color: $primary;
  i {
    font-size: $menuFontSize;
    color: $menuColor;
  }
}

.dropList {
  font-size: 13px;
  text-align: center;
}

.over_hidden {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap; // width: 32%;
  padding-right: 760px;
  cursor: pointer;
}

.over_header {
  position: absolute;
  right: 0px;
  top: 0px;
  padding-right: 10px;
  cursor: pointer;
}

.el-row {
  width: 100%;
}
</style>
