<template>
  <div>
    <el-form :model="eventForm" status-icon :rules="eventRules" ref="eventForm" label-width="100px" class="event-form">
      <el-form-item label="测量时间：" prop="measureTime">
        <el-input v-model="eventForm.measureTime"></el-input>
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
        <el-input v-model="eventForm.g"></el-input>
      </el-form-item>
      <el-form-item label="Uncertainty：" prop="uncertainty">
        <el-input v-model="eventForm.uncertainty"></el-input>
      </el-form-item>
      <el-form-item label="上传文件：">
        <!-- <file-upload name="file" title="点击上传"></file-upload> -->
        <el-upload
          ref="upload"
          action="127.0.0.1:8090/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :auto-upload="false"
          :file-list="fileList">
          <el-button slot="trigger" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="任务组：" prop="taskGroup">
        <el-input v-model="eventForm.taskGroup"></el-input>
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
import pagination from 'src/misc/pagination'
import fileUpload from 'vue-upload-component'
export default {
  data() {
    return {
      pagination: pagination,
      eventForm: {
        measureTime: '',
        site: '',
        longitude: '',
        latitude: '',
        height: '',
        g: '',
        uncertainty: '',
        taskGroup: '',
        task: '',
        instrument: '',
        operator: ''
      },
      fileList: [],
      eventRules: {}
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  watch: {
  },
  methods: {
    ...mapActions([
    ]),
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
  },
  components: {
    fileUpload
  }
}
</script>
<style lang="scss" scoped>
.event-form {
  width: 400px;
  margin-left: 50px;
}
</style>
