<template>
  <div>
    <el-row class="row_main">
      <el-col :span="1" class="col_empty"></el-col>
      <el-col :span="2" class="head">更新时间：</el-col>
      <el-col :span="5">
        <el-input v-model="updateTime" placeholder="YYYY-MM-DD HH:MM:SS" clearable></el-input>
      </el-col>
      <el-col :span="16" class="col_empty"></el-col>
    </el-row>
    <div style="clear: both;">
      <el-row class="row_main">
        <el-col :span="1" class="col_empty"></el-col>
        <el-col :span="2" class="head">标题：</el-col>
        <el-col :span="2">顶部标题：</el-col>
        <el-col :span="15">
          <el-input v-model="topTitle" clearable></el-input>
        </el-col>
        <el-col :span="4" class="col_empty"></el-col>
      </el-row>
      <el-row class="row_main" style="clear: both;">
        <el-col :span="3" class="col_empty"></el-col>
        <el-col :span="2">弹窗标题：</el-col>
        <el-col :span="15">
          <el-input v-model="boxTitle" clearable></el-input>
        </el-col>
        <el-col :span="4" class="col_empty"></el-col>
      </el-row>
    </div>
    <div style="clear: both;">
      <el-row class="row_main row_head">
        <el-col :span="1" class="check_box">
          <el-checkbox v-model="chooseScene"></el-checkbox>
        </el-col>
        <el-col :span="2" class="head">新开放场景：</el-col>
        <el-col :span="2">
          <a href="javascript:;" v-show="chooseScene" @click="addStair('sceneCont')" class="add_del">增加</a>
        </el-col>
        <el-col :span="19">
          <span v-show="chooseScene" class="tip_text">注：输入type可匹配name和path</span>
        </el-col>
      </el-row>
      <div v-show="chooseScene">
        <el-row :gutter="20" class="row_main" style="clear: both;" v-for="(value, index) in sceneCont" :key="index">
          <el-col :span="2" class="col_order">
            {{index + 1}}）
          </el-col>
          <el-col :span="1">name:</el-col>
          <el-col :span="5">
            <el-input v-model="value.name" clearable></el-input>
          </el-col>
          <el-col :span="1">type:</el-col>
          <el-col :span="5">
            <el-input v-model="value.type" @blur="fillOptions(value)" clearable></el-input>
          </el-col>
          <el-col :span="1">path:</el-col>
          <el-col :span="5">
            <el-input v-model="value.path" clearable></el-input>
          </el-col>
          <el-col :span="4">
            <a href="javascript:;" @click="delStair('sceneCont', index)" class="add_del">删除</a>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="clear: both;">
      <el-row class="row_main row_head">
        <el-col :span="1" class="check_box">
          <el-checkbox v-model="chooseOpt"></el-checkbox>
        </el-col>
        <el-col :span="2" class="head">系统优化：</el-col>
        <el-col :span="21">
          <a href="javascript:;" v-show="chooseOpt" @click="addStair('optCont')" class="add_del">增加</a>
        </el-col>
      </el-row>
      <div v-show="chooseOpt">
        <el-row :gutter="20" class="row_main" style="clear: both;" v-for="(value, index) in optCont" :key="index">
          <el-col :span="2" class="col_order">
            {{index + 1}}）
          </el-col>
          <el-col :span="18">
            <el-input v-model="value.val" clearable></el-input>
          </el-col>
          <el-col :span="4">
            <a href="javascript:;" @click="delStair('optCont', index)" class="add_del">删除</a>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="clear: both;">
      <el-row class="row_main row_head">
        <el-col :span="1" class="check_box">
          <el-checkbox v-model="chooseAdj"></el-checkbox>
        </el-col>
        <el-col :span="2" class="head">系统调整：</el-col>
        <el-col :span="21">
          <a href="javascript:;" v-show="chooseAdj" @click="addStair('adjCont')" class="add_del">增加</a>
        </el-col>
      </el-row>
      <div v-show="chooseAdj">
        <el-row :gutter="20" class="row_main" style="clear: both;" v-for="(value, index) in adjCont" :key="index">
          <el-col :span="2" class="col_order">
            {{index + 1}}）
          </el-col>
          <el-col :span="18">
            <el-input v-model="value.val" clearable></el-input>
          </el-col>
          <el-col :span="4">
            <a href="javascript:;" @click="delStair('adjCont', index)" class="add_del">删除</a>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="clear: both;">
      <el-row class="row_main row_head">
        <el-col :span="1" class="check_box">
          <el-checkbox v-model="chooseNotice"></el-checkbox>
        </el-col>
        <el-col :span="2" class="head">提醒：</el-col>
        <el-col :span="21">
          <a href="javascript:;" v-show="chooseNotice" @click="addStair('notice')" class="add_del">增加</a>
        </el-col>
      </el-row>
      <div v-show="chooseNotice">
        <el-row :gutter="20" class="row_main" style="clear: both;" v-for="(value, index) in notice" :key="index">
          <el-col :span="2" class="col_order">
            {{index + 1}}）
          </el-col>
          <el-col :span="18">
            <el-input v-model="value.val" clearable></el-input>
          </el-col>
          <el-col :span="4">
            <a href="javascript:;" @click="delStair('notice', index)" class="add_del">删除</a>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="btnDiv">
      <el-button type="primary" @click="saveAndCheck">保存</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from 'src/misc/utils'
import g_const from 'src/misc/global.constant'
import pagination from 'src/misc/pagination'
export default {
  data() {
    return {
      pagination: pagination,
      updateTime: '',
      topTitle: '',
      boxTitle: '',
      sceneCont: [],
      optCont: [],
      adjCont: [],
      notice: [],
      chooseScene: true,
      chooseOpt: true,
      chooseAdj: true,
      chooseNotice: true,
      msgRecentData: {},
      updateData: {
        updateTime: '',
        title: {
          topTitle: '',
          boxTitle: '',
        },
        scene: {
          title: '',
          contents: []
        },
        optimization: {
          title: '',
          contents: []
        },
        adjustment: {
          title: '',
          contents: []
        },
        notice: {
          title: '',
          contents: []
        }
      },
    }
  },
  computed: {
    ...mapGetters([
      // 'msgRecent'
    ])
  },
  watch: {
    // msgRecent() {
    //   // 初始化数据
    //   this.init()
    // }
  },
  methods: {
    ...mapActions([
      // 'setMsgUpdate',
      // 'getMsgRecord'
    ]),
    // 初始化数据
    init() {
      /*
      // 刷新原始数据
      this.msgRecentData = JSON.parse(this.msgRecent.versionData)
      // 初始化数据
      this.updateTime = this.msgRecentData.updateTime
      this.topTitle = this.msgRecentData.title.topTitle
      this.boxTitle = this.msgRecentData.title.boxTitle
      this.sceneCont = this.msgRecentData.scene.contents
      this.optCont = this.msgRecentData.optimization.contents
      this.adjCont = this.msgRecentData.adjustment.contents
      this.notice = this.msgRecentData.notice.contents
      // 修改选项
      if (JSON.stringify(this.sceneCont) !== '[]') {
        this.chooseScene = true
      } else {
        this.chooseScene = false
      }
      if (JSON.stringify(this.optCont) !== '[]') {
        this.chooseOpt = true
      } else {
        this.chooseOpt = false
      }
      if (JSON.stringify(this.adjCont) !== '[]') {
        this.chooseAdj = true
      } else {
        this.chooseAdj = false
      }
      if (JSON.stringify(this.notice) !== '[]') {
        this.chooseNotice = true
      } else {
        this.chooseNotice = false
      }*/
    },
    // 初始化选项（父组件调用）
    initChoose() {
      [this.chooseScene, this.chooseOpt, this.chooseAdj, this.chooseNotice] = [true, true, true, true]
    },
    /**
     * 增加阶梯
     * @param stairName {String} 阶梯名
     */
    addStair(stairName) {
      let obj1 = { name: '', type: '', path: '' }
      let obj2 = { val: '' }
      switch (stairName) {
        case 'sceneCont' : this.sceneCont.push(obj1); break
        case 'optCont' : this.optCont.push(obj2); break
        case 'adjCont' : this.adjCont.push(obj2); break
        case 'notice' : this.notice.push(obj2); break
      }
    },
    /**
     * 删除阶梯
     * @param stairName {String} 阶梯名
     * @param index {Number} 阶梯序号
     */
    delStair(stairName, index) {
      let that = this
      utils.showConfirm(this, '确定删除该项?', '已成功删除', '已取消删除', function() {
        switch (stairName) {
          case 'sceneCont' : that.sceneCont.splice(index, 1); break
          case 'optCont' : that.optCont.splice(index, 1); break
          case 'adjCont' : that.adjCont.splice(index, 1); break
          case 'notice' : that.notice.splice(index, 1); break
        }
      })
    },
    // 匹配name path
    fillOptions(value) {
      /*
      let param = false
      let isMatch = false
      if (value.type !== '') {
        param = true
      }
      for (let key in g_const.sceneList) {
        if (param) {
          g_const.sceneList[key].some(val => {
            return val.submenus.some((k, index) => {
              if (k.type == value.type) {
                value.name = k.name
                value.path = k.path
                param = false
                isMatch = true
                return true
              }
            })
          })
        }
      }
      if (!isMatch) {
        utils.showInfoMsg(this, '无此type，请检查是否输入错误')
      }*/
    },
    // 验证并保存
    saveAndCheck() {
      // if (this.checkEmptyVal() && this.checkTime()) {
      //   // 保存数据
      //   this.save()
      //   // 更新请求
      //   this.setMsgUpdate([this.msgRecent.id, JSON.stringify(this.updateData)])
      //   this.$message('保存成功')
      //   // 获取更新记录
      //   this.getMsgRecord(this.pagination)
      //   // 跳转至历史记录页
      //   this.$emit('tabChange', 'msgRecord')
      // } else if (!this.checkTime()) {
      //   this.$message('保存失败，日期格式不正确！')
      // } else {
      //   this.$message('保存失败，不能有空值！')
      // }
    },
    // 验证时间格式
    checkTime() {
      let reg = /^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/
      return reg.test(this.updateTime)
    },
    // 验证非空
    checkEmptyVal() {
      /*
      let index = 0
      if (this.updateTime === '' || this.topTitle === '' || this.boxTitle === '') {
        index++
      }
      if (this.chooseScene === true) {
        this.sceneCont.forEach(val => {
          if (val.name == '' || val.type == '' || val.path == '') {
            index++
          }
        })
      }
      if (this.chooseOpt === true) {
        this.optCont.forEach(val => {
          if (val.val == '') {
            index++
          }
        })
      }
      if (this.chooseAdj === true) {
        this.adjCont.forEach(val => {
          if (val.val == '') {
            index++
          }
        })
      }
      if (this.chooseNotice === true) {
        this.notice.forEach(val => {
          if (val.val == '') {
            index++
          }
        })
      }
      if (index !== 0) {
        return false
      } else {
        return true
      }*/
    },
    // 保存信息
    save() {
      /*
      this.updateData.updateTime = this.updateTime
      this.updateData.title.topTitle = this.topTitle
      this.updateData.title.boxTitle = this.boxTitle
      if (this.chooseScene === true && JSON.stringify(this.sceneCont) !== '[]') {
        this.updateData.scene.title = '新开放场景：'
        this.updateData.scene.contents = this.sceneCont
      } else {
        this.updateData.scene.title = ''
        this.updateData.scene.contents = []
      }
      if (this.chooseOpt === true && JSON.stringify(this.optCont) !== '[]') {
        this.updateData.optimization.title = '系统优化：'
        this.updateData.optimization.contents = this.optCont
      } else {
        this.updateData.optimization.title = ''
        this.updateData.optimization.contents = []
      }
      if (this.chooseAdj === true && JSON.stringify(this.adjCont) !== '[]') {
        this.updateData.adjustment.title = '系统调整：'
        this.updateData.adjustment.contents = this.adjCont
      } else {
        this.updateData.adjustment.title = ''
        this.updateData.adjustment.contents = []
      }
      if (this.chooseNotice === true && JSON.stringify(this.notice) !== '[]') {
        this.updateData.notice.title = '提醒：'
        this.updateData.notice.contents = this.notice
      } else {
        this.updateData.notice.title = ''
        this.updateData.notice.contents = []
      }*/
    },
    // 重置数据
    reset() {
      // let that = this
      // utils.showConfirm(this, '确定重置配置?', '已成功重置', '已取消重置', function() {
      //   // 初始化数据
      //   that.init()
      // })
    }
  },
}
</script>
<style lang="scss" scoped>

.row_main {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  .col_order {
    text-align: right;
  }
  .check_box {
    text-align: center;
  }
  .head {
    font-size: 15px;
    font-weight: bold;
  }
  .add_del:hover {
    text-decoration: underline;
  }
  .tip_text {
    color: #ccc;
  }
}

.row_head {
  margin-top: 10px;
  border-top: 1px solid #eee;
}

.btnDiv {
  padding: 20px;
  clear: both;
}

.col_empty {
  height: 40px;
}
</style>
