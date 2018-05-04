<template>
  <div class="login grid-middle showBgAnimate">
    <div class="col">
      <div class="content">
        <div class="img-wrapper">
          <div class="wrapper">
            <!--<img src="../../assets/images/login_logo.png">-->
            <login></login>
          </div>
        </div>
        <div class="word">
          <h1>
            AI&nbsp;&nbsp;CRM
          </h1>
          <h4>
            <span style="font-family:'HYGYT'; font-style:normal; font-weight:normal;">“魔方墙”</span>为你而在
          </h4>
          <h4>
            和卖家谈一场白头到老海枯石烂的恋爱吧
          </h4>
          <div class="bottom">
            @2016-2017 杭州聚效科技有限公司 版权所有
            <br> 增值电信业务经营许可证：
            <a href="http://www.miitbeian.gov.cn/" class="" target="_blank">浙ICP备14043836号</a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import login from 'components/login/login'
export default {
  data() {
    return {
      activeName: 'login',
      username: '',
      password: '',
      unOder: false,

    }
  },
  methods: {
    changeLogin() {
      this.activeName = 'login'
    }
  },
  components: {
    login
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@font-face {
  font-family: "HYGYT";
  /* 汉仪刚艺体 */
  src: url("../../assets/fonts/HYGYT/HYGYT.eot");
  /* IE9 */
  src: url("../../assets/fonts/HYGYT/HYGYT.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
  url("../../assets/fonts/HYGYT/HYGYT.ttf") format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
  url("../../assets/fonts/HYGYT/HYGYT.svg#HYGYT") format("svg");
}

@font-face {
  font-family: "FZZZH";
  /* 方正正准黑 */
  src: url("../../assets/fonts/FZZZH/FZZZH.eot");
  /* IE9 */
  src: url("../../assets/fonts/FZZZH/FZZZH.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
  url("../../assets/fonts/FZZZH/FZZZH.ttf") format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
  url("../../assets/fonts/FZZZH/FZZZH.svg#FZZZH") format("svg");
}

.icon-wangwang {
  font-size: 13px;
}

.el-button+.el-button {
  margin-left: 0;
}

.download {
  a {
    color: rgba(154, 154, 154, 0.69);
  }
  display: block;
  text-decoration: underline;
  text-align: right;
}

.mssage {
  position: absolute;
  top: 220px;
  color: #FF4949;
  font-size: $formFontSize;
  width: 100%; //background-color: #FFCBCB;
  // opacity: 0.2
}

.otherMsg,
.mainMsg {
  border: 1px solid rgba(255, 73, 73, 0.52);
  padding: 9px;
  border-radius: 3px;
  margin-bottom: 10px;
  margin-top: 10px;
  min-height: 34px;
}

.charge {
  color: rgba(154, 154, 154, 0.69);
  position: absolute;
  top: 203px;
  right: 0;
  font-size: $menuFontSize;
  text-decoration: underline;
}

.showBgAnimate {
  transition: all 5s ease;
  &:hover {
    background-size: 103% 103%;
  }
}

.login {
  background-image: url(../../assets/images/login_bg.png);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .col {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .content {
    width: 650px;
    margin: 0 auto;
    position: relative;
    height: 200px;
    bottom: 40px;
    .img-wrapper {
      position: absolute;
      margin-top: 10px;
      .wrapper {
        position: relative;
        width: 250px;
        img {
          width: 250px;
          padding: 0;
          position: absolute;
          top: 0;
        }
        .login-box {
          position: absolute;
          top: 150px;
          width: 105%;
          .btn-block {
            position: relative;
            left: -30px;
            z-index: 2;
            width: 110%;
          }
        }
      }
    }
    .word {
      color: #fff;
      position: absolute;
      top: 50px;
      left: 350px;
      h1 {
        margin: 0;
        font-size: 45px;
        font-family: 'FZZZH';
        font-weight: normal;
        font-style: normal;
      }
      h4 {
        margin-top: 15px;
      }
      .bottom {
        font-size: 13px;
        color: $menuColor;
        margin-top: 40px;
        a {
          color: inherit;
          &:hover {
            color: inherit;
            text-decoration: underline;
          }
        }
      }
    }
  }
}

.goToBuy {
  font-size: 13px;
  position: absolute;
  right: 13px;
  bottom: 20px;
}
</style>
