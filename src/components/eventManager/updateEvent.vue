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
        <el-input v-model="eventForm.longitude"></el-input>
      </el-form-item>
      <el-form-item label="维度：" prop="latitude">
        <el-input v-model="eventForm.latitude"></el-input>
      </el-form-item>
      <el-form-item label="高度：" prop="height">
        <el-input v-model="eventForm.height"></el-input>
      </el-form-item>
      <el-form-item label="重力值：" prop="g">
        <el-input v-model="eventForm.g" disabled></el-input>
      </el-form-item>
      <el-form-item label="Uncertainty：" prop="uncertainty">
        <el-input v-model="eventForm.uncertainty"></el-input>
      </el-form-item>
      <el-form-item label="上传文件：">
        <!-- <file-upload name="file" title="点击上传"></file-upload> -->
        <el-upload
          ref="upload"
          :action="uploadUrl"
          :http-request="uploadEvent"
          :data="eventForm"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-change="fileChange"
          :before-upload="beforeUpload"
          multiple
          :limit="3"
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
        <el-button type="primary" @click="submitForm('eventForm')">上传</el-button>
        <el-button @click="resetForm('eventForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from 'src/misc/utils'
import g_const from 'src/misc/global.constant'
// import fileUpload from 'vue-upload-component'
export default {
  data() {
    return {
      eventForm: {
        update_time: utils.getNowTime(),
        site: 'Hangzhou',
        longitude: 123.2222,
        latitude: 31.232,
        height: 34.212,
        g: '',
        uncertainty: 123.213,
        task_group: 'AllTask',
        task: '6Fringe',
        instrument: 'ZAG-01',
        operator: ''
      },
      uploadUrl: 'http://localhost:3000/api/upload?user_id=19951012&token=xiamu20185111658177',
      isChooseFile: false,
      eventRules: {
        update_time: [
          { required: true, message: '请输入上传时间', trigger: 'blur' }
        ],
        site: [
          { required: true, message: '请输入地点', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '请输入维度', trigger: 'blur' }
        ],
        height: [
          { required: true, message: '请输入高度', trigger: 'blur' }
        ],
        uncertainty: [
          { required: true, message: '请输入不确定度', trigger: 'blur' }
        ],
        task_group: [
          { required: true, message: '请输入任务组', trigger: 'blur' }
        ],
        task: [
          { required: true, message: '请输入任务', trigger: 'blur' }
        ],
        instrument: [
          { required: true, message: '请输入设备型号', trigger: 'blur' }
        ],
        operator: [
          { required: true, message: '请输入操作员', trigger: 'blur' }
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
      'uploadEventData'
    ]),
    uploadEvent(val) {
      console.log(val, '--upload')
    },
    handlePreview(file) {
      console.log(file)
    },
    // 超出文件上限钩子
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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
    beforeUpload(file) {
      console.log('before-upload')
      console.log(file, 'upload-file')
    },
    // 删除文件前钩子
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 提交函数
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isChooseFile) {
            // 文件上传
            this.$refs.upload.submit()
            // this.uploadEventData(this.eventForm)
          } else {
            this.$message({
              message: '未选择文件，无法上传~',
              type: 'warning'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置函数
    resetForm(formName) {
      // 重置数据
      this.$refs[formName].resetFields()
      this.eventForm.operator = this.userData.user_name
      // 清空选择的文件
      this.$refs['upload'].clearFiles()
    }
  },
  components: {
    // fileUpload
  }
}
</script>
<style lang="scss" scoped>
.event-form {
  width: 400px;
  margin-left: 50px;
}
</style>
