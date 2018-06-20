<template>
  <div>
    <el-form :model="eventForm" status-icon :rules="eventRules" ref="eventForm" label-width="100px" class="event-form">
      <el-form-item label="上传时间：" prop="update_time">
        <el-input v-model="eventForm.update_time"></el-input>
      </el-form-item>
      <el-form-item label="地点：" prop="site">
        <el-input v-model="eventForm.site"></el-input>
      </el-form-item>
      <el-form-item label="经度：" prop="longitude">
        <el-input v-model="eventForm.longitude" placeholder="正数为东经，负数为西经"></el-input>
      </el-form-item>
      <el-form-item label="纬度：" prop="latitude">
        <el-input v-model="eventForm.latitude" placeholder="正数为北纬，负数为南纬"></el-input>
      </el-form-item>
      <el-form-item label="高度：" prop="height">
        <el-input v-model="eventForm.height"></el-input>
      </el-form-item>
      <el-form-item label="不确定度：" prop="uncertainty">
        <el-input v-model="eventForm.uncertainty"></el-input>
      </el-form-item>
      <el-form-item label="上传文件：">
        <el-upload
          ref="upload"
          :action="uploadUrl"
          :http-request="uploadEvent"
          :data="eventForm"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-change="fileChange"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
          >
          <el-button slot="trigger" type="primary">选取文件</el-button>
          &nbsp;&nbsp;<span style="color: #ccc;">(须选择文件才能上传)</span>
        </el-upload>
      </el-form-item>
      <el-form-item label="任务组：" prop="task_group">
        <el-input v-model="eventForm.task_group"></el-input>
      </el-form-item>
      <el-form-item label="任务：" prop="task">
        <el-input v-model="eventForm.task"></el-input>
      </el-form-item>
      <el-form-item label="设备型号：" prop="instrument">
        <el-input v-model="eventForm.instrument"></el-input>
      </el-form-item>
      <el-form-item label="操作员：" prop="operator">
        <el-input v-model="eventForm.operator"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('eventForm')" :loading="isUpdating">{{isUpdating ? '上传中' : '上传'}}</el-button>
        <el-button @click="resetForm('eventForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from 'src/misc/utils'
import g_const from 'src/misc/global.constant'
export default {
  data() {
    var validateNum = (rule, value, callback) => {
      if (isNaN(value - 0)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    var validateLon = (rule, value, callback) => {
      if (Math.abs(value) > 180) {
        callback(new Error('请输入正确格式经度'))
      } else {
        callback()
      }
    }
    var validateLat = (rule, value, callback) => {
      if (Math.abs(value) > 90) {
        callback(new Error('请输入正确格式纬度'))
      } else {
        callback()
      }
    }
    return {
      eventForm: {
        update_time: utils.getNowTime(),
        site: '',
        longitude: '',
        latitude: '',
        height: '',
        uncertainty: '',
        task_group: 'AllTask',
        task: '6Fringe',
        instrument: 'ZAG-01',
        operator: ''
      },
      uploadUrl: 'http://localhost:3000/api/upload?user_id=19951012&token=xiamu20185111658177',
      isChooseFile: false,
      isUpdating: false,
      eventRules: {
        update_time: [
          { required: true, message: '请输入上传时间', trigger: 'blur' }
        ],
        site: [
          { required: true, message: '请输入地点', trigger: ['blur', 'change'] }
        ],
        longitude: [
          { required: true, message: '请输入经度', trigger: ['blur', 'change'] },
          { required: true, validator: validateNum, trigger: ['blur', 'change'] },
          { required: true, validator: validateLon, trigger: ['blur', 'change'] }
        ],
        latitude: [
          { required: true, message: '请输入纬度', trigger: ['blur', 'change'] },
          { required: true, validator: validateNum, trigger: ['blur', 'change'] },
          { required: true, validator: validateLat, trigger: ['blur', 'change'] }
        ],
        height: [
          { required: true, message: '请输入高度', trigger: ['blur', 'change'] },
          { required: true, validator: validateNum, trigger: ['blur', 'change'] }
        ],
        uncertainty: [
          { required: true, message: '请输入不确定度', trigger: ['blur', 'change'] },
          { required: true, validator: validateNum, trigger: ['blur', 'change'] }
        ],
        task_group: [
          { required: true, message: '请输入任务组', trigger: ['blur', 'change'] }
        ],
        task: [
          { required: true, message: '请输入任务', trigger: ['blur', 'change'] }
        ],
        instrument: [
          { required: true, message: '请输入设备型号', trigger: ['blur', 'change'] }
        ],
        operator: [
          { required: true, message: '请输入操作员', trigger: ['blur', 'change'] }
        ],
      }
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ]),
  },
  mounted() {
    // 设置默认操作员
    this.eventForm.operator = this.userData.user_name
  },
  watch: {
    userData() {
      // 刷新更新操作员
      this.eventForm.operator = this.userData.user_name
    }
  },
  methods: {
    ...mapActions([
      'uploadEventData',
      'saveEventData'
    ]),
    // el-上传函数
    uploadEvent(val) {
      this.isUpdating = true
      let formData = new FormData()
      formData.append('file', val.file)
      formData.append('update_time', val.data.update_time)
      formData.append('site', val.data.site)
      formData.append('longitude', val.data.longitude)
      formData.append('latitude', val.data.latitude)
      formData.append('height', val.data.height)
      formData.append('uncertainty', val.data.uncertainty)
      formData.append('task_group', val.data.task_group)
      formData.append('task', val.data.task)
      formData.append('instrument', val.data.instrument)
      formData.append('operator', val.data.operator)
      this.uploadEventData(formData).then(data => {
        if (data.data) {
          utils.showSuccessMsg(this, '上传成功')
          // 重置参数
          this.resetForm()
        } else if (data.error) {
          utils.showErrorMsg(this, '上传失败')
        }
        this.isUpdating = false
      })
    },
    // 超出文件上限钩子
    handleExceed(files, fileList) {
      utils.showWarningMsg(this, `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${fileList.length} 个文件`)
    },
    // 选择文件钩子
    fileChange(file, fileList) {
      // 修改是否选择文件参数
      if (fileList.length) {
        this.isChooseFile = true
      }
    },
    // 删除文件钩子
    handleRemove(file, fileList) {
      // 修改是否选择文件参数
      if (!fileList.length) {
        this.isChooseFile = false
      }
    },
    // 删除文件前钩子
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 提交函数
    submitForm() {
      let that = this
      this.$refs['eventForm'].validate((valid) => {
        if (valid) {
          if (that.isChooseFile) {
            // 文件上传
            that.$refs.upload.submit()
          } else {
            utils.showWarningMsg(this, '未选择文件，无法上传~')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置函数
    resetForm() {
      // 重置数据
      this.$refs['eventForm'].resetFields()
      this.eventForm.update_time = utils.getNowTime()
      this.eventForm.operator = this.userData.user_name
      // 清空选择的文件
      this.$refs['upload'].clearFiles()
    }
  }
}
</script>
<style lang="scss" scoped>
.event-form {
  width: 400px;
  margin-left: 50px;
}
</style>
