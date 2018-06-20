<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="btn-block">
    <el-form-item label="用户名" prop="user_name">
      <div @keydown.enter="submitLogin('ruleForm')">
        <el-input v-model="ruleForm.user_name" auto-complete="off"></el-input>
      </div>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <div @keydown.enter="submitLogin('ruleForm')">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitLogin('ruleForm')">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    // 用户名验证
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    // 密码验证
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        user_name: '',
        password: '',
      },
      rules: {
        user_name: [
          { validator: validateUser, trigger: 'change' }
        ],
        password: [
          { validator: validatePass, trigger: 'change' }
        ]
      },
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    submitLogin(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 获取登录结果信息
          that.login(that.ruleForm).then((data) => {
            if (data.message === 'success') { // 登录成功 返回token
              that.$router.push({
                path: '/homepage?token=' + data.token
              })
            } else { // 登录失败 提示错误
              // 清空登录表单
              that.ruleForm = { user_name: '', password: '' }
              that.$message({
                message: '登录失败，用户名或密码错误！',
                type: 'warning'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
  }
}
</script>

<style lang="scss">

</style>
