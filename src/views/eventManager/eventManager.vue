<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="上传测量事件" name="updateEvent">
      <update-event></update-event>
    </el-tab-pane>
    <el-tab-pane label="我的上传记录" name="updateRecord">
      <update-record></update-record>
    </el-tab-pane>
  </el-tabs>
</template>

<script type="text/ecmascript-6" scoped>
// import pagination from 'src/misc/pagination'
import updateEvent from 'components/eventManager/updateEvent'
import updateRecord from 'components/eventManager/updateRecord'
export default {
  data() {
    return {
      activeName: 'updateEvent',
      userList: []
    }
  },
  methods: {
    handleClick() {},
  },
  components: {
    updateEvent,
    updateRecord
  }
}
</script>
<style lang="scss" scoped>
.table_list {
  width: 100%;
  padding: 0;
}
</style>
