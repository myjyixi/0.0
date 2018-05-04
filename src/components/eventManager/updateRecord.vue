<template>
  <table-list :listData="msgRecordData">
    <template slot="tableData" slot-scope="scope">
      <el-table :data="scope.listData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div>
              <p class="main_title">{{props.row.versionData.title.boxTitle}}</p>
              <div v-if="props.row.versionData.scene.title != ''">
                <p class="mtitle">{{props.row.versionData.scene.title}}</p>
                <p class="mcontent" v-for="(value,index) in props.row.versionData.scene.contents" :key="index">
                  {{index + 1}}）{{value.name}}
                  <a>【点击查看】</a>
                </p>
              </div>
              <div v-if="props.row.versionData.optimization.title != ''">
                <p class="mtitle">{{props.row.versionData.optimization.title}}</p>
                <p class="mcontent" v-for="(value,index) in props.row.versionData.optimization.contents" :key="index">
                  {{index + 1}}）{{value.val}}
                  <!--<a v-if="value.val == '新增速发短信功能'">【点击查看】</a>-->
                </p>
              </div>
              <div v-if="props.row.versionData.adjustment.title != ''">
                <p class="mtitle">{{props.row.versionData.adjustment.title}}</p>
                <p class="mcontent" v-for="(value,index) in props.row.versionData.adjustment.contents" :key="index">
                  {{index + 1}}）{{value.val}}
                </p>
              </div>
              <div v-if="props.row.versionData.notice.title != ''">
                <p class="mtitle">{{props.row.versionData.notice.title}}</p>
                <p class="_notice" v-for="(value,index) in props.row.versionData.notice.contents" :key="index">
                  {{value.val}}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="versionData.updateTime" min-width="150px"></el-table-column>
        <el-table-column label="更新内容" prop="versionData.title.topTitle" min-width="500px"></el-table-column>
        <el-table-column label="操作" min-width="100px" align="center">
          <template slot-scope="props">
            <a href="javascript:;" @click="editData(props.row.id)" class="edit_del">编辑</a>&nbsp;&nbsp;
            <a href="javascript:;" @click="delData(props.row.id)" class="edit_del">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </table-list>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from 'src/misc/utils'
import pagination from 'src/misc/pagination'
export default {
  data() {
    return {
      pagination: pagination,
      msgTab: 'msgUpdate',
      msgRecordData: [],
    }
  },
  computed: {
    ...mapGetters([
      // 'msgRecord'
    ])
  },
  mounted () {
    // this.msgRecordData = JSON.parse(JSON.stringify(this.msgRecord))
    // // 将历史记录中的字符串转为对象
    // this.msgRecordData.forEach(data => {
    //   data.versionData = JSON.parse(data.versionData)
    // })
  },
  watch: {
    msgRecord() {
      // this.msgRecordData = JSON.parse(JSON.stringify(this.msgRecord))
      // // 将历史记录中的字符串转为对象
      // this.msgRecordData.forEach(data => {
      //   data.versionData = JSON.parse(data.versionData)
      // })
    }
  },
  methods: {
    ...mapActions([
      // 'setMsgRecent',
      // 'delMsgData'
    ]),
    // 编辑历史记录
    editData(_id) {
      // let editData = {
      //   id: '',
      //   versionData: ''
      // }
      // this.msgRecordData.forEach(data => {
      //   if (data.id == _id) {
      //     editData.id = data.id
      //     editData.versionData = JSON.stringify(data.versionData)
      //     // 设置为更新页数据
      //     this.setMsgRecent(editData)
      //     // 跳转至更新页
      //     this.$emit('tabChange', 'msgUpdate')
      //   }
      // })
    },
    // 删除历史记录
    delData(_id) {
      // let that = this
      // utils.showConfirm(this, '确定删除该条记录?', '已成功删除', '已取消删除', function() {
      //   that.delMsgData(this.pagination, _id)
      // })
    },
  },
}
</script>
<style lang="scss" scoped>
.el-table {
  padding: 0;
  .mtitle {
    font-size: 15px;
    height: 23px;
  }
  .main_title {
    font-size: 15px;
    font-weight: bold;
    padding-bottom: 5px;
  }
  ._notice {
    font-size: 13px;
    text-indent: 2em;
    line-height: 19px;
  }
  .mcontent {
    font-size: 13px;
    line-height: 19px;
    text-indent: 2em;
    a {
      color: #000;
      cursor: pointer;
    }
  }
  .edit_del:hover {
    text-decoration: underline;
  }
}
</style>
